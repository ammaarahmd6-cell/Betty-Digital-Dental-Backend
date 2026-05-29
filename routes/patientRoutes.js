import express from 'express';
import { createPatientInquiry, getPatientInquiries, getPatientProfile, loginPatient, registerPatient, updatePatientProfile } from '../controllers/patientController.js';
import { protectPatient } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.get('/me', protectPatient, getPatientProfile);
router.put('/me', protectPatient, updatePatientProfile);
router.get('/inquiries', protectPatient, getPatientInquiries);
router.post('/inquiries', protectPatient, createPatientInquiry);

export default router;
