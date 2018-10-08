 var DataRoomService={
 isdebugmode:true,
DataRoomuserid:null,
DataRoomusername:null,
DataRoomdisplayname:null,
areacode:"8643",
baseurl : '../',
loginPage:"./login.html",
queryrequest:0,
querycount:0,
querycallobjmap:{},

 callDataRoomService:function(servicename,functionname,param,retfunc,callobj,showprocess){
	//json格式的调用返回
		var tmpurl = DataRoomService.baseurl + "DataRoomService";

		if (this.isdebugmode) {
			tmpurl = DataRoomService.baseurl + "DataRoomService";
		}
var token=getQueryString("token");
if(token!=null&&token.length>1){
tmpurl=tmpurl+"?token="+token;	
}
   if(param==null){
		param={};
	}
	if(callobj!=null){
		DataRoomService.querycount++;
		param.DataRoomajaxquerycount="R"+DataRoomService.querycount;
		DataRoomService.querycallobjmap[param.DataRoomajaxquerycount]=callobj;
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
//DataRoomService.hiddenprogress();
		DataRoomService.showerror(XMLHttpRequest, textStatus, errorThrown,functionname);
		},
success: function (data){
//	DataRoomService.hiddenprogress();
	if(!DataRoomService.processdata(data)){
		return;
	}
	if(this.data!=null&&this.data.indexOf("DataRoomajaxquerycount")>=0){
		var reg = new RegExp("(^|&)DataRoomajaxquerycount=([^&]*)(&|$)"); 
 var r = this.data.match(reg); 
 var DataRoomajaxquerycount=null;
 if (r!=null) {
 	DataRoomajaxquerycount=r[2];
 } 
 if(DataRoomajaxquerycount!=null){
		retfunc(data.data,DataRoomService.querycallobjmap[DataRoomajaxquerycount]);
delete DataRoomService.querycallobjmap[DataRoomajaxquerycount];
}else{
	retfunc(data.data);
}
	}else{
	retfunc(data.data);
	}
},
beforeSend: function () {
//DataRoomService.showprogress();
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
DataRoomService.hiddenprogress();
		DataRoomService.showerror(XMLHttpRequest, textStatus, errorThrown,functionname);
		},
success: function (data){
	DataRoomService.hiddenprogress();
	if(!DataRoomService.processdata(data)){
		return;
	}
	if(this.data!=null&&this.data.indexOf("DataRoomajaxquerycount")>=0){
		var reg = new RegExp("(^|&)DataRoomajaxquerycount=([^&]*)(&|$)"); 
 var r = this.data.match(reg); 
 var DataRoomajaxquerycount=null;
 if (r!=null) {
 	DataRoomajaxquerycount=r[2];
 } 
 if(DataRoomajaxquerycount!=null){
		retfunc(data.data,DataRoomService.querycallobjmap[DataRoomajaxquerycount]);
delete DataRoomService.querycallobjmap[DataRoomajaxquerycount];
}else{
	retfunc(data.data);
}
	}else{
	retfunc(data.data);
	}
},
beforeSend: function () {
DataRoomService.showprogress();
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
	   if(DataRoomService.isdebugmode){
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
			DataRoomService.hiddenprogress();
			if(DataRoomService.isdebugmode){
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
		window.top.location.href=DataRoomService.loginPage;
		return false;
	}
		alert(data.message);
		return false;
	 
}

};
 function getQueryString(name) {
	  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	  var r = window.location.search.substr(1).match(reg);
	  if (r != null) {
	    return unescape(r[2]);
	  }
	  return null;
	}
