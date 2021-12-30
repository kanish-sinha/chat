socket = io('http://localhost:8080')
const form = document.getElementById('sends')
const messageinput = document.getElementById('msg-inp')
const msgcontainer = document.querySelector('.container');
let names = 'kanish'
socket.emit('new-user-joined', names)
socket.on('recieve', data => {
        const msgelement = document.createElement('div');
        msgelement.className = 'media media-chat media-chat-reverse'
        msgelement.textContent = data.message
        document.body.appendChild(msgelement);
    })
    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     let message = messageinput.value;
    //     const msgelement = document.createElement('div');
    //     msgelement.className = 'media media-chat media-chat-reverse'
    //     msgelement.textContent = message;
    //     document.body.appendChild(msgelement);
    //     socket.emit('send', message)
    // })