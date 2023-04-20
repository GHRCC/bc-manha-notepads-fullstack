import express from "express";
import * as commentService from "./commentService";

export const commentController = express.Router();

commentController.get("/", (req, res) => {
  const comments = commentService.findComments();
  res.json(comments);
});

commentController.post("/", (req, res) => {
  const response = commentService.createComment(req.body);
  res.json(response);
});
