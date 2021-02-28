import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import React, { useState } from 'react';
import { BrowserView, isBrowser, MobileOnlyView } from 'react-device-detect';
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

        <MobileOnlyView viewClassName="h-100 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-capitalize display-1 font-weight-bolder">Lorem ipsum dolor sit amet.</h1>
          <h1>Amett</h1>
          <h3 className="text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque earum quod Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Reiciendis exercitationem ut magnam. quas. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Temporibus, repellendus hic labore sunt incidunt voluptatum dignissimos natus quod totam, impedit libero.
          </h3>
          <MDBBtn className="no-shadow fw-bold text-nowrap font-1 w-50 waves-light waves-effect" color="primary" size="xl">
            Sign Up To Begin
            </MDBBtn>
        </MobileOnlyView>
      </MDBContainer>

      {/* <div className="w-100 bg-white">
        <MDBContainer className="pt-xl-5 pb-xl-5">
          <BrowserView>
            <MDBRow className="mt-xl-5">
              <MDBCol md="6">
                Lorem, ipsum dolor.
            </MDBCol>
              <MDBCol md="6">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui quidem, eius earum ipsum deserunt dignissimos unde quis illo
                excepturi perspiciatis sint recusandae sunt velit ullam est corrupti illum, minus quisquam natus animi? Aliquid?
            </MDBCol>
            </MDBRow>
            <MDBRow className="mt-xl-5">
              <MDBCol md="6" className="d-flex flex-row justify-content-center">
                <img src={iPhone} className="w-50" alt="phone mock up" />
              </MDBCol>
              <MDBCol md="6">
                <h1 className="font-weight-bolder">Lorem, ipsum dolor.</h1>

                <div className="pt-md-5">
                  <h2 className="primary-text">Lorem, ipsum dolor.</h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem a fuga magnam. Repellat a voluptatem perferendis
                    architecto reiciendis adipisci ea porro?
                  </p>
                </div>

                <div className="pt-md-5">
                  <h2 className="primary-text">Lorem, ipsum dolor.</h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem a fuga magnam. Repellat a voluptatem
                    perferendis architecto reiciendis adipisci ea porro?
                  </p>
                </div>

                <div className="pt-md-5">
                  <h2 className="primary-text">Lorem, ipsum dolor.</h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem a fuga magnam. Repellat a voluptatem
                    perferendis architecto reiciendis adipisci ea porro?
                  </p>
                </div>
              </MDBCol>
            </MDBRow>
          </BrowserView>

          <MobileView>
            <MDBRow className="mt-xl-5">
              <MDBCol md="6">
                Lorem, ipsum dolor.
            </MDBCol>
              <MDBCol md="6">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui quidem, eius earum ipsum deserunt dignissimos unde quis illo
                excepturi perspiciatis sint recusandae sunt velit ullam est corrupti illum, minus quisquam natus animi? Aliquid?
            </MDBCol>
            </MDBRow>
            <MDBRow className="mt-xl-5">
              <MDBCol md="6" className="d-flex flex-row justify-content-center">
                <img src={iPhone} className="w-50" alt="phone mock up" />
              </MDBCol>
              <MDBCol md="6">
                <h1 className="font-weight-bolder">Lorem, ipsum dolor.</h1>

                <div className="pt-md-5">
                  <h2 className="primary-text">Lorem, ipsum dolor.</h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem a fuga magnam. Repellat a voluptatem perferendis
                    architecto reiciendis adipisci ea porro?
                  </p>
                </div>

                <div className="pt-md-5">
                  <h2 className="primary-text">Lorem, ipsum dolor.</h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem a fuga magnam. Repellat a voluptatem
                    perferendis architecto reiciendis adipisci ea porro?
                  </p>
                </div>

                <div className="pt-md-5">
                  <h2 className="primary-text">Lorem, ipsum dolor.</h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem a fuga magnam. Repellat a voluptatem
                    perferendis architecto reiciendis adipisci ea porro?
                  </p>
                </div>
              </MDBCol>
            </MDBRow>
          </MobileView>
        </MDBContainer>
      </div> */}
    </>
  )
}

export default Home