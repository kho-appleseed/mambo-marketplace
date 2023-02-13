import { Cart, Footer, FooterBanner, HeroBanner, Layout, Navbar, Products } from '@/components'
import { client } from '@/lib/client'
import React from 'react'

const Home = ({products, bannerData}) => {
  console.log('Home')
  console.log(products)
  return (
    <>
      <HeroBanner data={bannerData.length && bannerData[0]} />
      {/* {console.log(bannerData)} */}
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => <Products key={product._id} data={product} />)}
      </div>
      <FooterBanner data={bannerData && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)
  
  const queryBanner = '*[_type == "banner"]'
  const bannerData = await client.fetch(queryBanner)

  return {
    props: {
      products,
      bannerData
    }
  }
}

export default Home

