import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = new User({ userid: uuidv4(), email, name, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user' });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.userid }, "mathematicallyjwtsecret", { expiresIn: '30d' });
    res.json({ token });
}
