import { MDBAlert, MDBBtn, MDBContainer, MDBInput } from 'mdbreact';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import AuthServices from '../services/auth.services';
import AuthHeader from '../services/authHeader';



function LoginComponent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState([])
  const [loading, setLoading] = useState(false)

  const submitLoginRequest = (e) => {
    e.preventDefault()
    setMessage([])
    setLoading(true)

    AuthServices.login(email, password)
      .then(
        resp => {
          setMessage(["success", "Login Successful"])
          AuthHeader.updateHeaders(resp.headers)
          localStorage.setItem(process.env.REACT_APP_USER, JSON.stringify(resp.data.data))
          document.location.href = "/student"
        })
      .catch(
        error => {
          setMessage(["danger", "Wrong Email or Password"])
          setLoading(false)
        })
  }

  return (
    <>
      <MDBContainer className={isMobile ? "d-flex flex-column h-50 w-100 p-3" : "d-flex flex-column h-100 w-100"}>
        {message.length !== 0 ?
          <>
            <MDBAlert className="align-self-start w-100" color={message[0]} >
              {message[1]}
            </MDBAlert>
          </> : ""}

        <form className="mx-auto-alt w-100" onSubmit={(e) => submitLoginRequest(e)}>
            <MDBInput
              label="Email or Username"
              group type="email"
              className={isMobile ? "mobile-input" : ""}
              validate error="wrong"
              success="right"
              onChange={(e) => setEmail(e.target.value)}
            />

            <MDBInput
              label="Password"
              className={isMobile ? "mobile-input" : ""}
              group
              type="password"
              validate
              onChange={(e) => setPassword(e.target.value)}
            />

          <div className="text-center w-100 mt-6">
            <MDBBtn 
            color="primary" 
            className={isMobile ? "no-shadow fw-bold w-100 btn-xl-form" : "no-shadow fw-bold"} 
            type="submit"
            disabled={loading}  
          >
              {loading ?
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                :
                "Login"
              }
            </MDBBtn>
          </div>
        </form>
      </MDBContainer>
    </>
  )
}

export default LoginComponent