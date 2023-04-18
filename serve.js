const express = require('express');
const serveStatic = require('serve-static');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan(':method :url :status :http-version :response-time '));
app.use("/", serveStatic ( path.join (__dirname, '/build') ) );
app.get('*', function (req, res) {
res.sendFile(__dirname + '/build/index.html')
});
const port = process.env.PORT || 3000
app.listen(port);