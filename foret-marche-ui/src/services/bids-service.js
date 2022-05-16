
import http from "../http-commons";

class BidsService {

    fetchData = (setResponse) => {
        return http.get(`/api/v1/bids`).then(response => {
            setResponse(response.data.data)
        });
    }

    updateData = (bid, token) => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        return http.put(`/api/v1/bids/${bid.id}`, bid, config).then(response => {
            console.log(response.data)
        })
    }
}

export default new BidsService();