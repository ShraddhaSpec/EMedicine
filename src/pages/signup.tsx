import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react'
import '../custom.css'

interface FormValues {
  firstname: string;
  lastname: string;
  address: string;
  town_city: string;
  country: string;
  postcode_zip: string;
  mobileNo: string;
  email: string;
}


const Signup = () => {
  const logo = '../Images/logo1.png';


  const [formValues, setFormValues] = useState<FormValues>({
    firstname: '',
    lastname: '',
    address: '',
    town_city: '',
    country: '',
    postcode_zip: '',
    mobileNo: '',
    email: ''
  });


  const [errors, setErrors] =  useState<Partial<FormValues>>({});
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const validate = () => {
    let tempErrors: Partial<FormValues>= {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!formValues.firstname) {
      tempErrors.firstname = "First Name is required";
    } else if (!nameRegex.test(formValues.firstname)) {
      tempErrors.firstname = "First Name can only contain letters";
    }

    if (!formValues.lastname) {
      tempErrors.lastname = "Last Name is required";
    } else if (!nameRegex.test(formValues.lastname)) {
      tempErrors.lastname = "Last Name can only contain letters";
    }

    if (!formValues.address) {
      tempErrors.address = "Address is required";
    } else if (!nameRegex.test(formValues.address)) {
      tempErrors.address = "Address can only contain letters";
    }

    if (!formValues.town_city) {
      tempErrors.town_city = "Town/City is required";
    } else if (!nameRegex.test(formValues.town_city)) {
      tempErrors.town_city = "Town/City can only contain letters";
    }

    if (!formValues.country) {
      tempErrors.country = "Country is required";
    } else if (!nameRegex.test(formValues.country)) {
      tempErrors.country = "Country can only contain letters";
    }

    if (!formValues.postcode_zip) {
      tempErrors.postcode_zip = "Postcode/Zip is required";
    } else if (!/^\d{6}$/.test(formValues.postcode_zip)) {
      tempErrors.postcode_zip = "Postcode/Zip must be 6 digits";
    }
    if (!formValues.mobileNo) {
      tempErrors.mobileNo = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(formValues.mobileNo)) {
      tempErrors.mobileNo = "Mobile Number must be 10 digits";
    }
    if (!formValues.email) {
      tempErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      tempErrors.email = "Email is not valid";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const signupHandler = () => {
    if (validate()) {
      console.log("Sign-up clicked", formValues);
        // Proceed with form submission logic
    }
  };
  return (
    <div className='App'>
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="Logo" className="welcome-logo" />

        </div>

        <div className="login-box">
          <p className="login-text">Sign up to your Account</p>

          <Grid container size={12} spacing={2}  >
       
            <Grid container size={10} spacing={1}  offset={{md:2}} >
              <Grid size={5}>
                <TextField
                  id="firstname"
                  label="First Name"
                  variant="outlined"
                  color="success"
                  className='signup_text_field'
                  size='small'
                  fullWidth
                  value={formValues.firstname}
                  onChange={handleInputChange}
                  error={!!errors.firstname}
                  helperText={errors.firstname}
                />
              </Grid>
              <Grid size={5}>
                <TextField
                  id="lastname"
                  label="Last Name"
                  color="success"
                  className='signup_text_field'
                  size='small'
                  fullWidth
                  value={formValues.lastname}
                  onChange={handleInputChange}
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                />
              </Grid>
         
              <Grid size={5}>
                <TextField
                  id="address"
                  label="Address"
                  color="success"
                  className='signup_text_field'
                  placeholder='House Number Street '
                  size='small'
                  fullWidth
                  value={formValues.address}
                  onChange={handleInputChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>

              <Grid size={5}>
                <TextField
                  id="town_city"
                  label="Town/City"
                  color="success"
                  className='signup_text_field'
                  size='small'
                  fullWidth
                  value={formValues.town_city}
                  onChange={handleInputChange}
                  error={!!errors.town_city}
                  helperText={errors.town_city}
                />
              </Grid>
           
              <Grid size={5}>
              <TextField
                  id="country"
                  label="Country"
                  color="success"
                  className='signup_text_field'
                  size='small'
                  fullWidth
                  value={formValues.country}
                  onChange={handleInputChange}
                  error={!!errors.country}
                  helperText={errors.country}
                />
              </Grid>
              <Grid size={5}>
                <TextField
                  id="postcode_zip"
                  label="Postcode/Zip"
                  color="success"
                  className='signup_text_field'
                  size='small'
                  fullWidth
                  value={formValues.postcode_zip}
                  onChange={handleInputChange}
                  error={!!errors.postcode_zip}
                  helperText={errors.postcode_zip}
                />
              </Grid>
         
              <Grid size={5}>
                <TextField
                  id="mobileNo"
                  label="Mobile"
                  color="success"
                  className='signup_text_field'
                  size='small'
                  fullWidth
                  value={formValues.mobileNo}
                  onChange={handleInputChange}
                  error={!!errors.mobileNo}
                  helperText={errors.mobileNo}
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
                  fullWidth
                  value={formValues.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
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