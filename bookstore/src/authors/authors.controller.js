const authorsService = require("./authors.service.js");

async function getAllAuthors(req, res) {
  const authors = await authorsService.getAllAuthors();

  res.status(200).json(authors);
}

async function getaAuthorById(req, res) {
  const author = await authorsService.getaAuthorById(req.params.id);

  if (!author) {
    return res.status(404).json({
      message: "Author not found",
    });
  }
  
  res.status(200).json(author);
}

async function createAuthor(req, res) {
  const author = await authorsService.createAuthor(req.body);

  res.status(201).json(author);
}

async function updateAuthor(req, res) {
  const author = await authorsService.updateAuthor(req.params.id, req.body);

  if(!author) {
    return res.status(404).json({
        message : "Author not found"
    });
  }

  res.status(200).json(author);
}

async function deleteAuthor(id) {
  const author = await authorsService.deleteAuthor(req.params.id);

  if(!author) {
    return res.status(404).json({
        message : "Author not found"
    });
  }

  res.status(200).json(author);
}

module.exports = {
  getAllAuthors,
  getaAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
