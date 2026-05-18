const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({
        status : "OK",
        message : "Server is running",
        time : new Date().toLocaleString()
    })
});

module.exports = router;