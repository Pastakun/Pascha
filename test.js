document.getElementsByClassName('startinput')[0].focus();
let ws = null;
let username = null;
const id = new Date().getTime().toString();
const music = new Audio('カーソル移動1.mp3');
const text = document.getElementsByClassName('text')[0];
const chatscroll = document.getElementsByClassName('chatscroll')[0];
function addchat (usernamevalue, messagevalue) {
    let newelement = document.createElement('div');
    newelement.innerHTML = `${usernamevalue}：${messagevalue}`;
    chatscroll.appendChild(newelement);
    chatscroll.scrollTo(0, chatscroll.scrollHeight);
}
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
        addchat(obj.username, obj.message);
        music.play();
        
    });
    ws.addEventListener('close',function(e) {
        setTimeout(function(){
            connect();
        },3000);  
    });
}
function send(){
    if(text.value !== '') {
        ws.send(JSON.stringify({'to': 'Pascha', 'message': text.value, 'username': username, 'id': id}));
        addchat(username, text.value);
    }
    text.value = '';
}
document.getElementsByClassName('send')[0].addEventListener('click', function(){
    send();
});
text.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        send();
    }
});
document.getElementsByClassName('startbutton')[0].addEventListener('click', function(){
    username = document.getElementsByClassName('startinput')[0].value;
    document.getElementsByClassName('start')[0].remove();
    connect();
});
document.getElementsByClassName('pasta')[0].addEventListener('click', function() {
    const a = document.getElementsByClassName('text')[0];
    a.value += 'ー<font color="pink">ヽ(ﾟ∀｡)ﾉ<font color="black">ヽ(ﾟ∀｡)ﾉ<font color="#a2ffa2">ヽ(ﾟ∀｡)ﾉ</font>ーーー';
});
document.getElementsByClassName('edit')[0].addEventListener('focus', (event) => {
    console.log('test');
});
document.getElementsByClassName('edit')[0].addEventListener('blur', (event) => {
    console.log('test');
});
