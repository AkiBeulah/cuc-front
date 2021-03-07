import React, { useState } from 'react';

import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import { BrowserView, isBrowser, MobileView } from 'react-device-detect';
import studying from '../assets/images/pexels.jpg';


const Home = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  window.addEventListener('resize', () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  })

  return (
    <>
      <MDBContainer className={isBrowser ? "mt-xl-5 page-size-x-header d-flex align-items-center" : "page-size-x-header-mobile"}>
        <BrowserView>
          <MDBRow viewclassname="h-100">
            <MDBCol className="d-flex flex-column justify-content-center" md="6">
              <h1 className="font-weight-bolder display-4">Welcome to a SOLUTION <br /></h1>
              <p>
                Covenant University Connect is an information dissemination and student-life management tool, with a goal to provide easy access to information tailored for the user’s experience. The platform is fully customizable, and integratable with some of the school’s standing infrastructure.
              </p>
              <MDBBtn className="no-shadow fw-bold text-nowrap font-1 w-50 waves-light waves-effect" to="/register" color="primary" size="xl">
                Sign Up To Begin
            </MDBBtn>
            </MDBCol>
            {
              (width > 768) ?
                <MDBCol md="6">
                  <img
                    src={studying}
                    alt="Studious Lad"
                    className="w-100" />
                </MDBCol>
                : <></>
            }
          </MDBRow>
        </BrowserView>

        <MobileView viewClassName="h-100 d-flex flex-column justify-content-center align-items-center">
          <h6 className="font-weight-bolder logo-font mt-2">Welcome to a SOLUTION <br /></h6>
          <p className="text-center">
            Covenant University Connect is an information dissemination and student-life management tool, with a goal to provide easy access to information tailored for the user’s experience. The platform is fully customizable, and integratable with some of the school’s standing infrastructure.
           </p>
          <MDBBtn className="no-shadow fw-bold text-nowrap font-1 w-50 waves-light waves-effect" color="primary" size="xl">
            Sign Up To Begin
            </MDBBtn>
        </MobileView>
      </MDBContainer>
    </>
  )
}

export default Home