import { fail } from '../utils/responseHelper.js';

export const requireAdmin = (req, res, next) => {
  if (req.admin?.role !== 'admin') return fail(res, 'Admin access required', 403);
  return next();
};
