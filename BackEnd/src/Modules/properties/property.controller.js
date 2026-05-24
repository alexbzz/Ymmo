const propertyService = require('./property.service');
const { createPropertySchema, updatePropertySchema } = require('./property.validation');
const { success, error } = require('../../shared/utils/apiResponse');

const getAll = async (req, res) => {
  try {
    const properties = await propertyService.findAll(req.query);
    return success(res, properties);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const getById = async (req, res) => {
  try {
    const property = await propertyService.findById(req.params.id);
    if (!property) return error(res, 'Bien introuvable.', 404);
    return success(res, property);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const create = async (req, res) => {
  const { value, error: validationError } = createPropertySchema.validate(req.body);
  if (validationError) return error(res, validationError.details[0].message, 400);
  try {
    const property = await propertyService.create({ ...value, agentId: req.user.id });
    return success(res, property, 201);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const update = async (req, res) => {
  const { value, error: validationError } = updatePropertySchema.validate(req.body);
  if (validationError) return error(res, validationError.details[0].message, 400);
  try {
    const property = await propertyService.update(req.params.id, req.user.id, value);
    return success(res, property);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const remove = async (req, res) => {
  try {
    await propertyService.remove(req.params.id, req.user.id);
    return success(res, { message: 'Bien supprimé avec succès.' });
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

module.exports = { getAll, getById, create, update, remove };