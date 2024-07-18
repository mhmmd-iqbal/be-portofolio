var express = require('express');
var router = express.Router();

const { index, show, create, update, destroy } = require('../controller/educationController');

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
