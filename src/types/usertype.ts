export interface userType {
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    state : string;
    country: string;
    postcode_zip: string;
    mobileno: string;
    email: string;
    password: string;
  }


   interface RoleType {
    role: string; 
  }
  export type AuthRole = RoleType | null;



  
  
  