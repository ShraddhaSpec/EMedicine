import React, { useState } from 'react';
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

const products = [
    {
        name: 'LOREM',
        image: '../Images/SAM1.jpg',
        description: 'Lorem ipsum is simply dummy text of the printing',
        price: 56
    },
    {
        name: 'LOREM',
        image: '../Images/SAM1.jpg',
        description: 'Lorem ipsum is simply dummy text of the printing',
        price: 56
    }
];

export const MyOrders = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
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
                {products.map((product, index) => (
                    <Grid size={{ md: 4 }} offset={{ md: 4 }} key={index} >
                        <Card sx={{ display: 'flex' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 170, p: 1 }}
                                image={product.image}
                                alt={product.name}
                                width={'100%'}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', p:1 }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {product.name}
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
                                        <OrderStatus activeStep={activeStep} />
                                    </Typography>
                                    {activeStep <= 0 && (
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
