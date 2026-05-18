const router = require("express").Router();
const bcrypt = require("bcrypt");

const users = require("../data/users.js");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Data is required" });
    }

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashedPassword
    };

    users.push(newUser);  

    return res.status(201).json({
      message: "User created",
    });

  } catch (err) {
    console.log("ERROR:", err); 
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
