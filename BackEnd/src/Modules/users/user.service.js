const prisma = require('../../shared/config/database');

const findById = (id) => prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    phone: true,
    role: true,
    createdAt: true,
    agent: true
  }
});

const update = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true
    }
  });
};

const remove = (id) => prisma.user.delete({ where: { id } });

module.exports = { findById, update, remove };