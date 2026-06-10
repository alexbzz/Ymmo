const Joi = require('joi');

const registerAgentSchema = Joi.object({
  licenseNumber: Joi.string().min(3).max(50).required(),
  agencyName:    Joi.string().min(2).max(100).required(),
  bio:           Joi.string().max(500).optional(),
});

module.exports = { registerAgentSchema };
