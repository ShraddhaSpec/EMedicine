import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react'
import '../custom.css'
import logo from "../Images/download.png";


const Signup = () => {
  const signupHandler = () => {
    console.log("sign-up clicked")
  }

  return (
    <div className='App'>
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="Logo" className="welcome-logo" />

        </div>

        <div className="login-box">
          <p className="login-text">Login to your Account</p>

          <Grid container size={12} spacing={2}  >
            <Grid size={2}></Grid>
            <Grid container size={10} spacing={2}   >
              <Grid size={5}>
                <TextField
                  id="firstname"
                  label="First Name"
                  variant="outlined"
                  color="success"
                  className='signup_text_field'
                  size='small'
                />
              </Grid>
              <Grid size={5}>
                <TextField
                  id="lastname"
                  label="Last Name"
                  color="success"
                  className='signup_text_field'
                  size='small'
                />
              </Grid>
            </Grid>


            <Grid size={2}></Grid>
            <Grid container size={10} spacing={2}>
              <Grid size={5}>
                <TextField
                  id="address"
                  label="Address"
                  color="success"
                  className='signup_text_field'
                  placeholder='House Number Street '
                  size='small'
                />
              </Grid>

              <Grid size={5}>
                <TextField
                  id="town_city"
                  label="Town/City"
                  color="success"
                  className='signup_text_field'
                  size='small'
                />
              </Grid>
            </Grid>

            <Grid size={2}></Grid>
            <Grid container size={{ xs: 10, md: 10 }} spacing={2}>
              <Grid size={5}>
                <TextField
                  id="contry"
                  label="Country"
                  color="success"
                  className='signup_text_field'
                  size='small'
                />
              </Grid>
              <Grid size={5}>
                <TextField
                  id="postcode_zip"
                  label="Postcode/Zip"
                  color="success"
                  className='signup_text_field'
                  size='small'
                />
              </Grid>
            </Grid>

            <Grid size={2}></Grid>
            <Grid container size={10} spacing={2} >
              <Grid size={5}>
                <TextField
                  id="mobileNo"
                  label="Mobile"
                  color="success"
                  className='signup_text_field'
                  size='small'

                />
              </Grid>
              <Grid size={5}>
                <TextField
                  id="email"
                  label="Email Address"
                  color="success"
                  className='signup_text_field'
                  type='email'
                  size='small'
                />
              </Grid>

            </Grid>

          </Grid>

          <Button
            variant="contained"
            className="blueButton"
            onClick={signupHandler}

          >
            Sign Up
          </Button>
          <p>
            Already have an Account?{" "}
            <span
              className="hyper"
            >
              Login
            </span>
          </p>
          {/* {logInStatus && (
                         <Toaster key={logInStatus.key} message={logInStatus.msg} />
                     )} */}


        </div>

      </div>
    </div>
  )
}

export default Signup