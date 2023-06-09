const express = require('express');
const serveStatic = require('serve-static');
const morgan = require('morgan');
var logger = require('morgan');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(morgan('common'));
app.use(morgan(':method :url :status :http-version :response-time '));
app.use(logger('common', {
    stream: fs.createWriteStream('../access.log', {flags: 'a'})
}));
app.use(logger('dev'));
app.use("/", serveStatic ( path.join (__dirname, '/build') ) );
app.get('*', function (req, res) {
res.sendFile(__dirname + '/build/index.html')
});
const port = process.env.PORT || 3000
app.listen(port);
