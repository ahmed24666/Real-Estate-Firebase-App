import React, { useEffect, useState } from 'react'
import { GoFilter } from 'react-icons/go';
import { FcPrevious } from 'react-icons/fc';
import { FcNext } from 'react-icons/fc';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button, Dropdown } from 'react-bootstrap';
import Properties from '../Component/Properties/Properties';
import { useLocation } from 'react-router-dom';
import { getProperties } from '../utils/fetchApi'
import Spinner from 'react-bootstrap/Spinner';
import useGetData from '../custom-hook/useGetData';
import MultiRangeSlider from "multi-range-slider-react";

const Search = ({ purpose, setpurpose }) => {
    const [show, setShow] = useState(false);

    // Filter states
    const [sort, setsort] = useState(null);
    const [priceMin, setpriceMin] = useState(null);
    const [priceMax, setpriceMax] = useState(null);
    const [areaMin, setareaMin] = useState(null);
    const [areaMax, setareaMax] = useState(null);
    const [roomsMin, setroomsMin] = useState(null);
    const [roomsMax, setroomsMax] = useState(null);
    const [bathsMin, setbathsMin] = useState(null);
    const [bathsMax, setbathsMax] = useState(null);
    const [furnatured, setfurnatured] = useState(null);

    // Fetching data
    const { data: productsData } = useGetData('products');
    const { dataLoading } = useGetData('products');
    const [filtered, setfiltered] = useState([]);

    useEffect(() => {
        // Set initial filter values when productsData changes
        console.log(productsData)
        if (productsData) {
            setpriceMin(productsData.reduce((min, product) => Math.min(min, product.price), Infinity));
            setpriceMax(productsData.reduce((max, product) => Math.max(max, product.price), -Infinity));
            setareaMin(productsData.reduce((min, product) => Math.min(min, product.area), Infinity));
            setareaMax(productsData.reduce((max, product) => Math.max(max, product.area), -Infinity));
            setbathsMin(productsData.reduce((min, product) => Math.min(min, product.noBath), Infinity));
            setbathsMax(productsData.reduce((max, product) => Math.max(max, product.noBath), -Infinity));
            setroomsMin(productsData.reduce((min, product) => Math.min(min, product.noBed), Infinity));
            setroomsMax(productsData.reduce((max, product) => Math.max(max, product.noBed), -Infinity));
        }
    }, [productsData]);

    useEffect(() => {
        // Filter data based on criteria
        if (productsData) {
            const filteredData = productsData
                .filter((product) => (purpose ? product.forWhat === purpose : true))
                .filter((product) => (priceMin ? product.price >= priceMin : true))
                .filter((product) => (priceMax ? product.price <= priceMax : true))
                .filter((product) => (areaMin ? product.area >= areaMin : true))
                .filter((product) => (areaMax ? product.area <= areaMax : true))
                .filter((product) => (bathsMin ? product.noBath >= bathsMin : true))
                .filter((product) => (bathsMax ? product.noBath <= bathsMax : true))
                .filter((product) => (roomsMin ? product.noBed >= roomsMin : true))
                .filter((product) => (roomsMax ? product.noBed <= roomsMax : true))
                .filter((product) => (furnatured ? product.furnaturing === furnatured : true));

            setfiltered(filteredData);
        }
    }, [productsData, purpose, priceMin, priceMax, areaMin, areaMax, bathsMin, bathsMax, roomsMin, roomsMax, furnatured]);
    const reset = () => {
        setfiltered(productsData)
    }
    const sortBy = (order) => {
        const sortedData = [...filtered].sort((a, b) =>
          order === 'asc' ? a.price - b.price : b.price - a.price
        );
        setfiltered(sortedData);
      };

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
                                <Dropdown.Item onClick={() => setpurpose(null)}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpurpose('Sell')}>Sell</Dropdown.Item>
                                <Dropdown.Item onClick={() => setpurpose('Rent')}>Rent</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Price
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <MultiRangeSlider
                                    min={0}
                                    max={3000000}
                                    step={5}
                                    minValue={priceMin}
                                    maxValue={priceMax}
                                    ruler={false}
                                    barInnerColor='rgb(96, 125, 139)'
                                    onInput={(e) => {
                                        setpriceMin(e.minValue);
                                        setpriceMax(e.maxValue);
                                    }}
                                ></MultiRangeSlider>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Sort
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => sortBy('desc')}>Price Desc</Dropdown.Item>
                                <Dropdown.Item onClick={() => sortBy('asc')}>Price Asc</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Area
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <MultiRangeSlider
                                    min={120}
                                    max={300}
                                    step={5}
                                    minValue={areaMin ? areaMin : 120}
                                    maxValue={areaMax ? areaMax : 300}
                                    ruler={false}
                                    barInnerColor='rgb(96, 125, 139)'
                                    onInput={(e) => {
                                        setareaMin(e.minValue);
                                        setareaMax(e.maxValue);
                                    }}
                                ></MultiRangeSlider>


                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Baths
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <MultiRangeSlider
                                    min={1}
                                    max={5}
                                    minValue={bathsMin}
                                    maxValue={bathsMax}
                                    step={1}
                                    ruler={false}
                                    barInnerColor='rgb(96, 125, 139)'
                                    onInput={(e) => {
                                        setbathsMin(e.minValue);
                                        setbathsMax(e.maxValue);
                                    }}
                                ></MultiRangeSlider>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Rooms
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <MultiRangeSlider
                                    min={1}
                                    max={5}
                                    minValue={roomsMin}
                                    maxValue={roomsMax}
                                    step={1}
                                    ruler={false}
                                    barInnerColor='rgb(96, 125, 139)'
                                    onInput={(e) => {
                                        setroomsMin(e.minValue);
                                        setroomsMax(e.maxValue);
                                    }}
                                ></MultiRangeSlider>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Furnatured Status
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setfurnatured(null)}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => setfurnatured('Furnatured')}>Furnatured</Dropdown.Item>
                                <Dropdown.Item onClick={() => setfurnatured('Not Furnatured')}>Not Furnatured</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button onClick={() => reset()}>
                                Reset
                        </Button>
                    </div>
                )
            }
            <div className='py-5'>
                <div className="fs-3 py-3 fw-bold text-center text-md-start container">Filtered Properties</div>
                {
                    dataLoading ? (<div className='d-flex justify-content-center pt-5'><Spinner animation="grow" /></div>) : (
                        <>
                            <div className="d-flex flex-wrap justify-content-evenly">
                                {filtered.length === 0 ? (<div>No Properties To Display</div>) : filtered.map((property) => (
                                    <Properties property={property} key={property.id} />
                                ))}
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Search