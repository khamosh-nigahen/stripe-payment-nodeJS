require("dotenv").config();

const express = require("express");
const cors = require("cors")
const app = express();

app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:5500",
// }))
app.use(express.static("public"));

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
    [1, { price: 1000, name: "Learn Node" }],
    [2, { price: 2000, name: "Learn Python" }],
]);

app.post("/create-checkout-session", (req, res) => {
    try {
        const session = stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: "INR",
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.price,
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`,
        });
        res.json({ session});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(3000, () => "Server running at port 3000...");
