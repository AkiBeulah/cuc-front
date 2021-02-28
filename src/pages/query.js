import { MDBCard, MDBCol, MDBContainer, MDBInput, MDBListGroup, MDBListGroupItem, MDBRow } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import AuthHeader from '../services/authHeader';
import userServices from '../services/user.services';

function Query(props) {
  const [query, setQuery] = useState("")
  const [courses, setCourses] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [lectures, setLectures] = useState([])

  const search = (term) => {
    setQuery(term)

    userServices.query(term)
      .then((resp) => {
        AuthHeader.updateHeaders(resp.headers)
        setAnnouncements(resp.data.announcements)
        setCourses(resp.data.courses)
        setLectures(resp.data.timetable)
      })
  }

  useEffect(() => {
    document.title = query === "" ? "Query | CU Connect" : query.toUpperCase() + " | CU Connect"
  }, [query])

  return (
    <>
      <MDBCard className="">
        <MDBContainer>
          <form>
            <MDBInput
              type="text"
              className={isMobile ? "mobile-input" : ""}
              value={query}
              label="Looking for something..."
              onChange={e => search(e.target.value)}
            />
          </form>

        </MDBContainer>
      </MDBCard>

      <MDBCard className="mt-3 pt-3">
        <MDBContainer>

          <MDBRow>
            <MDBCol>
              <MDBListGroup>
                {lectures.map(course => (
                  <MDBListGroupItem key={course.id}>
                    <h5 className="text-uppercase">{course.course_code}</h5>
                    <h6 className="text-capitalize">{course.day} - <span className="text-uppercase">{course.time}</span></h6>
                    <td className="text-capitalize">{course.building} - {course.venue}</td>
                  </MDBListGroupItem>
                ))}
              </MDBListGroup>
            </MDBCol>
            <MDBCol>
              <MDBListGroup>
                {courses.map(course => (
                  <MDBListGroupItem key={course.course_code}>
                    <h5 className="text-capitalize"><span className="text-uppercase">{course.course_code}</span> {course.course_title}</h5>
                    <p >{course.course_description}</p>
                    <div>{course.course_unit} unit</div>
                    <div>Prerequisite: {course.prerequisite}</div>
                    <div>{course.semester}</div>
                  </MDBListGroupItem>
                ))}
              </MDBListGroup>
            </MDBCol>
            <MDBCol>
              <MDBListGroup>
                {announcements.map(announcement => (
                  <MDBListGroupItem href={announcement.url} key={announcement.title}>
                    <h5 className="text-capitalize">{announcement.title}</h5>
                    <p>{announcement.subtitle}</p>
                  </MDBListGroupItem>
                ))}
              </MDBListGroup>
            </MDBCol>
          </MDBRow>

        </MDBContainer>
      </MDBCard>
    </>
  );
}

export default Query;