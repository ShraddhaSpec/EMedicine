import react, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Product } from '../../components/user/Product';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../types/Product';
import api from '../../API/api';
import { ProductService } from '../../services/ProductService';
import { CartService } from '../../services/CartService';
import { useCart } from '../../Context/CartContext';


export const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  const { setQty } = useCart();
  const UserID = localStorage.getItem("userId");
  const cartparams = { userId: UserID };
  useEffect(() => {
    ProductService.getproducts().then((data) => setProducts(data));
    CartService.getCarts(cartparams).then((data) => {
      localStorage.setItem("CartQty", data.length);
      setQty(data.length);
    });
  }, []);

  return (
    <>
      <Box sx={{ padding: '20px' }}>
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '20px' }}>
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
            Home
          </Link>
        </Breadcrumbs>
      </Box>
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
