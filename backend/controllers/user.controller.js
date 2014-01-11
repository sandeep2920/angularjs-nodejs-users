var UserService = require('./../services/user.service');

var userService = new UserService();

module.exports = function(app) {

    app.get('/api/users', function(req, res) {
        userService.list(function(users){
            res.json(users);
        }, function(err){
            res.statusCode = 400;
            res.send(err);
        });
    });
    
    app.get('/api/users/:id', function(req, res) {
        userService.get(req.params.id, function(user){
            res.json(user);
        }, function(err){
            res.statusCode = 400;
            res.send(err);
        });
    });

    app.post('/api/users', function(req, res) {
        if (req.body._id) {
            userService.update(req.body, function(user){
                res.json(user);
            }, function(err){
                res.statusCode = 400;
                res.send(err);
            });
        } else {
            userService.create(req.body, function(user){
                res.json(user);
            }, function(err){
                res.statusCode = 400;
                res.send(err);
            });
        }
    });

    app.delete('/api/users/:id', function(req, res) {
        userService.remove(req.params.id, function(user){
            res.json(user);
        }, function(err){
            res.statusCode = 400;
            res.send(err);
        });
    });

};