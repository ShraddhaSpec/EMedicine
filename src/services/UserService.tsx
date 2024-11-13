import api from '../API/api';
import { ILogin, IUser, UserName } from '../types/User';

export const UserService = {
      login (params: ILogin)  {
        return  api.post('/users/login', params)
            .then(response => { 
                console.log("response===>",response)              
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
    },
    getprofile(params: UserName){
        return api.post('/users/getprofile', params)
        .then(response => {
            return response.data;
        })
        .catch((error) => console.error('Error fetching data:', error))
    }
}