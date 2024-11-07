import api from '../API/api';
import { ICart } from '../types/Cart';

export const CartService = {
    getCarts() {
        return api.get('/carts/getCarts')
            .then(response => {
                return response.data.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    },
    addToCart(cart: ICart) {
        return api.post('/carts/addToCart', cart)
            .then(response => {
                return response.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    }
}