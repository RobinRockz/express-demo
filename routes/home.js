const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Express api',
        message: 'Api running..'
    });
});

module.exports = router;