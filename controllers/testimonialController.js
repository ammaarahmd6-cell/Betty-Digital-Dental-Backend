import { fail, success } from '../utils/responseHelper.js';
import { normalizeMultipartBody } from '../utils/uploadHelper.js';
import { supabase } from '../config/supabaseClient.js';

export const getTestimonials = async (req, res) => {
  let query = supabase.from('testimonials').select('*').order('created_at', { ascending: false });
  if (req.query.status) query = query.eq('status', req.query.status);

  const { data, error } = await query;
  if (error) return fail(res, error.message, 400);
  return success(res, data);
};

export const createTestimonial = async (req, res) => {
  const { data, error } = await supabase.from('testimonials').insert(normalizeMultipartBody(req.body)).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Testimonial created', 201);
};

export const createPatientTestimonial = async (req, res) => {
  const review = String(req.body.review || '').trim();
  const rating = Number(req.body.rating || 5);

  if (!review) return fail(res, 'Review is required', 400);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return fail(res, 'Rating must be between 1 and 5', 400);

  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .select('full_name, country')
    .eq('id', req.patient.id)
    .maybeSingle();

  if (patientError || !patient) return fail(res, 'Patient profile not found', 404);

  const payload = {
    client_name: patient.full_name,
    country: patient.country,
    review,
    rating,
    status: 'pending'
  };

  const { data, error } = await supabase.from('testimonials').insert(payload).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Review submitted for approval', 201);
};

export const updateTestimonial = async (req, res) => {
  const { data, error } = await supabase.from('testimonials').update(normalizeMultipartBody(req.body)).eq('id', req.params.id).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Testimonial updated');
};

export const deleteTestimonial = async (req, res) => {
  const { error } = await supabase.from('testimonials').delete().eq('id', req.params.id);
  if (error) return fail(res, error.message, 400);
  return success(res, null, 'Testimonial deleted');
};
