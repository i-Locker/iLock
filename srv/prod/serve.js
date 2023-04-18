const express = require('express');
const serveStatic = require('serve-static');
const morgan = require('morgan');
var { _bR } = require('./.branch');
var logger = require('morgan');
const path = require('path');
const fs = require('fs');
const app = express();
let branch;
let accessLogs;
const boot = async () => {
    branch = await _bR();
    branch = branch["branch"];
    accessLogs = '../access.' + branch + '.log';
    app.use(morgan('common'));
    app.use(morgan(':referrer :remote-addr :method :url :status :http-version :response-time '));
    app.use(logger('common', {
        stream: fs.createWriteStream(accessLogs.toString(), { flags: 'a' })
    }));
    app.use(logger('dev'));
    app.use("/", serveStatic(path.join(__dirname, '/build')));
    app.get('*', function(req, res, next) {
        if (!routeMatch(req.url)) {
            res.sendFile(__dirname + '/build/index.html')
            next();
        } else {
            res.send(404, "Not found");
        };
    });
    var routeMatch = async (url) => {
        var blockedUrl = ['static/*.js'];
        return blockedUrl.find(function(urlCheck) {
            return urlCheck === url;
        });
    };
    const port = process.env.PORT || 420
    app.listen(port);
    return console.log("Online: "+port,'\n',"branch: ", branch,'\n Logging: ','common');
};
boot();