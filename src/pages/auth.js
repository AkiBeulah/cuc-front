import { MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { useEffect } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import CULogo from '../assets/images/culogo.png'
import image from '../assets/images/undraw.png'
import LoginComponent from '../component/login.component'
import RegisterComponent from '../component/register.component'
import AuthServices from '../services/auth.services'
import AuthHeader from '../services/authHeader'





const Auth = () => {
  let component = (document.location.pathname === "/login" || document.location.pathname === "/signin") ? <LoginComponent /> : <RegisterComponent />

  useEffect(() => {
    AuthServices.checkStatus()
      .then((resp) => {
        resp.data.status === "ok" && (document.location.href = "/")
        AuthHeader.updateHeaders(resp.headers)
      })
  }, [])

  return (
    <>
      <BrowserView>
        <MDBContainer className={(document.location.pathname === "/login" || document.location.pathname === "/signin") ? "bg-white rounded p-5 page-size-x-header" : "bg-white rounded p-5"}>
          <MDBRow className="h-100">
            <MDBCol className="d-flex flex-column justify-content-center align-items-center" size="6">
              <img className="w-75" src={image} alt="" />
              <h4 className="pt-3 font-weight-bold text-primary">Raising a New Generation of Leaders</h4>
            </MDBCol>
            <div className="vertical-divider" />
            <MDBCol className="d-flex flex-column align-items-center justify-content-center w-100" size="5">
              <img src={CULogo} style={{ width: "200px" }} alt="CULOGO" />
              {component}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </BrowserView>

      <MobileView>
        <MDBContainer className="page-size-x-header-mobile d-flex flex-column justify-content-center align-items-center" >
          <img src={CULogo} style={{ width: "150px", marginTop: "1rem" }} alt="CULOGO" />
          {component}
        </MDBContainer>
      </MobileView>
    </>
  )
}

export default Auth