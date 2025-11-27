import { Layout } from '@/components'
import { StateContext } from '@/context/StateContext'
import { client } from '@/lib/client'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps, sections, categories }) {
  return (
    <StateContext sections={sections || []} categories={categories || []}>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
    )
}

// Fetch sections and categories server-side for all pages
App.getInitialProps = async () => {
  try {
    const [sections, categories] = await Promise.all([
      client.fetch(`*[_type == "section"] {
        _id,
        name,
        slug,
        description,
        image,
        order
      } | order(order asc, name asc)`),
      client.fetch(`*[_type == "category"] {
        _id,
        name,
        slug,
        description,
        image,
        order,
        section-> {
          _id,
          name,
          slug
        }
      } | order(order asc, name asc)`)
    ])
    
    return {
      sections: sections || [],
      categories: categories || []
    }
  } catch (error) {
    console.error('Error fetching sections/categories in _app.js:', error)
    return {
      sections: [],
      categories: []
    }
  }
}
