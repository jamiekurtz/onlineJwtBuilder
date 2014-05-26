var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');


router.get('/', function(req, res) {
  res.render('index');
});

router.get('/about', function(req, res) {
  res.render('about');
});

router.post('/tokens', function(req, res) {

    var claims = req.body.claims;
    var key = req.body.key;

    if(!claims) {
        res.send(400, "Missing claims");
        return;
    }

    if(!key) {
        res.send(400, "Missing key");
        return;
    }

    try {
        var token = jwt.encode(claims, key, 'HS256');
        var response = {
            token:token
        };

        res.send(200, response);
    }
    catch(ex) {
        var msg = "Error creating token: " + ex;
        res.send(400, msg);
    }
});

module.exports = router;
