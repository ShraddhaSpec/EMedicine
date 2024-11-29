import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { BorderBottom, CloseFullscreenRounded, CloseOutlined, CloseRounded, FavoriteBorder, Image } from '@mui/icons-material';
import Counter from './IncrementQTY';
import { useNavigate } from 'react-router-dom';
import api from '../../API/api';
import { IProduct } from '../../types/Product';
import { ProductService } from '../../services/ProductService';
import { Console } from 'console';
import { CartService } from '../../services/CartService';
import { ICart } from '../../types/Cart';

interface CartItemCardProps {
  key: number;
  CartItem: ICart;
  onDelete: (id: string) => void;
  setCartTotal: React.Dispatch<React.SetStateAction<number>>;
  isLoadCart : boolean;
  setIsLoadCart: React.Dispatch<React.SetStateAction<boolean>>
}
const CartItemCard: React.FC<CartItemCardProps> = ({ key, CartItem, onDelete, setCartTotal,isLoadCart,setIsLoadCart }) => {
  // const CartItemCard = ({ CartItem, onDelete, setCartTotal }: { CartItem : ; onDelete: (id: string) => void; setCartTotal : React.Dispatch<React.SetStateAction<number>>}) => {
  const [product, setProduct] = useState<IProduct>();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    ProductService.getproductDetails(CartItem.ProductId).then((data) =>{
      console.log("CartItemcard ->>>>>>>>>>>>>",data);
      setProduct(data);
    } );
  }, []);

  const handleQtyChange = (newQty: number) => {
    // CartTotal(total,(product?.unitPrice ?? 0) * newQty);
    setTotal((product?.unitPrice ?? 0) * newQty);
    const data = { Id: product?._id, UpdatedQty: newQty, TotalQty: total };

    api.post('/carts/manageCartQty', data)
      .then(response => {
        setIsLoadCart(!isLoadCart)
        // const UserID = localStorage.getItem("userId");
        // const cartparams = { userId: UserID };
        // CartService.getCarts(cartparams).then((data) => {
        //   const total = data.reduce((acc: any, item: { TotalPrice: any; }) => acc + item.TotalPrice, 0);
        //   setCartTotal(total);
        // })
      })
      .catch((error) => console.error('Error fetching data:', error))
  };



  return (
    <>
      <Grid container spacing={2} marginTop={2} borderBottom={'1px solid #747d88'} color={'#747d88'} fontSize={'1rem'} fontFamily={'Open Sans, sans-serif'} >
        <Grid size={2}>
          <img src={`${product?.imageURL}`} width="80" height="80"></img>
        </Grid>
        <Grid size={2} alignContent={'center'}>
          <label>{product?.name}</label>
        </Grid>
        <Grid size={1} alignContent={'center'}>
          <label>$ {product?.unitPrice}</label>
        </Grid>
        <Grid size={2} alignContent={'center'}>
          <Counter Qty={CartItem.Quantity} onQtyChange={handleQtyChange} />
        </Grid>
        <Grid size={1} alignContent={'center'}>
          <label>{total.toFixed(2)}</label>
        </Grid>
        <Grid size={1} alignContent={'center'}>
          <IconButton onClick={() => onDelete(CartItem._id ?? "")} style={{ color: 'red', transform: 'scale(0.7)', border: '1px solid #747d88', backgroundColor: '#f4f6f8' }}>
            <CloseRounded />
          </IconButton>
        </Grid>
      </Grid>
    </>

  )
}

export default CartItemCard