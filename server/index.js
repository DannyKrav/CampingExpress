require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { getProducts, getCartItems, updateExistingProduct, inputProduct, deleteProductCheckout, clearCheckout } = require('./controllers/products');
const { loginUser, registerUser } = require('./controllers/user');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const app = express();

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db);
  console.log('DB Connected Successfully.');
}).catch(err => {
  console.log(`Error connection to DB: ${err}`)
})


app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

const storeItems = new Map([
  [1, { priceInCents: 2695, name: "Wise Owl Hammock" }],
  [2, { priceInCents: 19999, name: "Jackery Portable Power Station" }],
  [3, { priceInCents: 3499, name: "Coleman Gas Stove" }],
  [4, { priceInCents: 3899, name: "Grill Utensil Caddy" }],
  [5, { priceInCents: 3299, name: "Gas ONE Propane/Butane Stove" }],
  [6, { priceInCents: 3292, name: "Coleman Camping Chair" }],
  [7, { priceInCents: 2599, name: "RoverTac Multitool Hatchet" }],
  [8, { priceInCents: 2598, name: "FOVAL Car Inverter" }],
  [9, { priceInCents: 16500, name: "Ecosmart Electric Heater" }],
  [10, { priceInCents: 41995, name: "Nemo Riff Sleeping Bag" }]
])




app.use(express.json());
app.get('/api/products', getProducts)
app.get('/api/cartItems', getCartItems)
app.post('/api/updateExistingProduct', updateExistingProduct)
app.post('/api/inputProduct', inputProduct)
app.post('/api/deleteProductCheckout', deleteProductCheckout)
app.delete('/api/clearCheckout', clearCheckout)
app.post('/api/registerUser', registerUser);
app.post('/api/loginUser', loginUser);

app.post('/create-checkout-session', async (req, res) => {

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: item.quantity
        }
      }),
      success_url: `${process.env.CLIENT_URL}/home`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`));
