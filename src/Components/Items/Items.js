import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Items.css';




function Items() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  function getProducts() {
    axios.get('/api/products')
      .then(res => {
        console.log('console logged')
        setProducts(res.data)

      })

  }

  function getCartProducts() {
    axios.get('/api/cartItems')
      .then(res => {
        setCartItems(res.data)
        console.log(res.data)
      }).catch(err => {
        console.log(`Error:${err}`)
      })
  }

  const productInc = (product) => {
    product.product_quantity += 1
    setProducts(current => [...current])
  }

  const productDec = (product) => {
    if (product.product_quantity > 0)
      product.product_quantity -= 1
    setProducts(current => [...current])
  }

  const addTo = (product) => {
    const exist = cartItems.find(x => x.product_id === product.id);

    if (exist) {


      product.product_quantity += exist.product_quantity
      axios.post('/api/updateExistingProduct', product)
        .then(() => {

          getCartProducts()
        })
    } else {
      axios.post('/api/inputProduct', product)
        .then(() => {

          getCartProducts()
        })
    }
    product.product_quantity = 0
  };




  let mappedProducts = products.map(product => {
    return <div className='items-item-indiv' key={product.id}>
      <div className='items-product-img'>
        <img className='items-image-indiv' src={product.product_image}></img>
      </div>
      <div className='items-product-name'>{product.product_name}</div>
      <div className='items-product-price'>{product.product_price}</div>
      <div className='items-product-button-box'>
        <button onClick={() => productDec(product)}>-</button>
        {product.product_quantity}
        <button onClick={() => productInc(product)}>+</button>
      </div>
      <div className='items-product-addTo'>
        <button onClick={() => addTo(product)}>Add To Cart</button>
      </div>
    </div>
  })


  useEffect(() => {
    getProducts()
    getCartProducts()
  }, [])



  return (
    <div className='items-main'>
      <div className='items-content'>
        {mappedProducts}
      </div>
    </div>
  )
}

export default Items;
