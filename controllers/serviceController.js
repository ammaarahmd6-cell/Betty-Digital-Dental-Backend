import { fail, success } from '../utils/responseHelper.js';
import { normalizeMultipartBody, uploadToSupabase } from '../utils/uploadHelper.js';
import { supabase } from '../config/supabaseClient.js';

export const getServices = async (req, res) => {
  const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
  if (error) return fail(res, error.message, 400);
  return success(res, data);
};

export const createService = async (req, res) => {
  const payload = normalizeMultipartBody(req.body);
  const imageUrl = await uploadToSupabase('services', req.file);
  if (imageUrl) payload.image_url = imageUrl;
  const { data, error } = await supabase.from('services').insert(payload).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Service created', 201);
};

export const updateService = async (req, res) => {
  const payload = normalizeMultipartBody(req.body);
  const imageUrl = await uploadToSupabase('services', req.file);
  if (imageUrl) payload.image_url = imageUrl;
  const { data, error } = await supabase.from('services').update(payload).eq('id', req.params.id).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Service updated');
};

export const deleteService = async (req, res) => {
  const { error } = await supabase.from('services').delete().eq('id', req.params.id);
  if (error) return fail(res, error.message, 400);
  return success(res, null, 'Service deleted');
};
