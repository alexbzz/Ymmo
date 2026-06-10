const prisma = require('../../shared/config/database');

const findAll = async (filters = {}) => {
  const where = {};
  if (filters.city)     where.city   = { contains: filters.city, mode: 'insensitive' };
  if (filters.type)     where.type   = filters.type;
  if (filters.status)   where.status = filters.status;
  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) where.price.gte = Number(filters.minPrice);
    if (filters.maxPrice) where.price.lte = Number(filters.maxPrice);
  }
  if (filters.minSurface) where.surface = { gte: Number(filters.minSurface) };

  return prisma.property.findMany({
    where,
    include: {
      agent: { include: { user: { select: { firstName: true, lastName: true, email: true }}}},
      photos: true
    },
    orderBy: { createdAt: 'desc' }
  });
};

const findById = (id) => prisma.property.findUnique({
  where: { id },
  include: {
    agent: { include: { user: { select: { firstName: true, lastName: true, email: true, phone: true }}}},
    photos: true
  }
});

const create = async (data) => {
  const agent = await prisma.agent.findUnique({ where: { userId: data.agentId } });
  if (!agent) throw { status: 403, message: 'Vous devez être agent pour publier un bien.' };
  return prisma.property.create({ data: { ...data, agentId: agent.id } });
};

const update = async (id, agentUserId, data) => {
  const property = await prisma.property.findUnique({
    where: { id }, include: { agent: true }
  });
  if (!property) throw { status: 404, message: 'Bien introuvable.' };
  if (property.agent.userId !== agentUserId) throw { status: 403, message: 'Vous ne pouvez modifier que vos propres biens.' };
  return prisma.property.update({ where: { id }, data });
};

const remove = async (id, agentUserId) => {
  const property = await prisma.property.findUnique({
    where: { id }, include: { agent: true }
  });
  if (!property) throw { status: 404, message: 'Bien introuvable.' };
  if (property.agent.userId !== agentUserId) throw { status: 403, message: 'Vous ne pouvez supprimer que vos propres biens.' };
  return prisma.property.delete({ where: { id } });
};

const addPhotos = async (propertyId, agentUserId, photos) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId }, include: { agent: true }
  });
  if (!property) throw { status: 404, message: 'Bien introuvable.' };
  if (property.agent.userId !== agentUserId) throw { status: 403, message: 'Vous ne pouvez ajouter des photos qu\'à vos propres biens.' };

  await prisma.photo.createMany({
    data: photos.map(({ url }) => ({ url, propertyId })),
  });

  return prisma.photo.findMany({ where: { propertyId } });
};

module.exports = { findAll, findById, create, update, remove, addPhotos };