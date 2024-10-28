import {  Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import '../custom.css';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../API/api';

const Login = () => {
    const logo = '../Images/logo1.png';

    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    

  
    const validateForm = () => {
        let valid = true;
        const errors = { username: '', password: '' };

        if (!username) {
            errors.username = 'Username is required';
            valid = false;
        }

        if (!password) {
            errors.password = 'Password is required';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    
    const loginHandler =()=>{
        if (validateForm()) { 
            const params = { email: username, password: password };
            api.post('/users/login', params)
            .then((res) => {
              console.log("res=>", res)
              if (res.status === 200) {
                if(res.data.success === true){  
                        
                  login(res.data.data.role);
                  localStorage.setItem("username",res.data.data.email)
                    localStorage.setItem("token",res.data.token) 
                    localStorage.setItem("role",res.data.data.role)   
                  navigate('/', { replace: true });  
                   
                }
              }
            }).catch((err )=>{
              console.log("Error=>", err)
            });
            
        
        }
    }

    const signupHandler = () =>{
        navigate('/signup');
    }
    
  return (
    <div className='App'>
       <div className="login-container">
                <div className="image-container">
                    <img src={logo} alt="Logo" className="welcome-logo" color='white' />

                </div>
             
                    <div className="login-box">
                        <p className="login-text">Login to your Account</p>
                        <TextField                            
                            id="standard-basic"
                            label="Enter User Name"
                            variant="outlined"
                            color="success"
                            name="name"
                            className='login_text_field'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={!!errors.username}
                            helperText={errors.username}
                           
                        />
                        <TextField
                            // onChange={(e) => setLoginPass(e.target.value)}
                            // value={loginPass}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            color="success"
                            name="password"
                            className='login_text_field'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <Button
                        variant="contained"
                        className="blueButton" 
                        onClick={loginHandler}
                        
                        >
                        Login
                        </Button>
                        <p>
                            Don't have an Account ?{" "}
                            <span
                                className="hyper"
                                onClick={signupHandler}                              
                            >
                                Sign Up
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

export default Login