import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (err) {
    res
      .status(404)
      .json({ message: `Chyba při načtení stránky: ${err.message}` });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    //restapitutorial.com/httpstatuscodes.html --> info o statutes
    res.status(201).json(newPost);
  } catch (err) {
    res
      .status(409)
      .json({ message: `Chyba při vytvoření příspěvku: ${err.message}` });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Žádný příspěvěk s tímhle id neexistuje!");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .send(`Žádný příspěvek neexistuje s tímhle id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Příspěvek smazán úspěšně." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Žádný příspěvek neexistuje s tímhle id");

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};
