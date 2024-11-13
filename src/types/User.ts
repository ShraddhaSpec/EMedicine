export interface IUser {
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    state : string;
    country: string;
    postcode_zip: string;
    mobileno: string;
    email: string;
    password?: string;
    _id?:string
  }

  export interface ILogin {
    email: string;
    password: string;
  }

  export interface UserName {
    Email: string
  }

  export interface UserID {
    userId: string | null
  }



  
  
  