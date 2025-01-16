// src/components/Login.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'user' && password === 'password') {
            setAuthenticated(true);
            navigate('/calendar');
        } else {
            alert('Invalid credentials! Use username: user and password: password');
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: '50px auto' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Box>
        </Paper>
    );
};

export default Login;

