import {  Button, TextField } from '@mui/material';
import React from 'react'
import '../custom.css'
import logo from "../Images/download.png";

const Login = () => {

    const loginHandler =()=>{
        console.log("login clicked")
    }
  return (
    <div>
       <div className="login-container">
                <div className="image-container">
                    <img src={logo} alt="Logo" className="welcome-logo" />

                </div>
             
                    <div className="login-box">
                        <p className="login-text">Login to your Account</p>
                        <TextField                            
                            id="standard-basic"
                            label="Enter User Name"
                            variant="outlined"
                            color="secondary"
                            name="name"
                           
                        />
                        <TextField
                            // onChange={(e) => setLoginPass(e.target.value)}
                            // value={loginPass}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            color="secondary"
                            name="password"
                           
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