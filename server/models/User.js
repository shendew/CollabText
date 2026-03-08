import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);