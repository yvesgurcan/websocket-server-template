const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 4000;
const index = require('./routes/index');

const app = express();
app.use(index);

// CORS
app.use(function (req, res, next) {
    console.log(req);
    console.log('Request intercepted.');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, authorization'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
    next();
});

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log('new socket', socket.id);
    socket.on('new mode', mode => {
        console.log('new mode', mode);
        io.emit('new mode', { mode: mode.name, buttons: mode.buttons });
    });
    socket.on('button press', button => {
        console.log('button press', button);
        io.emit('button press', button);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
