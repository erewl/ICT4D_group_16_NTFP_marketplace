
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
const server = http.Server(app);
const port = 5000;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(__dirname + 'public')); //Serves resources from public folder
console.log(__dirname)
app.use(express.static('./static'))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // TODO replace with a more sensible origin
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

//pre-flight requests
app.options('*', function(req, res) {
	res.send(200);
});

// app.get('/', (err, res) => {
//     res.status(200);
//     res.json({ working: true });
//     res.end();
// });

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	/* eslint-disable no-console */
	console.log('Node Endpoints working :)');
});

module.exports = server;