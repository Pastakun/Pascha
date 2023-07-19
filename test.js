document.getElementsByClassName('startinput')[0].focus();
let ws = null;
let username = null;
const id = new Date().getTime().toString();
function connect(){
    ws = new WebSocket("wss://cloud.achex.ca/Pascha");
    ws.addEventListener('open',function(e) {
        console.log('open');
        ws.send(JSON.stringify({'auth': 'Pascha', 'password': 'pass'}));
    });
    ws.addEventListener('message',function(e) {
        const obj = JSON.parse(e.data);
        if(obj.auth == 'OK'){
            return;
        }
        if(obj.id === id) {
            return;
        }
        const b = document.getElementsByClassName('chatscroll')[0];
        b.innerHTML += `<div><p>${obj.username}：${obj.message}</p></div>`;
        b.scrollTo(0, b.scrollHeight);
        
    });
    ws.addEventListener('close',function(e) {
        setTimeout(function(){
            connect();
        },3000);  
    });
}
function send(){
    const a = document.getElementsByClassName('text')[0];
    if(a.value !== '') {
        ws.send(JSON.stringify({'to': 'Pascha', 'message': a.value, 'username': username, 'id': id}));
        const b = document.getElementsByClassName('chatscroll')[0]
        b.innerHTML += `<div><p>${username}：${a.value}</p></div>`;
        b.scrollTo(0, b.scrollHeight);
    }
    a.value = '';
}
document.getElementsByClassName('send')[0].addEventListener('click', function(){
    send();
});
document.getElementsByClassName('text')[0].addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        send();
    }
});
document.getElementsByClassName('startbutton')[0].addEventListener('click', function(){
    username = document.getElementsByClassName('startinput')[0].value;
    document.getElementsByClassName('start')[0].remove();
    connect();
});
