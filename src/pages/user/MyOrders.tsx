import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { OrderStatus } from '../../components/user/OrderStatus';
import Button from '@mui/material/Button';
import { Breadcrumbs, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { IOrder, IOrderItems } from '../../types/Order';
import { OrderService } from '../../services/OrderService';

// const products = [
//     {
//         name: 'LOREM',
//         image: '../Images/SAM1.jpg',
//         description: 'Lorem ipsum is simply dummy text of the printing',
//         price: 56
//     },
//     {
//         name: 'LOREM',
//         image: '../Images/SAM1.jpg',
//         description: 'Lorem ipsum is simply dummy text of the printing',
//         price: 56
//     }
// ];

export const MyOrders = () => {
    // const [activeStep, setActiveStep] = useState<number>(0);
    const [orderList,setOrderList] = useState<IOrderItems[]>([]);

    const username = localStorage.getItem("username");
    const UserID = localStorage.getItem("userId");
    const orderparams = { userId: UserID};

    useEffect(() => {
    
        OrderService.getMyOrder(orderparams).then((data) => {
            setOrderList(data.data);
          

        });
    }, [username,UserID]);

    console.log("orderlist=>",orderList)
    return (
        <>
            <Box sx={{ padding: '20px' }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '20px' }}>
                    <Link underline="hover" color="inherit" href="/">
                        <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Home
                    </Link>
                    <Typography color="text.primary">My Order</Typography>
                </Breadcrumbs>

                <Typography variant="h4" component="div" sx={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
                    My Order
                </Typography>
            </Box>
            <Grid container spacing={3} className='grid-container'>
                {orderList && orderList.length> 0 && orderList.map((product, index) => (
                  
                    <Grid size={{ md: 6}} offset={{ md: 4 }} key={index} >                          
                        <Card sx={{ display: 'flex',justifySelf:'center' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 170, p: 1 }}
                                image={`/ProductImage/${product.imageURL}`}
                                alt={product.productname}
                                // width={'100%'}
                                
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', p:1 }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {product.productname}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        {product.description}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: 1, pb: 1 }}>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        sx={{ color: 'text.secondary' }}>
                                        <OrderStatus activeStep={product.OrderStatus-1} />
                                    </Typography>                                  
                                    {(product.OrderStatus-1) <= 0 && (
                                        <Button variant="outlined" sx={{ alignSelf: 'flex-end' }}>
                                            Cancel
                                        </Button>
                                    )}

                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))
                }
            </Grid >
        </>
    )
}
