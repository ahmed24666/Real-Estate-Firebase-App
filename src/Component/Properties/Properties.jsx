import millify from 'millify';
import React from 'react'
import { GoVerified } from 'react-icons/go';
import { FaBath } from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const Properties = ({property}) => {
  return (

    // <Link to={`/properties/${property.externalID}`}>
        <div className='cardP d-flex flex-wrap p-2 p-md-5 pt-0 justify-content-center' style={{cursor:'pointer'}}>
            <div className="image" >
                <img src={property.coverPhoto?property.coverPhoto.url:'/images/house.webp'} style={{objectFit:'cover'}} alt="" />
            </div>
            <div className="w-100">
                <div className="d-flex p-2 align-items-center justify-content-between">
                    <div className="d-flex align-items-center ">
                        <div className="pe-3 text-success">{property.isVerified&&<GoVerified/>}</div>
                        <div className="fw-bold fs-5">AED {millify(property.price)}{property.rentFrequency&&`/${property.rentFrequency}`}</div>
                    </div>
                    <div className='' style={{height:'35px',maxWidth:'30%'}}>
                        <img src={property.agency?.logo?.url} alt="" className="avatar" />
                    </div>
                </div>
                <div className="d-flex p-2 align-items-center justify-content-between text-primary">
                    {property.rooms}<FaBed/> | {property.baths}<FaBath/> | {millify(property.area)} sqft<BsGridFill/>
                </div>
                <div className="d-flex p-2 align-items-center justify-content-center text-center text-primary fs-5">
                    {property.title.length>30?`${property.title.substring(0,30)} . . .`:property.title}
                </div>
            </div>
        </div>
    // </Link>
  )
}

export default Properties