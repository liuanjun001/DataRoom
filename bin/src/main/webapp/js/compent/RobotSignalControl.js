			RobotComm.include("js/bootstrap-switch/js/bootstrap-switch.min.js");
			RobotComm.includecss("js/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css");
var RobotSignalControl={
		onlabel:"开", 
		onvalue:"0", 
		offlabel:"关", 
		offvalue:"1", 
		minvalue:0,
		maxvalue:100,
		stepvalue:10,
		targetcode:"",
		deviceid:"",
		controlsignal:function(targetcode,deviceid,targetname,stationname,targetvaluemap){
			 try {
				 var reltargetcode=targetcode;
				 if(targetcode.indexOf("99")==0){
					 reltargetcode=reltargetcode.substr(2);
				 }
				document["controlsignal_"+reltargetcode](targetcode,deviceid,targetname,stationname,targetvaluemap);
				return;
			} catch (e) {
				 console.log(e);
			}
			RobotSignalControl.targetcode=targetcode;
			RobotSignalControl.deviceid=deviceid;

			
			if(targetvaluemap!=null&&targetvaluemap.length>0){
				 try {
				var arg=targetvaluemap.split(";");
				RobotSignalControl.onlabel=arg[0].split(",")[1];
				RobotSignalControl.onvalue=arg[0].split(",")[0];
				RobotSignalControl.offlabel=arg[1].split(",")[1];
				RobotSignalControl.offvalue=arg[1].split(",")[0];
				 } catch (e) {
					 console.log(e);
				}
			}
			 var htmlstr='<div  id="ControlSignalDiv"    class="modal fade in" style="display: none;" aria-hidden="true" data-backdrop="false">'+
			 '  <div class="modal-dialog">'+
			 '     <div class="modal-content">'+
			  '       <div class="modal-header">'+
			 '           <button type="button" class="close"'+ 
			  '             data-dismiss="modal" aria-hidden="true">'+
			  '                &times;'+
			  '          </button>'+
			  '          <h4 class="modal-title" >'+stationname+'【'+targetname+'】控制命令</h4>'+
			  '       </div>'+
			   '      <div class="modal-body" style="height:60px;margin: 10px;">'+
			  '<!---->'+
			  	'<form role="form" class="form-horizontal" id="winzardform"  style="position: absolute;right:5px;top:0px;left:3px;width:300px;height:60px;padding:1px;margin:1px">'+
				'<div class="form-group">'+
				' <label for="i_control"  class="col-sm-4 control-label">控制内容</label>'+
			  ' <div class="switch switch-large" data-on-text="'+RobotSignalControl.onlabel+'" data-off-text="'+RobotSignalControl.offlabel+'">'+
			    '<input type="checkbox" checked id="i_control" />'+
			'</div>'+
			'</div>'+
			'</form>'+

			   '<!---->'+
			  '       </div>'+
		  	  '<div class="modal-footer">'+
				'<button class="btn btn-primary" id="btn_save" onclick="sendControl();"><i class="glyphicon glyphicon-play"></i>发送</button>'+
				'<button class="btn btn-primary" onclick="$(\'#ControlSignalDiv\').modal(\'hide\');"><i class="glyphicon glyphicon-remove"></i>取消</button>'+
		  '</div>'+
			   '      </div>'+
			   '      </div>'+
			   '      </div>';
				  $("body").append(htmlstr);
				  $('#i_control').bootstrapSwitch();
				  $('#i_control').bootstrapSwitch('onText',RobotSignalControl.onlabel);
				  $('#i_control').bootstrapSwitch('offText',RobotSignalControl.offlabel);
	
			    $("#ControlSignalDiv").modal().css({    width: "auto",
			     height: "auto",
			    'margin-left': function () {
			    	 
			       return  ( $(document).width()-$(this).width() )/ 2;
			   }});
			   $("#ControlSignalDiv").on("hide.bs.modal",function(){
			    $("#ControlSignalDiv").remove();
			   });	
			   
		},
setsignal:function(targetcode,deviceid,targetname,stationname,targetvaluemap){
	 try {
		 var reltargetcode=targetcode;
		 if(targetcode.indexOf("99")==0){
			 reltargetcode=reltargetcode.substr(2);
		 }
		document["controlsignal_"+reltargetcode](targetcode,deviceid,targetname,stationname,targetvaluemap);
		return;
	} catch (e) {
		 console.log(e);
	}
	RobotSignalControl.targetcode=targetcode;
	RobotSignalControl.deviceid=deviceid;

	
	if(targetvaluemap!=null&&targetvaluemap.length>0&&targetvaluemap!="null"){
		 try {
		var arg=targetvaluemap.split(";");
		RobotSignalControl.minvalue=arg[0];
		RobotSignalControl.maxvalue=arg[1];
		RobotSignalControl.stepvalue=arg[2];
		 } catch (e) {
			 console.log(e);
		}
	}
	 var htmlstr='<div  id="ControlSignalDiv"    class="modal fade in" style="display: none;" aria-hidden="true" data-backdrop="false">'+
	 '  <div class="modal-dialog">'+
	 '     <div class="modal-content">'+
	  '       <div class="modal-header">'+
	 '           <button type="button" class="close"'+ 
	  '             data-dismiss="modal" aria-hidden="true">'+
	  '                &times;'+
	  '          </button>'+
	  '          <h4 class="modal-title" >'+stationname+'【'+targetname+'】遥调命令</h4>'+
	  '       </div>'+
	   '      <div class="modal-body" style="height:60px;margin: 10px;">'+
	  '<!---->'+
	  	'<form role="form" class="form-horizontal" id="winzardform"  style="position: absolute;right:5px;top:0px;left:3px;width:300px;height:60px;padding:1px;margin:1px">'+
		'<div class="item form-group">'+
		' <label for="i_control"  >调整内容</label>'+
	  
	    '<input type="range"  class="form-control" id="i_control" min="'+RobotSignalControl.minvalue+'" max="'+RobotSignalControl.maxvalue+'" step="'+RobotSignalControl.stepvalue+'"/>'+

	'</div>'+
	'</form>'+

	   '<!---->'+
	  '       </div>'+
  	  '<div class="modal-footer">'+
		'<button class="btn btn-primary" id="btn_save" onclick="sendControlSet();"><i class="glyphicon glyphicon-play"></i>发送</button>'+
		'<button class="btn btn-primary" onclick="$(\'#ControlSignalDiv\').modal(\'hide\');"><i class="glyphicon glyphicon-remove"></i>取消</button>'+
  '</div>'+
	   '      </div>'+
	   '      </div>'+
	   '      </div>';
		  $("body").append(htmlstr);


	    $("#ControlSignalDiv").modal().css({    width: "auto",
	     height: "auto",
	    'margin-left': function () {
	    	 
	       return  ( $(document).width()-$(this).width() )/ 2;
	   }});
	   $("#ControlSignalDiv").on("hide.bs.modal",function(){
	    $("#ControlSignalDiv").remove();
	   });	
}
}
document.controlsignal=RobotSignalControl.controlsignal;
document.setsignal=RobotSignalControl.setsignal;
document["controlsignal_0511031"]=function(targetcode,deviceid,targetname,stationname,targetvaluemap){
	RobotSignalControl.targetcode=targetcode;
	RobotSignalControl.deviceid=deviceid;
	 var htmlstr='<div  id="ControlSignalDiv"    class="modal fade in" style="display: none;" aria-hidden="true" data-backdrop="false">'+
	 '  <div class="modal-dialog">'+
	 '     <div class="modal-content">'+
	  '       <div class="modal-header">'+
	 '           <button type="button" class="close"'+ 
	  '             data-dismiss="modal" aria-hidden="true">'+
	  '                &times;'+
	  '          </button>'+
	  '          <h4 class="modal-title" >'+stationname+'【'+targetname+'】控制命令</h4>'+
	  '       </div>'+
	   '      <div class="modal-body" style="height:60px;margin: 10px;">'+
	  '<!---->'+
	  	'<form role="form" class="form-horizontal" id="winzardform"  style="position: absolute;right:5px;top:0px;left:3px;width:500px;height:60px;padding:1px;margin:1px">'+
		'<div class="form-group">'+
		' <label for="i_control"  class="col-sm-3 control-label">打开的回路</label>'+
	  ' <div  class="col-sm-9 control-label" >'+
	    '<input type="checkbox" checked id="i_control1" >回路1&nbsp;&nbsp;</input>'+
	    '<input type="checkbox" checked id="i_control2" >回路2&nbsp;&nbsp;</input>'+
	    '<input type="checkbox" checked id="i_control3" >回路3&nbsp;&nbsp;</input>'+
	    '<input type="checkbox" checked id="i_control4" >回路4&nbsp;&nbsp;</input>'+
	    '<input type="checkbox" checked id="i_control5" >回路5&nbsp;&nbsp;</input>'+
	    '<input type="checkbox" checked id="i_control6" >回路6&nbsp;&nbsp;</input>'+
	'</div>'+
	'</div>'+
	'</form>'+

	   '<!---->'+
	  '       </div>'+
  	  '<div class="modal-footer">'+
		'<button class="btn btn-primary" id="btn_save" onclick="sendControl051103();"><i class="glyphicon glyphicon-play"></i>发送</button>'+
		'<button class="btn btn-primary" onclick="$(\'#ControlSignalDiv\').modal(\'hide\');"><i class="glyphicon glyphicon-remove"></i>取消</button>'+
  '</div>'+
	   '      </div>'+
	   '      </div>'+
	   '      </div>';
		  $("body").append(htmlstr);
		    $("#ControlSignalDiv").modal().css({    width: "auto",
			     height: "auto",
			    'margin-left': function () {
			    	 
			       return  ( $(document).width()-$(this).width() )/ 2;
			   }});
			   $("#ControlSignalDiv").on("hide.bs.modal",function(){
			    $("#ControlSignalDiv").remove();
			   });	
}
function sendControl051103(){
	var dictatecontent="";
	if($("#i_control1").prop('checked')){
		dictatecontent=dictatecontent+"1,";
	}
	if($("#i_control2").prop('checked')){
		dictatecontent=dictatecontent+"2,";
	}
	if($("#i_control3").prop('checked')){
		dictatecontent=dictatecontent+"3,";
	}
	if($("#i_control4").prop('checked')){
		dictatecontent=dictatecontent+"4,";
	}
	if($("#i_control5").prop('checked')){
		dictatecontent=dictatecontent+"5,";
	}
	if($("#i_control6").prop('checked')){
		dictatecontent=dictatecontent+"6,";
	}
	dictatecontent=dictatecontent.substr(0,dictatecontent.length-1);
	//alert(RobotSignalControl.deviceid+RobotSignalControl.targetcode+dictatecontent);
	robotservice.callrobotservice("irobotcommService","sendControl",{"deviceid":RobotSignalControl.deviceid,"targetcode":RobotSignalControl.targetcode,"dictatecontent":dictatecontent},FsendControl,this,false);
}
function sendControl(){
	var cv=$("#i_control").bootstrapSwitch("state");
	
	var dictatecontent=RobotSignalControl.offvalue;
	if(cv){
		dictatecontent=RobotSignalControl.onvalue;
	}
	//alert(RobotSignalControl.deviceid+RobotSignalControl.targetcode+dictatecontent);
	robotservice.callrobotservice("irobotcommService","sendControl",{"deviceid":RobotSignalControl.deviceid,"targetcode":RobotSignalControl.targetcode,"dictatecontent":dictatecontent},FsendControl,this,false);
}
function sendControlSet(){
	var cv=$("#i_control").val();
	
	var dictatecontent=cv;
	//alert(RobotSignalControl.deviceid+RobotSignalControl.targetcode+dictatecontent);
	robotservice.callrobotservice("irobotcommService","sendControl",{"deviceid":RobotSignalControl.deviceid,"targetcode":RobotSignalControl.targetcode,"dictatecontent":dictatecontent},FsendControl,this,false);
}
function FsendControl(data,callobj){
	if(data.result=="ok"){
		alert("命令发送成功！");
		 $("#ControlSignalDiv").modal('hide');
	}else{
		alert(data.result);
	}
}
//document["controlsignal_051104#1"]=function(targetcode,deviceid,targetname,stationname){
//	alert(targetcode+" ="+deviceid);
//};