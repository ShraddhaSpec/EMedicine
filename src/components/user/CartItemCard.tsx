import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { BorderBottom, CloseFullscreenRounded, CloseOutlined, CloseRounded, FavoriteBorder, Image } from '@mui/icons-material';
import Counter from './IncrementQTY';
import { useNavigate } from 'react-router-dom';
import api from '../../API/api';
import { IProduct } from '../../types/Product';
import { ProductService } from '../../services/ProductService';

const CartItemCard = ({ ImageName, ItemName, ItemDesc, Qty, ProductID }: { ImageName: string; ItemName: string; ItemDesc: string; Qty: number; ProductID: string }) => {

  console.log(ProductID);

  const [product, setProduct] = useState<IProduct>();
    useEffect(() => {
      ProductService.getproductDetails(ProductID).then((data) => setProduct(data));
    }, []);

    useEffect(() => {
    }, [Qty]);


  return (
    <>
      <Grid container spacing={2} marginTop={2} borderBottom={'1px solid #747d88'} color={'#747d88'} fontSize={'1rem'} fontFamily={'Open Sans, sans-serif'} >
        <Grid size={2}>
          <img src={`/ProductImage/${product?.ImageURL}`} width="80" height="80"></img>
        </Grid>
        <Grid size={2} alignContent={'center'}>
          <label>{product?.Name}</label>
        </Grid>
        <Grid size={1} alignContent={'center'}>
          <label>$ {product?.UnitPrice}</label>
        </Grid>
        <Grid size={2} alignContent={'center'}>
          <Counter  Qty={Qty}/>
        </Grid>
        <Grid size={1} alignContent={'center'}>
        <label>${product?.UnitPrice ? (product.UnitPrice * Qty).toFixed(2) : '0.00'}</label>
        </Grid>
        <Grid size={1} alignContent={'center'}>
          <IconButton style={{ color: 'red', transform: 'scale(0.7)', border: '1px solid #747d88', backgroundColor: '#f4f6f8' }}>
            <CloseRounded  />
          </IconButton>
        </Grid>
      </Grid>
    </>

  )
}

export default CartItemCard