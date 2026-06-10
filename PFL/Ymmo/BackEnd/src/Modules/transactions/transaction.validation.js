const Joi = require('joi');

const createTransactionSchema = Joi.object({
  propertyId: Joi.string().uuid().required(),
  offerPrice: Joi.number().positive().required(),
});

module.exports = { createTransactionSchema };
