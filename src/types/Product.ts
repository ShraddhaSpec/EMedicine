export interface IProduct {
    _id: string, 
    name: string,
    description:string,
    manufacturer:string,
    unitPrice: number,
    discount: number,
    quantity: number,
    imageURL: string,
    status: boolean,
    expiryDate: Date
}

export interface Imedicine{
    Id: string,
    Status : boolean
}