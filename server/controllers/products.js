module.exports = {
  getProducts: async (req, res) => {
    const db = req.app.get('db')
    const products = await db.product.getProducts()
    res.status(200).send(products)
  },

  getCartItems: async (req, res) => {
    const db = req.app.get('db')
    const items = await db.product.cartProducts()
    res.status(200).send(items)
  },
  updateExistingProduct: async (req, res) => {
    const db = req.app.get('db')
    const { id, product_quantity } = req.body;
    await db.product.updateExistingProduct([product_quantity, id])
    res.status(200).send('Product was updated.')
  },

  inputProduct: async (req, res) => {
    const db = req.app.get('db')
    const { id, product_quantity, product_name, product_image, product_price } = req.body;
    const date = new Date();
    await db.product.inputProduct([id, product_name, product_price, product_quantity, product_image, date])
    res.status(200).send('Product was inputted!')
  },

  deleteProductCheckout: async (req, res) => {
    const { product_id } = req.body
    const db = req.app.get('db')
    await db.product.deleteProductCheckout([product_id])

    res.status(200).send('Product Deleted!')
  },

  clearCheckout: (req, res) => {
    const db = req.app.get('db')
    db.product.clearCheckout()
    res.status(200).send('Checkout Cleared!')
  }
}
