import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export default (router: express.Router) => {
  // Get all users
  router.get("/posts", async (req, res) => {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  });

  // Get a user by ID
  router.get("/posts/:id", async (req, res) => {
    const user = await getUserById(parseInt(req.params.id));
    res.json(user);
  });

  // Create a new user
  router.post("/posts", async (req, res) => {
    if (!req.body.email) {
      res.status(400).send("Email is required");
      return;
    }

    await createUser({ name: req.body.name, email: req.body.email });
    res.send("OK");
  });

  // Update a user by ID
  router.put("/posts/:id", async (req, res) => {
    updateUser(parseInt(req.params.id), {
      name: req.body.name,
      email: req.body.email,
    });
    res.send("OK");
  });

  router.delete("/posts/:id", async (req, res) => {
    deleteUser(parseInt(req.params.id));
    res.send("OK");
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

const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

const createUser = async ({ name, email }: { name: string; email: string }) => {
  await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });
};

const updateUser = async (
  id: number,
  { name, email }: { name: string; email: string }
) => {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      email: email,
    },
  });
};

const deleteUser = async (id: number) => {
  await prisma.user.delete({ where: { id: id } });
};
