const prisma = require('../../Shared/config/database');

/*
  Ce fichier contient les fonctions de service pour gérer les favoris.
  Il interagit avec la base de données via Prisma pour ajouter, supprimer et récupérer les favoris d'un utilisateur.
  Les fonctions incluent des vérifications pour s'assurer que les biens sont disponibles et que l'utilisateur a les droits nécessaires pour effectuer certaines actions.
*/


const add = async (userId, propertyId) => {
  const property = await prisma.property.findUnique({ where: { id: propertyId } });
  if (!property) throw { status: 404, message: 'Bien introuvable.' };

  const existing = await prisma.favorite.findUnique({
    where: { userId_propertyId: { userId, propertyId } }
  });
  if (existing) throw { status: 409, message: 'Bien déjà dans les favoris.' };

  return prisma.favorite.create({
    data: { userId, propertyId },
    include: { property: true }
  });
};

const remove = async (userId, propertyId) => {
  const favorite = await prisma.favorite.findUnique({
    where: { userId_propertyId: { userId, propertyId } }
  });
  if (!favorite) throw { status: 404, message: 'Favori introuvable.' };

  return prisma.favorite.delete({
    where: { userId_propertyId: { userId, propertyId } }
  });
};

const findMyFavorites = (userId) => prisma.favorite.findMany({
  where: { userId },
  include: { property: { include: { photos: true } } },
  orderBy: { createdAt: 'desc' }
});

module.exports = { add, remove, findMyFavorites };