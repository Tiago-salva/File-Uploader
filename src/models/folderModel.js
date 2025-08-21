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

async function getFolder(id) {
  return await prisma.folder.findUnique({
    where: { id: id },
  });
}

module.exports = {
  addFolder,
  getAllFolders,
  getFolder,
};
