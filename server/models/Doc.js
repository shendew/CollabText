import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
    docid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    doc_content: { type: Buffer },
    doc_owner: { type: String, required: true },
})

export default mongoose.model('Doc', docSchema);