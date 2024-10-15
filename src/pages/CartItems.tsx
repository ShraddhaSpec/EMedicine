import { Button } from '@mui/material'
import CartItemCard from '../components/CartItemCard'
import React from 'react'

const CartItems = () => {
  return (
    <>
        <div style={{textAlign:'center'}}> <h2>Cart Items</h2></div>
        <Button variant="contained">Place Order</Button>

        <CartItemCard ImageName="https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/sun-pulse-oximeter-for-hospital-14-days20230731090957.jpg" 
            ItemName="Sun Pulse Oximeter" 
            Qty={2} 
            ItemDesc="one of Ahmedabad's best Sun Pulse Oximeter, For Hospital, 14 Days sellers" />
    </>
    
  )
}

export default CartItems