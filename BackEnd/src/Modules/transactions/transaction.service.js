const prisma = require('../../shared/config/database');

const create = async (buyerId, propertyId, offerPrice) => {
  const property = await prisma.property.findUnique({ where: { id: propertyId } });
  if (!property) throw { status: 404, message: 'Bien introuvable.' };
  if (property.status !== 'AVAILABLE') throw { status: 400, message: 'Ce bien n\'est plus disponible.' };

  return prisma.transaction.create({
    data: { buyerId, propertyId, offerPrice },
    include: { property: true, buyer: { select: { firstName: true, lastName: true, email: true }}}
  });
};

const findMyTransactions = (userId) => prisma.transaction.findMany({
  where: { buyerId: userId },
  include: { property: true },
  orderBy: { createdAt: 'desc' }
});

const updateStatus = async (id, agentUserId, status) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id },
    include: { property: { include: { agent: true }}}
  });
  if (!transaction) throw { status: 404, message: 'Transaction introuvable.' };
  if (transaction.property.agent.userId !== agentUserId) throw { status: 403, message: 'Accès interdit.' };

  return prisma.transaction.update({ where: { id }, data: { status } });
};

module.exports = { create, findMyTransactions, updateStatus };