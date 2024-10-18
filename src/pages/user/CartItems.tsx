import { Box, Button, Input } from '@mui/material';
import CartItemCard from '../../components/user/CartItemCard';
import React from 'react';
import Grid from '@mui/material/Grid2';
import { BorderBottom, CloseFullscreenRounded, CloseOutlined, CloseRounded, FavoriteBorder, Image, Padding, } from '@mui/icons-material';
import Counter from '../../components/user/IncrementQTY';

const CartItems = () => {
    return (
        <div >
            <div style={{
                textAlign: 'center',
                background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://thumbs.dreamstime.com/z/top-view-medicines-bottle-cover-cap-colorful-pills-tablets-capsules-isolated-white-background-drug-prescription-use-186306273.jpg)',
                padding: '75px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'White'


            }}> <h2>Cart</h2></div>




            <Box component="section" sx={{ p: 10 }}>
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

                <CartItemCard ImageName="https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/sun-pulse-oximeter-for-hospital-14-days20230731090957.jpg"
                    ItemName="Sun Pulse Oximeter"
                    Qty={2}
                    ItemDesc="one of Ahmedabad's best Sun Pulse Oximeter, For Hospital, 14 Days sellers" />

                <CartItemCard ImageName="https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/sun-pulse-oximeter-for-hospital-14-days20230731090957.jpg"
                    ItemName="Sun Pulse Oximeter"
                    Qty={2}
                    ItemDesc="one of Ahmedabad's best Sun Pulse Oximeter, For Hospital, 14 Days sellers" />

                <CartItemCard ImageName="https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/sun-pulse-oximeter-for-hospital-14-days20230731090957.jpg"
                    ItemName="Sun Pulse Oximeter"
                    Qty={2}
                    ItemDesc="one of Ahmedabad's best Sun Pulse Oximeter, For Hospital, 14 Days sellers" />

                <CartItemCard ImageName="https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/sun-pulse-oximeter-for-hospital-14-days20230731090957.jpg"
                    ItemName="Sun Pulse Oximeter"
                    Qty={2}
                    ItemDesc="one of Ahmedabad's best Sun Pulse Oximeter, For Hospital, 14 Days sellers" />
                <CartItemCard ImageName="https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/sun-pulse-oximeter-for-hospital-14-days20230731090957.jpg"
                    ItemName="Sun Pulse Oximeter"
                    Qty={2}
                    ItemDesc="one of Ahmedabad's best Sun Pulse Oximeter, For Hospital, 14 Days sellers" />

                <div style={{ padding: '10px' }}>
                    <Input placeholder="Coupon Code" />
                    <Button variant="outlined" style={{ borderRadius: '50rem' }}>Apply Coupon</Button>
                </div>

            </Box>
            <Grid container width={'300px'} color={'#45595b'} >
                <Grid size={12}>
                    <h1 style={{fontWeight: '800'}}>Cart Total</h1>
                </Grid>
                <Grid size={6}>
                    <h5>Sub Total</h5>
                </Grid>
                <Grid size={6}>
                    <label>$96.00</label>
                </Grid>
                
                    <Grid size={6} borderBottom={'1px solid #45595b'}>
                        <h5>Shipping</h5>
                    </Grid>
                    <Grid size={6} borderBottom={'1px solid #45595b'}>
                        <label>Flat rate: $3.00</label>
                    </Grid>
                <Grid size={6}>
                    <h5>Total</h5>
                </Grid>
                <Grid size={6}>
                    <label>$99.00</label>
                </Grid>
            </Grid>


        </div>


    )
}

export default CartItems