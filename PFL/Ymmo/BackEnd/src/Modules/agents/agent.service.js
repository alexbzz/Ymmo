const prisma = require('../../shared/config/database');

const findAll = () => prisma.agent.findMany({
  include: {
    user: { select: { firstName: true, lastName: true, email: true, phone: true } },
    properties: true
  }
});

const findById = (id) => prisma.agent.findUnique({
  where: { id },
  include: {
    user: { select: { firstName: true, lastName: true, email: true, phone: true } },
    properties: {
      include: { photos: true },
      orderBy: { createdAt: 'desc' }
    }
  }
});

const getStats = async (userId) => {
  const agent = await prisma.agent.findUnique({ where: { userId } });
  if (!agent) throw { status: 404, message: 'Profil agent introuvable.' };

  const totalProperties = await prisma.property.count({
    where: { agentId: agent.id }
  });

  const availableProperties = await prisma.property.count({
    where: { agentId: agent.id, status: 'AVAILABLE' }
  });

  const soldProperties = await prisma.property.count({
    where: { agentId: agent.id, status: 'SOLD' }
  });

  const totalTransactions = await prisma.transaction.count({
    where: { property: { agentId: agent.id } }
  });

  const pendingTransactions = await prisma.transaction.count({
    where: { property: { agentId: agent.id }, status: 'PENDING' }
  });

  return {
    agent,
    stats: {
      totalProperties,
      availableProperties,
      soldProperties,
      totalTransactions,
      pendingTransactions
    }
  };
};

const update = async (userId, data) => {
  const agent = await prisma.agent.findUnique({ where: { userId } });
  if (!agent) throw { status: 404, message: 'Profil agent introuvable.' };
  return prisma.agent.update({ where: { userId }, data });
};

module.exports = { findAll, findById, getStats, update };
