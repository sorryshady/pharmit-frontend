import React from 'react'
import './FooterNav.css'
import { Link } from 'react-router-dom'
const FooterNav = () => {
  return (
    <footer className='footer'>
      <h1 className='footer-logo'>
        <Link to={'/'} className='footer-logo-link'>
          Pharmit
        </Link>
      </h1>
      <div className='footer-description'>
        PharmIt Inventory Management System
      </div>
    </footer>
  )
}

export default FooterNav
