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

async function getHomeData(userId) {
  const rootFolder = await prisma.folder.findFirst({
    where: { userId: parseInt(userId), name: "Root" },
  });

  if (!rootFolder) throw new Error("Root folder not found");

  const folders = await prisma.folder.findMany({
    where: {
      userId: parseInt(userId),
      NOT: { id: rootFolder.id },
    },
  });

  const rootFiles = await prisma.file.findMany({
    where: { folderId: rootFolder.id },
  });

  return { folders, rootFiles };
}

async function getAllFolders(userId) {
  return await prisma.folder.findMany({
    where: { userId: userId },
  });
}

async function getFolder(id) {
  return await prisma.folder.findUnique({
    where: { id: id },
    include: {
      files: true,
    },
  });
}

async function deleteFolder(id) {
  await prisma.file.deleteMany({
    where: { folderId: id },
  });

  await prisma.folder.delete({
    where: {
      id: id,
    },
  });
}

module.exports = {
  addFolder,
  getHomeData,
  getAllFolders,
  getFolder,
  deleteFolder,
};
