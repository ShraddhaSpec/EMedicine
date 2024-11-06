import api from '../API/api';

export const UserService = {
    getproducts ()  {
        return api.get('/products/getproducts')
            .then(response => {
                return response.data.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    },
    getproductDetails(id : string | undefined) {
        return api.get(`/products/getproduct/${id}`)
            .then(response => {
                return response.data.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    }
}