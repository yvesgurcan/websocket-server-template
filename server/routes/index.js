const cors = require('cors');
const express = require('express');
const router = express.Router();

router.all(
    '*',
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (
                [
                    'http://localhost:3000',
                    'http://localhost:3001',
                    'http://bbt-client-bucket.s3-website-us-west-2.amazonaws.com',
                    'http://bbt-remote-bucket.s3-website-us-west-2.amazonaws.com'
                ].indexOf(origin) === -1
            ) {
                const msg =
                    'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
        },
        credentials: true
    })
);

router.get('/', (req, res) => {
    console.log('I am alive');
    res.send({ response: 'I am alive' }).status(200);
});

module.exports = router;
