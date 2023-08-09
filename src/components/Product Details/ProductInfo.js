import React from 'react'
import './ProductDetails.css'
const ProductInfo = ({ product }) => {
  return (
    <>
      <h3 className='product-info--name'>{product.name}</h3>
      <label className='product-info-label'>
        Product Id: <span>{product.product_id}</span>
      </label>
      <label className='product-info-label'>
        <span>Description: {product.description}</span>
      </label>
      <label className='product-info-label'>
        <span>Quantity: {product.quantity}</span>
      </label>
      <label className='product-info-label'>
        <span>Price: ${product.price}</span>
      </label>
      <label className='product-info-label'>
        <span>Category Id: {product.category_id}</span>
      </label>
    </>
  )
}

export default ProductInfo
