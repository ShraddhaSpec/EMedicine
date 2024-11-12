import react, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IProduct } from '../../types/Product';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link } from 'react-router-dom';
import { ICart } from '../../types/Cart';
import { CartService } from '../../services/CartService';
import { useCart } from '../../Context/CartContext';

type Props = {
  product: IProduct;
};

export const Product: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const addToCartHandler = () => {
    const cart :  ICart  = {
       UserId: localStorage.getItem("userId")?.toString() ?? "", 
       ProductId : product._id,
       UnitPrice: product.UnitPrice,
       Discount :product.Discount,
       Quantity : 1,
       TotalPrice : product.UnitPrice * product.Quantity
       };

       CartService.addToCart(cart).then(
        (data) => {
          console.log("add to cart",data);
          addToCart();
          
        }
      );
  }

  return (
    <div>
      <Card sx={{ maxWidth: 345, margin: 'auto' }}>
        <CardMedia
          sx={{ height: 150 }}
          image={`/ProductImage/${product.ImageURL}`}
          title={product.Name}
        />
        <Link to={`/productDetails/${product._id}`} style={{ textDecoration: 'none' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.Name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {product.Description}
            </Typography>
          </CardContent>
        </Link>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
            <CurrencyRupeeIcon sx={{ fontSize: '1.2rem', verticalAlign: 'middle' }} />{product.UnitPrice}
          </Typography>
          <Button size="small" startIcon={<ShoppingCartIcon />} onClick={addToCartHandler}>
            Add to cart
          </Button>
        </CardActions>
      </Card>

    </div >
  )
}
