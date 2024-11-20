import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react'
import '../custom.css'
import { IUser } from '../types/User';
import { useNavigate } from 'react-router-dom';
import api from '../API/api';
import { UserService } from '../services/UserService';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const Profile = () => {
  const logo = '../Images/logo1.png';
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [userData, setUserData] =  useState();

  const [formValues, setFormValues] = useState<IUser>({
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postcode_zip: '',
    mobileno: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (username) {
      const params = { Email: username };
      UserService.getprofile(params).then((data) => setFormValues(data.data));
    }
  }, [username])


  const [errors, setErrors] = useState<Partial<IUser>>({});
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const validate = () => {
    let tempErrors: Partial<IUser> = {};
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

    if (!formValues.city) {
      tempErrors.city = "Town/City is required";
    } else if (!nameRegex.test(formValues.city)) {
      tempErrors.city = "Town/City can only contain letters";
    }

    if (!formValues.state) {
      tempErrors.state = "State is required";
    } else if (!nameRegex.test(formValues.state)) {
      tempErrors.state = "State can only contain letters";
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

    if (!formValues.mobileno) {
      tempErrors.mobileno = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(formValues.mobileno)) {
      tempErrors.mobileno = "Mobile Number must be 10 digits";
    }

    if (!formValues.email) {
      tempErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      tempErrors.email = "Email is not valid";
    }

    if (!formValues.password) {
      tempErrors.country = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const signupHandler = () => {
    if (validate()) {
      const params = formValues;

      UserService.updateprofile(params).then((data) => {
        if (data.success === true) {
          toast.success("Profile Updated Successfully.")
          // navigate('/');
        }
      }).catch((err) => {
        console.log("Error=>", err)
      });
    }
  };

  const navigatetologin = () => {
    navigate('/login');
  }

  return (
      <div className="login-container">

        <div className="login-box">
          <p className="login-text">Update Profile Information</p>

          <Grid container size={12} spacing={2}  >

            <Grid container size={10} spacing={1} offset={{ md: 2 }} >
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
                  id="city"
                  label="Town/City"
                  color="success"
                  className='signup_text_field'
                  size='small'
                  fullWidth
                  value={formValues.city}
                  onChange={handleInputChange}
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </Grid>

              <Grid size={5}>
                <TextField
                  id="state"
                  label="State"
                  color="success"
                  className='signup_text_field'
                  size='small'
                  fullWidth
                  value={formValues.state}
                  onChange={handleInputChange}
                  error={!!errors.state}
                  helperText={errors.state}
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
                  id="mobileno"
                  label="Mobile"
                  color="success"
                  className='signup_text_field'
                  size='small'
                  fullWidth
                  value={formValues.mobileno}
                  onChange={handleInputChange}
                  error={!!errors.mobileno}
                  helperText={errors.mobileno}
                />
              </Grid>

            </Grid>

          </Grid>

          <Button
            variant="contained"
            className="blueButton"
            onClick={signupHandler}

          >
            Update Profile
          </Button>

        </div>

      </div>
  )
}
