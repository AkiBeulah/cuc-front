import { useFlutterwave } from 'flutterwave-react-v3'
import {
  MDBBtn, MDBCard, MDBCardHeader,
  MDBCol, MDBContainer,
  MDBIcon, MDBListGroup, MDBListGroupItem, MDBModal, MDBRow
} from "mdbreact"
import React, { useEffect, useState } from 'react'
import authHeader from '../services/authHeader'
import UserServices from '../services/user.services'



const CUPay = (props) => {
  const [balance, setBalance] = useState(0)
  const [tHistory, setTHistory] = useState([])
  const [cuPayModal, setCUPayModal] = useState(false)

  const updateDetails = () => {
    UserServices.getBalance()
      .then(resp => {
        authHeader.updateHeaders(resp.headers)
        setBalance(resp.data.balance)
        setTHistory(resp.data.history)
      })
  }

  useEffect(() => { updateDetails() }, [])

  const config = {
    public_key: process.env.REACT_APP_PAYMENT_API_KEY,
    tx_ref: Date.now() + "/" + props.student.uid,
    amount: 0,
    currency: 'NGN',
    payment_options: 'card,',
    customer: {
      email: props.student.uid,
      phonenumber: props.matriculation,
      name: props.student.first_name + " " + props.student.last_name,
    },
    customizations: {
      title: 'Fund Wallet',
      logo: 'https://i.ibb.co/vV4R1pJ/logo.png',
    }
  }

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <>
      <MDBCard className="card-rounded side-nav-scrolling no-scroll-bar">
        <MDBContainer className="bg-white rounded page-size-x-header p-5 card-rounded">
          <div className="w-100 d-flex flex-row flex-start">
            <div className="w-25">
              <span style={{ fontSize: "1.5rem" }} className="align-top" dangerouslySetInnerHTML={{ __html: "&#8358;" }} />
              <span style={{ fontSize: "2.4rem" }}>{balance.toFixed(2)}</span>
            </div>
            <div className="vertical-divider bg-primary" />
            <div className="d-flex flex-row">
              <MDBBtn
                onClick={() => {
                  try {
                    handleFlutterPayment({
                      callback: (resp) => {
                        UserServices.createTransactionHistory(
                          resp.amount,
                          resp.flw_ref,
                          resp.tx_ref,
                          resp.transaction_id,
                          "Funded CUPay Wallet"
                        ).then(resp => {
                          authHeader.updateHeaders(resp.headers)
                          updateDetails()
                        })
                      }
                    })
                  } catch (e) {
                    alert('Please Check Your Internet Connection and Try Again.')
                  }
                }}
                className="ml-5 no-shadow fw-bold btn-rounded text-nowrap font-1 waves-light waves-effect" color="primary" size="xl"
              >
                Fund Wallet
              </MDBBtn>

              <MDBBtn
                className="ml-5 no-shadow fw-bold btn-rounded text-nowrap font-1 waves-light waves-effect" color="primary" size="xl"
                onClick={ ()=> setCUPayModal(true)}
                >
                  <MDBIcon icon="id-card" className="font-1"/>                
              </MDBBtn>
            </div>
          </div>

          <MDBCard className="mt-5 mb-5">
            <MDBCardHeader className="d-flex flex-row justify-content-between">
              <div>ACTIVITY</div>
              <div>VIEW ALL</div>
            </MDBCardHeader>
            <MDBListGroup>
              {
                tHistory.map(item => (
                  <MDBListGroupItem key={item.transaction_id}>
                    <MDBRow>
                      <MDBCol className="d-flex text-center flex-row align-items-center" col={10}>
                        <MDBIcon
                          className={item.transaction_type === "credit" ? "color-success trans-icon" : "trans-icon color-danger"}
                          icon={item.transaction_type === "debit" ? "arrow-up" : "arrow-down"}
                        />
                        <div>{item.transaction_title}</div>
                      </MDBCol>
                      <MDBCol col={2}>
                        <div className="text-right fw-bold">
                          <span dangerouslySetInnerHTML={{ __html: "&#8358;" }} />
                          {item.amount}
                        </div>
                        <div className="text-right">{new Date(item.created_at).toDateString()}</div>
                      </MDBCol>
                    </MDBRow>
                  </MDBListGroupItem>
                ))
              }
            </MDBListGroup>
          </MDBCard>

        </MDBContainer>
      </MDBCard>

      <MDBModal className="w-75" isOpen={props.cuPayModal} toggle={() => props.setSettingsModal(!props.setCUPayModal)}>
        <MDBContainer>
          
        </MDBContainer>
      </MDBModal>
    </>
  )
}

export default CUPay