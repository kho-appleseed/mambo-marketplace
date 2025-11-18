import Head from 'next/head'
import React from 'react'
import { Footer } from '.'
import Navbar  from './Navbar'

const Layout = ({children}) => {
  
  return (
    <div className='layout'>
      <Head>
        <title>Mambo Marketplace</title>
        <link rel="icon" href="/logo/icon-primary.png" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout