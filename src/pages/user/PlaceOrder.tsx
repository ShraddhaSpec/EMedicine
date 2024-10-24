import React from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const PlaceOrder = () => {
    return (
        <>
            <Box sx={{ padding: '20px' }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '20px' }}>
                    <Link underline="hover" color="inherit" href="/">
                        <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Home
                    </Link>
                    <Typography color="text.primary">Place Order</Typography>
                </Breadcrumbs>

                <Typography variant="h4" component="div" sx={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
                    Place Order
                </Typography>
            </Box>

            <Box component="section" >
                <Typography variant="h4" component="div" sx={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
                    Shipping Address
                </Typography>
                <Grid container spacing={2} padding={3} fontWeight={'bold'} color={'#747d88'} fontSize={'1rem'} fontFamily={'Open Sans, sans-serif'} size={12}>
                    <Grid container size={6} spacing={2}>
                        <Grid size={6}>
                            <TextField label="First Name" hiddenLabel id="standard-size-normal" variant="standard" fullWidth />
                        </Grid>
                        <Grid size={6}>
                            <TextField label="last Name" id="standard-size-normal" variant="standard" fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <TextField label="Address" id="standard-size-normal" variant="standard" fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <TextField label="Town/City" id="standard-size-normal" variant="standard" fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <TextField label="Country" id="standard-size-normal" variant="standard" fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <TextField label="Postcode/Zip" id="standard-size-normal" variant="standard" fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <TextField label="Mobile" id="standard-size-normal" variant="standard" fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <TextField label="Email Address" id="standard-size-normal" variant="standard" fullWidth />
                        </Grid>
                        <Grid size={12}>
                            <h4 style={{ marginBottom: '10px' }}>Payment Method</h4>
                            <RadioGroup name="use-radio-group" defaultValue="COD" style={{ borderBottom: '1px solid #747d88' }}>
                                <FormControlLabel value="Net banking" label="Net banking" control={<Radio />} />
                                <FormControlLabel value="COD" label="Cash on delivery" control={<Radio />} />
                                <FormControlLabel value="Paypal" label="Paypal" control={<Radio />} />
                                <FormControlLabel value="Gpay" label="Google Pay" control={<Radio />} />
                            </RadioGroup>

                            <Button variant="outlined" style={{ borderRadius: '50rem', marginTop: '10px' }}>Place Order</Button>
                        </Grid>

                        {/* </Grid> */}
                    </Grid>



                </Grid>
            </Box>
        </>

    )
}

export default PlaceOrder