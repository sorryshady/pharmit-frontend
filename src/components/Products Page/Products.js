import React, { useCallback, useEffect, useState } from 'react'
import './Products.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const endpoint = 'https://pharmit-node.onrender.com/products'
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(endpoint)
      if (response.data.code) {
        throw response
      }
      setLoading(false)
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    fetchData()
  }, [fetchData])
  return (
    <>
      <h2 className='products-heading'>Inventory List</h2>
      <div className='products-container'>
        {loading ? (
          <div className='products-loading'>Loading Products.</div>
        ) : (
          products.map((product) => {
            return (
              <Link
                to={`/${product.product_id}`}
                className='product card'
                key={product.product_id}
              >
                <p className='product_id'>Product Id: {product.product_id}</p>
                <div>
                  <h3 className='product_name'>{product.name}</h3>
                  <div className='product_description'>
                    {product.description}
                  </div>
                </div>
                <div className='product_details'>
                  <p>
                    Price: <span>${product.price}</span>
                  </p>
                  <p>
                    Quantity: <span>{product.quantity}</span>
                  </p>
                  <p>
                    Category Id: <span>{product.category_id}</span>
                  </p>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </>
  )
}

export default Products
