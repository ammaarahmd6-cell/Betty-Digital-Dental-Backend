import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isSupabaseConfigured, supabase } from '../config/supabaseClient.js';
import { fail, success } from '../utils/responseHelper.js';

const publicAdmin = (admin) => ({ id: admin.id, name: admin.name, email: admin.email, role: admin.role });
const ADMIN_EMAIL = 'ammaarahmd6@gmail.com';
const ADMIN_PASSWORD = 'Laddiadmin@3565';

export const ensureDefaultAdmin = async () => {
  if (!isSupabaseConfigured) return;
  const password = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await supabase.from('admins').delete().eq('email', 'admin@dental.com');

  const { data } = await supabase.from('admins').select('id').eq('email', ADMIN_EMAIL).maybeSingle();
  if (data) {
    await supabase.from('admins').update({ name: 'Betty Wong', password, role: 'admin' }).eq('email', ADMIN_EMAIL);
    return;
  }

  const { error } = await supabase.from('admins').insert({
    name: 'Betty Wong',
    email: ADMIN_EMAIL,
    password,
    role: 'admin'
  });
  if (error) console.warn('Default admin could not be created:', error.message);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return fail(res, 'Email and password are required', 400);
  if (email !== ADMIN_EMAIL) return fail(res, 'Only the primary admin account can sign in here', 403);

  const { data: admin, error } = await supabase.from('admins').select('*').eq('email', email).maybeSingle();
  if (error || !admin) return fail(res, 'Invalid credentials', 401);

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return fail(res, 'Invalid credentials', 401);

  const token = jwt.sign(publicAdmin(admin), process.env.JWT_SECRET, { expiresIn: '7d' });
  return res.json({ success: true, token, admin: publicAdmin(admin) });
};

export const profile = async (req, res) => success(res, req.admin, 'Profile loaded');
