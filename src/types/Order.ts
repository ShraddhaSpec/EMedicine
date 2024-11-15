import { ICart } from "./Cart";

export interface IOrder{   
        UserID: string | undefined;               
        OrderTotal: number;            
        ShippingAddress: string;      
        OrderItems: ICart[];    

}

export interface IOrderItems {
        UserId: string,
        ProductId:string,
        UnitPrice: number ,
        // Discount: number,
        Quantity: number,
        TotalPrice: number,   
        OrderStatus : number,
        imageURL ?:string,
        productname ?: string,
        description ?:string,
        _id:string
}

export interface IOrderItemsId {
        orderId: string | null,
      }
    