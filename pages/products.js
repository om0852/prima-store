import React from 'react'
import Layout from './components/Layout'
import Link from 'next/link'

const Products = () => {
  return (
<Layout>
  <Link href={"/products/new"} className=' text-white py-1 px-2 rounded-md bg-blue-900'>Add new product</Link>
</Layout>
)
}

export default Products