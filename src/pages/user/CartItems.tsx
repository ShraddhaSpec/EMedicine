import { Box, Button, Input } from '@mui/material';
import CartItemCard from '../../components/user/CartItemCard';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import api from '../../API/api';
import { ICart } from '../../types/Cart';
import { CartService } from '../../services/CartService';

const CartItems = () => {

    const [CartDeatail, setCartDeatail] = useState<ICart[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        CartService.getCarts().then((data) => setCartDeatail(data));
    }, []);

    const handleDelete = (ProductID: string) => {
        const data = {ItemId: ProductID};

      api.post('/carts/deleteCartItem', data)
            .then(response => {
                if(response.data.success){
                    CartService.getCarts().then((data) => setCartDeatail(data));
                }
            })
            .catch((error) => console.error('Error fetching data:', error))
      };
      localStorage.setItem("CartQty", CartDeatail.length + "");

    return (
        <>
            <Box sx={{ padding: '20px' }}>
                {/* Breadcrumb */}
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '20px' }}>
                    <Link underline="hover" color="inherit" href="/">
                        <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Home
                    </Link>
                    <Typography color="text.primary">Shopping Cart</Typography>
                </Breadcrumbs>

                {/* Shopping Cart Header */}
                <Typography variant="h4" component="div" sx={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
                    Shopping Cart
                </Typography>
            </Box>

            <Box component="section" sx={{ p: 1 }}>
                <Grid container spacing={2} padding={3} borderBottom={'1px solid black'} fontWeight={'bold'} color={'#747d88'} fontSize={'1rem'} fontFamily={'Open Sans, sans-serif'}>
                    <Grid size={2}>
                        <label>Product</label>
                    </Grid>
                    <Grid size={2}>
                        <label>Name</label>
                    </Grid>
                    <Grid size={1}>
                        <label>Price</label>
                    </Grid>
                    <Grid size={2}>
                        <label>Quantity</label>
                    </Grid>
                    <Grid size={1}>
                        <label>Total</label>
                    </Grid>
                    <Grid size={1}>
                        <label>Handle</label>
                    </Grid>
                </Grid>

                <div>
                    {CartDeatail.map((CartItem, Index) => (
                        <CartItemCard ImageName="https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/sun-pulse-oximeter-for-hospital-14-days20230731090957.jpg"
                        ItemName="Sun Pulse Oximeter"
                        Qty={CartItem.Quantity}
                        ProductID={CartItem.ProductId}
                        ItemDesc="one of Ahmedabad's best Sun Pulse Oximeter, For Hospital, 14 Days sellers" 
                        onDelete={handleDelete}/>
                    ))}</div>
            </Box>
            
            <div style={{ float: 'right', margin: '10px' }}>
                <Grid container width={'300px'} color={'#45595b'} >
                    <Grid size={12}>
                        <Typography variant="h4" component="div" sx={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
                            Cart Total
                        </Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                            Sub Total
                        </Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6" component="div" sx={{ marginBottom: '10px' }}>
                            $96.00
                        </Typography>
                    </Grid>

                    <Grid size={6} borderBottom={'1px solid #45595b'}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                            Shipping
                        </Typography>
                    </Grid>
                    <Grid size={6} borderBottom={'1px solid #45595b'}>
                        <Typography variant="h6" component="div" sx={{ marginBottom: '10px' }}>
                            Flat rate: $3.00
                        </Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                            Total
                        </Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="h6" component="div" sx={{ marginBottom: '10px' }}>
                            $99.00
                        </Typography>
                    </Grid>
                </Grid>
            </div>


        </>


    )
}

export default CartItems