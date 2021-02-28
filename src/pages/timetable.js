import { MDBListGroup, MDBListGroupItem, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import AuthHeader from '../services/authHeader';
import UserServices from '../services/user.services';

const Timetable = (props) => {
  const [schedule, setSchedule] = useState([])
  const [activeDay, setActiveDay] = useState("monday")

  useEffect(() => {
    UserServices.getPersonalTimetable()
      .then(resp => {
        setSchedule(resp.data)
        AuthHeader.updateHeaders(resp.headers)
      })
  }, [])

  return (
    <>
      <MDBListGroup>
        <MDBNav className="nav-tabs mt-5">
          <MDBNavItem>
            <MDBNavLink link to="#" active={activeDay === "monday"} onClick={() => setActiveDay("monday")} role="tab" >Monday</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={activeDay === "tuesday"} onClick={() => setActiveDay("tuesday")} role="tab" >Tuesday</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={activeDay === "wednesday"} onClick={() => setActiveDay("wednesday")} role="tab" >Wednesday</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={activeDay === "thursday"} onClick={() => setActiveDay("thursday")} role="tab" >Thursday</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={activeDay === "friday"} onClick={() => setActiveDay("friday")} role="tab" >Friday</MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent activeItem={activeDay} >
          <MDBTabPane tabId="monday" role="tabpanel">
            {schedule.filter(course => course.day === "monday").map((course, idx) => (
              <MDBListGroupItem key={idx}>
                <h5 className="text-uppercase">{course.course_code}</h5>
                <h6 className="text-capitalize">{course.day} - <span className="text-uppercase">{course.time}</span></h6>
                <p className="text-capitalize">{course.building} - {course.venue}</p>
              </MDBListGroupItem>
            ))}
          </MDBTabPane>
          <MDBTabPane tabId="tuesday" role="tabpanel">
            {schedule.filter(course => course.day === "tuesday").map((course, idx) => (
              <MDBListGroupItem key={idx}>
                <h5 className="text-uppercase">{course.course_code}</h5>
                <h6 className="text-capitalize">{course.day} - <span className="text-uppercase">{course.time}</span></h6>
                <p className="text-capitalize">{course.building} - {course.venue}</p>
              </MDBListGroupItem>
            ))}
          </MDBTabPane>
          <MDBTabPane tabId="wednesday" role="tabpanel">
            {schedule.filter(course => course.day === "wednesday").map((course, idx) => (
              <MDBListGroupItem key={idx}>
                <h5 className="text-uppercase">{course.course_code}</h5>
                <h6 className="text-capitalize">{course.day} - <span className="text-uppercase">{course.time}</span></h6>
                <p className="text-capitalize">{course.building} - {course.venue}</p>
              </MDBListGroupItem>
            ))}
          </MDBTabPane>
          <MDBTabPane tabId="thursday" role="tabpanel">
            {schedule.filter(course => course.day === "thursday").map((course, idx) => (
              <MDBListGroupItem key={idx}>
                <h5 className="text-uppercase">{course.course_code}</h5>
                <h6 className="text-capitalize">{course.day} - <span className="text-uppercase">{course.time}</span></h6>
                <p className="text-capitalize">{course.building} - {course.venue}</p>
              </MDBListGroupItem>
            ))}
          </MDBTabPane>
          <MDBTabPane tabId="friday" role="tabpanel">
            {schedule.filter(course => course.day === "friday").map((course, idx) => (
              <MDBListGroupItem key={idx}>
                <h5 className="text-uppercase">{course.course_code}</h5>
                <h6 className="text-capitalize">{course.day} - <span className="text-uppercase">{course.time}</span></h6>
                <p className="text-capitalize">{course.building} - {course.venue}</p>
              </MDBListGroupItem>
            ))}
          </MDBTabPane>
        </MDBTabContent>
      </MDBListGroup>
    </>
  )
}

export default Timetable