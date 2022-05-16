import http from "../http-commons";

class AuthService {

    loginUser = (credentials, callback) => {
        return http.post(`/api/v1/auth/login`, credentials).then(response => {
            console.log(response)
            return callback(response.data.accesstoken)
        })
    }

    logoutUser = (callback) => {
        return http.post(`/api/v1/auth/logout`).then(response => {
            console.log(response)
            callback()
        })
    }
}

export default new AuthService();