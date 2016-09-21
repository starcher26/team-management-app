var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var member = require('../models/Member.js');
// var path = require('path');
var mkdirp = require('mkdirp');
mkdirp('./photos/', function(err) { 
    // path exists unless there was an error
    console.log(err);
});
/* GET /teams listing using mongodb (find). */

router.get('/', function(req, res, next) {
    member.find(function (err, members) {
        if (err) return next(err);
        res.json(members);
    });
});


/* POST /teams => create entries on mongodb */
router.post('/', function(req, res, next) {
    member.create(req.body, function (err, post) {
        if (err) return next(err);
        // console.log(post.name);
        res.json(post);
    });
});

/* GET /teams/:id => using findById mongodb */
router.get('/:id', function(req, res, next) {
    member.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /teams/:id => update a team using findByIdAndUpdate operation */ 
router.put('/:id', function(req, res, next) {
    member.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /teams/:id => g findByIdAnRemove mongodb operation */
router.delete('/:id', function(req, res, next) {
    member.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
