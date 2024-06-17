import express from "express";
import posts from "./posts";

const router = express.Router();

export default (): express.Router => {
  posts(router);
  return router;
};
