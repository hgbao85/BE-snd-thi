// routes/info.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        data: {
            name: "Nguyen Hai Dang",
            code: "HELO1234"
        }
    });
});

module.exports = router;
