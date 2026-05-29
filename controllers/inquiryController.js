import { fail, success } from '../utils/responseHelper.js';
import { supabase } from '../config/supabaseClient.js';

export const createInquiry = async (req, res) => {
  const { full_name, message } = req.body;
  if (!full_name || !message) return fail(res, 'Full name and message are required', 400);
  const { data, error } = await supabase.from('inquiries').insert(req.body).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Inquiry submitted', 201);
};

export const getInquiries = async (req, res) => {
  const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
  if (error) return fail(res, error.message, 400);
  return success(res, data);
};

export const updateInquiryStatus = async (req, res) => {
  const { status } = req.body;
  if (!['read', 'unread'].includes(status)) return fail(res, 'Invalid status', 400);
  const { data, error } = await supabase.from('inquiries').update({ status }).eq('id', req.params.id).select().single();
  if (error) return fail(res, error.message, 400);
  return success(res, data, 'Inquiry status updated');
};

export const deleteInquiry = async (req, res) => {
  const { error } = await supabase.from('inquiries').delete().eq('id', req.params.id);
  if (error) return fail(res, error.message, 400);
  return success(res, null, 'Inquiry deleted');
};
