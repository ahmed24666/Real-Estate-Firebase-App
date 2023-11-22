import React, { useState } from 'react'
import { FcMenu } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
const Nav = ({ purpose, setpurpose }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='w-100 d-flex justify-content-between align-items-center container py-3 border-bottom'>
            <div className="left">
                <h1 className="logo fs-2 fw-bold" style={{ color: '#607D8B' }}>RealAoe</h1>
            </div>
            <div className="right fs-3" style={{ cursor: 'pointer' }} onClick={handleShow}>
                <FcMenu />
            </div>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h1 className="logo fs-2 fw-bold" style={{ color: '#607D8B' }}>RealAoe</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='d-flex flex-column align-items-center justify-content-center'>
                    <div className="link mb-5">
                        <Link className='d-flex align-items-center justify-content-center gap-3 fs-3' onClick={handleClose}>
                            <FcHome />
                            <h1 className="logo fs-3" style={{ color: '#607D8B' }}>Home</h1>
                        </Link>
                    </div>
                    <div className="link mb-5">
                        <Link to='/search' className='d-flex align-items-center justify-content-center gap-3 fs-4' onClick={handleClose}>
                            <BsSearch />
                            <h1 className="logo fs-3" style={{ color: '#607D8B' }}>Search</h1>
                        </Link>
                    </div>
                    <div className="link mb-5" onClick={() => setpurpose('&purpose=for-sale')}>
                    <Link to='/search' className='d-flex align-items-center justify-content-center gap-3 fs-3' style={{cursor:'pointer'}} onClick={handleClose} >
                            <FiKey />
                            <h1 className="logo fs-3" style={{ color: '#607D8B' }}>Buy Property</h1>
                        </Link>
                    </div>
                    <div className="link mb-5" onClick={() => setpurpose('&purpose=for-rent')}>
                        <Link to='/search' className='d-flex align-items-center justify-content-center gap-3 fs-3' style={{cursor:'pointer'}} onClick={handleClose} >
                            <FiKey />
                            <h1 className="logo fs-3" style={{ color: '#607D8B' }}>Rent Property</h1>
                        </Link>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Nav