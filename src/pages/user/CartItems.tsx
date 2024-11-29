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
import { useCart } from '../../Context/CartContext';

const CartItems = () => {

    const [CartDeatail, setCartDeatail] = useState<ICart[]>([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const UserID = localStorage.getItem("userId");
    const [CartTotal, setCartTotal] = useState<number>(0);
    const [isLoadCart,setIsLoadCart] = useState<boolean>(false)
    // const EmptyCartUrl = '../Images/emptycart.png';
    const EmptyCartUrl = '../Images/emptybag.jpg';
    const cartparams = { userId: UserID };
    const shippingCharge = 3

    useEffect(() => {
        CartService.getCarts(cartparams).then((data) => setCartDeatail(data));
    }, [UserID,isLoadCart]);

    useEffect(() => {
        if (CartDeatail && CartDeatail.length > 0) {
            console.log("called from set total cart from cart item")
            localStorage.setItem("CartQty", CartDeatail.length + "");
            const total = CartDeatail.reduce((acc, item) => acc + item.TotalPrice, 0);
            setCartTotal(total);
        }
    }, [CartDeatail]);

    console.log("cartdetail==>",CartDeatail)
    const handleCartTotal = (OldTotal: number, NewTotal: number) => {
        var TempTotal = CartTotal;
        TempTotal -= OldTotal;
        TempTotal += NewTotal;
        setCartTotal(TempTotal);
    };

    const handlePlaceOrder =()=>{
        navigate('/placeorder', {
            state: {
                orderTotal: CartTotal
            }
        });
    }


    const handleDelete = (ProductID: string) => {
        const data = { ItemId: ProductID };

        api.post('/carts/deleteCartItem', data)
            .then(response => {
                if (response.data.success) {
                    addToCart({ op: "minus" });
                    setIsLoadCart(!isLoadCart)
                    // CartService.getCarts(cartparams).then((data) =>
                    //     {
                    //         setCartDeatail([]);
                    //         setCartDeatail(data)        
                    //     } );
                   
                }
            })
            .catch((error) => console.error('Error fetching data:', error))
    };


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
                {CartDeatail && CartDeatail.length > 0 &&
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
                }
                <div>
                    {CartDeatail && CartDeatail.length > 0 ? CartDeatail.map((CartItem, Index) => (
                        <CartItemCard 
                            // ItemName="Sun Pulse Oximeter"
                            // Qty={CartItem.Quantity}
                            // ProductID={CartItem.ProductId}
                            // ItemDesc="one of Ahmedabad's best Sun Pulse Oximeter, For Hospital, 14 Days sellers"
                            key={Index}
                            CartItem={CartItem}
                            onDelete={handleDelete}
                            setCartTotal={setCartTotal} 
                            isLoadCart = {isLoadCart}
                            setIsLoadCart = {setIsLoadCart}

                            />
                    ))
                        :
                        (
                            <>

                                <Box
                                    component="img"
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        maxHeight: { xs: 233, md: 400 },
                                        maxWidth: { xs: 350, md: 500 },
                                        justifySelf: 'center',
                                        display: 'flex'
                                    }}
                                    alt="EmptyCart image."
                                    src={EmptyCartUrl}
                                />
                                <Typography variant="h6" sx={{ color: 'text.secondary', display: 'flex', justifySelf: 'center' }}>
                                    Add something to make me happy 😄
                                </Typography>
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

                            </>
                        )}</div>
            </Box>
            {CartDeatail && CartDeatail.length > 0 &&
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
                                $ {CartTotal.toFixed(2)}
                            </Typography>
                        </Grid>

                        <Grid size={6} borderBottom={'1px solid #45595b'}>
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                Shipping
                            </Typography>
                        </Grid>
                        <Grid size={6} borderBottom={'1px solid #45595b'}>
                            <Typography variant="h6" component="div" sx={{ marginBottom: '10px' }}>
                                ${shippingCharge.toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                Total
                            </Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="h6" component="div" sx={{ marginBottom: '10px' }}>
                            $ {(CartTotal + shippingCharge).toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid size={6}>
                            <Button
                                size='small'
                                variant="contained"
                                className="blueButton"
                                onClick={handlePlaceOrder}
                            >
                                Place Order
                            </Button>
                        </Grid>
                    </Grid>
                </div>}



        </>


    )
}

export default CartItems