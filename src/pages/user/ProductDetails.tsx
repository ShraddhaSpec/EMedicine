import react,{useEffect} from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Breadcrumbs, Link, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
export const ProductDetails = () => {
    
   
    
    return (
        <>
         <Box sx={{ padding: '20px' }}>
                {/* Breadcrumb */}
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '20px' }}>
                    <Link underline="hover" color="inherit" href="/">
                        <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Home
                    </Link>
                    <Typography color="text.primary">Product Details</Typography>
                </Breadcrumbs>

                <Typography variant="h4" component="div" sx={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
                Product Details
                </Typography>
            </Box>
            <Grid container size={10} spacing={2} className='grid-container'>
            <Grid size={3} offset={{ md: 3 }}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 350 }}
                        image="../Images/SAM1.jpg"
                        title="green iguana"
                    />
                </Card>
            </Grid>
            <Grid size={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, height: 350 }}>
                    <Typography variant="h3" component="h4">
                        LOREM
                    </Typography>

                    <Typography variant="h6" component="h4">
                        Aspirin is used to reduce fever and relieve mild to moderate pain from conditions such as muscle aches, toothaches, common cold, and headaches.
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                        <Typography variant="h5" component="h3"> Price : 
                            <CurrencyRupeeIcon sx={{ fontSize: '1.2rem', verticalAlign: 'middle' }} /> 56
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                        <Button  className='btn-green' startIcon={<ShoppingCartIcon />}>
                            Add to cart
                        </Button>
                    </div>
                </div>
            </Grid>
        </Grid>
        </>
      



    )
}
