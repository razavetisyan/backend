const express = require("express");
const router = express.Router();

const { readFile, writeFile } = require("../utils/file.js");


router.get("/", (req, res) => {
    const users = readFile("./data/users.json");

    return res.json({ users});
});

router.get("/:id", (req, res) => {
    const users = readFile("./data/users.json");

    const user = users.find((a) => a.id === Number(req.params.id));

    if(!user) {
        return res.status(404).json({
            error : "User not found"
        });
    }

    res.json({ user });
});

router.post("/register", (req, res) => {
    const users = readFile("./data/users.json");

    const { name, email, password } = req.body;

    const exists = users.find(u => u.email === email);

    if (exists) {
        return res.status(400).json({
            error: "User already exists"
        });
    }

    const newUser = {
        id: users.length + 1,
        name : name,
        email : email,
        password : password
    };

    users.push(newUser);

    writeFile("./data/users.json", users);

    res.status(201).json({
        message: "User registered",
        user_id: newUser.id
    });
});


router.post("/login", (req, res) => {
    const users = readFile("./data/users.json");

    const user = users.find(u => u.email === req.body.email);

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    if (user.password !== req.body.password) {
        return res.status(401).json({
            error: "Wrong password"
        });
    }

    res.json({
        message: "Login success",
        user_id: user.id
    });
});

router.delete("/:id", (req, res) => {
    const users = readFile("./data/users.json");

    const user = users.find(a => a.id === Number(req.params.id));

    if(!user) {
        return res.status(404).json({
            error : "User not found"
        });
    }

    const index = users.findIndex(a => a.id === Number(req.params.id));

    if(index === -1) {
        return res.status(404).json({
            message : "Index not found"
        })
    }

    const deleted = users.splice(index, 1);

    const filterd = users.filter(a => a.id !== Number(req.params.id));

    writeFile("./data/users.json", filterd);

    res.status(200).json({
        message : "User deleted",
        deletedUser : deleted[0]
    });
})

module.exports = router;