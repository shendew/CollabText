import { Server } from '@hocuspocus/server';
import { Logger } from '@hocuspocus/extension-logger';
import { Database } from '@hocuspocus/extension-database'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Doc from './models/Doc.js';
import { MongoClient } from 'mongodb';
import express from 'express';

dotenv.config();

// import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import authRoutes from './routes/authRoute.js';
import docRoutes from './routes/docRoute.js';
import userRoutes from './routes/userRoute.js';
import verifyToken from './middleware/verifyToken.js'

const app = express();
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('agro');
const collection = db.collection('docs');

app.use(cors({
    origin: '*', // Or your specific frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/auth', authRoutes);

app.use('/api/v1/user', verifyToken, userRoutes);
app.use('/api/v1', verifyToken, docRoutes);


const mongoExtension = new Database({
    fetch: async ({ documentName }) => {
        console.log("Loading document:", documentName);
        const doc = await collection.findOne({ docid: documentName });
        if (doc && doc.doc_content) {
            // MongoDB driver returns a mongodb.Binary for buffers often, or a raw Buffer
            const buffer = doc.doc_content.buffer || doc.doc_content;
            return new Uint8Array(buffer);
        }
        return null;
    },
    store: async ({ documentName, state }) => {
        console.log("Storing document:", documentName);
        await collection.updateOne(
            { docid: documentName },
            { $set: { doc_content: Buffer.from(state) } },
            { upsert: true }
        )
    }
});

const yjsServer = new Server({
    // port: 1234,
    extensions: [
        new Logger(),
        mongoExtension
    ],
    // Add this to handle connections explicitly
    async onConnect(data) {
        console.log("Connection authorized for:", data.documentName);
    },
    // This catches errors that cause the sudden close
    async onDisconnect(data) {
        console.log("Disconnected:", data.documentName);
    }
});

const expressServer = app.listen(1234, () => console.log('Server is running on port 1234'));

expressServer.on("upgrade", (request, socket, head) => {
    if (request.url.startsWith('/docs/')) {
        yjsServer.webSocketServer.handleUpgrade(request, socket, head, (ws) => {
            yjsServer.webSocketServer.emit("connection", ws, request);
        });
    } else {
        socket.destroy();
    }
});