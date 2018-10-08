function createXHR(){
	var xhr;
	try{
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}catch (e){
		try{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(E){
			xhr = false;
		}
	}
	if (!xhr && typeof XMLHttpRequest != 'undefined'){
		xhr = new XMLHttpRequest();
	} return xhr;
}
	
function login(){
	xhr = createXHR();
	if(xhr){       
		var usr = document.getElementById('usrInput').value;
		var pwd = document.getElementById('pwdInput').value;
		var check = document.getElementById('checkInput').value;
		xhr.onreadystatechange = doLoginAction; 
		xhr.open("POST", "/cgi-bin/main.cgi?Login&" + usr + "$" + pwd + "$" + check + "$", true);
		xhr.send(null);
		//window.location.replace("rtd.html");
	}else{
		//XMLHttpRequest对象创建失败
		alert("浏览器不支持，请更换浏览器！");
	}
}

function doLoginAction(picName){
	if (xhr.readyState == 4){
		if (xhr.status == 200){
			var returnValue = xhr.responseText;
			if(returnValue != null && returnValue.length > 0){
				if(returnValue == "Login"){
					window.location.replace("fsurtd.html");
				}else if(returnValue == "Error Code: 146"){
					alert("用户名或密码错误,请刷新页面重新登录.");
				}else if(returnValue == "Error Code: 145"){
					alert("验证码错误或者过期.请刷新页面重新登录.");
				}else{
					document.getElementById("checkCode").src = "./img/" + picName + ".gif";
				}
			}
		}else{
//			    document.getElementById("ver").innerHTML = "查询失败";
		}
	}

}

function initSys(){  
	xhr = createXHR();
	if(xhr){       
		var picName = randomString(20);
		xhr.onreadystatechange = function(){doLoginAction(picName);};
		xhr.open("GET", "/cgi-bin/main.cgi?initLogin&" + picName, true);
		xhr.send(null);
	}else{
		//XMLHttpRequest对象创建失败
		alert("浏览器不支持，请更换浏览器！");
	}
} 
function randomString(len){
len=len||32;
var $chars="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyzoOLlIiUu"; 
var maxPos=$chars.length;
var pwd="";
for(i=0;i<len;i++){
pwd+=$chars.charAt(Math.floor(Math.random()* maxPos));
}
return pwd;
}
initSys();
