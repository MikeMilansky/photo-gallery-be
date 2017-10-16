var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/isAuthorized/:userId', function(req, res, next) {
  console.log(req.params['userId']);
  res.send({ isAuthorized: [62695238].indexOf(parseInt(req.params['userId'], 10)) >= 0}); // dirty tem solution
});

module.exports = router;
