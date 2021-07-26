const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector('.chat-messages');
const userList = document.getElementById("users");
const roomName = document.getElementById("room-name");
//Get username and room from URL using the script tag from https://cdnjs.com
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

//join Chat Room
socket.emit('joinRoom', {username, room});

//Get Room Users
socket.on('roomUsers', ({room, users}) =>{
    outputRoomName(room);
    outputUsers(users);
})

// Get message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get message text
    const msg = e.target.elements.msg.value; 
    
    //emit a message to server
    socket.emit('chatMessage', msg);
    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});
 
//Add Room Name to Dom
function outputRoomName(room){
    roomName.innerText = room;
}

//Add users to Dom
function outputUsers(users){
    userList.innerHTML = `
        ${users.map( user => `<li>${user.username}</li>`).join('')}
    `;
}

//output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add("message");
    div.innerHTML = `	<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}