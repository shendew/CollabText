import express from 'express'

const router = express.Router();

import { checkAccess, createDoc, deleteDoc, getDocById, getDocContent, getDocs, getPermittedDocs, updateDoc, updateDocContent } from '../controllers/docController.js';

router.post('/docs', createDoc);

router.get('/docs', getDocs);
router.get('/docs/permitted', getPermittedDocs);
router.get('/docs/:id', getDocById);
router.get('/docs/:id/content', getDocContent);
router.put('/docs/:id/content', updateDocContent);
router.put('/docs/:id', updateDoc);
router.delete('/docs/:id', deleteDoc);
router.post('/docs/checkaccess', checkAccess);

export default router;