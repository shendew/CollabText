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
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-4">Welcome Back to ColDoc</h2>

            <form onSubmit={handleSubmit} className="flex flex-col h-min self-center items-center justify-center rounded-lg shadow-md p-8 mx-auto w-96 bg-gray-50">
                <input className='border-gray-600 border rounded-sm px-2 py-1 mb-2' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input className='border-gray-600 border rounded-sm px-2 py-1 mb-5' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
                <p className="text-sm text-gray-500 mt-4">Don't have an account? <span onClick={() => navigate('/register')} className="text-blue-500 hover:text-blue-700 cursor-pointer">Register here</span></p>
            </form>
        </div>
    );
};

export default Login;