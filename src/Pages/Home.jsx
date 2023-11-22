import React, { useEffect, useState } from 'react'
import Banner from '../Component/Banner/Banner'
import { getProperties } from '../utils/fetchApi'
import Properties from '../Component/Properties/Properties'
import useGetData from '../custom-hook/useGetData'
import Swal from 'sweetalert2'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
const Home = ({propertiesForRent,propertiesForSale}) => {
  const { data: productsData } = useGetData('products')
    const { dataLoading } = useGetData('products')
    console.log(productsData)

    // const deleteProduct = async (id) => {
    //     await deleteDoc(doc(db, 'products', id))
    //     Swal.fire({
    //       position: "center",
    //       icon: "success",
    //       title: "Deleted Successfully",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    // }
  
  return (
    <div>
      <Banner
        p1="RENT A HOME"
        h1="Rental Homes For"
        h11="Everyone"
        p22='and more'
        p2='Explore from Apartments, builder floors, villas'
        btntxt='EXPLORE MORE'
        link='/search'
        imgUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <div className="d-flex flex-wrap justify-content-evenly">
        {productsData.filter((item)=>item.forWhat==='Rent').slice(0,8).map((property) => (
          <Properties property={property} key={property.id} />
        ))}
      </div>
      <Banner
        p1="BUY A HOME"
        h1=" Find, Buy & Own Your"
        h11="Dream Home"
        p22='and more'
        p2='Explore from Apartments, builder floors, villas'
        btntxt='EXPLORE MORE'
        link='/search'
        imgUrl='https://realtor.vercel.app/_next/image?url=https%3A%2F%2Fbayut-production.s3.eu-central-1.amazonaws.com%2Fimage%2F110993385%2F6a070e8e1bae4f7d8c1429bc303d2008&w=640&q=75'
      />
      <div className="d-flex flex-wrap justify-content-evenly">
      {productsData.filter((item)=>item.forWhat==='Sell').slice(0,8).map((property) => (
          <Properties property={property} key={property.id} />
        ))}
      </div>
    </div>
  )
}

export default Home