var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var team = require('../models/Team.js');

/* GET /teams listing using mongodb (find). */

router.get('/', function(req, res, next) {
    team.find(function (err, teams) {
        if (err) return next(err);
        res.json(teams);
    });
});


/* POST /teams => create entries on mongodb */
router.post('/', function(req, res, next) {
    team.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /teams/:id => using findById mongodb */
router.get('/:id', function(req, res, next) {
    team.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /teams/:id => update a team using findByIdAndUpdate operation */ 
router.put('/:id', function(req, res, next) {
    team.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /teams/:id => g findByIdAnRemove mongodb operation */
router.delete('/:id', function(req, res, next) {
    team.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
