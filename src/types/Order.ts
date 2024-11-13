import { ICart } from "./Cart";

export interface IOrder{   
        UserID: string | undefined;               
        OrderTotal: number;            
        ShippingAddress: string;      
        OrderItems: ICart[];        
}