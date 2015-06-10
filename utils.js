module.exports = {
    middlewares: {
        location: function(req, res, next) {
            req.getLocation = function(id) {
                return req.protocol + "://" + req.get('host') + req.originalUrl + '/' + id;
            };
            return next();
        },
        notFound: function(req, res, next) {
          var err = new Error('Not Found');
          err.status = 404;
          next(err);
        },
        errorResponse: function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({
              message: err.message,
              error: err
            });
        }
    }
};
