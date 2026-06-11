const bcrypt = require('bcryptjs');
const prisma = require('../config/database');

const bootstrapAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || 'admin@ymmo.local';
  const password = process.env.ADMIN_PASSWORD || 'Admin123!';
  const firstName = process.env.ADMIN_FIRST_NAME || 'Admin';
  const lastName = process.env.ADMIN_LAST_NAME || 'Ymmo';

  const existingAdmin = await prisma.user.findUnique({ where: { email } });
  if (existingAdmin) {
    return false;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName,
      lastName,
      role: 'ADMIN',
    },
  });

  console.log(` Admin account created for ${email}`);
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.warn(' Admin bootstrap uses fallback local credentials. Set ADMIN_EMAIL and ADMIN_PASSWORD to override them.');
  }
  return true;
};

module.exports = bootstrapAdmin;
