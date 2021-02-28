import {
  MDBCard, MDBCardBody,
  MDBCardHeader, MDBListGroup, MDBListGroupItem
} from 'mdbreact';
import React, { useEffect, useState } from 'react';
import authHeader from '../services/authHeader';
import UserServices from '../services/user.services';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    document.title = "Announcements | CU Connect"

    UserServices.getTailoredAnnouncements()
      .then((resp) => {
        authHeader.updateHeaders(resp.headers)
        setAnnouncements(resp.data)
      })
  }, [])

  return (
    <MDBCard style={{ width: "100%", marginTop: "1rem" }}>
      <MDBCardHeader className="h4" color="primary-color">Announcements</MDBCardHeader>
      <MDBCardBody className="px-0 pb-0">
        <MDBListGroup>
          {announcements.map(announcement => (
            <MDBListGroupItem href={announcement.url} key={announcement.title}>
              <h5 className="text-capitalize text-primary">{announcement.title}</h5>
              <p>{announcement.subtitle}</p>

              <p>{announcement.body}</p>
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Announcements;