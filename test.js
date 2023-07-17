const id = Math.random().toString(32).substring(2);
const ws = new WebSocket("wss://cloud.achex.ca/Pascha");
ws.addEventListener('open',function(e) {
    console.log('open');
    ws.send(JSON.stringify({'auth': 'Pascha', 'password': 'pass'}));
});
ws.addEventListener('message',function(e) {
    const obj = JSON.parse(e.data);
    if(obj.auth == 'OK'){
        return;
    }
    const b = document.getElementsByClassName('chatscroll')[0]
    b.innerHTML += `<div><p>${obj.message}</p></div>`;
    b.scrollTo(0, b.scrollHeight);
    
});
function send(){
    const a = document.getElementsByClassName('text')[0];
    ws.send(JSON.stringify({'to': 'Pascha', 'message': a.value}));
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
