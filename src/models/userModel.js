const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addUser(data, hashedPassword) {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });
}

module.exports = { addUser };
