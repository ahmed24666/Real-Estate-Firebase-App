import React, { useState } from 'react'
import { FcMenu } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import { SlLogin, SlLogout } from "react-icons/sl";
import { MdOutlineAddHome } from "react-icons/md";
import useAuth from '../../custom-hook/useAuth';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import { auth } from '../../firebase.config';
const Nav = ({ purpose, setpurpose }) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { currentUser } = useAuth()

    const logOut = () => {
        signOut(auth).then(() => {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Logged Out !!',
                showConfirmButton: false,
                timer: 1500,
              })
              navigate('/')
            }).catch(err => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error !!',
                showConfirmButton: false,
                timer: 1500,
              })
        })
    }
    // useEffect(() => {
    //     if (location.pathname=='/add-property' && !currentUser) {
    //       navigate('/login')
    //     }
    //   }, [location.pathname])
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
                    {!currentUser && (
                        <>
                            <div className="link mb-5">
                                <Link to='/login' className='d-flex align-items-center justify-content-center gap-3 fs-4' onClick={handleClose}>
                                    <SlLogin />
                                    <h1 className="logo fs-3" style={{ color: '#607D8B' }}>Login</h1>
                                </Link>
                            </div>
                            <div className="link mb-5">
                                <Link to='/signup' className='d-flex align-items-center justify-content-center gap-3 fs-4' onClick={handleClose}>
                                    <SlLogin />
                                    <h1 className="logo fs-3" style={{ color: '#607D8B' }}>Signup</h1>
                                </Link>
                            </div>
                        </>
                    )}
                    <div className="link mb-5">
                        <Link to={currentUser ? '/add-property' : '/login'} className='d-flex align-items-center justify-content-center gap-3 fs-4' onClick={handleClose}>
                            <MdOutlineAddHome />
                            <h1 className="logo fs-3" style={{ color: '#607D8B' }}>Add Property</h1>
                        </Link>
                    </div>
                    {currentUser && (
                        <div className="link mb-5">
                            <div className='d-flex align-items-center justify-content-center gap-3 fs-4' onClick={(e)=>{logOut();handleClose();}}>
                                <SlLogout />
                                <h1 className="logo fs-3" style={{ color: '#607D8B' }}>Logout</h1>
                            </div>
                        </div>

                    )}
                    {/* <div className="link mb-5" onClick={() => setpurpose('&purpose=for-sale')}>
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
                    </div> */}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Nav