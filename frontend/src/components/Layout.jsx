import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({children}) {
  return (

    <div className="wrapper px-8 min-h-[100vh]">
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default Layout