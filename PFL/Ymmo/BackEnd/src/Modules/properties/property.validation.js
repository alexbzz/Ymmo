const Joi = require('joi');

const createPropertySchema = Joi.object({
  title:       Joi.string().min(5).max(100).required(),
  description: Joi.string().min(10).required(),
  price:       Joi.number().positive().required(),
  surface:     Joi.number().positive().required(),
  rooms:       Joi.number().integer().min(1).required(),
  type:        Joi.string().valid('APARTMENT', 'HOUSE', 'LAND', 'COMMERCIAL').required(),
  address:     Joi.string().required(),
  city:        Joi.string().required(),
  postalCode:  Joi.string().required(),
  latitude:    Joi.number().optional(),
  longitude:   Joi.number().optional(),
});

const updatePropertySchema = Joi.object({
  title:       Joi.string().min(5).max(100),
  description: Joi.string().min(10),
  price:       Joi.number().positive(),
  surface:     Joi.number().positive(),
  rooms:       Joi.number().integer().min(1),
  type:        Joi.string().valid('APARTMENT', 'HOUSE', 'LAND', 'COMMERCIAL'),
  status:      Joi.string().valid('AVAILABLE', 'UNDER_OFFER', 'SOLD'),
  address:     Joi.string(),
  city:        Joi.string(),
  postalCode:  Joi.string(),
  latitude:    Joi.number(),
  longitude:   Joi.number(),
});

module.exports = { createPropertySchema, updatePropertySchema };