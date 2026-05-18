const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const users = require("../data/users.js");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Data is required",
      });
    }

    const user = users.find((a) => a.email === email);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token : token
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;
