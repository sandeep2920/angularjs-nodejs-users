var fs = require('fs');
var path = require('path');

module.exports = function(app, folder) {

    var folderpath = __dirname + "/../" + folder;
    
    fs.readdir(folderpath, function(err, files) {
        if (err) throw err;
        files.forEach(function(ControllerFile) {
            if (path.extname(ControllerFile) === '.js') {
                require(folderpath + ControllerFile)(app);
            }
        });
    });

};