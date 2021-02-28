import {
  MDBBtn, MDBCollapse, MDBContainer,
  MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav,
  MDBNavbarToggler, MDBNavItem
} from "mdbreact";
import React, { useEffect, useState } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import CULogo from '../assets/images/culogo.png';
import authServices from '../services/auth.services';
import authHeader from '../services/authHeader';


function Header(props) {
  const location = document.location.pathname
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const setActiveItem = (item) => {
    localStorage.setItem("activeItem", item)
    props.setActiveItem(item)
  }

  useEffect(() => {
    authServices.checkStatus()
      .then((resp) => {
        resp.data.status === "ok" && setLoggedIn(true)
        authHeader.updateHeaders(resp.headers)
      })
  }, [])

  return (
    <>
      {
        document.location.pathname.match(/login|register|signup|signin/) ?
          <></>
          :
          <header>
            {isMobile ? <div className="header-dummy-mobile" /> : <div className="header-dummy" />}
            <MDBNavbar color="secondary-color" className="no-shadow mx-80" light expand="md" scrolling fixed="top">
              <>
                {
                  location.match(/student/) ?
                    <>
                      {/* <BrowserView> */}
                      <MDBNavbarBrand className="d-flex flex-row align-items-center" href="/">
                        <img src={CULogo} style={{ width: "100px" }} alt="CULOGO" />
                        <strong className="fs-1 text-primary logo-font">CU Connect</strong>
                      </MDBNavbarBrand>
                      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                        <MDBNavbarNav className="text-capitalize" right>
                          Welcome, {props.student.first_name} {props.student.last_name}
                        </MDBNavbarNav>
                      </MDBCollapse>
                      {/* </BrowserView> */}

                      {/* <MobileView viewClassName="d-flex w-100 justify-content-center align-items-center"> */}
                      {/* <MDBNavbarBrand href="/">
                          <img src={CULogo} style={{ width: "200px" }} alt="CULOGO" />
                          <strong className="fs-1 text-primary">CU Connect</strong>
                        </MDBNavbarBrand> */}
                      {/* </MobileView> */}
                    </>
                    :
                    <>
                      <MDBNavbarBrand className="d-flex flex-row align-items-center" href="/">
                        <img src={CULogo} style={{ width: "100px" }} alt="CULOGO" />
                        <strong className="fs-1 text-primary logo-font">CU Connect</strong>
                      </MDBNavbarBrand>
                      <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />
                      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                        <MDBNavbarNav right>
                          <MDBNavItem className="waves-effect waves-light">
                            <a className="font-1 btn btn-sm no-shadow fw-bold text-primary" href="/home">
                              Home
                            </a>
                          </MDBNavItem>
                          <MDBNavItem className="waves-effect waves-light">
                            <a className="font-1 btn btn-sm no-shadow fw-bold" href="/features">
                              Features
                            </a>
                          </MDBNavItem>
                          <MDBNavItem className="waves-effect waves-light">
                            <a className="font-1 btn btn-sm no-shadow fw-bold" href="/stories">
                              Stories
                            </a>
                          </MDBNavItem>
                          {loggedIn ?
                            <>
                              <MDBNavItem className="waves-effect waves-light">
                                <a className="font-1 btn btn-sm no-shadow fw-bold" href="/student">
                                  Dashboard
                                </a>
                              </MDBNavItem>
                              <MDBNavItem className="waves-effect waves-light">
                                <a href="/logout">
                                  <MDBBtn className="no-shadow font-1 waves-effect text-nowrap fw-bold" outline size="sm" color="primary">Log Out</MDBBtn>
                                </a>
                              </MDBNavItem>
                            </>
                            :
                            <>
                              <MDBNavItem className="waves-effect waves-light">
                                <a href="/login">
                                  <MDBBtn className="no-shadow font-1 waves-effect fw-bold" outline size="sm" color="primary">Login</MDBBtn>
                                </a>
                              </MDBNavItem>
                              <MDBNavItem className="waves-effect waves-light">
                                <a href="/register">
                                  <MDBBtn className="no-shadow fw-bold font-1 text-nowrap" size="sm" color="primary">Sign Up</MDBBtn>
                                </a>
                              </MDBNavItem>
                            </>
                          }
                        </MDBNavbarNav>
                      </MDBCollapse>
                    </>
                }
              </>
            </MDBNavbar>

            {
              location.match(/student/) ?
                <>
                  <BrowserView>
                    <div className={props.isSideOpen ?
                      "w-18 bg-primary vh-100-x-header animate pt-3 text-white fixed-bottom fixed-start d-flex flex-column scrolling-navbar"
                      :
                      "w-18-collapsed bg-primary vh-100-x-header animate pt-3 text-white fixed-bottom fixed-start d-flex flex-column scrolling-navbar"}
                    >
                      <div className="container d-flex flex-column animate align-items-center h-100 bg-primary">
                        <div className="user-img-thumbnail d-flex animate justify-content-center align-items-center">
                          <img
                            src="https://www.opensds.io/wp-content/uploads/sites/18/2019/03/user-unknown-1-300x300.png"
                            alt="user"
                            onClick={() => props.setIsSideOpen(true)}
                            className="img-thumbnail cursor-pointer rounded-circle animate"
                            style={props.isSideOpen ? { width: "130px" } : { width: "30px", height: "30px" }}
                          />
                        </div>
                        <div className={props.isSideOpen ?
                          "h-100 w-100 mt-xl-5 d-flex flex-column align-items-center side-nav-scrolling"
                          :
                          "h-100 w-100 mt-xl-5 d-flex flex-column align-items-center side-nav-scrolling side-nav-scrolling-collapsed"}>
                          <div className="container pl-0 pr-0">
                            {
                              props.isSideOpen ?
                                <>
                                  <div role="tab" onClick={() => setActiveItem("announcements")} className={props.activeItem === "announcements" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-3" : "h6 cursor-pointer animate pt-0 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="bell" />Announcements</div>
                                  <div role="tab" onClick={() => setActiveItem("query")} className={props.activeItem === "query" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-3" : "h6 cursor-pointer animate pt-0 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="search" />Search</div>
                                  <div role="tab" onClick={() => setActiveItem("timetable")} className={props.activeItem === "timetable" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-3" : "h6 cursor-pointer animate pt-0 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="calendar" />Timetable</div>
                                  <div role="tab" onClick={() => setActiveItem("cupay")} className={props.activeItem === "cupay" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-3" : "h6 cursor-pointer animate pt-0 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="coins" />CUPay</div>
                                </>
                                :
                                <>
                                  <div role="tab" onClick={() => setActiveItem("announcements")} className={props.activeItem === "announcements" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate pt-1 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="bell" /></div>
                                  <div role="tab" onClick={() => setActiveItem("query")} className={props.activeItem === "query" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate pt-1 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="search" /></div>
                                  <div role="tab" onClick={() => setActiveItem("timetable")} className={props.activeItem === "timetable" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate pt-1 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="calendar" /></div>
                                  <div role="tab" onClick={() => setActiveItem("cupay")} className={props.activeItem === "cupay" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate pt-1 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="coins" /></div>
                                </>
                            }
                          </div>

                          <div className="container pt-3 pb-3 pl-0 pr-0 mt-auto">
                            <div className="horizontal-divider bg-white" />
                            <div onClick={() => props.setSettingsModal(!props.settingsModal)} className="h6 cursor-pointer pt-0 pb-3 pl-2"><MDBIcon className="pr-3 pt-3" icon="cog" />{props.isSideOpen ? "Settings" : ""}</div>
                            <a href="/logout" className="h6 text-white cursor-pointer pt-0 pb-3 pl-2"><MDBIcon className="pr-3 pt-3" icon="sign-out-alt" />{props.isSideOpen ? "Logout" : ""}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BrowserView>
                  <MobileView>
                    <MDBNavbar color="primary-color" className="no-shadow mobile-side-nav" dark expand="md" scrolling fixed="bottom">
                      <MDBContainer>
                        <div role="tab" onClick={() => setActiveItem("announcements")} className={props.activeItem === "announcements" ? "active-mobile cursor-pointer animate text-white h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate text-white pt-1 pb-3 pl-2"}><MDBIcon className="btn-xl pr-3 pt-3" icon="bell" /></div>
                        <div role="tab" onClick={() => setActiveItem("query")} className={props.activeItem === "query" ? "active-mobile cursor-pointer animate text-white h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate text-white pt-1 pb-3 pl-2"}><MDBIcon className="btn-xl pr-3 pt-3" icon="search" /></div>
                        <div role="tab" onClick={() => setActiveItem("timetable")} className={props.activeItem === "timetable" ? "active-mobile cursor-pointer animate text-white h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate text-white pt-1 pb-3 pl-2"}><MDBIcon className="btn-xl pr-3 pt-3" icon="calendar" /></div>
                        <div role="tab" onClick={() => setActiveItem("cupay")} className={props.activeItem === "cupay" ? "active-mobile cursor-pointer animate text-white h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate text-white pt-1 pb-3 pl-2"}><MDBIcon className="btn-xl pr-3 pt-3" icon="coins" /></div>
                      </MDBContainer>
                    </MDBNavbar>
                  </MobileView>
                </>
                :
                <></>
            }
          </header>

      }
    </>
  );
}

export default Header;