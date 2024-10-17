import {  Button, TextField } from '@mui/material';
import React from 'react'
import '../custom.css'
import logo from "../Images/download.png";

const Login = () => {

    const loginHandler =()=>{
        console.log("login clicked")
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