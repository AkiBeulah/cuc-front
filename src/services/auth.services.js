import axios from "axios"
import AuthHeader from "./authHeader"

class AuthServices {
  login(email, password) {
    let data = {
      'email': email,
      'password': password
    }

    return axios({
      method: 'post',
      url: AuthHeader.getApiUrl() + '/api/v1/auth/sign_in',
      params: data,
      headers: AuthHeader.getHeaders(),
    })
  }

  register(email, password, mNo, level, college, department, program, option, hall) {
    let data = {
      'email': email,
      'password': password,
      'username': mNo,
      "level": level,
      'college': college,
      'department': department,
      'program': program,
      'option': option,
      'hall': hall,
      'first_name': email.match(/.*?(?=\.|@)/)[0],
      'last_name': email.match(/\.[a-zA-Z].*?(?=\@)/)[0].substr(1)
    }

    return axios({
      method: 'post',
      url: AuthHeader.getApiUrl() + '/api/v1/auth',
      params: data,
      headers: AuthHeader.getHeaders()
    })
  }

  checkStatus() {
    return axios({
      method: 'get',
      url: AuthHeader.getApiUrl() + '/api/v1/status',
      headers: AuthHeader.getHeaders()
    })
  }

  logout() {
    AuthHeader.deleteHeaders()

    return axios.delete(
      AuthHeader.getApiUrl() + '/api/v1/auth/sign_out',
      AuthHeader.getHeaders()
    )
  }
}


export default new AuthServices