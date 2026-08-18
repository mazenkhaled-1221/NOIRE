import crypto from "crypto";

const HMAC_FIELDS = [
    "amount",
    "created_at",
    "currency",
    "error_occured",
    "has_parent_transaction",
    "id",
    "integration_id",
    "is_3d_secure",
    "is_auth",
    "is_capture",
    "is_refunded",
    "is_standalone_payment",
    "is_voided",
    "order",
    "owner",
    "pending",
    "source_data_pan",
    "source_data_sub_type",
    "source_data_type",
    "success"
];


function getValue(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    if (typeof value === "boolean") {
        return value ? "true" : "false";
    }

    if (
        typeof value === "object" &&
        value.id !== undefined
    ) {
        return String(value.id);
    }

    if (typeof value === "object") {
        return JSON.stringify(value);
    }

    return String(value);
}


function verifyHmac(body, receivedHmac) {

    const transaction =
        body.obj || body;

    const hmacString =
        HMAC_FIELDS
            .map(field =>
                getValue(transaction[field])
            )
            .join("");

    const calculated =
        crypto
            .createHmac(
                "sha512",
                process.env.PAYMOB_HMAC_SECRET
            )
            .update(hmacString)
            .digest("hex");

    if (!receivedHmac) {
        return false;
    }

    const a =
        Buffer.from(
            calculated,
            "hex"
        );

    const b =
        Buffer.from(
            receivedHmac,
            "hex"
        );

    if (a.length !== b.length) {
        return false;
    }

    return crypto.timingSafeEqual(a, b);
}


export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });

    }


    try {

        const body =
            req.body;

        const receivedHmac =
            req.query.hmac ||
            body.hmac;


        const valid =
            verifyHmac(
                body,
                receivedHmac
            );


        if (!valid) {

            return res.status(403).json({
                success: false,
                message: "Invalid HMAC"
            });

        }


        const transaction =
            body.obj;


        if (!transaction) {

            return res.status(400).json({
                success: false,
                message: "Invalid callback"
            });

        }


        const transactionId =
            transaction.id;


        const success =
            transaction.success === true;


        const orderId =
            transaction.order?.merchant_order_id ||
            transaction.order?.id;


        console.log(
            "PAYMOB TRANSACTION:",
            {
                transactionId,
                orderId,
                success
            }
        );


        /*
         * IMPORTANT:
         *
         * هنا هنربط Database
         *
         * success === true
         *      -> PAID
         *
         * success === false
         *      -> FAILED
         */


        return res.status(200).json({
            received: true
        });


    } catch (error) {

        console.error(
            "Paymob webhook error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Webhook error"
        });

    }

}