import api from '../API/api';

export const CartService = {
    getCarts ()  {
        return api.get('/carts/getCarts')
            .then(response => {
                return response.data.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    }
}