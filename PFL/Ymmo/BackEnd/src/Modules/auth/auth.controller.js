const authService = require('./auth.service');
const { registerSchema, loginSchema } = require('./auth.validation');
const { success, error } = require('../../shared/utils/apiResponse');

const register = async (req, res) => {
  const { value, error: validationError } = registerSchema.validate(req.body);
  if (validationError) return error(res, validationError.details[0].message, 400);

  try {
    const user = await authService.register(value);
    return success(res, user, 201);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const login = async (req, res) => {
  const { value, error: validationError } = loginSchema.validate(req.body);
  if (validationError) return error(res, validationError.details[0].message, 400);

  try {
    const result = await authService.login(value);
    return success(res, result, 200);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

module.exports = { register, login };