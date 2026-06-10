const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const prisma = require('../../shared/config/database');

const register = async ({ firstName, lastName, email, password, phone, role }) => {
  // Vérifie si l'email existe déjà
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw { status: 409, message: 'Cet email est déjà utilisé.' };

  // Hash du mot de passe
  const passwordHash = await bcrypt.hash(password, 12);

  // Création de l'utilisateur
  const user = await prisma.user.create({
    data: { firstName, lastName, email, passwordHash, phone, role },
    select: { id: true, email: true, firstName: true, lastName: true, role: true }
  });

  return user;
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 401, message: 'Email ou mot de passe incorrect.' };

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw { status: 401, message: 'Email ou mot de passe incorrect.' };

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    token,
    user: { id: user.id, email: user.email, firstName: user.firstName, role: user.role }
  };
};

module.exports = { register, login };