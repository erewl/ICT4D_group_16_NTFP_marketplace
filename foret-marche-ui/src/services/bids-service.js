
import http from "../http-commons";

class BidsService {

    fetchData = (setResponse) => {
        return http.get(`/api/v1/bids`).then(response => {
            setResponse(response.data.data)
        });
    }

    deleteData = (bidId, token, callback) => {
        return http.delete(`/api/v1/bids/${bidId}`, this.createHeader(token)).then(response => {
            console.log(response.data)
            callback()
        })
    }

    createHeader = (token) => {
        return {
            headers: {
                Authorization: 'Bearer ' + token
            }
        } 
    }

    approveBid = (bidId, token, callback) => {
        return http.post(`/api/v1/bids/${bidId}/approve`, this.createHeader(token)).then(response => {
            console.log(response.data)
            callback()
        })
    }

    updateData = (bid, token) => {
        return http.put(`/api/v1/bids/${bid.id}`, bid, this.createHeader(token)).then(response => {
            console.log(response.data)
        })
    }

    setData = (bid) => {
        return http.post('/api/v1/bids', bid).then(response => {
            console.log(response.data)
        })
    }
}

export default new BidsService();