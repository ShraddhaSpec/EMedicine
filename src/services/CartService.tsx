import api from '../API/api';
import { ICart, IQtyChangeParam } from '../types/Cart';
import { UserID } from '../types/User';

export const CartService = {
    getCarts(cartparams: UserID) {
        return api.post('/carts/getCarts',cartparams)
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
    },
    manageCartQty(cart:IQtyChangeParam){
        return api.post('/carts/manageCartQty', cart)
            .then(response => {
                return response.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    }
}