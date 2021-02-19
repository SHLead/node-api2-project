const express = require("express");
const Post = require("../../data/db");
const router = express.Router();

// POST /api/posts
router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({ message: "title and contents required!" });
  }

  Post.insert(req.body)
    .then(post => res.status(201).json(post))
    .catch(err =>
      res.status(500).json({ message: "Error adding adopter", err })
    );
});

// POST /api/posts/:id/comments
router.post("/:id/comments", (req, res) => {
  const newComment = req.body;

  Post.insertComment(newComment)
    .then(comment =>
      comment
        ? res.status(201).json({ message: "comment posted" })
        : res.status(400).json("post not found")
    )
    .catch(err => res.status(500).json(err));
});

// GET /api/posts
router.get("/", (req, res) => {
  Post.find()
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err));
});

// GET /api/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Post.findById(id)
    .then(post =>
      post
        ? res.status(200).json(post)
        : res.status(400).json({ message: "id not found" })
    )
    .catch(err =>
      res.status(500).json({ message: "error finding that id", err })
    );
});

// GET /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  Post.findPostComments(id)
    .then(post =>
      post
        ? res.status(200).json(post)
        : res.status(400).json({ message: "post not found" })
    )
    .catch(err => res.status(500).json(err));
});

// DELETE /api/posts/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Post.remove(id)
    .then(post =>
      post
        ? res
            .status(200)
            .json({ success: `item with the id of ${id} has been deleted` })
        : res.status(400).json({ message: "post not found" })
    )
    .catch(err => res.status(500).json(err));
});

// PUT /api/posts/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Post.update(id, changes)
    .then(post =>
      post
        ? res.status(200).json({ success: "post updated" })
        : res.status(400).json({ message: "post not found" })
    )
    .catch(err => res.status(500).json(err));
});

module.exports = router;
