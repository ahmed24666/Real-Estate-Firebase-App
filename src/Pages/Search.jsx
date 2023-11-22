import React, { useEffect, useState } from 'react'
import { GoFilter } from 'react-icons/go';
import { FcPrevious } from 'react-icons/fc';
import { FcNext } from 'react-icons/fc';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Dropdown } from 'react-bootstrap';
import Properties from '../Component/Properties/Properties';
import { useLocation } from 'react-router-dom';
import { getProperties } from '../utils/fetchApi'
import Spinner from 'react-bootstrap/Spinner';
const Search = ({ purpose, setpurpose }) => {
    const [show, setShow] = useState(false);
    const location = useLocation()
    const [properties, setProperties] = useState([])
    const [loading, setloading] = useState(false)
    // filter
    const [page, setpage] = useState(0)
    const [sort, setsort] = useState(null)
    const [rentFrequency, setrentFrequency] = useState(null)
    const [category, setcategory] = useState(null)
    const [priceMin, setpriceMin] = useState(null)
    const [priceMax, setpriceMax] = useState(null)
    const [areaMin, setareaMin] = useState(null)
    const [areaMax, setareaMax] = useState(null)
    const [roomsMin, setroomsMin] = useState(null)
    const [bathsMin, setbathsMin] = useState(null)
    useEffect(() => {
        setloading(true)
        // get properties for rent 
        getProperties(`properties/list?locationExternalIDs=5002${purpose !== null ? purpose : ''}&hitsPerPage=25&page=${page}${sort !== null ? sort : ''}${rentFrequency !== null ? rentFrequency : ''}${category !== null ? category : ''}${priceMin !== null ? priceMin : ''}${priceMax !== null ? priceMax : ''}${areaMin !== null ? areaMin : ''}${areaMax !== null ? areaMax : ''}${roomsMin !== null ? roomsMin : ''}${bathsMin !== null ? bathsMin : ''}`).then((data) => {
            setProperties(data.hits)
            console.log(data)
            setloading(false)
        })

    }, [purpose, page, sort, rentFrequency, category, priceMin, priceMax, areaMin, areaMax, roomsMin, bathsMin])
    return (
        <div className=''>
            <div onClick={() => setShow(!show)} className='d-flex container text-center justify-content-center align-items-center gap-3 p-3 fs-5 border-bottom' style={{ cursor: 'pointer' }}>
                Search Property By Filters
                <div className="icon fs-4"><GoFilter /></div>
            </div>
            {
                show && (
                    <div className="filter container d-flex gap-3 flex-wrap justify-content-center py-3" >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Purpose
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >Buy</Dropdown.Item>
                                <Dropdown.Item >Rent</Dropdown.Item>
                                {/* <Dropdown.Item onClick={() => setpurpose('&purpose=for-sale')}>Buy</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpurpose('&purpose=for-rent')}>Rent</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Rent Frequency
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >Daily</Dropdown.Item>
                                <Dropdown.Item >Weekly</Dropdown.Item>
                                <Dropdown.Item >Monthly</Dropdown.Item>
                                <Dropdown.Item >Yearly</Dropdown.Item>
                                {/* <Dropdown.Item onClick={() => setrentFrequency('&rentFrequency=daily')}>Daily</Dropdown.Item>
                                <Dropdown.Item onClick={() => setrentFrequency('&rentFrequency=weekly')}>Weekly</Dropdown.Item>
                                <Dropdown.Item onClick={() => setrentFrequency('&rentFrequency=monthly')}>Monthly</Dropdown.Item>
                                <Dropdown.Item onClick={() => setrentFrequency('&rentFrequency=yearly')}>Yearly</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Min Price
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >5000</Dropdown.Item>
                                <Dropdown.Item >10000</Dropdown.Item>
                                <Dropdown.Item >20000</Dropdown.Item>
                                <Dropdown.Item >30000</Dropdown.Item>
                                <Dropdown.Item >40000</Dropdown.Item>
                                <Dropdown.Item >50000</Dropdown.Item>
                                <Dropdown.Item >60000</Dropdown.Item>
                                <Dropdown.Item >70000</Dropdown.Item>
                                {/* <Dropdown.Item onClick={() => setpriceMin('&priceMin=5000')}>5000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMin('&priceMin=10000')}>10000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMin('&priceMin=20000')}>20000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMin('&priceMin=30000')}>30000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMin('&priceMin=40000')}>40000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMin('&priceMin=50000')}>50000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMin('&priceMin=60000')}>60000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMin('&priceMin=70000')}>70000</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Max Price
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >110000</Dropdown.Item>
                                <Dropdown.Item >200000</Dropdown.Item>
                                <Dropdown.Item >300000</Dropdown.Item>
                                <Dropdown.Item >400000</Dropdown.Item>
                                <Dropdown.Item >500000</Dropdown.Item>
                                <Dropdown.Item >600000</Dropdown.Item>
                                <Dropdown.Item >700000</Dropdown.Item>
                                <Dropdown.Item >800000</Dropdown.Item>
                                <Dropdown.Item >900000</Dropdown.Item>
                                <Dropdown.Item >1000000</Dropdown.Item>
                                {/* <Dropdown.Item onClick={() => setpriceMax('&priceMax=110000')}>110000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMax('&priceMax=200000')}>200000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMax('&priceMax=300000')}>300000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMax('&priceMax=400000')}>400000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMax('&priceMax=500000')}>500000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMax('&priceMax=600000')}>600000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMax('&priceMax=700000')}>700000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMax('&priceMax=800000')}>800000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMax('&priceMax=900000')}>900000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpriceMax('&priceMax=1000000')}>1000000</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Sort
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >Price Desc</Dropdown.Item>
                                <Dropdown.Item >Price Asc</Dropdown.Item>
                                <Dropdown.Item >City Level</Dropdown.Item>
                                <Dropdown.Item >Date Desc</Dropdown.Item>
                                <Dropdown.Item >Verified</Dropdown.Item>
                                {/* <Dropdown.Item onClick={() => setsort('&sort=price-desc')}>Price Desc</Dropdown.Item>
                                <Dropdown.Item onClick={() => setsort('&sort=price-asc')}>Price Asc</Dropdown.Item>
                                <Dropdown.Item onClick={() => setsort('&sort=city-level-score')}>City Level</Dropdown.Item>
                                <Dropdown.Item onClick={() => setsort('&sort=date-desc')}>Date Desc</Dropdown.Item>
                                <Dropdown.Item onClick={() => setsort('&sort=verified')}>Verified</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Min Area
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >100</Dropdown.Item>
                                <Dropdown.Item >150</Dropdown.Item>
                                <Dropdown.Item >200</Dropdown.Item>
                                <Dropdown.Item >250</Dropdown.Item>
                                <Dropdown.Item >300</Dropdown.Item>
                                {/* <Dropdown.Item onClick={() => setareaMin('&areaMin=200')}>100</Dropdown.Item>
                                <Dropdown.Item onClick={() => setareaMin('&areaMin=150')}>150</Dropdown.Item>
                                <Dropdown.Item onClick={() => setareaMin('&areaMin=200')}>200</Dropdown.Item>
                                <Dropdown.Item onClick={() => setareaMin('&areaMin=250')}>250</Dropdown.Item>
                                <Dropdown.Item onClick={() => setareaMin('&areaMin=300')}>300</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Max Area
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>1000</Dropdown.Item>
                                <Dropdown.Item >2000</Dropdown.Item>
                                <Dropdown.Item >3000</Dropdown.Item>
                                <Dropdown.Item >4000</Dropdown.Item>
                                <Dropdown.Item >5000</Dropdown.Item>
                                <Dropdown.Item >10000</Dropdown.Item>
                                <Dropdown.Item >20000</Dropdown.Item>
                                {/* <Dropdown.Item onClick={() => setareaMax('&areaMax=1000')}>1000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setareaMax('&areaMax=2000')}>2000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setareaMax('&areaMax=3000')}>3000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setareaMax('&areaMax=4000')}>4000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setareaMax('&areaMax=5000')}>5000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setareaMax('&areaMax=10000')}>10000</Dropdown.Item>
                                <Dropdown.Item onClick={() => setareaMax('&areaMax=20000')}>20000</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Baths
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>1</Dropdown.Item>
                                <Dropdown.Item>2</Dropdown.Item>
                                <Dropdown.Item>3</Dropdown.Item>
                                <Dropdown.Item>4</Dropdown.Item>
                                {/* <Dropdown.Item onClick={() => setbathsMin('&bathsMin=1')}>1</Dropdown.Item>
                                <Dropdown.Item onClick={() => setbathsMin('&bathsMin=2')}>2</Dropdown.Item>
                                <Dropdown.Item onClick={() => setbathsMin('&bathsMin=3')}>3</Dropdown.Item>
                                <Dropdown.Item onClick={() => setbathsMin('&bathsMin=4')}>4</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Rooms
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setroomsMin('&roomsMin=1')}>1</Dropdown.Item>
                                <Dropdown.Item onClick={() => setroomsMin('&roomsMin=2')}>2</Dropdown.Item>
                                <Dropdown.Item onClick={() => setroomsMin('&roomsMin=3')}>3</Dropdown.Item>
                                <Dropdown.Item onClick={() => setroomsMin('&roomsMin=4')}>4</Dropdown.Item>
                                <Dropdown.Item onClick={() => setroomsMin('&roomsMin=5')}>5</Dropdown.Item>
                                <Dropdown.Item onClick={() => setroomsMin('&roomsMin=6')}>6</Dropdown.Item>
                                <Dropdown.Item onClick={() => setroomsMin('&roomsMin=7')}>7</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Property Type
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >Apartment</Dropdown.Item>
                                <Dropdown.Item >Townhouses</Dropdown.Item>
                                <Dropdown.Item >Villas</Dropdown.Item>
                                <Dropdown.Item >Penthouses</Dropdown.Item>
                                <Dropdown.Item >Hotel Apartments</Dropdown.Item>
                                <Dropdown.Item >Villa Compound</Dropdown.Item>
                                {/* <Dropdown.Item onClick={() => setcategory('&categoryExternalID=4')}>Apartment</Dropdown.Item>
                                <Dropdown.Item onClick={() => setcategory('&categoryExternalID=16')}>Townhouses</Dropdown.Item>
                                <Dropdown.Item onClick={() => setcategory('&categoryExternalID=3')}>Villas</Dropdown.Item>
                                <Dropdown.Item onClick={() => setcategory('&categoryExternalID=18')}>Penthouses</Dropdown.Item>
                                <Dropdown.Item onClick={() => setcategory('&categoryExternalID=21')}>Hotel Apartments</Dropdown.Item>
                                <Dropdown.Item onClick={() => setcategory('&categoryExternalID=19')}>Villa Compound</Dropdown.Item> */}

                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )
            }
            <div className='py-5'>
                <div className="fs-3 py-3 fw-bold text-center text-md-start container">Filtered Properties</div>
                {
                    loading ? (<div className='d-flex justify-content-center pt-5'><Spinner animation="grow" /></div>) : (
                        <>
                            <div className="d-flex flex-wrap justify-content-evenly">
                                {properties.length === 0 ? (<div>No Properties To Display</div>) : properties.map((property) => (
                                    <Properties property={property} key={property.id} />
                                ))}
                            </div>
                            <div className="pagenation d-flex align-items-center justify-content-evenly py-5">
                                {
                                    page !== 0 && (
                                        <div className="prev d-flex" style={{ cursor: 'pointer' }} onClick={() => { page === 0 ? setpage(0) : setpage(page - 1) }}>
                                            <div className="icon">
                                                <FcPrevious />
                                            </div>
                                            <div className="text">
                                                Prev
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="next d-flex" style={{ cursor: 'pointer' }} onClick={() => { setpage(page + 1) }}>
                                    <div className="text">
                                        Next
                                    </div>
                                    <div className="icon">
                                        <FcNext />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Search