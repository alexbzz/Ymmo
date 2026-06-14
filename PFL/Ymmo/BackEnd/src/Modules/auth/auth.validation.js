const Joi = require('joi');

/*
  Ce fichier contient les schémas de validation pour les utilisateurs.
  Il utilise Joi pour définir les règles de validation des données d'entrée lors de l'inscription et de la connexion d'un utilisateur.
  Les schémas "registerSchema" et "loginSchema" valident les champs requis et leurs types.
*/

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName:  Joi.string().min(2).max(50).required(),
  email:     Joi.string().email().required(),
  password:  Joi.string().min(6).required(),
  phone:     Joi.string().optional(),
  role:      Joi.string().valid('CLIENT', 'AGENT').default('CLIENT')
});

const loginSchema = Joi.object({
  email:    Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };