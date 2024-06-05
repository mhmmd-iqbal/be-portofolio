var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    return res.send('ok');
});

router.post('/', (req, res) => {
    return res.send('ok');
})

router.put('/:id', (req, res) => {
    return res.send('ok');
})

router.delete('/:id', (req, res) => {
    return res.send('ok');
})


module.exports = router;
