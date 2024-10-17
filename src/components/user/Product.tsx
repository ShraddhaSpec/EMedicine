import * as React from 'react';
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

type Props = {
  product: IProduct;
};

export const Product: React.FC<Props> = ({ product }) => {
  return (
    <div>
      {/* <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}> */}
        <Card sx={{ maxWidth: 345, margin: 'auto' }}>
          <CardMedia
            sx={{ height: 150 }}
            image={product.image}
            title={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {product.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
              <CurrencyRupeeIcon sx={{ fontSize: '1.2rem', verticalAlign: 'middle' }} />{product.price}
            </Typography>
            <Button size="small" startIcon={<ShoppingCartIcon />}>
              Add to cart
            </Button>
          </CardActions>
        </Card>
      {/* </Link> */}
    </div>
  )
}
