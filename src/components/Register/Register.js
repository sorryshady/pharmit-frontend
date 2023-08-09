import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import axios from 'axios'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBoxesStacked,
  faPeopleCarryBox,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons'
const Register = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [showPass, setShowPass] = useState('password')
  const [passwordText, setPasswordText] = useState('Show')
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const showPassHandler = () => {
    setShowPass((prev) => (prev === 'password' ? 'text' : 'password'))
    setPasswordText((prev) => (prev === 'Show' ? 'Hide' : 'Show'))
  }
  const formChangeHandler = (event) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value,
    })
  }
  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      if (form.password === form.confirmPassword) {
        const url = 'https://pharmit-node.onrender.com/auth/register'
        await axios.post(url, {
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        })
        setLoading(false)
        setForm({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        })
        enqueueSnackbar('Registered successfully', { variant: 'success' })
      }
      navigate('/login')
    } catch (error) {
      setLoading(false)
      console.log(error)
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }

  return (
    <>
      <section className='login-register-container'>
        <div className='login-register-description'>
          <p>
            <FontAwesomeIcon icon={faWarehouse} className='desc-logo' />
            Create an account to access inventory.
          </p>
          <p>
            <FontAwesomeIcon icon={faBoxesStacked} className='desc-logo' />
            Add new products to inventory.
          </p>
          <p>
            <FontAwesomeIcon icon={faPeopleCarryBox} className='desc-logo' />
            View and edit existing products in inventory.
          </p>
        </div>
        <form className='login-register-form' onSubmit={submitHandler}>
          <h2 className='form-heading'>Create a new account.</h2>
          <label htmlFor='fullName'>Full Name:</label>
          <input
            id='fullName'
            type='text'
            placeholder='Enter full name'
            className='input-fields'
            name='fullName'
            value={form.fullName}
            onChange={formChangeHandler}
            required
          />
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            placeholder='Enter email'
            className='input-fields'
            name='email'
            value={form.email}
            onChange={formChangeHandler}
            required
          />
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type={showPass}
            minLength={8}
            placeholder='Enter password'
            className='input-fields'
            name='password'
            value={form.password}
            onChange={formChangeHandler}
            required
          />
          <button
            type='button'
            className={`show-password ${!form.password ? 'hide' : ''}`}
            onClick={showPassHandler}
          >
            {passwordText} password
          </button>
          <label htmlFor='confirm-password'>Re-enter password:</label>
          <input
            id='confirm-password'
            type={showPass}
            minLength={8}
            placeholder='Re-enter password'
            className='input-fields'
            name='confirmPassword'
            value={form.confirmPassword}
            disabled={!form.password}
            onChange={formChangeHandler}
            required
          />

          {form.confirmPassword && form.password !== form.confirmPassword && (
            <p className='password-warning'>Passwords don't match</p>
          )}
          {loading ? (
            <div className='loading-text'>Creating Account...</div>
          ) : (
            <button className='btn-submit'>Register</button>
          )}

          <p className='register-option'>
            Already have an account?
            <Link to={'/login'} className='link-register'>
              {' '}
              Login here.
            </Link>
          </p>
        </form>
      </section>
    </>
  )
}

export default Register
