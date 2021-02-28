import Axios from 'axios';
import cheerio from 'cheerio';
import {
  MDBCard, MDBCardBody,
  MDBCardHeader, MDBListGroup, MDBListGroupItem
} from "mdbreact";
import React, { useEffect } from 'react';


const News = () => {
  useEffect(() => {
    Axios.get('https://cors-anywhere.herokuapp.com/https://covenantuniversity.edu.ng/')
    .then(resp => {
      let data = {}
      let $ = cheerio.load(resp.data)

      $('.projector.last-slide ul li div div h2').each()
    })
  }, [])

  return (
    <>
      <MDBCard style={{ width: "100%", marginTop: "1rem" }}>
        <MDBCardHeader className="h4" color="primary-color">News</MDBCardHeader>
        <MDBCardBody className="px-0 pb-0">
          <MDBListGroup className="w-100">
            <MDBListGroupItem className="rounded-0">
              <h5 className="text-primary tw-bold cursor-pointer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nihil numquam aspernatur.</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti voluptas alias natus fugiat, corporis necessitatibus minima nihil laborum eaque tenetur.</p>
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCardBody>
      </MDBCard>
    </>
  )
}

export default News