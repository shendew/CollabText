import React, { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [repassword, setRepassword] = useState('');

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
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <input type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} placeholder="Re-enter Password" required />

            <button type="submit">Register</button>
        </form>
    );
};
export default Register;