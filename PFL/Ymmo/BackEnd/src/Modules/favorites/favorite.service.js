const prisma = require('../../shared/config/database');

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