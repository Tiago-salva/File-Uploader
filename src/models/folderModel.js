const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addFolder(name, userId) {
  return await prisma.folder.create({
    data: {
      name: name,
      userId: userId,
    },
  });
}

async function getAllFolders(userId) {
  return await prisma.folder.findMany({
    where: { userId: parseInt(userId) },
  });
}

module.exports = {
  addFolder,
  getAllFolders,
};
