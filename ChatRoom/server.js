const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const server = http.createServer(app);
const io = socketio(server);
const botName = "ChatBot";
const PORT = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//get the static public folder
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://ScottyKnows:Sn283993!@cluster0.rfhni.mongodb.net/ChatRoom", {useNewUrlParser: true}, { useUnifiedTopology: true });

//Create a data schema
const chatRoomSchema = {
    name: String,
    password: String
}

const User = mongoose.model("User", chatRoomSchema);

//run when a client connents
io.on('connection', socket => {
    
    socket.on('joinRoom', ({username, room}) => {

        const user = userJoin(socket.id, username, room);
        socket.join(user.room)

        //Sends message to Welcome user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

        //Broadcast when a user connents, Everyone but the user gets this message
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        //Send users and Room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    //listen for chat message
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

      //when a user disconnents
      socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
            
            //Send users and Room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });

});


app.post("/login.html", function(req, res) {
    let newLogin =  new User({
        name: req.body.name,
        password: req.body.password
    });
    console.log(req.body.name);
    console.log(req.body.password);
    newLogin.save();	
    res.redirect('/index.html');
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));