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
import { IOrder, IOrderItems, IOrderItemsId } from '../../types/Order';
import { OrderService } from '../../services/OrderService';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export const MyOrders = () => {
    // const [activeStep, setActiveStep] = useState<number>(0);
    const [orderList,setOrderList] = useState<IOrderItems[]>([]);
    const [updateMyOrder,setUpdateMyOrder] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState(false); 
    const [selectedOrderItem, setSelectedOrderItem] = useState<IOrderItemsId | null>(null);
    const username = localStorage.getItem("username");
    const UserID = localStorage.getItem("userId");
    const orderparams = { userId: UserID};
    const EmptyOrderUrl = '../Images/emptyorder1.jpg';
    const navigate = useNavigate();
    const NoImageUrl = '../Images/no_image.png';

    useEffect(() => {
    
        OrderService.getMyOrder(orderparams).then((data) => {
           if(data){ setOrderList(data.data);}
        });
    }, [username,UserID,updateMyOrder]);

    // const handleOrderCancel =(orderitemID: string,productID : string,qty : number): void =>{
    //         console.log("productID=>",orderitemID)
    //         let orderItemParam = { orderId : orderitemID, productId : productID, quantity: qty }
    //         OrderService.cancelOrder(orderItemParam).then((data) => {
    //             setUpdateMyOrder(!updateMyOrder);
    //         });
    // }

    const handleOrderCancel = (orderitemID: string |null, productID: string |null, qty: number): void => {
        let orderItemParam = { orderId: orderitemID, productId: productID, quantity: qty };
        OrderService.cancelOrder(orderItemParam).then((data) => {
            setUpdateMyOrder(!updateMyOrder);
            setOpenDialog(false); // Close dialog after cancellation
        });
    };

    const handleClickOpenDialog = (orderitemID: string , productID: string, qty: number) => {
        setSelectedOrderItem({ orderId: orderitemID,  productId: productID, quantity: qty });
        setOpenDialog(true); // Open confirmation dialog
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedOrderItem(null); // Reset selected item

    };

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
          
                {orderList && orderList.length> 0 ? orderList.map((product, index) =>
                 (
                    <Grid container spacing={3} className='grid-container'>
                    <Grid size={{ md: 6}} offset={{ md: 4 }} key={index} padding={3}>                          
                        <Card sx={{ display: 'flex',justifySelf:'center' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 170,height:200, p: 1 }}
                                image={`${product?.imageURL !== "" ? product?.imageURL :NoImageUrl}`}
                                alt={product.productname}
                                // width={'100%'}
                                
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', p:1 }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {product.productname}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        component="div"
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        Order ID: {product._id}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        component="div"
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        Quantity: {product.Quantity}
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
                                        <Button 
                                        key={product._id}
                                        variant="outlined" 
                                        sx={{ alignSelf: 'flex-end' }}
                                        // onClick={() => handleOrderCancel(product._id,product.ProductId,product.Quantity)}
                                        onClick={() => handleClickOpenDialog(product._id, product.ProductId, product.Quantity)}
                                        >
                                            Cancel
                                        </Button>
                                    )}

                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    </Grid>
                )):
                <Grid container className='grid-container' spacing={2}  sx={{display:'flex',justifyContent:'center'}} >
                     <Grid size={{ md: 12}}  > 
                    <Box
                        component="img"
                        sx={{
                            height: '100%',
                            width: '100%',
                            maxHeight: { xs: 233, md: 500 },
                            maxWidth: { xs: 350, md: 550 },
                            justifySelf: 'center',
                            display: 'flex'
                        }}
                        alt="EmptyCart image."
                        src={EmptyOrderUrl}
                    />
                    </Grid>
                    <Grid size={{ md: 12}}  > 
                    <Button
                        size='small'
                        variant="contained"
                        className="blueButton"
                        sx={{ display: 'flex', justifySelf: 'center' }}
                        onClick={() => {
                            navigate("/")
                        }}
                    >
                        Continue Shopping
                    </Button>
                    </Grid>

                </Grid>
                }
            
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Cancellation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to cancel this order? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        No
                    </Button>
                    <Button onClick={() => selectedOrderItem && handleOrderCancel(selectedOrderItem.orderId, selectedOrderItem.productId, selectedOrderItem.quantity)} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
