const models = require("../models");

function save(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.category_id,
    userId: 1,
  };
  models.Post.create(post)
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully.",
        post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!!!",
        error: error,
      });
    });
}

function show(req, res) {
  const id = req.params.id;
  models.Post.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json({
          message: "Post not found!!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!!!",
        error: error,
      });
    });
}

function index(req, res) {
  models.Post.findAll()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json({
          message: "Post not found!!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!!!",
        error: error,
      });
    });
}
function update(req, res) {
  const id = req.params.id;
  const updatePost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.category_id,
  };

  const userId = 1;

  models.Post.update(updatePost, { where: { id: id, userId: userId } })
    .then((result) => {
      if (result[0]) {
        res.status(200).json({
          message: "Post updated successfully.",
          post: updatePost,
        });
      } else {
        res.status(400).json({
          message: "Post not found!!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!!!",
        error: error,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;
  const userId = 1;

  models.Post.destroy({ where: { id: id, userId: userId } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Post Deleted successfully.",
        });
      } else {
        res.status(400).json({
          message: "Post not found!!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!!!",
        error: error,
      });
    });
}

module.exports = {
  save,
  show,
  index,
  update,
  destroy,
};
