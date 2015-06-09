var express = require('express');

module.exports = function (repository) {
    return express.Router()
        .get('/', function(req, res, next) {
            repository.retrieve(elements => res.json(elements));
        })

        .get('/:id', function(req, res, next) {
            repository.retrieveById(req.params.id,
                                   element => res.json(element),
                                   () => res.sendStatus(404));
        })

        .post('/', function(req, res, next) {
            repository.create(req.body,
                             () => {
                                 res.location(req.getLocation(req.body.id))
                                    .sendStatus(201);
                             },
                             () => res.sendStatus(500));
        })

        .put('/:id', function(req, res, next) {
            repository.update(req.params.id,
                             req.body,
                             () => {
                                 res.location(req.getLocation(req.body.id))
                                    .sendStatus(200);
                             },
                             () => res.sendStatus(404));
        })

        .delete('/:id', function(req, res, next) {
            repository.delete(req.params.id,
                             () => res.sendStatus(204),
                             () => res.sendStatus(404));
        });
};
