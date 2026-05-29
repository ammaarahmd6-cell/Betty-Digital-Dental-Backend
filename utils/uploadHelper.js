import multer from 'multer';
import { supabase } from '../config/supabaseClient.js';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

export const uploadToSupabase = async (bucket, file) => {
  if (!file) return null;

  const extension = file.originalname.split('.').pop();
  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
  const path = `${bucket}/${fileName}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file.buffer, {
    contentType: file.mimetype,
    upsert: false
  });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

export const normalizeMultipartBody = (body) => {
  const payload = { ...body };
  if (typeof payload.featured === 'string') payload.featured = payload.featured === 'true';
  if (typeof payload.rating === 'string') payload.rating = Number(payload.rating);
  if (typeof payload.specifications === 'string') {
    try {
      payload.specifications = JSON.parse(payload.specifications || '{}');
    } catch {
      payload.specifications = {};
    }
  }
  delete payload.image;
  return payload;
};
