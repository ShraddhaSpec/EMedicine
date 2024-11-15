import api from '../API/api';
import { IOrder, IOrderItemsId } from '../types/Order';
import { UserID } from '../types/User';

export const OrderService = {
    placeOrder(orderDetail : IOrder  ) {
        return api.post('/orders/placeorder',orderDetail)
            .then(response => {
                return response.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    },

    getMyOrder(orderparams: UserID){
        return api.post('/orders/getmyorder',orderparams)
        .then(response => {
            return response.data;
        })
        .catch((error) => console.error('Error fetching data:', error))
       
    },

    cancelOrder(orderItemParam : IOrderItemsId){
        return api.post('/orders/cancelorder',orderItemParam)
        .then(response => {
            return response.data;
        })
        .catch((error) => console.error('Error fetching data:', error))
    }
   
}