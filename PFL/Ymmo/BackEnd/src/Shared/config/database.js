const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

/*
  Ce fichier est utilisé pour configurer la connexion à la base de données PostgreSQL en utilisant Prisma.
  Il lit l'URL de connexion à partir des variables d'environnement et initialise un client Prisma avec 
  l'adaptateur PostgreSQL.
*/

require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env'),
});

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL est manquante dans le fichier .env');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
