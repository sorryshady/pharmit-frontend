import React from 'react'
import './UserActions.css'
const UserActions = ({ editForm, onFormChange, onSubmit }) => {
  const editFormHandler = (event) => {
    const { name, value } = event.target
    onFormChange(name, value)
  }
  return (
    <>
      <form className='user-actions--form' onSubmit={onSubmit}>
        <div>
          <label htmlFor='edit-prod-name'>Product Name: </label>
          <input
            id='edit-prod-name'
            type='text'
            value={editForm.name}
            name='name'
            onChange={editFormHandler}
          />
        </div>
        <div>
          <label htmlFor='edit-prod-des'>Description: </label>
          <input
            id='edit-prod-des'
            type='text'
            value={editForm.description}
            name='description'
            onChange={editFormHandler}
          />
        </div>
        <div className='form-sub'>
          <div>
            <label htmlFor='edit-prod-id'>Product Id: </label>
            <input
              id='edit-prod-id'
              type='number'
              value={editForm.product_id}
              name='id'
              onChange={editFormHandler}
            />
          </div>
          <div>
            <label htmlFor='edit-prod-qty'>Quantity: </label>
            <input
              id='edit-prod-qty'
              type='number'
              value={editForm.quantity}
              name='quantity'
              onChange={editFormHandler}
            />
          </div>
          <div>
            <label htmlFor='edit-prod-price'>Price: </label>
            <input
              id='edit-prod-price'
              type='number'
              value={editForm.price}
              name='price'
              onChange={editFormHandler}
            />
          </div>
          <div>
            <label htmlFor='edit-prod-ctg'>Category Id: </label>
            <input
              id='edit-prod-ctg'
              type='number'
              value={editForm.category_id}
              name='category_id'
              onChange={editFormHandler}
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default UserActions
