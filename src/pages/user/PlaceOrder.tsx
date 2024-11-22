import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { UserService } from '../../services/UserService'; 
import { IUser } from '../../types/User';
import { useNavigate,useLocation } from 'react-router-dom';
import { CartService } from '../../services/CartService';
import { ICart } from '../../types/Cart';
import { OrderService } from '../../services/OrderService';
import { IOrder } from '../../types/Order';

const PlaceOrder = () => {
    const [userData,setUserData] = useState<IUser>({
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postcode_zip: '',
        mobileno: '',
        email: ''
      });
    const [errors, setErrors] = useState<Partial<IUser>>({});
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [CartDeatail, setCartDeatail] = useState<ICart[]>([]);
    const location = useLocation();
    const { orderTotal } = location.state || {};

    useEffect(() => {
        if(username){
        const params = { Email: username};
        const cartparams = { userId: userId};
        UserService.getprofile(params).then((data) => setUserData(data.data));
        CartService.getCarts(cartparams).then((data) => setCartDeatail(data));
        }
    }, [username,userId])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserData({ ...userData, [id]: value });
      };

   
      
  const validate = () => {
    console.log("checkuserdata=>", userData)
    let tempErrors: Partial<IUser> = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!userData.firstname) {
      tempErrors.firstname = "First Name is required";
    } else if (!nameRegex.test(userData.firstname)) {
      tempErrors.firstname = "First Name can only contain letters";
    }

    if (!userData.lastname) {
      tempErrors.lastname = "Last Name is required";
    } else if (!nameRegex.test(userData.lastname)) {
      tempErrors.lastname = "Last Name can only contain letters";
    }

    if (!userData.address) {
      tempErrors.address = "Address is required";
    } 


    if (!userData.city) {
      tempErrors.city = "Town/City is required";
    } else if (!nameRegex.test(userData.city)) {
      tempErrors.city = "Town/City can only contain letters";
    }

    if (!userData.state) {
      tempErrors.state = "State is required";
    } else if (!nameRegex.test(userData.state)) {
      tempErrors.state = "State can only contain letters";
    }

    if (!userData.country) {
      tempErrors.country = "Country is required";
    } else if (!nameRegex.test(userData.country)) {
      tempErrors.country = "Country can only contain letters";
    }

    if (!userData.postcode_zip) {
      tempErrors.postcode_zip = "Postcode/Zip is required";
    } else if (!/^\d{6}$/.test(userData.postcode_zip)) {
      tempErrors.postcode_zip = "Postcode/Zip must be 6 digits";
    }

    if (!userData.mobileno) {
      tempErrors.mobileno = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(userData.mobileno)) {
      tempErrors.mobileno = "Mobile Number must be 10 digits";
    }

    if (!userData.email) {
      tempErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      tempErrors.email = "Email is not valid";
    }


    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handlePlaceOrder = () =>{
    
          if (validate()) {
            const uData = userData;
            console.log("cartdata->",CartDeatail)
              console.log("data->",uData)
              const placeorderObj : IOrder = {
                  UserID: uData._id,
                  OrderTotal : orderTotal,
                  ShippingAddress : `${uData.address},${uData.city},${uData.state},${uData.country},${uData.postcode_zip}`,
                  OrderItems : CartDeatail

              }
      
            OrderService.placeOrder(placeorderObj).then((data) => {
              console.log("success order",data)
              if (data.success === true) {
                navigate('/');
              }
            }).catch((err) => {
              console.log("Error=>", err)
            });
          }
  }

    
    
    return (
        <>
            <Box sx={{ padding: '1rem' }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '1.5rem' }}>
                    <Link underline="hover" color="inherit" href="/">
                        <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Home
                    </Link>
                    <Typography color="text.primary">Place Order</Typography>
                </Breadcrumbs>

                <Typography variant="h4" component="div" sx={{ color: 'green', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Place Order
                </Typography>
            </Box>

            <Box component="section" >
                <Typography variant="h6" component="div" sx={{ color: '#0059ac', fontWeight: 'bold', marginLeft:'1rem' }}>
                    Shipping Address
                </Typography>
                <Grid container spacing={2} padding={3} fontWeight={'bold'} color={'#747d88'} fontSize={'1rem'} fontFamily={'Open Sans, sans-serif'} size={12}>
                    <Grid container size={6} spacing={2}>
                        <Grid size={6}>
                            <TextField 
                            label="First Name" 
                            hiddenLabel 
                            id="firstname" 
                            variant="standard" 
                            fullWidth 
                            value={userData?.firstname || ''}   
                            onChange={handleInputChange} 
                            error={!!errors.firstname}
                            helperText={errors.firstname}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField 
                            label="last Name"  
                            id="lastname" 
                            variant="standard" 
                            fullWidth 
                            value={userData?.lastname || ''}   
                            onChange={handleInputChange}
                            error={!!errors.lastname}
                            helperText={errors.lastname}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField 
                            label="Address"  
                            id="address" 
                            variant="standard" 
                            fullWidth  
                            value={userData?.address || ''}   
                            onChange={handleInputChange}
                            error={!!errors.address}
                            helperText={errors.address}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField 
                            label="Town/City"  
                            id="city" 
                            variant="standard" 
                            fullWidth  
                            value={userData?.city || ''}   
                            onChange={handleInputChange}
                            error={!!errors.city}
                            helperText={errors.city}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField 
                            label="State"   
                            id="state" 
                            variant="standard" 
                            fullWidth 
                            value={userData?.state || ''}  
                            onChange={handleInputChange}
                            error={!!errors.state}
                            helperText={errors.state}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField 
                            label="Country"   
                            id="country" 
                            variant="standard" 
                            fullWidth 
                            value={userData?.country || ''}  
                            onChange={handleInputChange}
                            error={!!errors.country}
                            helperText={errors.country}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField 
                            label="Postcode/Zip"  
                            id="postcode_zip" 
                            variant="standard" 
                            fullWidth 
                            value={userData?.postcode_zip || ''}   
                            onChange={handleInputChange}
                            error={!!errors.postcode_zip}
                            helperText={errors.postcode_zip}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField 
                            label="Mobile"  
                            id="mobileno" 
                            variant="standard" 
                            fullWidth 
                            value={userData?.mobileno || ''}   
                            onChange={handleInputChange}
                            error={!!errors.mobileno}
                            helperText={errors.mobileno}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField 
                            label="Email Address"  
                            id="email" 
                            variant="standard" 
                            fullWidth   
                            value={userData?.email || ''}   
                            onChange={handleInputChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            /> 
                        </Grid>
                        <Grid size={12}>
                            <h4 style={{ marginBottom: '10px' }}>Payment Method</h4>
                            <RadioGroup name="use-radio-group" defaultValue="COD" style={{ borderBottom: '1px solid #747d88' }}>
                                <FormControlLabel value="Net banking" label="Net banking" control={<Radio />} />
                                <FormControlLabel value="COD" label="Cash on delivery" control={<Radio />} />
                                <FormControlLabel value="Paypal" label="Paypal" control={<Radio />} />
                                <FormControlLabel value="Gpay" label="Google Pay" control={<Radio />} />
                            </RadioGroup>

                            <Button variant="outlined" style={{ borderRadius: '50rem', marginTop: '10px' }} onClick={handlePlaceOrder}>Place Order</Button>
                        </Grid>

                        {/* </Grid> */}
                    </Grid>



                </Grid>
            </Box>
        </>

    )
}

export default PlaceOrder