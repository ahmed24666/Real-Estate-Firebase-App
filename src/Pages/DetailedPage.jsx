import React, { useEffect, useState } from 'react'
import { GoVerified } from 'react-icons/go';
import { FaBath } from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { getProperties } from '../utils/fetchApi';
import { Spinner } from 'react-bootstrap';
import millify from 'millify';

const DetailedPage = () => {
    const [loading, setloading] = useState(false)
    const Id = useParams()
    const [property, setProperty] = useState([])
    useEffect(() => {
        setloading(true)
        console.log(Id.id)
        // get properties for rent 
        getProperties(`properties/detail?externalID=${Id.id}`).then((data) => {
            console.log(data)
            setProperty(data)
            setloading(false)
        })

    }, [])
    return (
        <div className="">
            {
                loading ? (<div className='d-flex justify-content-center pt-5'><Spinner animation="grow" /></div>) :
                property.photos == undefined || property.photos.length === 0 ? (<div className='fs-3 text-center'>No Photos To Display</div>) :
                    (<Swiper slidesPerView={1} spaceBetween={30} navigation={true} effect={'fade'} modules={[Pagination, Navigation]} pagination={{ dynamicBullets: true, clickable: true, }} className="mySwiper">
                        {
                            property?.photos?.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <img src={item.url} alt="" />
                                    </SwiperSlide>
                                )
                            })
                        }


                    </Swiper>)
            }
            <div className="container pt-3">
                <div className="d-flex p-2 align-items-center justify-content-between">
                    <div className="d-flex align-items-center ">
                        <div className="pe-3 text-success">{property?.isVerified && <GoVerified />}</div>
                        <div className="fw-bold fs-5">AED {property?.price===undefined?'':millify(property?.price)}{property?.rentFrequency && `/${property?.rentFrequency}`}</div>
                    </div>
                    <div className='' style={{ height: '35px', maxWidth: '30%' }}>
                        <img src={property?.agency?.logo?.url} alt="" className="avatar" />
                    </div>
                </div>
                <div className="d-flex p-2 pt-4 align-items-center justify-content-between text-primary">
                    {property?.rooms}<FaBed /> | {property?.baths}<FaBath /> | {property?.area===undefined?'':millify(property?.area)} sqft<BsGridFill />
                </div>
                <div className="d-flex p-2 pt-4 align-items-center justify-content-center text-center text-black fs-5">
                    {property.title}
                </div>
                <div className="d-flex p-2 pt-4 align-items-center justify-content-center text-center text-muted fs-6">
                    {property.description}
                </div>
                <div className="d-flex  p-2 pt-4 align-items-center justify-content-evenly text-center text-muted fs-4 flex-column flex-md-row">
                    Furnishing Status :
                    <div className='fw-bold text-capitalize fs-4'>
                        {property.furnishingStatus}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DetailedPage