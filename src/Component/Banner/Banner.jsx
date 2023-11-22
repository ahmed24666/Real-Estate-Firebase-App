import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Banner = ({imgUrl,p1,p2,h1,link,btntxt,h11,p22}) => {
  return (
    <div>
        <Container>
            <Row >
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 p-5 ">
                    <div className="BannerImage" >
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="box text-center">
                        <p className='text-muted fs-6'>{p1}</p>
                        <h1 className='fw-bold fs-2'>{h1}<br/>{h11}</h1>
                        <p className='text-muted fs-5'>{p2}<br/>{p22}</p>
                        <Button variant='outline-secondary' className='fw-normal'>
                            <Link to={link}>
                                {btntxt}
                            </Link>
                        </Button>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
  )
}

export default Banner