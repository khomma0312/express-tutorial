import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export default (router: express.Router) => {
  router.get("/posts", async (req, res) => {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  });

  router.post("/posts", async (req, res) => {
    createUser();
    res.send("Received POST Data!");
  });

  return router;
};

const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  return allUsers;
};

const createUser = async () => {
  await prisma.user.create({
    data: {
      name: "test2",
      email: "test2@prisma.io",
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "I like dev." },
      },
    },
  });
};
