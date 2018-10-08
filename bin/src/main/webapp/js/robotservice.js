 var robotservice={
 isdebugmode:true,
robotuserid:null,
robotusername:null,
robotdisplayname:null,
areacode:"8643",
baseurl : '../',
loginPage:"./login.html",
queryrequest:0,
querycount:0,
querycallobjmap:{},

 callrobotservice:function(servicename,functionname,param,retfunc,callobj,showprocess){
	//json格式的调用返回
		var tmpurl = robotservice.baseurl + "LightService";

		if (this.isdebugmode) {
			tmpurl = robotservice.baseurl + "LightService";
		}

   if(param==null){
		param={};
	}
	if(callobj!=null){
		robotservice.querycount++;
		param.robotajaxquerycount="R"+robotservice.querycount;
		robotservice.querycallobjmap[param.robotajaxquerycount]=callobj;
	}

	param.servicename=servicename;
	param.functionname=functionname;
	if(showprocess!=null&&showprocess==false){
		var jqxhr = $.ajax({url:tmpurl,
	type:'POST',
	data:param,
	dataType: 'json', 
	     cache:false, 
       async:true,
       global:false,
	timeout: 60000, 
	error: function(XMLHttpRequest, textStatus, errorThrown){
//robotservice.hiddenprogress();
		robotservice.showerror(XMLHttpRequest, textStatus, errorThrown,functionname);
		},
success: function (data){
//	robotservice.hiddenprogress();
	if(!robotservice.processdata(data)){
		return;
	}
	if(this.data!=null&&this.data.indexOf("robotajaxquerycount")>=0){
		var reg = new RegExp("(^|&)robotajaxquerycount=([^&]*)(&|$)"); 
 var r = this.data.match(reg); 
 var robotajaxquerycount=null;
 if (r!=null) {
 	robotajaxquerycount=r[2];
 } 
 if(robotajaxquerycount!=null){
		retfunc(data.data,robotservice.querycallobjmap[robotajaxquerycount]);
delete robotservice.querycallobjmap[robotajaxquerycount];
}else{
	retfunc(data.data);
}
	}else{
	retfunc(data.data);
	}
},
beforeSend: function () {
//robotservice.showprogress();
},
complete:function(){

}
	
	});
	}else{
var jqxhr = $.ajax({url:tmpurl,
	type:'POST',
	data:param,
	dataType: 'json', 
	     cache:false, 
       async:true,
       global:false,
	timeout: 30000, 
	error: function(XMLHttpRequest, textStatus, errorThrown){
robotservice.hiddenprogress();
		robotservice.showerror(XMLHttpRequest, textStatus, errorThrown,functionname);
		},
success: function (data){
	robotservice.hiddenprogress();
	if(!robotservice.processdata(data)){
		return;
	}
	if(this.data!=null&&this.data.indexOf("robotajaxquerycount")>=0){
		var reg = new RegExp("(^|&)robotajaxquerycount=([^&]*)(&|$)"); 
 var r = this.data.match(reg); 
 var robotajaxquerycount=null;
 if (r!=null) {
 	robotajaxquerycount=r[2];
 } 
 if(robotajaxquerycount!=null){
		retfunc(data.data,robotservice.querycallobjmap[robotajaxquerycount]);
delete robotservice.querycallobjmap[robotajaxquerycount];
}else{
	retfunc(data.data);
}
	}else{
	retfunc(data.data);
	}
},
beforeSend: function () {
robotservice.showprogress();
},
complete:function(){

}
	
	});
}
	 
 
},

 showprogress:function(){
	this.queryrequest++;
	   try    {   
         
	if(this.queryrequest==1){
		var img=document.getElementById("progressImgage");
	 var mask=document.getElementById("maskOfProgressImage");
		if( img!=null){
		 
	  $("#progressImgage").show().css({ 
"position": "fixed", 
"top": "40%", 
"left": "45%",
"margin-top": "0", 
"margin-left": "0"
	}); 
	}
	if(mask!=null){
 $("#maskOfProgressImage").show().css("opacity", "0.8"); 
  } 	
	} }   
   catch(exception){   
	   if(robotservice.isdebugmode){
         alert(exception.message);
         }
		 }   
},
hiddenprogress:function(){
this.queryrequest--;

if(this.queryrequest==0){
	if( $("#progressImgage")!=null){
		$("#progressImgage").hide();
	}
	if($("#maskOfProgressImage")!=null){
 $("#maskOfProgressImage").hide(); 
  } 	
}	
},
showerror:function(XMLHttpRequest, textStatus, errorThrown,functionname){
			robotservice.hiddenprogress();
			if(robotservice.isdebugmode){
	alert(functionname+"请求数据返回错误！status:"+XMLHttpRequest.status+" readyState："+XMLHttpRequest.readyState+" textStatus:"+textStatus);
			}
},
processdata:function(data){
	if(data==null){
		return false;
	}
	if(data.code==200){
		if(data.data.result=="nochange"){
			return false;
		}
		return true;
	}
	if(data.code==401){
		window.location.href=robotservice.loginPage;
		return false;
	}
		alert(data.message);
		return false;
	 
}

};
