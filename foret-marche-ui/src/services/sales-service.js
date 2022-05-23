import http from "../http-commons";

class SalesService {

    fetchData = (setResponse) => {
        return http.get(`/api/v1/sales`).then(response => {
            setResponse(response.data.data)
        });
    }

}

export default new SalesService();