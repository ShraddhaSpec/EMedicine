import api from '../API/api';
import { ILogin, IUser } from '../types/User';

export const UserService = {
    login (params: ILogin)  {
        return api.post('/users/login', params)
            .then(response => {
                return response.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    },
    signup (params: IUser)  {
        return api.post('/users/register', params)
            .then(response => {
                return response.data;
            })
            .catch((error) => console.error('Error fetching data:', error))
    }
}