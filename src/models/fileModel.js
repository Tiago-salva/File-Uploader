const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getFile(id) {
  return await prisma.file.findUnique({
    where: { id: id },
  });
}

module.exports = getFile;
