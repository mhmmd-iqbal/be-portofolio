var express = require('express');
var router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

const { index, show, create, update, destroy } = require('../controller/portofolioController');

router.get('/', index);
router.get('/:id', show);
router.post('/', upload.single('image'), create);
router.put('/:id', upload.single('image'), update);
router.delete('/:id', destroy);

module.exports = router;
