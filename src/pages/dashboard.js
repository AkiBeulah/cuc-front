import {
  MDBBtn, MDBCol, MDBContainer,
  MDBInput, MDBModal, MDBModalBody, MDBNav, MDBNavItem,
  MDBNavLink, MDBRow, MDBTabContent,
  MDBTable, MDBTableBody, MDBTabPane
} from "mdbreact";
import React, { useEffect, useState } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import AuthServices from '../services/auth.services';
import AuthHeader from '../services/authHeader';
import UserServices from '../services/user.services';
import Announcements from './announcements';
import CUPay from './cupay';
import Query from "./query";
import Timetable from "./timetable";

const Dashboard = (props) => {
  const [qCourse, setQCourse] = useState([])
  const [sCourses, setSCourses] = useState([])
  const [settingsTab, changeSettingsTab] = useState(localStorage.getItem("settingsTab") === null ? "profile" : localStorage.getItem("settingsTab"))

  const setCourse = (term) => {
    UserServices.query(term)
      .then(resp => {
        AuthHeader.updateHeaders(resp.headers)
        setQCourse(resp.data.courses)
      })
  }

  const registerCourses = () => {
    UserServices.registerCourses(sCourses)
      .then((resp) => {
        alert('Registered Suceessfully')
        setSCourses([])
        AuthHeader.updateHeaders(resp.headers)
        props.setSettingsModal(false)
      })
      .error(() => alert('Error Registering Courses, Please Try Again'))
  }

  const setSettingsTab = (item) => {
    changeSettingsTab(item)
    localStorage.setItem("settingsTab", item)
  }

  useEffect(() => {
    AuthServices.checkStatus()
      .then((resp) => {
        resp.data.status !== "ok" && (document.location.href = "/")
        AuthHeader.updateHeaders(resp.headers)
      }).catch(() => (document.location.href = "/"))

    document.title = "Dashboard | CU Connect"
  }, [])

  return (
    <>
      <BrowserView>
        <MDBContainer className="ml-60">
          <MDBTabContent activeItem={props.activeItem} >
            <MDBTabPane tabId="query" role="tabpanel">
              <Query />
            </MDBTabPane>
            <MDBTabPane tabId="announcements" role="tabpanel">
              <Announcements />
            </MDBTabPane>
            <MDBTabPane tabId="timetable" role="tabpanel">
              <Timetable />
            </MDBTabPane>
            <MDBTabPane tabId="cupay" role="tabpanel">
              <CUPay student={props.student} />
            </MDBTabPane>
          </MDBTabContent>
        </MDBContainer>
      </BrowserView>

      <MobileView>
        <MDBContainer className="w-100 p-0" fluid>
          <MDBTabContent activeItem={props.activeItem} >
            <MDBTabPane tabId="query" role="tabpanel">
              <Query />
            </MDBTabPane>
            <MDBTabPane tabId="announcements" role="tabpanel">
              <Announcements />
            </MDBTabPane>
            <MDBTabPane tabId="timetable" role="tabpanel">
              <Timetable />
            </MDBTabPane>
            <MDBTabPane tabId="cupay" role="tabpanel">
              <CUPay student={props.student} />
            </MDBTabPane>
          </MDBTabContent>
        </MDBContainer>
        <div className="mobile-side-nav-dummy" />
      </MobileView>

      <MDBModal className="w-75" isOpen={props.settingsModal} toggle={() => props.setSettingsModal(!props.settingsModal)}>
        <MDBContainer>
          <MDBModalBody>
            <MDBNav className="nav-tabs">
              <MDBNavItem>
                <MDBNavLink link to="#" className="text-capitalize" active={settingsTab === "profile"} onClick={() => setSettingsTab("profile")} role="tab" >profile</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink link to="#" className="text-capitalize" active={settingsTab === "academic"} onClick={() => setSettingsTab("academic")} role="tab" >academic</MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBTabContent activeItem={settingsTab} >
              <MDBTabPane style={{ background: "#fff" }} tabId="profile" role="tabpanel" className=" mt-5 flex-column align-items-center">
                <div className="user-img-thumbnail d-flex animate justify-content-center align-items-center">
                  <img
                    src="https://www.opensds.io/wp-content/uploads/sites/18/2019/03/user-unknown-1-300x300.png"
                    alt="user"
                    className="img-thumbnail rounded-circle animate"
                    style={{ width: "130px" }}
                  />
                </div>

                <form onSubmit={e => e.preventDefault()} className="w-100 d-flex flex-column align-items-center">
                  <MDBInput containerClass="m-0 w-75" className="w-100 m-0 text-capitalize" value={props.student.first_name + " " + props.student.last_name} disabled />
                  <MDBInput containerClass="m-0 w-75" className="w-100 m-0" value={props.student.uid} disabled />
                  <MDBInput containerClass="m-0 w-75" className="w-100 m-0 text-capitalize" value={props.student.college} disabled />
                  <MDBInput containerClass="m-0 w-75" className="w-100 m-0 text-capitalize" value={props.student.department} disabled />
                  <MDBInput containerClass="m-0 w-75" className="w-100 m-0 text-capitalize" value={props.student.program} disabled />
                </form>
              </MDBTabPane>
              <MDBTabPane style={{ background: "#fff" }} tabId="academic" role="tabpanel">
                <MDBRow>
                  <MDBCol>
                    <form onSubmit={e => e.preventDefault()}>
                      <MDBInput lable="Course" className={isMobile ? "mobile-input" : ""} onChange={e => setCourse(e.target.value)} />
                    </form>

                    <MDBTable striped>
                      <MDBTableBody>
                        {qCourse.map(item =>
                          <>
                            <tr className="text-uppercase" onClick={
                              () => sCourses.includes(item.course_code)
                                ? alert('Course already in list')
                                : setSCourses(oldData => [...oldData, item.course_code])} key={item.course_code}>{item.course_code}-<b className="text-capiltalize">{item.course_title}</b> </tr>
                          </>
                        )}
                      </MDBTableBody>
                    </MDBTable>
                  </MDBCol>
                  <MDBCol className="mt-5">
                    {sCourses.map(item =>
                      <>
                        <div className="text-uppercase" key={item}>{item}</div>
                      </>
                    )}
                  </MDBCol>
                </MDBRow>
                <MDBBtn
                  color="primary"
                  className={isMobile ? "no-shadow fw-bold w-100 btn-xl-form" : "no-shadow fw-bold"}
                  type="submit"
                  onClick={registerCourses}
                >Submit</MDBBtn>
              </MDBTabPane>
            </MDBTabContent>
          </MDBModalBody>
        </MDBContainer>
      </MDBModal>
    </>
  )
}

export default Dashboard
