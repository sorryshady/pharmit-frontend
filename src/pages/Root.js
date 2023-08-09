import { Outlet } from 'react-router-dom'

import React from 'react'
import MainNav from '../components/Main Nav/MainNav'
import FooterNav from '../components/Footer Nav/FooterNav'

const Root = () => {
  return (
    <>
      <MainNav />
      <Outlet />
      <FooterNav />
    </>
  )
}

export default Root
