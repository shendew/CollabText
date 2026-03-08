import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authcontext.jsx";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL + 'auth/login', { email, password });
            alert('login successful');
            login(response.data.token);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;