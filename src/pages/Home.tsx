import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Product } from '../components/user/Product';

const products = [
  {
    name: 'Volini Gel 30gm',
    image:   '../Images/SAM1.jpg',
  },
  {
    name: 'Head & Shoulders',
    image: '../Images/SAM1.jpg',
  },
  {
    name: 'Head & Shoulders 2',
    image: '../Images/SAM1.jpg',
  },
  {
    name: 'Pro360 Whey Protein',
    image: '../Images/SAM1.jpg',
  },
  {
    name: 'Pro360 Whey Protein',
    image: '../Images/SAM1.jpg',
  },
  {
    name: 'Pro360 Whey Protein',
    image: '../Images/SAM1.jpg',
  },
  {
    name: 'Pro360 Whey Protein',
    image: '../Images/SAM1.jpg',
  },
  {
    name: 'Pro360 Whey Protein',
    image: '../Images/SAM1.jpg',
  },
  {
    name: 'Pro360 Whey Protein',
    image: '../Images/SAM1.jpg',
  },
  {
    name: 'Pro360 Whey Protein',
    image: '../Images/SAM1.jpg',
  },
  {
    name: 'Pro360 Whey Protein',
    image: '../Images/SAM1.jpg',
  },
  {
    name: 'Pro360 Whey Protein',
    image: '../Images/SAM1.jpg',
  },
   {
    name: 'Pro360 Whey Protein',
    image: '../Images/SAM1.jpg',
  },


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
