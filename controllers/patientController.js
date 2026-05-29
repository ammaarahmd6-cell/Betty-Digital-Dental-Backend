import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabaseClient.js';
import { fail, success } from '../utils/responseHelper.js';

const requiredFields = ['full_name', 'email', 'password', 'phone', 'country', 'city', 'address', 'date_of_birth', 'gender', 'medical_history'];
const profileFields = ['full_name', 'email', 'phone', 'country', 'city', 'address', 'date_of_birth', 'gender', 'medical_history', 'dental_concern', 'preferred_service'];

const publicPatient = (patient) => ({
  id: patient.id,
  full_name: patient.full_name,
  email: patient.email,
  phone: patient.phone,
  country: patient.country,
  city: patient.city,
  address: patient.address,
  date_of_birth: patient.date_of_birth,
  gender: patient.gender,
  medical_history: patient.medical_history,
  dental_concern: patient.dental_concern,
  preferred_service: patient.preferred_service,
  profile_completed: patient.profile_completed,
  created_at: patient.created_at
});

const profileCompleted = (payload) => {
  return ['full_name', 'email', 'phone', 'country', 'city', 'address', 'date_of_birth', 'gender', 'medical_history'].every((field) => Boolean(String(payload[field] || '').trim()));
};

const tokenFor = (patient) => jwt.sign({ id: patient.id, email: patient.email, type: 'patient' }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const registerPatient = async (req, res) => {
  const missing = requiredFields.filter((field) => !String(req.body[field] || '').trim());
  if (missing.length) return fail(res, `Missing required fields: ${missing.join(', ')}`, 400);

  const { data: existing } = await supabase.from('patients').select('id').eq('email', req.body.email).maybeSingle();
  if (existing) return fail(res, 'A patient account already exists with this email', 409);

  const payload = Object.fromEntries(profileFields.map((field) => [field, req.body[field] || null]));
  payload.password = await bcrypt.hash(req.body.password, 12);
  payload.profile_completed = profileCompleted(payload);

  const { data, error } = await supabase.from('patients').insert(payload).select().single();
  if (error) return fail(res, error.message, 400);

  return res.status(201).json({ success: true, token: tokenFor(data), patient: publicPatient(data) });
};

export const loginPatient = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return fail(res, 'Email and password are required', 400);

  const { data: patient, error } = await supabase.from('patients').select('*').eq('email', email).maybeSingle();
  if (error || !patient) return fail(res, 'Invalid patient credentials', 401);

  const match = await bcrypt.compare(password, patient.password);
  if (!match) return fail(res, 'Invalid patient credentials', 401);

  return res.json({ success: true, token: tokenFor(patient), patient: publicPatient(patient) });
};

export const getPatientProfile = async (req, res) => {
  const { data, error } = await supabase.from('patients').select('*').eq('id', req.patient.id).maybeSingle();
  if (error || !data) return fail(res, 'Patient profile not found', 404);
  return success(res, publicPatient(data), 'Patient profile loaded');
};

export const updatePatientProfile = async (req, res) => {
  const payload = {};
  profileFields.forEach((field) => {
    if (field !== 'email' && Object.prototype.hasOwnProperty.call(req.body, field)) payload[field] = req.body[field];
  });
  payload.profile_completed = profileCompleted({ ...req.body, email: req.patient.email });

  const { data, error } = await supabase.from('patients').update(payload).eq('id', req.patient.id).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, publicPatient(data), 'Patient profile updated');
};

export const createPatientInquiry = async (req, res) => {
  const { interested_product, message, request_type, preferred_contact, appointment_date } = req.body;
  if (!message) return fail(res, 'Request message is required', 400);

  const { data: patient, error: patientError } = await supabase.from('patients').select('*').eq('id', req.patient.id).maybeSingle();
  if (patientError || !patient) return fail(res, 'Patient profile not found', 404);

  const payload = {
    patient_id: patient.id,
    full_name: patient.full_name,
    email: patient.email,
    phone: patient.phone,
    country: patient.country,
    company_name: 'Patient Portal',
    interested_product: interested_product || patient.preferred_service || request_type || 'Digital dental consultation',
    message,
    request_type: request_type || 'consultation',
    preferred_contact: preferred_contact || 'WhatsApp',
    appointment_date: appointment_date || null,
    status: 'unread'
  };

  const { data, error } = await supabase.from('inquiries').insert(payload).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Patient request submitted', 201);
};

export const getPatientInquiries = async (req, res) => {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('patient_id', req.patient.id)
    .order('created_at', { ascending: false });

  if (error) return fail(res, error.message, 400);
  return success(res, data);
};
