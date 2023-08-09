import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import axios from 'axios'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBoxesStacked,
  faPeopleCarryBox,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons'
const Login = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [showPass, setShowPass] = useState('password')
  const [passwordText, setPasswordText] = useState('Show')
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      const url = 'https://pharmit-node.onrender.com/auth/login'
      setLoading(true)
      const response = await axios.post(url, {
        email: form.email,
        password: form.password,
      })
      const username = response.data.fullName
      localStorage.setItem('userName', username)
      if (response.data.code) {
        throw response
      }
      setLoading(false)
      setForm({
        email: '',
        password: '',
      })
      enqueueSnackbar('Login successful', { variant: 'success' })
      navigate('/')
      window.location.reload()
    } catch (error) {
      setLoading(false)
      enqueueSnackbar(error.data.message, { variant: 'error' })
    }
  }
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

  return (
    <>
      <section className='login-register-container'>
        <div className='login-register-description'>
          <p>
            <FontAwesomeIcon icon={faWarehouse} className='desc-logo' />
            Login to your account to start modifying inventory.
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
          <h2 className='form-heading'>Login to your account.</h2>
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
          {loading ? (
            <div className='loading-text'>Logging In...</div>
          ) : (
            <button className='btn-submit'>Login</button>
          )}
          <p className='register-option'>
            Don't have an account?
            <Link to={'/register'} className='link-register'>
              {' '}
              Register now.
            </Link>
          </p>
        </form>
      </section>
    </>
  )
}

export default Login
