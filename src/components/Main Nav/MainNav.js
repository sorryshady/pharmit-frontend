import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './MainNav.css'

const MainNav = () => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('userName')
    setUserName(user)
  }, [])

  const handleLogout = () => {
    setUserName('')
    localStorage.removeItem('userName')
  }

  return (
    <nav className='main-nav'>
      <h1 className='logo'>
        <Link to={'/'} className='logo-link'>
          Pharmit
        </Link>
      </h1>
      <ul className='nav-list'>
        <li>
          <NavLink className='link nav-link' to={'/'}>
            Inventory
          </NavLink>
        </li>
        {!userName ? (
          <>
            <li>
              <NavLink className='link nav-link' to={'/login'}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className='link nav-link' to={'/register'}>
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink className='link nav-link' to={'/addProduct'}>
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink className='link nav-link' to={'/addCategory'}>
                Add Category
              </NavLink>
            </li>
            <li>
              <span className='profile-link'>{`Welcome, ${userName}`}</span>
            </li>
            <li>
              <Link className='link nav-link' to={'/'} onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default MainNav
