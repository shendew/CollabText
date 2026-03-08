import express from 'express';
import Doc from '../models/Doc.js';
import { v4 as uuidv4 } from 'uuid';


export const createDoc = async (req, res) => {
    const { title, desc } = req.body;
    const user = req.user.id;
    try {
        const newDoc = new Doc({ docid: uuidv4(), title: title, description: desc, doc_owner: user });
        console.log(newDoc);
        await newDoc.save();
        res.status(201).json({ message: 'Document created successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Error creating document' + e });
    }
};

export const getDocs = async (req, res) => {
    const docs = await Doc.find({});
    res.status(200).json({ docs });
};

export const getDocById = async (req, res) => {
    const { id } = req.params;
    const doc = await Doc.findById(id);
    if (!doc) {
        return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json({ doc });
};

export const getDocContent = async (req, res) => {
    const { id } = req.params;
    const doc = await Doc.findById(id);
    if (!doc) {
        return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json({ doc_content: doc.doc_content });
};

export const updateDocContent = async (req, res) => {
    const { id } = req.params;
    const { doc_content } = req.body;
    const doc = await Doc.findById(id);
    if (!doc) {
        return res.status(404).json({ message: 'Document not found' });
    }
    doc.doc_content = doc_content || doc.doc_content;
    await doc.save();
    res.status(200).json({ message: 'Document content updated successfully' });
};

export const updateDoc = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const doc = await Doc.findById(id);
    if (!doc) {
        return res.status(404).json({ message: 'Document not found' });
    }
    doc.title = title || doc.title;
    doc.description = description || doc.description;
    await doc.save();
    res.status(200).json({ message: 'Document updated successfully' });
};

export const deleteDoc = async (req, res) => {
    const { id } = req.params;
    const doc = await Doc.findById(id);
    if (!doc) {
        return res.status(404).json({ message: 'Document not found' });
    }
    await doc.remove();
    res.status(200).json({ message: 'Document deleted successfully' });
};