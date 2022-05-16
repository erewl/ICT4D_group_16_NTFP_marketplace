import http from "../http-commons";

class AuthService {

    loginUser = (credentials, callback) => {
        return http.post(`/api/v1/auth/login`, credentials).then(response => {
            callback(response.data.access_token)
        })
    }

    logoutUser = (callback) => {
        return http.post(`/api/v1/auth/logout`).then(response => {
            console.log(response.data)
            callback()
        })
    }
}

export default new AuthService();