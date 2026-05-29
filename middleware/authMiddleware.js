import jwt from 'jsonwebtoken';
import { fail } from '../utils/responseHelper.js';

export const protect = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) return fail(res, 'Authentication token required', 401);

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return fail(res, 'Invalid or expired token', 401);
  }
};

export const protectPatient = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) return fail(res, 'Patient authentication token required', 401);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.type !== 'patient') return fail(res, 'Patient access required', 403);
    req.patient = payload;
    return next();
  } catch {
    return fail(res, 'Invalid or expired token', 401);
  }
};
