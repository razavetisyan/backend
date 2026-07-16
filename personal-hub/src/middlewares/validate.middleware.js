function validateRegister(req, res, next) {
  const { username, password } = req.body;

  if (!username || typeof username !== "string" || username.length < 3) {
    return res.status(400).json({
      message: "username must be string and contains minumum 3 characters"
    });
  }

  if(!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
        message : "Password must be string and contains minumum 6 characters"
    });
  }

  next();
}

function validatePost(req, res, next) {
  const { title, body, tags } = req.body;

  if (
    !title ||
    typeof title !== "string" ||
    title.length < 1 ||
    title.length > 100
  ) {
    return res.status(400).json({
      message: "Title must be string and between 1 to 100 characters long"
    });
  }

  if (!body || typeof body !== "string" || body.length > 2000) {
    return res.status(400).json({
      message: "Body must be string and contains maximum 2000 characters",
    });
  }

  if (tags) {
    if (!Array.isArray(tags)) {
      return res.status(400).json({
        message: "Tags must be array",
      });
    }

    for (const tag of tags) {
      if (typeof tag !== "string" || tag.length < 1 || tag.length > 20) {
        return res.status(400).json({
          message: "Tag must be string and between 1 to 20 characters long",
        });
      }
    }
  }

  next();
}

function validateBook(req, res, next) {
  const { title, author, status = "to-read", rating } = req.body;

  if (
    !title ||
    typeof title !== "string" ||
    title.length < 1 ||
    title.length > 200
  ) {
    return res.status(400).json({
      message: "Title must be string and between 1 to 100 characters long"
    });
  }

  if (
    !author ||
    typeof author !== "string" ||
    author.length < 1 ||
    author.length > 100
  ) {
    return res.status(400).json({
      message: "Author must be string and between 1 to 100 characters long"
    });
  }

  const allowedStatus = ["to-read", "reading", "finished"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      message: "Status must be to-read, reading or finished",
    });
  }

  next();
}

function validateHabit(req, res, next) {
  const { name, frequency, checkIns } = req.body;

  if (checkIns) {
    return res.status(400).json({
      message: "checkIns cannot be set by client",
    });
  }

  if (
    !name ||
    typeof name !== "string" ||
    name.length < 1 ||
    name.length > 60
  ) {
    return res.status(400).json({
      message: "name must be string and between 1 to 60 characters long"
    });
  }

  const allowed = ["daily", "weekly", "monthly"];

  if (!allowed.includes(frequency)) {
    return res.status(400).json({
      message: "Frenquency must be daily, weekly or monthly",
    });
  }

  next();
}

module.exports = {
  validateBook,
  validateHabit,
  validatePost,
  validateRegister
};
