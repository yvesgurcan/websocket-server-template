const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('I am alive');
    res.send({ response: 'I am alive' }).status(200);
});

module.exports = router;
