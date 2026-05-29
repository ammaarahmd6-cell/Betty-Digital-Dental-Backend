import { fail, success } from '../utils/responseHelper.js';
import { normalizeMultipartBody, uploadToSupabase } from '../utils/uploadHelper.js';
import { supabase } from '../config/supabaseClient.js';

const slugify = (value) => String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const getBlogs = async (req, res) => {
  const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
  if (error) return fail(res, error.message, 400);
  return success(res, data);
};

export const getBlog = async (req, res) => {
  const { data, error } = await supabase.from('blogs').select('*').eq('slug', req.params.slug).maybeSingle();
  if (error || !data) return fail(res, 'Blog not found', 404);
  return success(res, data);
};

export const createBlog = async (req, res) => {
  const payload = normalizeMultipartBody(req.body);
  payload.slug = payload.slug || slugify(payload.title);
  const imageUrl = await uploadToSupabase('blogs', req.file);
  if (imageUrl) payload.image_url = imageUrl;
  const { data, error } = await supabase.from('blogs').insert(payload).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Blog created', 201);
};

export const updateBlog = async (req, res) => {
  const payload = normalizeMultipartBody(req.body);
  payload.slug = payload.slug || slugify(payload.title);
  const imageUrl = await uploadToSupabase('blogs', req.file);
  if (imageUrl) payload.image_url = imageUrl;
  const { data, error } = await supabase.from('blogs').update(payload).eq('id', req.params.id).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Blog updated');
};

export const deleteBlog = async (req, res) => {
  const { error } = await supabase.from('blogs').delete().eq('id', req.params.id);
  if (error) return fail(res, error.message, 400);
  return success(res, null, 'Blog deleted');
};
