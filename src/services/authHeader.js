import authServices from './auth.services'

class authHeader {
  getHeaders() {
    let headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': localStorage.getItem("o$FX1HM77H3gq0AI"),
      'client': localStorage.getItem("tF5gno!2YXe*L2UZ"),
      'uid': localStorage.getItem("rD3oknq#%t5GLLu^")
    }

    return headers
  }

  updateHeaders(headers) {
    if (!(headers["access-token"] === undefined || headers["access-token"] === "")) localStorage.setItem("o$FX1HM77H3gq0AI", headers['access-token'])
    if (!(headers["client"] === undefined || headers["client"] === "")) localStorage.setItem("tF5gno!2YXe*L2UZ", headers['client'])
    if (!(headers["uid"] === undefined || headers["uid"] === "")) localStorage.setItem("rD3oknq#%t5GLLu^", headers["uid"])
  }

  deleteHeaders() {
    authServices.checkStatus()
    localStorage.setItem("o$FX1HM77H3gq0AI", null)
    localStorage.setItem("tF5gno!2YXe*L2UZ", null)
    localStorage.setItem("rD3oknq#%t5GLLu^", null)
    localStorage.setItem("o$Uil%7IzU37PAP^qn", null)
  }

  getApiUrl() {
    return 'http://localhost:3001'
    // return 'https://cov-uni-con-api.herokuapp.com/'
  }
}

export default new authHeader();