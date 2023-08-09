import React, { useState } from 'react'
import axios from 'axios'
import './AddCategory.css'
import { useSnackbar } from 'notistack'
const AddCategory = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [addCategoryForm, setAddCategoryForm] = useState({
    name: '',
    description: '',
    category_id: '',
  })
  const addCategoryFormHandler = (event) => {
    const { name, value } = event.target
    setAddCategoryForm({
      ...addCategoryForm,
      [name]: value,
    })
  }
  const addCategoryHandler = async (e) => {
    try {
      e.preventDefault()
      console.log(addCategoryForm)
      const url = 'https://pharmit-node.onrender.com/categories'
      await axios.post(url, addCategoryForm)
      setAddCategoryForm({
        name: '',
        description: '',
        category_id: '',
      })
      enqueueSnackbar('Category added successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }
  return (
    <>
      <section className='addCategory-container'>
        <form className='addCategory-form' onSubmit={addCategoryHandler}>
          <h2 className='addProduct-form-heading'>Add new category</h2>
          <div>
            <label htmlFor='add-cat-name'>Category Name: </label>
            <input
              id='add-cat-name'
              type='text'
              value={addCategoryForm.name}
              name='name'
              onChange={addCategoryFormHandler}
            />
          </div>
          <div>
            <label htmlFor='add-cat-des'>Description: </label>
            <input
              id='add-cat-des'
              type='text'
              value={addCategoryForm.description}
              name='description'
              onChange={addCategoryFormHandler}
            />
          </div>
          <div>
            <label htmlFor='add-cat-id'>Category Id: </label>
            <input
              id='add-cat-id'
              type='number'
              value={addCategoryForm.category_id}
              name='category_id'
              onChange={addCategoryFormHandler}
            />
          </div>
          <button className='btn-submit'>Add Product</button>
        </form>
      </section>
    </>
  )
}

export default AddCategory
