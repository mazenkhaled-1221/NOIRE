export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {

        const {
            name,
            phone,
            email,
            address,
            city,
            items
        } = req.body;

        if (
            !name ||
            !phone ||
            !email ||
            !address ||
            !city ||
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing order information"
            });
        }

        /*
         * ============================
         * CALCULATE TOTAL
         * ============================
         */

        const total = items.reduce(
            (sum, item) => {

                const price = Number(item.price) || 0;
                const quantity = Number(item.quantity) || 0;

                return sum + (price * quantity);

            },
            0
        );

        if (total <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid order total"
            });
        }


        /*
         * ============================
         * ORDER NUMBER
         * ============================
         */

        const orderNumber =
            "NR-" +
            Date.now()
                .toString()
                .slice(-6);


        /*
         * ============================
         * PAYMOB
         * ============================
         */

        const PAYMOB_API_KEY =
            process.env.PAYMOB_API_KEY;

        const PAYMOB_PUBLIC_KEY =
            process.env.PAYMOB_PUBLIC_KEY;

        const PAYMOB_INTEGRATION_ID =
            process.env.PAYMOB_INTEGRATION_ID;


        if (
            !PAYMOB_API_KEY ||
            !PAYMOB_PUBLIC_KEY ||
            !PAYMOB_INTEGRATION_ID
        ) {

            return res.status(500).json({
                success: false,
                message: "Paymob environment variables are missing"
            });

        }


        /*
         * Paymob uses the smallest currency unit.
         *
         * Example:
         * $49 → 4900 cents
         *
         * IMPORTANT:
         * Your current NOIRÉ prices are displayed
         * in USD. Make sure your Paymob account/
         * integration is configured for the currency
         * you actually want to charge.
         */

        const amount = Math.round(total * 100);


        /*
         * ============================
         * CREATE PAYMENT INTENTION
         * ============================
         */

        const paymobResponse = await fetch(
            "https://accept.paymob.com/v1/intention/",
            {
                method: "POST",

                headers: {
                    "Authorization":
                        `Token ${PAYMOB_API_KEY}`,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    amount: amount,

                    currency: "USD",

                    payment_methods: [
                        Number(PAYMOB_INTEGRATION_ID)
                    ],

                    items: items.map(item => ({
                        name: item.name,
                        amount: Math.round(
                            Number(item.price) * 100
                        ),
                        description:
                            `${item.name} - ${item.size || ""} - ${item.color || ""}`,
                        quantity:
                            Number(item.quantity)
                    })),

                    billing_data: {

                        first_name:
                            name.split(" ")[0],

                        last_name:
                            name.split(" ")
                                .slice(1)
                                .join(" ") || "Customer",

                        email: email,

                        phone_number: phone,

                        country: "EG",

                        city: city,

                        street: address,

                        apartment: "NA",

                        building: "NA",

                        floor: "NA",

                        postal_code: "NA"

                    },

                    customer: {

                        first_name:
                            name.split(" ")[0],

                        last_name:
                            name.split(" ")
                                .slice(1)
                                .join(" ") || "Customer",

                        email: email

                    },

                    extras: {

                        order_number:
                            orderNumber

                    }

                })
            }
        );


        const data =
            await paymobResponse.json();


        /*
         * ============================
         * PAYMOB ERROR
         * ============================
         */

        if (!paymobResponse.ok) {

            console.error(
                "Paymob error:",
                data
            );

            return res.status(
                paymobResponse.status
            ).json({

                success: false,

                message:
                    data.detail ||
                    data.message ||
                    "Paymob payment initialization failed"

            });

        }


        /*
         * ============================
         * SUCCESS
         * ============================
         */

        const checkoutUrl =
    "https://accept.paymob.com/unifiedcheckout/" +
    "?publicKey=" +
    encodeURIComponent(PAYMOB_PUBLIC_KEY) +
    "&clientSecret=" +
    encodeURIComponent(data.client_secret);

return res.status(200).json({
    success: true,
    orderNumber,
    checkoutUrl
});


    } catch (error) {

        console.error(
            "Create payment error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Payment initialization failed"

        });

    }

}