export const success = (res, data = null, message = 'Success', status = 200) => {
  return res.status(status).json({ success: true, message, data });
};

export const fail = (res, message = 'Something went wrong', status = 500, details = null) => {
  return res.status(status).json({ success: false, message, details });
};

export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
