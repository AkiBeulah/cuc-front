import {
  MDBBtn, MDBCollapse, MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav,
  MDBNavbarToggler, MDBNavItem
} from "mdbreact";
import React, { useEffect, useState } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import CULogo from '../assets/images/culogo.png';
import authServices from '../services/auth.services';
import authHeader from '../services/authHeader';


const Header = (props) => {
  const [location, setLocation] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const setActiveItem = (item) => {
    localStorage.setItem("activeItem", item)
    props.setActiveItem(item)
    props.setIsSideOpen(false)
  }

  useEffect(() => {
    authServices.checkStatus()
      .then((resp) => {
        resp.data.status === "ok" && setLoggedIn(true)
        authHeader.updateHeaders(resp.headers)
      })
  }, [])

  useEffect(() => {
    setLocation(document.location.pathname)
  }, [document.location.pathname])

  return (
    <>
      <div className={isMobile ? "header-dummy-mobile" : "header-dummy"} />
      <header>
        <BrowserView>
          <MDBNavbar color="secondary-color" className="no-shadow mx-80" light expand="md" scrolling fixed="top">
            {
              location.match(/student/) ?
                <>
                  <MDBNavbarBrand className="d-flex flex-row align-items-center">
                    <img src={CULogo} style={{ width: "100px" }} alt="CULOGO" />
                    <strong className="fs-1 text-primary logo-font">CU Connect</strong>
                  </MDBNavbarBrand>
                  <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                    <MDBNavbarNav className="text-capitalize" right>
                      <MDBNavItem>
                        <MDBDropdown>
                          <MDBDropdownToggle nav caret>
                            <span className="mr-2">Welcome, {props.student.first_name} {props.student.last_name}</span>
                          </MDBDropdownToggle>
                          <MDBDropdownMenu>
                            <MDBDropdownItem>
                              <div onClick={() => props.setSettingsModal(!props.settingsModal)} className="h6 cursor-pointer pt-0 pb-3 pl-2">
                                <MDBIcon icon="cog" className="mr-3" /> Settings
                              </div>
                            </MDBDropdownItem>
                            <MDBDropdownItem>
                              <div onClick={() => document.location.href = "/logout"} className="h6 cursor-pointer pt-0 pb-3 pl-2">
                                <MDBIcon icon="sign-out-alt" className="mr-3" /> Logout
                              </div>
                            </MDBDropdownItem>
                          </MDBDropdownMenu>
                        </MDBDropdown>
                      </MDBNavItem>
                    </MDBNavbarNav>
                  </MDBCollapse>
                </>
                :
                <>
                  <MDBNavbarBrand className="d-flex flex-row align-items-center" href="/">
                    <img src={CULogo} style={{ width: "100px" }} alt="CULOGO" />
                    <strong className="fs-1 text-primary logo-font">CU Connect</strong>
                  </MDBNavbarBrand>
                  <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />
                  <MDBCollapse className="bg-secondary" id="navbarCollapse3" isOpen={isOpen} navbar>
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
          </MDBNavbar>
        </BrowserView>
        <MobileView>
          <MDBNavbar color="secondary-color" className="no-shadow mx-80" light expand="md" scrolling fixed="top">
            {
              location.match(/student/) ?
                <>
                  <MDBNavbarNav className="d-flex flex-row align-items-center">
                    <MDBIcon
                      icon="bars"
                      onClick={() => props.setIsSideOpen(true)}
                    />

                    <MDBNavbarBrand>
                      <img src={CULogo} style={{ width: "60px" }} alt="CULOGO" />
                      <strong className="fs-1 text-primary logo-font-mobile">CU Connect</strong>
                    </MDBNavbarBrand>
                    <MDBDropdown>
                      <MDBDropdownToggle nav>
                        <div className="user-img-thumbnail d-flex animate justify-content-center align-items-center">
                          <img
                            src="https://www.opensds.io/wp-content/uploads/sites/18/2019/03/user-unknown-1-300x300.png"
                            alt="user"
                            className="img-thumbnail cursor-pointer rounded-circle animate"
                            style={{ width: "30px", height: "30px" }}
                          />
                          <MDBIcon style={{ fontSize: ".8rem", marginLeft: "1px" }} icon="caret-down" />
                        </div>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem>
                          <div onClick={() => props.setSettingsModal(!props.settingsModal)} className="h6 cursor-pointer pt-0 pb-3 pl-2">
                            <MDBIcon icon="cog" className="mr-3" /> Settings
                              </div>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <div onClick={() => document.location.href = "/logout"} className="h6 cursor-pointer pt-0 pb-3 pl-2">
                            <MDBIcon icon="sign-out-alt" className="mr-3" /> Logout
                              </div>
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarNav>
                </>
                :
                <>
                  <MDBNavbarBrand className="d-flex flex-row align-items-center" href="/">
                    <img src={CULogo} style={{ width: "100px" }} alt="CULOGO" />
                    <strong className="fs-1 text-primary logo-font">CU Connect</strong>
                  </MDBNavbarBrand>
                  <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />
                  <MDBCollapse className="bg-secondary" id="navbarCollapse3" isOpen={isOpen} navbar>
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
          </MDBNavbar>
        </MobileView>
      </header>

      <header>
        <BrowserView>
          {location.match(/student/) ? <>
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
                          <div role="tab" onClick={() => setActiveItem("messages")} className={props.activeItem === "messages" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-3" : "h6 cursor-pointer animate pt-0 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="envelope" />Messages</div>
                        </>
                        :
                        <>
                          <div role="tab" onClick={() => setActiveItem("announcements")} className={props.activeItem === "announcements" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate pt-1 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="bell" /></div>
                          <div role="tab" onClick={() => setActiveItem("query")} className={props.activeItem === "query" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate pt-1 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="search" /></div>
                          <div role="tab" onClick={() => setActiveItem("timetable")} className={props.activeItem === "timetable" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate pt-1 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="calendar" /></div>
                          <div role="tab" onClick={() => setActiveItem("cupay")} className={props.activeItem === "cupay" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate pt-1 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="coins" /></div>
                          <div role="tab" onClick={() => setActiveItem("messages")} className={props.activeItem === "messages" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-2" : "h6 cursor-pointer animate pt-1 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="envelope" /></div>
                        </>
                    }
                  </div>
                </div>
              </div>
            </div>

          </> : <></>}

        </BrowserView>

        <MobileView>
          {
            location.match(/student/) ?
              <>
                <div className={props.isSideOpen ?
                  "w-100 bg-primary vh-100 animate pt-3 text-white fixed-bottom fixed-start d-flex flex-column mobile-side-nav-reveal"
                  :
                  "w-100 bg-primary vh-100 animate pt-3 text-white fixed-bottom fixed-start d-flex flex-column mobile-side-nav"}
                >
                  <div className="container d-flex flex-column animate align-items-center h-100 bg-primary">
                    <div className="user-img-thumbnail d-flex animate justify-content-center align-items-center">
                      <img src={CULogo} style={{ width: "100px" }} alt="CULOGO" />
                      <strong className="fs-1 text-secondary logo-font">CU Connect</strong>
                    </div>
                    <div className={props.isSideOpen ?
                      "h-100 w-100 mt-xl-5 d-flex flex-column align-items-center mt-4"
                      :
                      "h-100 w-100 mt-xl-5 d-flex flex-column align-items-center mt-4"}>
                      <div className="container pl-0 pr-0">
                        <div role="tab" onClick={() => setActiveItem("announcements")} className={props.activeItem === "announcements" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-3" : "h6 cursor-pointer animate pt-0 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="bell" />Announcements</div>
                        <div role="tab" onClick={() => setActiveItem("query")} className={props.activeItem === "query" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-3" : "h6 cursor-pointer animate pt-0 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="search" />Search</div>
                        <div role="tab" onClick={() => setActiveItem("timetable")} className={props.activeItem === "timetable" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-3" : "h6 cursor-pointer animate pt-0 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="calendar" />Timetable</div>
                        <div role="tab" onClick={() => setActiveItem("cupay")} className={props.activeItem === "cupay" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-3" : "h6 cursor-pointer animate pt-0 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="coins" />CUPay</div>
                        <div role="tab" onClick={() => setActiveItem("messages")} className={props.activeItem === "messages" ? "active cursor-pointer animate h6 pt-0 pb-3 pl-3" : "h6 cursor-pointer animate pt-0 pb-3 pl-2"}><MDBIcon className="pr-3 pt-3" icon="envelope" />Messages</div>
                      </div>
                    </div>
                  </div>
                </div>
              </> : <></>
          }
        </MobileView>
      </header>
    </>
  );
}

export default Header;