var express = require('express');
var router = express.Router();
const { index, create, update, destroy } = require('../controller/portofolioController');

router.get('/', index);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
