const cors = require('cors');
const express = require('express');
const router = express.Router();

router.all(
    '*',
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

router.get('/', (req, res) => {
    console.log('I am alive');
    res.send({ response: 'I am alive' }).status(200);
});

module.exports = router;
