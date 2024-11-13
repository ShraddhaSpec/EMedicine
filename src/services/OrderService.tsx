import api from '../API/api';
import { IOrder } from '../types/Order';

export const OrderService = {
    placeOrder(orderDetail : IOrder  ) {
        return api.post('/orders/placeorder',orderDetail)
            .then(response => {
                return response.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    },
   
}