const stripe = require('stripe')(sk_test_51LcQCpSC2hdbP7ekhN0Uf6HT62UiQc69OHg8fbmiNmMulAocFS5OHT6KCX6QpDR8k0jAs8pxoSIhQCklFCyivpT300oG2Lijxv);
app.post('/payment', async (req, res) => {
    const { amount, currency } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  