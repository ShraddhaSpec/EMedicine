import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2';
import { BorderBottom, CloseFullscreenRounded, CloseOutlined, CloseRounded, FavoriteBorder, Image } from '@mui/icons-material';
import Counter from './IncrementQTY';

const CartItemCard = ({ ImageName, ItemName, ItemDesc, Qty }: { ImageName: string; ItemName: string; ItemDesc: string; Qty: number }) => {
  return (
    <>

        

        <Grid container spacing={2} marginTop={2} borderBottom={'1px solid #747d88'} color={'#747d88'} fontSize={'1rem'} fontFamily={'Open Sans, sans-serif'} >
        <Grid size={2}>
        <img  src='https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/sun-pulse-oximeter-for-hospital-14-days20230731090957.jpg' width="80" height="80"></img>
        </Grid>
        <Grid size={2} alignContent={'center'}>
          <label>Sun Pulse Oximeter</label>
        </Grid>
        <Grid size={1} alignContent={'center'}>
          <label>$ 10.10</label>
        </Grid>
        <Grid size={2} alignContent={'center'}>
          <Counter/>
        </Grid>
        <Grid size={1} alignContent={'center'}>
          <label>$ 100.10</label>
        </Grid>
        <Grid size={1} alignContent={'center'}>
        <IconButton style={{color:'red' , transform: 'scale(0.7)', border:'1px solid #747d88', backgroundColor: '#f4f6f8'}}>
          <CloseRounded />
        </IconButton>
        </Grid>
      </Grid>
    </>
    
  )
}

export default CartItemCard