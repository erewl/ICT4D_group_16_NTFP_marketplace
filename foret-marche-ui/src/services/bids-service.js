
import http from "../http-commons";

class BidsService {

    fetchData = (setResponse) => {
        return http.get(`/api/v1/bids`).then(response => {
            setResponse(response.data.data)
        });
    }

    updateData = (bid) => {
        return http.put(`/api/v1/bids/${bid.id}`, bid).then(response => {
            console.log(response.data)
        })
    }
}

export default new BidsService();