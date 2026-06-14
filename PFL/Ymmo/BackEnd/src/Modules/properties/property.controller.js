const propertyService = require('./property.service');
const { createPropertySchema, updatePropertySchema, addPhotosSchema } = require('./property.validation');
const { success, error } = require('../../Shared/utils/apiResponse');

/*
  Ce fichier contient les contrôleurs pour gérer les biens.
  Il définit les fonctions pour récupérer tous les biens, récupérer un bien par ID, créer un bien, mettre à jour un bien, supprimer un bien et ajouter des photos à un bien.
  Chaque fonction utilise le service de propriété pour interagir avec la base de données et renvoie une réponse JSON appropriée.
*/

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

const addPhotos = async (req, res) => {
  const { value, error: validationError } = addPhotosSchema.validate(req.body);
  if (validationError) return error(res, validationError.details[0].message, 400);
  try {
    const photos = await propertyService.addPhotos(req.params.id, req.user.id, value);
    return success(res, photos, 201);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

module.exports = { getAll, getById, create, update, remove, addPhotos };