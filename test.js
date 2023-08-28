document.getElementsByClassName('startinput')[0].focus();
let ws = null;
let username = null;
const id = new Date().getTime().toString();
const music = new Audio('カーソル移動1.mp3');
const text = document.getElementsByClassName('text')[0];
const chatscroll = document.getElementsByClassName('chatscroll')[0];
let editopen = false;
const editnamelist = ['ヽ(ﾟ∀｡)ﾉｳｪ🍡', '全部消す'];
const editscroll = document.createElement('div');
editscroll.className = 'editscroll';
editscroll.setAttribute('tabindex','-1');
for(let i = 0;i < editnamelist.length; i++) {
    const editelement = document.createElement('p');
    editelement.textContent = editnamelist[i];
    editscroll.appendChild(editelement);
}
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
document.addEventListener('click', function(e) {
    if (editopen === true) {
        if (e.target.parentElement.className === 'editscroll') {
            const editname = editnamelist.indexOf(e.target.textContent);
            if (editname === 0) {
                text.value += 'ー<font color="pink">ヽ(ﾟ∀｡)ﾉ<font color="black">ヽ(ﾟ∀｡)ﾉ<font color="#a2ffa2">ヽ(ﾟ∀｡)ﾉ</font>ーーー';
                text.focus();
            }
            if (editname === 1) {
                if (confirm('本当にやるんだな？')) {
                    chatscroll.innerHTML = '';
                }
            }
        }
        editscroll.remove();
        editopen = false;
    }else if (e.target === document.getElementsByClassName('edit')[0]){
        document.getElementsByClassName('main')[0].appendChild(editscroll);
        editopen = true;
    }
});
