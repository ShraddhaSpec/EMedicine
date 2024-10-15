import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const CartItemCard = ({ImageName, ItemName, ItemDesc, Qty}) => {
  return (
    <>
        {/* <div>{ImageName}</div>
        <div>{ItemName}</div>
        <div>{Qty}</div> */}

        <Card sx={{ maxWidth: 345 }}>
      <CardMedia style={{backgroundSize:"contain"}}
        sx={{ height: 140 }}
        image={ImageName}
        title={ItemName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {ItemName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {ItemDesc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"  variant="contained">Remove Item</Button>
      </CardActions>
    </Card>
    </>
    
  )
}

export default CartItemCard