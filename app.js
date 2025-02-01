const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const app = express();
const moment = require('moment-timezone');
const { insertHero } = require('./validation/validate');
const ioServer = require('socket.io')

let port = '8080';

const SOCKET_PUBLIC_ROOM = "public_room"

let server = http.Server(app);
let io = ioServer(server);
io.on('connection', (socket) => {
    socket.join(SOCKET_PUBLIC_ROOM);
    io.to(socket.id).emit('update', 'Hello from the server!');

    socket.on('disconnect', () => {
        console.log('a user disconnected', socket.id);
    });

});


//set up a simple logger to log requests
logger.token('date', (req, res, tz) => {
    return moment()
        .tz(tz)
        .format();
})
logger.token('body', (req, res, tz) => {
    return JSON.stringify(req.body);
})
logger.format('datedLogFormat', '[:date[Europe/Athens]] :method :url :status :res[content-length] ---- [:body] - :response-time ms');
app.use(logger('datedLogFormat'));

// Bodyparser to accespt json on the body of the requests
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.options('*', cors());

//our local databas(?)
let superheros = [];


//post method to add hero, with a middleware for the validation
app.post('/superheroes', insertHero, function (req, res) {
    //getting thee values from the body of the request
    const name = req.body.name;
    const superpower = req.body.superpower;
    const humility_score = req.body['humility score'];

    //check if already exists and return the error
    const find = superheros.find(hero => hero.name == name)
    if (find) {
        return res.status(400).json('hero already exists');
    }

    //add the hero if no error
    let newHero = {
        id: superheros.length + 1,
        name,
        superpower,
        'humility score': humility_score
    }
    superheros.push(newHero)

    //emit for real-time update on client
    io.to(SOCKET_PUBLIC_ROOM).emit('update');

    //return 200 ok
    res.status(200).json(newHero);
})

//get request for heroes
app.get('/superheroes', function (req, res) {

    //sort the array from 1 to 10
    superheros.sort((a, b) => a['humility score'] - b['humility score'])
    res.send(superheros);
})

app.get('/health', function (req, res) {
    res.send("server is running!");
})
//if a request does not exist it will return 404
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler,  no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

//try to open the server on the given port
try {
    server.listen(port, "0.0.0.0", function () {
        console.log("Housemate API listening on port " + port);
    });
} catch {
    console.log("----- error listen port ------ " + port)
}


module.exports = { app, server };  