
import http from "../http-commons";

class OffersService {

    fetchData = (setResponse) => {
        return http.get(`/api/v1/offers`).then(response => {
            setResponse(response.data.data)
        });
    }

    updateData = (offer, token) => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        return http.put(`/api/v1/offers/${offer.id}`, offer, config).then(response => {
            console.log(response.data)
        })
    }

    setData = (offer) => {
        return http.post('/api/v1/offers', offer).then(response => {
            console.log(response.data)
        })
    }
}

export default new OffersService();