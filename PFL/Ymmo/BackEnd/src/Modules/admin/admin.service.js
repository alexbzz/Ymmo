const prisma = require('../../Shared/config/database');

const getOverview = async () => {
  const [users, properties, transactions, favorites] = await Promise.all([
    prisma.user.groupBy({
      by: ['role'],
      _count: { role: true },
    }),
    prisma.property.count(),
    prisma.transaction.count(),
    prisma.favorite.count(),
  ]);

  const roleCounts = users.reduce((accumulator, item) => {
    accumulator[item.role] = item._count.role;
    return accumulator;
  }, { CLIENT: 0, AGENT: 0, ADMIN: 0 });

  return {
    totals: {
      users: roleCounts.CLIENT + roleCounts.AGENT + roleCounts.ADMIN,
      clients: roleCounts.CLIENT,
      agents: roleCounts.AGENT,
      admins: roleCounts.ADMIN,
      properties,
      transactions,
      favorites,
    },
  };
};

const listUsers = () => prisma.user.findMany({
  orderBy: { createdAt: 'desc' },
  select: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    phone: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    agent: {
      select: {
        id: true,
        agencyName: true,
        licenseNumber: true,
      },
    },
    _count: {
      select: {
        transactions: true,
        favorites: true,
      },
    },
  },
});

const findUserById = (userId) => prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    role: true,
    _count: {
      select: {
        transactions: true,
        favorites: true,
      },
    },
  },
});

const changeRole = async (userId, role) => {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
    },
  });
};

const removeUser = (userId) => prisma.user.delete({ where: { id: userId } });

module.exports = {
  getOverview,
  listUsers,
  findUserById,
  changeRole,
  removeUser,
};
