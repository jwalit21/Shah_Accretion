var express = require('express');
var router = express.Router();

router.post('/registration', function(req, res){
   res.send('GET route on /abc');
});
router.post('/login', function(req, res){
   res.send('POST route on /abc/pqr');
});

//export this router to use in using_my_routes.js
module.exports = router;