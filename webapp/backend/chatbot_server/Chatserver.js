// Reference and Credits : https://www.fullstacklabs.co/blog/chat-application-react-express-socket-io

var app = require('express')();
var http = require('http').createServer(app);
const PORT = 3004;
var io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});
var STATIC_CHANNELS = [
    {
        fullName: 'Dr HarshVardhan',
        username: 'harshvardhan',
        type: 'Allergists',
        roomid: ''
    },
    {
        fullName: 'Dr Thomas Shelby',
        username: 'thomasshelby',
        type: 'Endocrinologists',
        roomis: ''

    }
];


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})


http.listen(process.env.PORT || 5000, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
    // console.log('new client connected');
    // socket.emit('connection', null);

    socket.on('set-active', function ({ fullName, username, type, roomid }) {
        socket.join(username);
        console.log(fullName)
        console.log(username)
        console.log(type)
        console.log(roomid)
        let found = false
        for (let i = 0; i < STATIC_CHANNELS.length; i++) {
            const user = STATIC_CHANNELS[i];
            if (user.username === username) {
                found = true
            }
        }
        if (!found) {
            
            STATIC_CHANNELS.push(
                {
                    fullName: fullName,
                    username: username,
                    type: type,
                    roomid: username
                })
        }
        console.log(STATIC_CHANNELS)
        socket.broadcast.emit('active-doctors', STATIC_CHANNELS);
    });

    socket.on('connect-to-doctor', function ({ fullName, to, from ,messageid }) {
        console.log("connecting to doctor")
        console.log(fullName)
        console.log(to)
        console.log(from)
        console.log(messageid)
        socket.join(to);
        io.to(to).emit('connect-to-doctor', { fullName, to, from ,messageid });
    });


    socket.on('private-message', function ({ type, message, from, to , messageid}) {
        console.log(type)
        console.log(message)
        console.log(from)
        console.log(to)
        if (type === 'user') {
            io.to(to).emit('private-message', { type, message, from, to, messageid });
        } else {
            io.to(from).emit('private-message', { type, message, from, to, messageid });
        }

    });

    

    socket.on('disconnect', (socket) => {
        let currentRooms = []
        for (let i = 0; i < STATIC_CHANNELS.length; i++) {
            const user = STATIC_CHANNELS[i];
            if (user.username !== socket.rooms) {
               currentRooms.push(user)
            }
        }  
        STATIC_CHANNELS = [...currentRooms]
    });

});



/**
 * @description This methos retirves the static channels
 */
app.get('/getActiveUsers', (req, res) => {
    res.json({
        channels: STATIC_CHANNELS
    })
});
