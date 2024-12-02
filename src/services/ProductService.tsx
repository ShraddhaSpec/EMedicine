import api from '../API/api';
import { Imedicine, IProduct } from '../types/Product';

export const ProductService = {
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
    },
    updateProductDetail(data:IProduct) {
        return api.post(`/products/updateproduct`, data)
            .then(response => {
                return response.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    },
    addProductDetail(data:IProduct) {
        return api.post(`/products/addProduct`, data)
            .then(response => {
                return response.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    },
    statusChangeProduct(data : Imedicine) {
        return api.post(`/products/statuschangeproduct`, data)
            .then(response => {
                return response.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    },
}