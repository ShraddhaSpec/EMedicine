import react, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Breadcrumbs, Link, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../types/Product';
import api from '../../API/api';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';


export const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProduct>();
    useEffect(() => {
        ProductService.getproductDetails(id).then((data) => setProduct(data));
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
                            image={`/ProductImage/${product?.ImageURL}`}
                            title="green iguana"
                        />
                    </Card>
                </Grid>
                <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, height: 350 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h3" component="h4">
                            {product?.Name.toUpperCase()}
                        </Typography>

                        <Typography variant="h6" component="h4">
                            {product?.Description}
                        </Typography>

                        {/* Price Section with Auto Margin Top */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                            <Typography variant="h5" component="h3">
                                Price :
                                <CurrencyRupeeIcon sx={{ fontSize: '1.2rem', verticalAlign: 'middle' }} /> {product?.UnitPrice}
                            </Typography>
                        </div>

                        {/* Add to Cart Button at the Bottom */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <Button className='btn-green' startIcon={<ShoppingCartIcon />}>
                                Add to cart
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>

    )
}
