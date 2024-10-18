import * as React from 'react';
import Grid from '@mui/material/Grid2';
import { Product } from '../../components/user/Product';

const products = [
  {
    name: 'LOREM',
    image:   '../Images/SAM1.jpg',
    description: 'Lorem ipsum is simply dummy text of the printing',
    price: 56
  },
  {
    name: 'LOREM',
    image:   '../Images/SAM1.jpg',
    description: 'Lorem ipsum is simply dummy text of the printing',
    price: 56
  },
  {
    name: 'LOREM',
    image:   '../Images/SAM1.jpg',
    description: 'Lorem ipsum is simply dummy text of the printing',
    price: 56
  },
  {
    name: 'LOREM',
    image:   '../Images/SAM1.jpg',
    description: 'Lorem ipsum is simply dummy text of the printing',
    price: 56
  },
  {
    name: 'LOREM',
    image:   '../Images/SAM1.jpg',
    description: 'Lorem ipsum is simply dummy text of the printing',
    price: 56
  },
  {
    name: 'LOREM',
    image:   '../Images/SAM1.jpg',
    description: 'Lorem ipsum is simply dummy text of the printing',
    price: 56
  },
  {
    name: 'LOREM',
    image:   '../Images/SAM1.jpg',
    description: 'Lorem ipsum is simply dummy text of the printing',
    price: 56
  },
  {
    name: 'LOREM',
    image:   '../Images/SAM1.jpg',
    description: 'Lorem ipsum is simply dummy text of the printing',
    price: 56
  },
  {
    name: 'LOREM',
    image:   '../Images/SAM1.jpg',
    description: 'Lorem ipsum is simply dummy text of the printing',
    price: 56
  }
];

export const Home = () => {
  return (
    <>
      <Grid container spacing={3} className='grid-container'>
        {products.map((product, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
