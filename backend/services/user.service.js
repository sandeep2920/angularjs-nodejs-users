require('mongoose-pagination');

var User = require('./../models/user');

(function() {

    var UserService = function() {
    };

    UserService.prototype.list = function(callbackSuccess, callbackError) {
        User.find(function(err, users) {
            if (err) {
                callbackError(err);
            }
            callbackSuccess(users);
        });
    };

    UserService.prototype.get = function(id, callbackSuccess, callbackError) {
        User.findOne({_id: id}, function(err, user) {
            if (err) {
                callbackError(err);
            }
            callbackSuccess(user);
        });
    };

    UserService.prototype.paginate = function(page, limit, callbackSuccess, callbackError) {
        User.find().paginate(page, limit, function(err, users, total) {
            if (err) {
                callbackError(err);
            }
            callbackSuccess(total, users);
        });
    };
    
    UserService.prototype.update = function(userParam, callbackSuccess, callbackError) {
        User.findOne({_id: userParam._id}, function(err, user) {
            if (err) {
                res.json(err);
            } else {
                user.name = userParam.name;
                user.username = userParam.username;
                user.password = userParam.password;
                user.save(function(err, user) {
                    if (err) {
                        callbackError(err);
                    }
                    callbackSuccess(user);
                });
            }
        });
    };

    UserService.prototype.create = function(user, callbackSuccess, callbackError) {
        new User(user).save(function(err, model) {
            if (err) {
                callbackError(err);
            }
            callbackSuccess(user);
        });
    };

    UserService.prototype.remove = function(id, callbackSuccess, callbackError) {
        User.remove({_id: id}, function(err, user) {
            if (err) {
                callbackError(err);
            }
            callbackSuccess(user);
        });
    };

    module.exports = UserService;

})();