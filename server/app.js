import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoute.js';
import docRoutes from './routes/docRoute.js';
import verifyToken from './middleware/verifyToken.js'
dotenv.config();



const app = express();

app.use(express.json())
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/auth', authRoutes);

app.use('/api/v1', verifyToken, docRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});