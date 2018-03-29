const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
     console.log(`Server is running on port ${port}`);
});

// ROUTES
app.get('/', (req, res) => {
     res.sendFile(__dirname + '/public/');
});

app.get('/javascript', (req, res) => {
     res.sendFile(__dirname + '/public/javascript.html');
});

app.get('/swift', (req, res) => {
     res.sendFile(__dirname + '/public/swift.html');
});

app.get('/css', (req, res) => {
     res.sendFile(__dirname + '/public/css.html');
});


// TECH NAMESPACE
const tech = io.of('/tech');

// RUN SOCKET
tech.on('connection', (socket) => {

     socket.on('join', (data) => {

          socket.join(data.room);
          tech.in(data.room).emit('message', `New user joined ${data.room} room!`);

     });

     console.log('User connected');

     socket.on('message', (data) => {

          console.log(`message: ${data.msg}`);
          tech.emit('message', data.msg);

     });

     socket.on('disconnect', () => {

          console.log('User disconnected');
          tech.emit('message', 'User disconnected');

     });

});