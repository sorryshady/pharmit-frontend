import React, { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useNavigate, useParams } from 'react-router-dom'
import './ProductDetails.css'
import axios from 'axios'
import ProductInfo from './ProductInfo'
import UserActions from './UserActions'
const ProductDetails = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const { productId } = useParams()
  const [userName, setUserName] = useState('')
  const endpoint = 'https://pharmit-node.onrender.com/products'
  const [curProduct, setCurProduct] = useState('')
  const [editedFormData, setEditedFormData] = useState({})
  let url = `${endpoint}/${productId}`

  const fetchCurrentProduct = useCallback(async () => {
    const user = localStorage.getItem('userName')
    setUserName(user)
    try {
      const res = await axios.get(url)
      const data = res.data
      setCurProduct(data)
      setEditedFormData({ ...data })
    } catch (e) {
      console.log(e)
    }
  }, [url])
  useEffect(() => {
    fetchCurrentProduct()
  }, [fetchCurrentProduct])

  const [edit, setEdit] = useState(false)
  const editBtnHandler = () => {
    setEdit(true)
  }
  const saveBtnHandler = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      await axios.put(url, editedFormData)
      window.location.reload()
      setLoading(false)
      setEdit(false)
      enqueueSnackbar('Change successful', { variant: 'success' })
    } catch (error) {
      setLoading(false)
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }
  const cancelBtnHandler = () => {
    setEdit(false)
  }
  const deleteBtnHandler = async () => {
    try {
      const response = await axios.delete(url)
      enqueueSnackbar('Product deleted successfully', { variant: 'success' })
      console.log(response)
      navigate('/')
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }

  const onFormChange = (name, value) => {
    setEditedFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  return (
    <>
      <h2 className='products-heading'>Product Details</h2>
      <section className='productDetails-container'>
        <div className={`card product-info ${edit ? 'editing' : ''}`}>
          <ProductInfo product={curProduct} />
          {!edit ? (
            <>
              <button
                className={`btn-edit ${!userName ? 'disabled' : ''}`}
                onClick={editBtnHandler}
                disabled={!userName}
              >
                Edit
              </button>
              {!userName && (
                <p className='info-message'>Login to modify product details</p>
              )}
            </>
          ) : (
            <div className='btn-group'>
              <button onClick={deleteBtnHandler} className='btn-delete'>
                Delete
              </button>
              <button onClick={cancelBtnHandler} className='btn-cancel'>
                Cancel
              </button>
              <button onClick={saveBtnHandler} className='btn-save'>
                Save
              </button>
            </div>
          )}
        </div>
        {edit && (
          <div className='card user-actions'>
            <UserActions
              editForm={editedFormData}
              onFormChange={onFormChange}
              onSubmit={saveBtnHandler}
            />
          </div>
        )}
      </section>
    </>
  )
}

export default ProductDetails
