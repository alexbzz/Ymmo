const bcrypt = require('bcryptjs');
const prisma = require('../src/Shared/config/database');

const PROPERTY_TYPE_LABELS = {
  APARTMENT: 'Appartement',
  HOUSE: 'Maison',
};

const makePhotos = (seedBase, count = 3) =>
  Array.from({ length: count }, (_, index) => ({
    url: `https://picsum.photos/seed/${seedBase}-${index + 1}/1200/800`,
  }));

const createDescription = (property) => {
  const typeLabel = PROPERTY_TYPE_LABELS[property.type] || property.type;
  return `${typeLabel} de ${property.surface} mÂ², ${property.rooms} pièce(s), situé à ${property.district} à ${property.city}. Idéal pour une vie confortable et lumineuse.`;
};

const agents = [
  {
    key: 'paris-lyon',
    email: 'agent.paris.lyon@ymmo.local',
    firstName: 'Claire',
    lastName: 'Martin',
    password: 'Agent123!',
    licenseNumber: 'AG-2026-001',
    agencyName: 'Ymmo Paris Lyon',
    bio: 'Spécialiste des biens urbains haut de gamme à Paris et Lyon.',
  },
  {
    key: 'marseille-bordeaux',
    email: 'agent.marseille.bordeaux@ymmo.local',
    firstName: 'Nicolas',
    lastName: 'Bernard',
    password: 'Agent123!',
    licenseNumber: 'AG-2026-002',
    agencyName: 'Ymmo Méditerranée',
    bio: 'Expert des maisons familiales et appartements avec caractère.',
  },
  {
    key: 'nantes-lille',
    email: 'agent.nantes.lille@ymmo.local',
    firstName: 'Sophie',
    lastName: 'Dubois',
    password: 'Agent123!',
    licenseNumber: 'AG-2026-003',
    agencyName: 'Ymmo Ouest Nord',
    bio: 'Accompagnement sur les biens familiaux et les résidences principales.',
  },
];

const clients = [
  { email: 'client.anna@ymmo.local', firstName: 'Anna', lastName: 'Lefèvre', password: 'Client123!' },
  { email: 'client.marc@ymmo.local', firstName: 'Marc', lastName: 'Petit', password: 'Client123!' },
  { email: 'client.sonia@ymmo.local', firstName: 'Sonia', lastName: 'Bernier', password: 'Client123!' },
];

const catalog = [
  {
    city: 'Paris',
    district: 'Triangle d’or',
    postalCode: '75008',
    agentKey: 'paris-lyon',
    properties: [
      { title: 'Haussmannien avec balcon filant', type: 'APARTMENT', surface: 82, rooms: 4, price: 945000, status: 'AVAILABLE', address: '18 avenue Montaigne' },
      { title: 'Loft lumineux proche Bastille', type: 'APARTMENT', surface: 96, rooms: 3, price: 1120000, status: 'UNDER_OFFER', address: '24 rue de la Roquette' },
      { title: 'Duplex familial au Luxembourg', type: 'APARTMENT', surface: 118, rooms: 5, price: 1390000, status: 'AVAILABLE', address: '11 rue Vavin' },
      { title: 'Maison de ville aux Batignolles', type: 'HOUSE', surface: 145, rooms: 6, price: 1680000, status: 'SOLD', address: '9 rue des Moines' },
      { title: 'Studio premium à Montmartre', type: 'APARTMENT', surface: 31, rooms: 1, price: 329000, status: 'AVAILABLE', address: '6 rue Lepic' },
    ],
  },
  {
    city: 'Lyon',
    district: 'Presqu’Ã®le',
    postalCode: '69002',
    agentKey: 'paris-lyon',
    properties: [
      { title: 'T3 vue Saône', type: 'APARTMENT', surface: 74, rooms: 3, price: 485000, status: 'AVAILABLE', address: '7 rue de la République' },
      { title: 'Canut rénové à Croix-Rousse', type: 'APARTMENT', surface: 91, rooms: 4, price: 675000, status: 'UNDER_OFFER', address: '15 montée de la Grande-Côte' },
      { title: 'Maison familiale à Tassin', type: 'HOUSE', surface: 132, rooms: 5, price: 795000, status: 'AVAILABLE', address: '3 chemin des Fossés' },
      { title: 'Duplex moderne à Confluence', type: 'APARTMENT', surface: 88, rooms: 4, price: 558000, status: 'AVAILABLE', address: '21 quai Rambaud' },
      { title: 'Appartement contemporain Part-Dieu', type: 'APARTMENT', surface: 57, rooms: 2, price: 349000, status: 'SOLD', address: '48 cours Lafayette' },
    ],
  },
  {
    city: 'Marseille',
    district: 'Vieux-Port',
    postalCode: '13001',
    agentKey: 'marseille-bordeaux',
    properties: [
      { title: 'Appartement vue mer', type: 'APARTMENT', surface: 85, rooms: 3, price: 599000, status: 'AVAILABLE', address: '12 quai de Rive Neuve' },
      { title: 'Bastide provençale en ville', type: 'HOUSE', surface: 162, rooms: 6, price: 985000, status: 'AVAILABLE', address: '6 boulevard de la Corderie' },
      { title: 'T4 lumineux à Endoume', type: 'APARTMENT', surface: 78, rooms: 4, price: 435000, status: 'UNDER_OFFER', address: '22 rue d’Endoume' },
      { title: 'Maison avec jardin à Mazargues', type: 'HOUSE', surface: 141, rooms: 5, price: 725000, status: 'AVAILABLE', address: '8 avenue de Mazargues' },
      { title: 'Duplex rooftop à la Joliette', type: 'APARTMENT', surface: 103, rooms: 4, price: 685000, status: 'SOLD', address: '14 rue du Panier' },
    ],
  },
  {
    city: 'Bordeaux',
    district: 'Chartrons',
    postalCode: '33000',
    agentKey: 'marseille-bordeaux',
    properties: [
      { title: 'Appartement pierre bordelaise', type: 'APARTMENT', surface: 76, rooms: 3, price: 529000, status: 'AVAILABLE', address: '17 cours Portal' },
      { title: 'Ã‰choppe rénovée à Caudéran', type: 'HOUSE', surface: 118, rooms: 5, price: 658000, status: 'AVAILABLE', address: '34 avenue d’Arès' },
      { title: 'Loft rénové à Saint-Michel', type: 'APARTMENT', surface: 92, rooms: 4, price: 614000, status: 'UNDER_OFFER', address: '9 rue Leyteire' },
      { title: 'T2 balcon à Bacalan', type: 'APARTMENT', surface: 49, rooms: 2, price: 279000, status: 'AVAILABLE', address: '4 rue Achard' },
      { title: 'Maison familiale Saint-Augustin', type: 'HOUSE', surface: 155, rooms: 6, price: 845000, status: 'SOLD', address: '21 rue de Bègles' },
    ],
  },
  {
    city: 'Nantes',
    district: 'ÃŽle de Nantes',
    postalCode: '44000',
    agentKey: 'nantes-lille',
    properties: [
      { title: 'Appartement lumineux sur l’Ã®le', type: 'APARTMENT', surface: 68, rooms: 3, price: 389000, status: 'AVAILABLE', address: '5 rue des Machines' },
      { title: 'Maison nantaise à Procé', type: 'HOUSE', surface: 132, rooms: 5, price: 598000, status: 'AVAILABLE', address: '18 boulevard de Longchamp' },
      { title: 'Duplex terrasse à Canclaux', type: 'APARTMENT', surface: 97, rooms: 4, price: 545000, status: 'UNDER_OFFER', address: '10 rue des Dervallières' },
      { title: 'T4 centre-ville au Bouffay', type: 'APARTMENT', surface: 84, rooms: 4, price: 469000, status: 'AVAILABLE', address: '12 rue de la Juiverie' },
      { title: 'Maison de caractère à Zola', type: 'HOUSE', surface: 176, rooms: 7, price: 915000, status: 'SOLD', address: '3 rue des Roches' },
    ],
  },
  {
    city: 'Lille',
    district: 'Vieux-Lille',
    postalCode: '59800',
    agentKey: 'nantes-lille',
    properties: [
      { title: 'Appartement cossu Vieux-Lille', type: 'APARTMENT', surface: 71, rooms: 3, price: 319000, status: 'AVAILABLE', address: '8 rue de la Monnaie' },
      { title: 'Maison de famille à Wazemmes', type: 'HOUSE', surface: 124, rooms: 5, price: 448000, status: 'AVAILABLE', address: '27 rue Gambetta' },
      { title: 'Loft industriel à Euralille', type: 'APARTMENT', surface: 101, rooms: 4, price: 535000, status: 'UNDER_OFFER', address: '19 boulevard de Turin' },
      { title: 'Duplex chaleureux à Vauban', type: 'APARTMENT', surface: 88, rooms: 4, price: 379000, status: 'AVAILABLE', address: '14 avenue du Peuple Belge' },
      { title: 'Maison de ville Lille-Centre', type: 'HOUSE', surface: 149, rooms: 6, price: 625000, status: 'SOLD', address: '2 rue Solférino' },
    ],
  },
];

const favoritePlan = [
  { clientEmail: 'client.anna@ymmo.local', titles: ['Haussmannien avec balcon filant', 'T3 vue Saône', 'Appartement vue mer', 'Appartement pierre bordelaise', 'Appartement lumineux sur l’Ã®le', 'Appartement cossu Vieux-Lille'] },
  { clientEmail: 'client.marc@ymmo.local', titles: ['Loft lumineux proche Bastille', 'Canut rénové à Croix-Rousse', 'Maison avec jardin à Mazargues', 'Ã‰choppe rénovée à Caudéran', 'Maison nantaise à Procé', 'Duplex chaleureux à Vauban'] },
  { clientEmail: 'client.sonia@ymmo.local', titles: ['Duplex familial au Luxembourg', 'Duplex moderne à Confluence', 'T4 lumineux à Endoume', 'T2 balcon à Bacalan', 'T4 centre-ville au Bouffay', 'Maison de famille à Wazemmes'] },
];

const transactionPlan = [
  { buyerEmail: 'client.anna@ymmo.local', title: 'Haussmannien avec balcon filant', offerPrice: 928000, status: 'PENDING' },
  { buyerEmail: 'client.anna@ymmo.local', title: 'Appartement vue mer', offerPrice: 612000, status: 'ACCEPTED' },
  { buyerEmail: 'client.marc@ymmo.local', title: 'Maison avec jardin à Mazargues', offerPrice: 710000, status: 'REJECTED' },
  { buyerEmail: 'client.marc@ymmo.local', title: 'Maison familiale à Tassin', offerPrice: 780000, status: 'PENDING' },
  { buyerEmail: 'client.sonia@ymmo.local', title: 'Appartement pierre bordelaise', offerPrice: 519000, status: 'COMPLETED' },
  { buyerEmail: 'client.sonia@ymmo.local', title: 'Maison nantaise à Procé', offerPrice: 590000, status: 'PENDING' },
  { buyerEmail: 'client.anna@ymmo.local', title: 'Duplex familial au Luxembourg', offerPrice: 1375000, status: 'PENDING' },
  { buyerEmail: 'client.marc@ymmo.local', title: 'Canut rénové à Croix-Rousse', offerPrice: 668000, status: 'ACCEPTED' },
  { buyerEmail: 'client.sonia@ymmo.local', title: 'Appartement cossu Vieux-Lille', offerPrice: 313000, status: 'PENDING' },
  { buyerEmail: 'client.anna@ymmo.local', title: 'Duplex terrasse à Canclaux', offerPrice: 538000, status: 'REJECTED' },
  { buyerEmail: 'client.marc@ymmo.local', title: 'Loft industriel à Euralille', offerPrice: 530000, status: 'PENDING' },
  { buyerEmail: 'client.sonia@ymmo.local', title: 'T4 lumineux à Endoume', offerPrice: 430000, status: 'PENDING' },
  { buyerEmail: 'client.anna@ymmo.local', title: 'Appartement lumineux sur l’Ã®le', offerPrice: 382000, status: 'ACCEPTED' },
  { buyerEmail: 'client.marc@ymmo.local', title: 'Appartement cossu Vieux-Lille', offerPrice: 315000, status: 'REJECTED' },
  { buyerEmail: 'client.sonia@ymmo.local', title: 'Duplex moderne à Confluence', offerPrice: 552000, status: 'PENDING' },
];

const getPhotoTag = (city, index, type) =>
  `${city.toLowerCase().replace(/\s+/g, '-')}-${index + 1}-${type.toLowerCase()}`;

const ensureUser = async ({ email, firstName, lastName, password, role }) => {
  const passwordHash = await bcrypt.hash(password, 12);

  return prisma.user.upsert({
    where: { email },
    update: {
      firstName,
      lastName,
      passwordHash,
      role,
    },
    create: {
      email,
      firstName,
      lastName,
      passwordHash,
      role,
    },
  });
};

const ensureAgentProfile = async (userId, profile) => {
  return prisma.agent.upsert({
    where: { userId },
    update: {
      licenseNumber: profile.licenseNumber,
      agencyName: profile.agencyName,
      bio: profile.bio,
    },
    create: {
      userId,
      licenseNumber: profile.licenseNumber,
      agencyName: profile.agencyName,
      bio: profile.bio,
    },
  });
};

const ensureProperty = async (agentId, cityData, propertyData, propertyIndex) => {
  const existingProperty = await prisma.property.findFirst({
    where: { title: propertyData.title },
    include: { photos: true },
  });

  if (existingProperty) {
    return existingProperty;
  }

  const createdProperty = await prisma.property.create({
    data: {
      title: propertyData.title,
      description: createDescription({ ...propertyData, city: cityData.city, district: cityData.district }),
      price: propertyData.price,
      surface: propertyData.surface,
      rooms: propertyData.rooms,
      type: propertyData.type,
      status: propertyData.status,
      address: propertyData.address,
      city: cityData.city,
      postalCode: cityData.postalCode,
      agentId,
    },
  });

  await prisma.photo.createMany({
    data: makePhotos(getPhotoTag(cityData.city, propertyIndex, propertyData.type)).map((photo) => ({
      ...photo,
      propertyId: createdProperty.id,
    })),
  });

  return createdProperty;
};

const seed = async () => {
  const seededAgents = new Map();
  const seededClients = new Map();

  for (const agent of agents) {
    const user = await ensureUser({
      email: agent.email,
      firstName: agent.firstName,
      lastName: agent.lastName,
      password: agent.password,
      role: 'AGENT',
    });

    const profile = await ensureAgentProfile(user.id, agent);
    seededAgents.set(agent.key, profile);
  }

  for (const client of clients) {
    const user = await ensureUser({
      email: client.email,
      firstName: client.firstName,
      lastName: client.lastName,
      password: client.password,
      role: 'CLIENT',
    });

    seededClients.set(client.email, user);
  }

  const seededProperties = new Map();

  for (const cityData of catalog) {
    const agentProfile = seededAgents.get(cityData.agentKey);

    for (const [propertyIndex, propertyData] of cityData.properties.entries()) {
      const property = await ensureProperty(agentProfile.id, cityData, propertyData, propertyIndex);
      seededProperties.set(propertyData.title, property);
    }
  }

  const favoriteRows = [];
  for (const favoriteGroup of favoritePlan) {
    const clientUser = seededClients.get(favoriteGroup.clientEmail);
    for (const title of favoriteGroup.titles) {
      const property = seededProperties.get(title);
      if (clientUser && property) {
        favoriteRows.push({ userId: clientUser.id, propertyId: property.id });
      }
    }
  }

  if (favoriteRows.length > 0) {
    await prisma.favorite.createMany({
      data: favoriteRows,
      skipDuplicates: true,
    });
  }

  for (const transaction of transactionPlan) {
    const buyer = seededClients.get(transaction.buyerEmail);
    const property = seededProperties.get(transaction.title);
    if (!buyer || !property) {
      continue;
    }

    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        buyerId: buyer.id,
        propertyId: property.id,
        offerPrice: transaction.offerPrice,
        status: transaction.status,
      },
    });

    if (existingTransaction) {
      continue;
    }

    await prisma.transaction.create({
      data: {
        buyerId: buyer.id,
        propertyId: property.id,
        offerPrice: transaction.offerPrice,
        status: transaction.status,
      },
    });
  }

  console.log(`Seed terminé: ${catalog.reduce((count, city) => count + city.properties.length, 0)} biens, ${agents.length} agents, ${clients.length} clients.`);
};

seed()
  .catch((error) => {
    console.error('Erreur pendant le seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
