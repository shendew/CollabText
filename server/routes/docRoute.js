import express from 'express'

const router = express.Router();

import { createDoc, deleteDoc, getDocById, getDocContent, getDocs, updateDoc, updateDocContent } from '../controllers/docController.js';

router.post('/docs', createDoc);

router.get('/docs', getDocs);
router.get('/docs/:id', getDocById);
router.get('/docs/:id/content', getDocContent);
router.put('/docs/:id/content', updateDocContent);
router.put('/docs/:id', updateDoc);
router.delete('/docs/:id', deleteDoc);

export default router;