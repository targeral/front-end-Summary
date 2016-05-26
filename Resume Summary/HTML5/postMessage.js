//弹出一个新窗口
var domain = 'http://scriptandstyle.com';
var myPopup = window.open(domain
            + '/windowPostMessageListener.html','myWindow');

//周期性的发送消息
setInterval(function(){
	var message = 'Hello!  The time is: ' + (new Date().getTime());
	console.log('blog.local:  sending message:  ' + message);
        //send the message and target URI
	myPopup.postMessage(message,domain);
},6000);

//监听消息反馈
window.addEventListener('message',function(event) {
	if(event.origin !== 'http://scriptandstyle.com') return;
	console.log('received response:  ',event.data);
},false);
