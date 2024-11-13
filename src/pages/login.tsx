import { Button, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react'
import '../custom.css';
import { useNavigate } from 'react-router-dom';
import api from '../API/api';
import { UserService } from '../services/UserService';

const Login = () => {
    const logo = '../Images/logo1.png';
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


    const loginHandler = (event: any) => {
        event.preventDefault();
        if (validateForm()) {
            const params = { email: username, password: password };
            UserService.login(params).then((data) => {
                localStorage.setItem("userId", data.data._id)
                localStorage.setItem("username", data.data.email)
                localStorage.setItem("token", data.token)
                localStorage.setItem("role", data.data.role)
                localStorage.setItem("CartQty", "1")
                //navigate('/');
                window.location.href = '/';
            });
        }
    }

    const signupHandler = () => {
        navigate('/signup');
    }

    return (
        <div className='App'>
            <div className="login-container">
                <div className="image-container">
                    <img src={logo} alt="Logo" className="welcome-logo" color='white' />
                </div>

                <Box
                    component="form"
                    onSubmit={loginHandler}
                    className="login-box"
                //   sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}
                >
                    {/* <div className="login-box"> */}
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
                        type='submit'
                    // onClick={loginHandler}

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

                    {/* </div> */}
                </Box>
            </div>
        </div>
    )
}

export default Login