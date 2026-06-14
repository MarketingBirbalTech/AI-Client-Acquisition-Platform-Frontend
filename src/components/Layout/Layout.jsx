import React from 'react'
import Navbar from '../NavBar/Navbar'
import SideBar from '../SideBar/SideBar'
import { useState } from 'react'

const Layout = ({children}) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      {isSidebarOpen && <SideBar setIsSidebarOpen={setIsSidebarOpen} />}
      <main>{children}</main>
    </>
  )
}

export default Layout