const Joi = require('joi');

/*  Ce fichier contient les schémas de validation pour les transactions.
  Il utilise Joi pour définir les règles de validation des données d'entrée lors de la création d'une transaction.
  Le schéma "createTransactionSchema" valide que l'ID de la propriété est un UUID et que le prix de l'offre est un nombre positif.
*/

const createTransactionSchema = Joi.object({
  propertyId: Joi.string().uuid().required(),
  offerPrice: Joi.number().positive().required(),
});

module.exports = { createTransactionSchema };
