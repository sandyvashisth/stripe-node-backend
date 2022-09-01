const stripeAPI = require("../stripe");

function calculateOrderAmount(cartItems) {
  return cartItems.reduce((total, product) => {
    return total + product.price * product.quantity
  }, 0) * 100; // send amount in cent
}

async function paymentIntent(req, res) {
  const { cartItems, description, receipt_email, shipping } = req.body;
  let _paymentIntent;
  try {
    _paymentIntent = await stripeAPI.paymentIntents.create({
      amount: calculateOrderAmount(cartItems),
      currency: 'usd',
      description,
      payment_method_types: ['card'],
      receipt_email,
      shipping
    })
    res.status(200).json({clientSecret: _paymentIntent.client_secret})
  } catch (error) {
    console.log(error)
    res.status(400).json({error: 'an error occurred, unable to create payment intent'})
  }
}

module.exports = paymentIntent;