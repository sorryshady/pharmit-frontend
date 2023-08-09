import React, { useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import './AddProduct.css'
const AddProduct = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [addProductForm, setAddProductForm] = useState({
    name: '',
    description: '',
    product_id: '',
    quantity: '',
    price: '',
    category_id: '',
  })
  const addFormHandler = (event) => {
    const { name, value } = event.target
    setAddProductForm({
      ...addProductForm,
      [name]: value,
    })
  }
  const addProductHandler = async (e) => {
    try {
      e.preventDefault()
      console.log(addProductForm)
      const url = 'https://pharmit-node.onrender.com/products'
      await axios.post(url, addProductForm)
      setAddProductForm({
        name: '',
        description: '',
        product_id: '',
        quantity: '',
        price: '',
        category_id: '',
      })
      enqueueSnackbar('Product added successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }
  return (
    <>
      <section className='addProduct-container'>
        <form className='addProduct-form' onSubmit={addProductHandler}>
          <h2 className='addProduct-form-heading'>Add new product</h2>
          <div>
            <label htmlFor='add-prod-name'>Product Name: </label>
            <input
              id='add-prod-name'
              type='text'
              value={addProductForm.name}
              name='name'
              onChange={addFormHandler}
            />
          </div>
          <div>
            <label htmlFor='add-prod-des'>Description: </label>
            <input
              id='add-prod-des'
              type='text'
              value={addProductForm.description}
              name='description'
              onChange={addFormHandler}
            />
          </div>
          <div className='form-sub'>
            <div>
              <label htmlFor='add-prod-id'>Product Id: </label>
              <input
                id='add-prod-id'
                type='number'
                value={addProductForm.product_id}
                name='product_id'
                onChange={addFormHandler}
              />
            </div>
            <div>
              <label htmlFor='add-prod-qty'>Quantity: </label>
              <input
                id='add-prod-qty'
                type='number'
                value={addProductForm.quantity}
                name='quantity'
                onChange={addFormHandler}
              />
            </div>
            <div>
              <label htmlFor='add-prod-price'>Price: </label>
              <input
                id='add-prod-price'
                type='number'
                value={addProductForm.price}
                name='price'
                onChange={addFormHandler}
              />
            </div>
            <div>
              <label htmlFor='add-prod-ctg'>Category Id: </label>
              <input
                id='add-prod-ctg'
                type='number'
                value={addProductForm.category_id}
                name='category_id'
                onChange={addFormHandler}
              />
            </div>
          </div>
          <button className='btn-submit'>Add Product</button>
        </form>
      </section>
    </>
  )
}

export default AddProduct
