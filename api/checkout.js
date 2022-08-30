const stripeAPI = require("../stripe");

async function createCheckoutSession(req, res) {
  const domainUrl = process.env.WEB_APP_URL;
  const { line_items, customer_email, payment_method } = req.body;
  //check if body has line items and email
  if (!line_items || !customer_email) {
    return res.status(400).json({ error: 'missing required session parameters'})
  }

  let session;

  try {
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: [payment_method],
      mode: 'payment',
      line_items,
      customer_email,
      success_url: `${domainUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/payment-cancelled`,
      shipping_address_collection: { allowed_countries: ['GB', 'US', 'IN']}
    })
    res.status(200).json({ sessionId: session.id})
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: 'an error occurred, enable to create session'})
  }
}

module.exports = createCheckoutSession