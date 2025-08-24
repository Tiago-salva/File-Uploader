const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addUser(data, hashedPassword) {
  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  const rootFolder = await prisma.folder.create({
    data: {
      name: "Root",
      userId: newUser.id,
    },
  });

  return { newUser, rootFolder };
}

module.exports = { addUser };
