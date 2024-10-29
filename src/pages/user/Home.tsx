import react,{useEffect, useState} from 'react';
import Grid from '@mui/material/Grid2';
import { Product } from '../../components/user/Product';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../types/Product';
import api from '../../API/api';



export const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  useEffect(() => {   
      const token = localStorage.getItem("token");
      console.log("Token:", token); 

      if (!token || token == null || token == "" ) {
        navigate('/login');
      } else {
        api.get('/products/getproducts')
        .then(response =>{
          console.log("respone=>",response)
          setProducts(response.data.data)
        }) 
        .catch((err)=>{
          console.log("Error=>", err)
        });
      }
 
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
            <Product product={product}/>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
