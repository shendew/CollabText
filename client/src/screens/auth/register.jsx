import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [repassword, setRepassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== repassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await axios.post(API_URL + 'auth/register', { email, password, name });
            alert('Registration successful');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to ColDoc</h2>

            <form onSubmit={handleSubmit} className="flex flex-col h-min self-center items-center justify-center rounded-lg shadow-md p-8 mx-auto w-96 bg-gray-50">
                <input className='border-gray-600 border rounded-sm px-2 py-1 mb-2' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input className='border-gray-600 border rounded-sm px-2 py-1 mb-2' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input className='border-gray-600 border rounded-sm px-2 py-1 mb-2' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <input className='border-gray-600 border rounded-sm px-2 py-1 mb-5' type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} placeholder="Re-enter Password" required />

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Register
                </button>
                <p className="text-sm text-gray-500 mt-4">Already have an account? <span onClick={() => navigate('/login')} className="text-blue-500 hover:text-blue-700 cursor-pointer">Login here</span></p>
            </form>
        </div>
    );
};
export default Register;