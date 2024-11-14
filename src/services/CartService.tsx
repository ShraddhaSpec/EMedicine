import api from '../API/api';
import { ICart } from '../types/Cart';
import { UserID } from '../types/User';

export const CartService = {
    getCarts(cartparams: UserID) {
        return api.post('/carts/getCarts',cartparams)
            .then(response => {
                debugger
                console.log(response)
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