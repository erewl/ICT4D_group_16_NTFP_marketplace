
import http from "../http-commons";

class OffersService {

    fetchData = (setResponse) => {
        return http.get(`/api/v1/offers`).then(response => {
            setResponse(response.data.data)
        });
    }
}

export default new OffersService();