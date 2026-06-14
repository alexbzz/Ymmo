const Joi = require('joi');
/*
  Ce fichier contient les schémas de validation pour les propriétés.
  Il utilise Joi pour définir les règles de validation des données d'entrée lors de la création et de la mise à jour d'une propriété.
  Les schémas "createPropertySchema" et "updatePropertySchema" valident les champs requis et leurs types, ainsi que les valeurs autorisées pour certains champs.
*/

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

const addPhotosSchema = Joi.array().items(
  Joi.object({
    url: Joi.string().uri().required(),
  })
).min(1).required();

module.exports = { createPropertySchema, updatePropertySchema, addPhotosSchema };