export interface ICart {
    _id?:string,
    UserId: string,
    ProductId:string,
    UnitPrice: number ,
    // Discount: number,
    Quantity: number,
    TotalPrice: number,    
}