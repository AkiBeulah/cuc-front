import { MDBAlert, MDBBtn, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBInput, MDBView } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import AuthServices from '../services/auth.services';




function RegisterComponent() {
  const programList = require('../assets/jsons/programs.json')
  const colleges = [...new Set(programList.map(item => item["College"]))]
  const [programs, setPrograms] = useState([])
  const [options, setOptions] = useState([])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState([])
  const [college, setCollege] = useState("")
  const [program, setProgram] = useState("")
  const [department, setDepartment] = useState("")
  const [level, setLevel] = useState(0)
  const [option, setOption] = useState("")
  const [mNo, setMNO] = useState("")
  const [hall, setHall] = useState("")

  const [loading, setLoading] = useState(false)

  const submitLoginRequest = (e) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)

    AuthServices.register(email, password, mNo, level, college, department, program, option, hall)
      .then(() => {
          setMessage(["success", "Registration Successful"])
          document.location.href = "/login"
        }).catch(
          error => {
            setMessage(["danger", "Please Cross Check Your Details"])
            setLoading(false)
          })

    setLoading(false)
  }

  useEffect(() => {
    if (college !== "") {
      let res = []
      programList.filter((item, index) => {
        if (item["College"] === college) {
          res.push(item["Programme"])
        }
      })
      setPrograms(res.filter((item, index) => res.indexOf(item) === index))
    }
  }, [college])

  useEffect(() => {
    if (program !== "") {
      let res = []
      programList.filter((item, index) => {
        if (item["Programme"] === program && item["Option"] !== "") {
          res.push(item["Option"])
          setDepartment(item["Department"])
        } else if (item["Programme"] === program && item["Option"] === "") {
          setDepartment(item["Department"])
        }
      })
      setOptions(res)
    }
  }, [program])

  return (
    <>
      {message.length !== 0 ?
        <>
          <MDBAlert className="align-self-start w-100" color={message[0]} >
            {message[1]}
          </MDBAlert>
        </> : ""}

      <form className="w-100" onSubmit={e => submitLoginRequest(e)}>
        <MDBCarousel
          activeItem={1}
          length={3}
          showControls={true}
          interval={100000}
          testimonial={true}
          showControls={false}
          showIndicators={true}
          className="z-depth-1 no-shadow"
          slide
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView className="bg-white car-height">
                <MDBInput
                  className={isMobile ? "mobile-input" : ""}
                  label="School Email"
                  icon=""
                  group validate
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                />

                <MDBInput
                  className={isMobile ? "mobile-input" : ""}
                  label="Password"
                  icon=""
                  group validate
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                />

                <MDBInput
                  className={isMobile ? "mobile-input" : ""}
                  label="Matriculation Number"
                  icon=""
                  group validate
                  type="text"
                  onChange={e => setMNO(e.target.value)}
                />
              </MDBView>
            </MDBCarouselItem>

            <MDBCarouselItem itemId="2">
              <MDBView className="bg-white car-height">
                <div className="md-form form-group">
                  <select className={isMobile ? "browser-default custom-select mobile-select" : "browser-default custom-select"} value={college} onChange={e => setCollege(e.target.value)}>
                    <option>Select Your College</option>
                    {colleges.map(college => (
                      <option key={college} value={college}>{college}</option>
                    ))}
                  </select>
                </div>

                <MDBInput
                  className={isMobile ? "mobile-input" : ""}
                  label=""
                  icon=""
                  group validate
                  type="text"
                  value={department} disabled
                />

                <div className="md-form form-group">

                  {college !== "" ? <>

                    <select className={isMobile ? "browser-default custom-select mobile-select" : "browser-default custom-select"} value={program} onChange={e => setProgram(e.target.value)}>
                      <option>Select Your Program</option>
                      {programs.map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>

                  </> : <></>}
                </div>

                <div className="md-form form-group">
                  {options.length ? <>
                    <select className={isMobile ? "browser-default custom-select mobile-select" : "browser-default custom-select"} value={option} onChange={e => setOption(e.target.value)}>
                      <option>Select Your Option</option>
                      {options.map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </> : <></>}
                </div>
              </MDBView>
            </MDBCarouselItem>

            <MDBCarouselItem itemId="3">
              <MDBView className="bg-white car-height">
                <div className="md-form form-group">
                  <select className={isMobile ? "browser-default custom-select mobile-select" : "browser-default custom-select"} value={level} onChange={e => setLevel(e.target.value)}>
                    <option>Select Your Level</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                  </select>
                </div>

                <div className="md-form form-group">
                  <select className={isMobile ? "browser-default custom-select text-capitalize mobile-select" : "browser-default custom-select text-capitalize"} value={hall} onChange={e => setHall(e.target.value)}>
                    <option>Select Your Hall</option>
                    <option className="text-capitalize" value="peter">peter</option>
                    <option className="text-capitalize" value="paul">paul</option>
                    <option className="text-capitalize" value="john">john</option>
                    <option className="text-capitalize" value="joseph">joseph</option>
                    <option className="text-capitalize" value="daniel">daniel</option>
                    <option className="text-capitalize" value="esther">esther</option>
                    <option className="text-capitalize" value="mary">mary</option>
                    <option className="text-capitalize" value="lydia">lydia</option>
                    <option className="text-capitalize" value="deborah">deborah</option>
                    <option className="text-capitalize" value="dorcas">dorcas</option>
                  </select>
                </div>
              </MDBView>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>

        <div className="text-center w-100 mt-3">
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
              "Register"
            }
          </MDBBtn>
        </div>
      </form>
    </>
  )
}

export default RegisterComponent