import { fail, success } from '../utils/responseHelper.js';
import { normalizeMultipartBody, uploadToSupabase } from '../utils/uploadHelper.js';
import { supabase } from '../config/supabaseClient.js';

const table = 'products';

export const getProducts = async (req, res) => {
  let query = supabase.from(table).select('*').order('created_at', { ascending: false });
  if (req.query.featured === 'true') query = query.eq('featured', true);
  if (req.query.category) query = query.eq('category', req.query.category);
  if (req.query.status) query = query.eq('status', req.query.status);
  const { data, error } = await query;
  if (error) return fail(res, error.message, 400);
  return success(res, data);
};

export const getProduct = async (req, res) => {
  const { data, error } = await supabase.from(table).select('*').eq('id', req.params.id).maybeSingle();
  if (error || !data) return fail(res, 'Product not found', 404);
  return success(res, data);
};

export const createProduct = async (req, res) => {
  const payload = normalizeMultipartBody(req.body);
  const imageUrl = await uploadToSupabase('products', req.file);
  if (imageUrl) payload.image_url = imageUrl;
  const { data, error } = await supabase.from(table).insert(payload).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Product created', 201);
};

export const updateProduct = async (req, res) => {
  const payload = normalizeMultipartBody(req.body);
  const imageUrl = await uploadToSupabase('products', req.file);
  if (imageUrl) payload.image_url = imageUrl;
  const { data, error } = await supabase.from(table).update(payload).eq('id', req.params.id).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Product updated');
};

export const deleteProduct = async (req, res) => {
  const { error } = await supabase.from(table).delete().eq('id', req.params.id);
  if (error) return fail(res, error.message, 400);
  return success(res, null, 'Product deleted');
};
