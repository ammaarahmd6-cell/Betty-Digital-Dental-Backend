import { fail, success } from '../utils/responseHelper.js';
import { normalizeMultipartBody } from '../utils/uploadHelper.js';
import { supabase } from '../config/supabaseClient.js';

export const getTestimonials = async (req, res) => {
  const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
  if (error) return fail(res, error.message, 400);
  return success(res, data);
};

export const createTestimonial = async (req, res) => {
  const { data, error } = await supabase.from('testimonials').insert(normalizeMultipartBody(req.body)).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Testimonial created', 201);
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
