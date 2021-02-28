import authHeader from "./authHeader"
import axios from "axios"
import AuthHeader from './authHeader'

let queryToken = null

class UserServices {
  getUser() {
    return localStorage.getItem("o$Uil%7IzU37PAP^qn")
  }

  getPublicTimietable() {
    return axios({
      method: 'get',
      url: AuthHeader.getApiUrl() + '/api/v1/timetables'
    })
  }

  getPublicTimietableFilter(level, day) {
    return axios({
      method: 'get',
      url: AuthHeader.getApiUrl() + '/api/v1/timetable/filter',
      params: {
        level: level,
        day: day
      }
    })
  }

  createTransactionHistory(amount, flw_ref, tx_ref, transaction_id, transaction_title) {
    const data = {
      amount: amount,
      flw_ref: flw_ref,
      tx_ref: tx_ref,
      transaction_id: transaction_id,
      transaction_type: "credit",
      transaction_title: transaction_title
    }

    return axios({
      method: 'post',
      url: AuthHeader.getApiUrl() + '/api/v1/student/create_transaction',
      headers: AuthHeader.getHeaders(),
      params: data
    })
  }

  getPersonalTimetable() {
    return axios({
      method: 'get',
      url: AuthHeader.getApiUrl() + '/api/v1/student/schedule',
      headers: AuthHeader.getHeaders()
    })
  }

  query(term) {
    if (queryToken !== null) queryToken()

    const { CancelToken } = axios
    return axios.get(
      AuthHeader.getApiUrl() + '/api/v1/search',
      {
        cancelToken: new CancelToken(function executor(c) {
          queryToken = c
        }),
        params: {
          query: term
        }
      }
    )
  }

  getBalance() {
    return axios({
      method: 'get',
      url: AuthHeader.getApiUrl() + '/api/v1/student/get_balance',
      headers: AuthHeader.getHeaders()
    })
  }

  getTailoredAnnouncements() {
    return axios({
      method: 'get',
      url: AuthHeader.getApiUrl() + '/api/v1/student/announcements',
      headers: AuthHeader.getHeaders()
    })
  }

  registerCourses(params) {
    const body =  new FormData();
    
    params.forEach(item => {
      body.append('courses[]', item)
    })

    return axios({
      method: 'post',
      url: AuthHeader.getApiUrl() + '/api/v1/student/enroll',
      headers: AuthHeader.getHeaders(),
      data: body
    })
  }

  toggleCardEnabled() {
    return axios({
      method: 'PATCH',
      url: AuthHeader.getApiUrl() + '/api/v1/student/toggle_card_enabled',
      headers: AuthHeader.getHeaders()
    })
  }
}

export default new UserServices 