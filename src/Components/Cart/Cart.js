import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';



function Cart() {
  const [cartItems, setCartItems] = useState([])


  function cartProducts() {
    axios.get('/api/cartItems')
      .then(res => {
        setCartItems(res.data)
      }).catch(err => {
        console.log(`Error:${err}`)
      })


  }

  function clearCheckout() {
    axios.delete('/api/clearCheckout')
      .then(_ => {
        cartProducts()
      })
  }


  function Pay() {
    const mappedCartItems = cartItems.map(item => { return { id: item.product_id, quantity: item.product_quantity } })
    fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: mappedCartItems
      })
    }).then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
      window.location = url
    }).catch(e => {
      console.log(e.error)
    })
    clearCheckout()
  }

  const productInc = (product) => {
    product.product_quantity += 1
    setCartItems(current => [...current])
  }

  const productDec = (product) => {
    if (product.product_quantity > 1)
      product.product_quantity -= 1
    setCartItems(current => [...current])

  }

  const checkoutRemove = (product) => {
    axios.post('/api/deleteProductCheckout', product)
      .then(_ => cartProducts())

  }



  let mappedCartItems = cartItems.map(product => {
    return <div className='cart-item-indiv' key={product.id}>
      <div className='cart-product-img'>
        <img className='cart-image-indiv' src={product.product_image}></img>
        <div className='cart-product-name'>{product.product_name}</div>
      </div>

      <div className='cart-product-price'>{product.product_price}</div>

      <div>
        <button onClick={() => productDec(product)}>-</button>
        {product.product_quantity}
        <button onClick={() => productInc(product)}>+</button>
      </div>



      <button className="remove-item-button" onClick={() => checkoutRemove(product)}>Remove Item</button>

    </div>

  })

  const itemsPrice = cartItems.reduce((a, c) => a + c.product_quantity * c.product_price, 0);

  useEffect(() => {
    cartProducts()
  }, [])


  return (
    <div className='cart-main'>

      <div className='cart-content'>
        <div className='cart-checkout-left'>{mappedCartItems}</div>


        <div className='cart-checkout-right'>

          <div className='checkout-title'>
            <p>Checkout</p>
          </div>

          <div className='subtotal'>
            <p><b>Cart Total:</b> ${itemsPrice.toFixed(2)}</p>
            <button className='cart-button' onClick={() => Pay()} >Buy Now</button>
          </div>



        </div>
      </div>

    </div>
  )
}

export default Cart;
