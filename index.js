const express = require("express");
const cors = require("cors");

require("dotenv").config({ path: "./.env" });
const createCheckoutSession = require("./api/checkout");
const webhook = require("./api/webhook");
const paymentIntent = require("./api/paymentIntent");

const app = express();
const port = 8080;

app.use(express.json({
  verify: (req, res, buffer) => req['rowBody'] = buffer,
}));
app.use(cors({ origin: true }));

app.get("/", (req, res) => res.send("Hello word"));

app.post('/create-checkout-session', createCheckoutSession)

app.post('/create-payment-intent', paymentIntent)

app.post('/webhook', webhook)

app.listen(port, () => {
  console.log("server listening on port:", port);
});
