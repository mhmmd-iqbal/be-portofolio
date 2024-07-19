var express = require('express');
var router = express.Router();

const { index, update } = require('../controller/profileController');

router.get('/', index);
router.post('/', update);

module.exports = router;
