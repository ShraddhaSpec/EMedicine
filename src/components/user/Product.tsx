import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IProduct } from '../../types/Product';

type Props = {
    product: IProduct;
  };

export const Product: React.FC<Props> = ({ product }) => {
  return (
    <div>
    <Card sx={{ maxWidth: 345 ,margin: 'auto' }}>
    <CardMedia
      sx={{ height: 150 }}
      image={product.image}
      title={product.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
  </div>
  )
}
