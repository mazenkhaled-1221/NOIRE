require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const PAYMOB_API_KEY =
    process.env.PAYMOB_API_KEY;

const PAYMOB_PUBLIC_KEY =
    process.env.PAYMOB_PUBLIC_KEY;

const PAYMOB_HMAC_SECRET =
    process.env.PAYMOB_HMAC_SECRET;


/* ================= MIDDLEWARE ================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


/* ================= FRONTEND ================= */

app.use(
    express.static(
        path.join(__dirname, "..")
    )
);


/* =====================================================
   CREATE PAYMENT INTENTION
===================================================== */

app.post(
    "/api/create-payment",
    async (req, res) => {

        try {

            const {
                customer,
                items,
                total
            } = req.body;


            /* ================= VALIDATION ================= */

            if (
                !customer ||
                !items ||
                !Array.isArray(items) ||
                items.length === 0
            ) {

                return res.status(400).json({
                    success: false,
                    message: "Invalid order data."
                });

            }


            if (
                !customer.name ||
                !customer.email ||
                !customer.phone ||
                !customer.address ||
                !customer.city
            ) {

                return res.status(400).json({
                    success: false,
                    message: "Missing customer information."
                });

            }


            /* ================= SERVER TOTAL ================= */

            const serverTotal =
                items.reduce(
                    (sum, item) => {

                        const price =
                            Number(item.price);

                        const quantity =
                            Number(item.quantity);

                        if (
                            !Number.isFinite(price) ||
                            !Number.isInteger(quantity) ||
                            quantity < 1 ||
                            quantity > 10
                        ) {

                            throw new Error(
                                "Invalid cart item."
                            );

                        }

                        return (
                            sum +
                            price * quantity
                        );

                    },
                    0
                );


            if (
                Math.round(serverTotal * 100) !==
                Math.round(Number(total) * 100)
            ) {

                return res.status(400).json({
                    success: false,
                    message: "Order total mismatch."
                });

            }


            /* ================= ORDER REFERENCE ================= */

            const orderNumber =
                "NR-" +
                Date.now()
                    .toString()
                    .slice(-8);


            /* =================================================
               PAYMOB INTENTION

               Amount is converted to the smallest
               currency unit.
            ================================================= */

            const amount =
                Math.round(
                    serverTotal * 100
                );


            const response =
                await fetch(
                    "https://accept.paymob.com/v1/intention/",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Token ${PAYMOB_API_KEY}`

                        },

                        body: JSON.stringify({

                            amount: amount,

                            currency: "EGP",

                            payment_methods: [],

                            items: items.map(
                                item => ({

                                    name:
                                        item.name,

                                    amount:
                                        Math.round(
                                            Number(item.price) * 100
                                        ),

                                    description:
                                        `${item.name} - ${item.size} - ${item.color}`,

                                    quantity:
                                        Number(
                                            item.quantity
                                        )

                                })
                            ),

                            billing_data: {

                                apartment:
                                    "NA",

                                first_name:
                                    customer.name
                                        .split(" ")[0],

                                last_name:
                                    customer.name
                                        .split(" ")
                                        .slice(1)
                                        .join(" ") ||
                                    "Customer",

                                email:
                                    customer.email,

                                phone_number:
                                    customer.phone,

                                country:
                                    "EG",

                                city:
                                    customer.city,

                                street:
                                    customer.address,

                                building:
                                    "NA",

                                floor:
                                    "NA",

                                shipping_method:
                                    "NA",

                                postal_code:
                                    "NA",

                                state:
                                    customer.city

                            },

                            extras: {

                                order_number:
                                    orderNumber

                            }

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                console.error(
                    "Paymob error:",
                    data
                );

                return res.status(
                    response.status
                ).json({

                    success: false,

                    message:
                        "Payment initialization failed.",

                    details:
                        data

                });

            }


            /* ================= RESPONSE ================= */

            res.json({

                success: true,

                orderNumber,

                clientSecret:
                    data.client_secret

            });


        } catch (error) {

            console.error(
                "Payment error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Unable to create payment."

            });

        }

    }
);


/* =====================================================
   PAYMENT SUCCESS PAGE
===================================================== */

app.get(
    "/payment-success",
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "..",
                "success.html"
            )
        );

    }
);


/* =====================================================
   PAYMENT FAILED
===================================================== */

app.get(
    "/payment-failed",
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "..",
                "success.html"
            )
        );

    }
);


/* ================= START ================= */

app.listen(
    PORT,
    () => {

        console.log(
            `NOIRÉ server running on http://localhost:${PORT}`
        );

    }
);