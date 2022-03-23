// Reference and Credits : https://www.fullstacklabs.co/blog/chat-application-react-express-socket-io

var app = require('express')();
var http = require('http').createServer(app);
const PORT = 3004;
var io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });
var STATIC_CHANNELS = [{
    name: 'Global chat',
    participants: 0,
    id: 1,
    sockets: []
}, {
    name: 'Funny',
    participants: 0,
    id: 2,
    sockets: []
}];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})


http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
    console.log('new client connected');
    socket.emit('connection', null);
    socket.on('send-message', message => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {

    });

});



/**
 * @description This methos retirves the static channels
 */
app.get('/getChannels', (req, res) => {
    res.json({
        channels: STATIC_CHANNELS
    })
});