import { fail, success } from '../utils/responseHelper.js';
import { normalizeMultipartBody, uploadToSupabase } from '../utils/uploadHelper.js';
import { supabase } from '../config/supabaseClient.js';

export const getGallery = async (req, res) => {
  const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
  if (error) return fail(res, error.message, 400);
  return success(res, data);
};

export const createGallery = async (req, res) => {
  const payload = normalizeMultipartBody(req.body);
  const imageUrl = await uploadToSupabase('gallery', req.file);
  if (imageUrl) payload.image_url = imageUrl;
  const { data, error } = await supabase.from('gallery').insert(payload).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Gallery image created', 201);
};

export const deleteGallery = async (req, res) => {
  const { error } = await supabase.from('gallery').delete().eq('id', req.params.id);
  if (error) return fail(res, error.message, 400);
  return success(res, null, 'Gallery image deleted');
};
