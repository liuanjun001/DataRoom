var hasDeviceDeviceTypeMap={};
	//////////////////////系统其它配置开始////////////////////////////////////
	/////uploadMode,clientPort,deviceRegisterTime,logFolder,warnFolder,dataFolder
	function getWebServerSysCfg(){
	//获得系统设置
		callnotjsonservice("getWebServerSysCfg",refreshServerSysCfgnew,"");
	}
	function refreshServerSysCfgnew(data){
	//系统其它配置
		if(data != null  ){
		//var msg = data.split("$");
		document.getElementById('uploadMode').value = data.uploadMode;
					document.getElementById('clientPort').value = data.clientPort;
			document.getElementById('deviceRegisterTime').value = data.deviceRegisterTime;
			document.getElementById('logFolder').value = data.logFolder;
			document.getElementById('warnFolder').value = data.warnFolder;
			document.getElementById('dataFolder').value = data.dataFolder;
			
					} else{
					alert("系统其它配置结果为空！");
				}
	}
	
	
	function setServerSysCfg(){
	//保存系统设置
		if(checkServerSysCfg() != 0) return;
		var uploadMode=document.getElementById('uploadMode').value;
		var clientPort=document.getElementById('clientPort').value;
		var deviceRegisterTime=document.getElementById('deviceRegisterTime').value;
		var logFolder=document.getElementById('logFolder').value;
		var warnFolder=document.getElementById('warnFolder').value;
		 var dataFolder=document.getElementById('dataFolder').value;
		var info = uploadMode + "$";
		info += clientPort + "$";
		info += deviceRegisterTime + "$";
		info += logFolder + "$";
		info += warnFolder + "$";
		info += dataFolder + "$";
	 callsetservice("setWebServerSysCfg",info);
		
	}
	
	function checkServerSysCfg(){
	//检查系统设置配置是否满足
				var uploadMode=document.getElementById('uploadMode').value;
		var clientPort=document.getElementById('clientPort').value;
		var deviceRegisterTime=document.getElementById('deviceRegisterTime').value;
		var logFolder=document.getElementById('logFolder').value;
		var warnFolder=document.getElementById('warnFolder').value;
		 var dataFolder=document.getElementById('dataFolder').value;
		
	 
		if(isNaN(parseInt(clientPort)) || (parseInt(clientPort) < 2000) 
			|| (parseInt(clientPort) > 65535)){
				alert("客户端服务端口输入错误,为2000-65535的数字,请重新输入.");
				return -1;
			}
		if(!checkFloatRate(deviceRegisterTime)){
				alert("设备注册时间无效！");
				return -1;
		}
		return 0;
	}
		//////////////////////系统其它配置结束////////////////////////////////////
		//////////////////////系统IP配置开始////////////////////////////////////
		///localip,localnetmask,localmac
	function FselectNetCfg(){
	//获得系统设置
		callnotjsonservice("selectNetCfg",refreshselectNetCfg,"");
	}
	function refreshselectNetCfg(data){
	//系统其它配置
		if(data != null  ){
		
		document.getElementById('localip').value = data.localip;
					document.getElementById('localnetmask').value = data.localnetmask;
			document.getElementById('localmac').value = data.localmac;
		
			
					} else{
					alert("系统IP配置结果为空！");
				}
	}
	
	
	function FupdateNetCfg(){
	//保存系统设置
		if(checkupdateNetCfg() != 0) return;
		var localip=document.getElementById('localip').value;
		var localnetmask=document.getElementById('localnetmask').value;
		var localmac=document.getElementById('localmac').value;
		
		var info = localip + "$";
		info += localnetmask + "$";
		info += localmac + "$";
		
	 callsetservice("updateNetCfg",info);
		
	}
	
	function checkupdateNetCfg(){
	//检查系统设置配置是否满足
				var localip=document.getElementById('localip').value;
		var localnetmask=document.getElementById('localnetmask').value;
		var localmac=document.getElementById('localmac').value;
		 if(!checkIP(localip)){
		 return -1;
		 }
		
	 
		
		return 0;
	}
//////////////////////系统IP配置结束////////////////////////////////////
	//////////////////////系统FTP配置开始////////////////////////////////////
		///ftpName,ftpPwd
	function FgetWebServerFtpCfg(){
	//获得系统设置
		callnotjsonservice("getWebServerFtpCfg",refreshgetWebServerFtpCfg,"");
	}
	function refreshgetWebServerFtpCfg(data){
	//系统其它配置
		if(data != null  ){
		document.getElementById('ftpName').value = data.ftpName;
		document.getElementById('ftpPwd').value = data.ftpPwd;
		} else{
		alert("系统FTP配置结果为空！");
		}
	}
	function FsetWebServerFtpCfg(){
	//保存系统设置
		if(checksetWebServerFtpCfg() != 0) return;
		var ftpName=document.getElementById('ftpName').value;
		var ftpPwd=document.getElementById('ftpPwd').value;
		var info = ftpName + "$";
		info += ftpPwd + "$";
	 callsetservice("setWebServerFtpCfg",info);
	}
	function checksetWebServerFtpCfg(){
	//检查系统设置配置是否满足
		var ftpName=document.getElementById('ftpName').value;
		var ftpPwd=document.getElementById('ftpPwd').value;
		if(ftpName.length > 20){
			alert("FTP 用户名配置错误,请重新输入.");
			return -1;
		}
		if(ftpPwd.length > 20){
			alert("FTP 密码配置错误,请重新输入.");
			return -1;
		}
		return 0;
	}
//////////////////////系统FTP配置结束////////////////////////////////////
//////////////////////系统SC配置开始////////////////////////////////////
		///scServerAdr,scName,scPwd
	function FgetWebServerScCfg(){
	//获得系统设置
		callnotjsonservice("getWebServerScCfg",refreshgetWebServerScCfg,"");
	}
	function refreshgetWebServerScCfg(data){
	//系统其它配置
		if(data != null  ){
		document.getElementById('scServerAdr').value = data.scServerAdr;
		document.getElementById('scName').value = data.scName;
		document.getElementById('scPwd').value = data.scPwd;
		} else{
		alert("系统SC配置结果为空！");
		}
	}
	function FsetWebServerScCfg(okfunc){
	//保存系统设置
		if(checksetWebServerScCfg() != 0) return;
		var scServerAdr=document.getElementById('scServerAdr').value;
		var scName=document.getElementById('scName').value;
		var scPwd=document.getElementById('scPwd').value;
		var info = scServerAdr + "$";
		info += scName + "$";
		info += scPwd + "$";
	 callsetservice("setWebServerScCfg",info,okfunc);
	}
	function checksetWebServerScCfg(){
	//检查系统设置配置是否满足
		var scServerAdr=document.getElementById('scServerAdr').value;
		var scName=document.getElementById('scName').value;
		var scPwd=document.getElementById('scPwd').value;
			 if(!checkIP(scServerAdr)){
			 alert("SC 服务器IP错误,请重新输入.");
		 return -1;
		 }
		if(scName.length > 20){
			alert("SC 用户名配置错误,请重新输入.");
			return -1;
		}
		if(scPwd.length > 20){
			alert("SC 密码配置错误,请重新输入.");
			return -1;
		}
		return 0;
	}
//////////////////////系统SC配置结束////////////////////////////////////	 
	//////////////////////系统摄像头配置开始////////////////////////////////////
		///cameraip  camerasavepath
	function FgetIpCameraCfg(){
	//获得系统设置
		callnotjsonservice("getIpCameraCfg",refreshgetIpCameraCfg,"");
	}
	function refreshgetIpCameraCfg(data){
	//系统其它配置
		if(data != null  ){
		document.getElementById('cameraip').value = data.cameraip;
		document.getElementById('camerasavepath').value = data.camerasavepath;
	
		} else{
		alert("系统摄像头配置结果为空！");
		}
	}
	function FsetIpCameraCfg(){
	//保存系统设置
		if(checksetIpCameraCfg() != 0) return;
		var cameraip=document.getElementById('cameraip').value;
		var camerasavepath=document.getElementById('camerasavepath').value;

		var info = cameraip + "$";
		info += camerasavepath + "$";

	 callsetservice("setIpCameraCfg",info);
	}
	function checksetIpCameraCfg(){
	//检查系统设置配置是否满足
		var cameraip=document.getElementById('cameraip').value;
		var camerasavepath=document.getElementById('camerasavepath').value;
	 
			 if(!checkIP(cameraip)){
			 alert("摄像头 服务器IP错误,请重新输入.");
		 return -1;
		 }
		if(camerasavepath.length > 200){
			alert("摄像头保存路径配置错误,请重新输入.");
			return -1;
		}
		 
		return 0;
	}
//////////////////////系统SC配置结束////////////////////////////////////	
 	//////////////////////系统GPS配置开始////////////////////////////////////
		///gpsx,gpsy
	function FgetGpsData(){
	//获得系统设置
		callnotjsonservice("getGpsData",refreshgetGpsData,"");
	}
	function refreshgetGpsData(data){
	//系统其它配置
		if(data != null  ){
		document.getElementById('gpsx').value = data.gpsx;
		document.getElementById('gpsy').value = data.gpsy;
		} else{
		alert("系统FTP配置结果为空！");
		}
	}
	function FsetGpsData(){
	//保存系统设置
		if(checksetGpsData() != 0) return;
		var gpsx=document.getElementById('gpsx').value;
		var gpsy=document.getElementById('gpsy').value;
		var info = gpsx + "$";
		info += gpsy + "$";
	 callsetservice("setGpsData",info);
	}
	function checksetGpsData(){
	//检查系统设置配置是否满足
		var gpsx=document.getElementById('gpsx').value;
		var gpsy=document.getElementById('gpsy').value;
	if(!checkFloatRate(gpsx)){
		alert("不是有效的经度！");
		return -1;
	}
	if(!checkFloatRate(gpsy)){
		alert("不是有效的纬度！");
		return -1;
	}
		return 0;
	}
//////////////////////系统FTP配置结束////////////////////////////////////
//////////////////////系统云服务器配置配置开始////////////////////////////////////
		//cloudaddress,cloudName,cloudPwd
	function FgetCloudServerCfg(){
	//获得系统设置
		callnotjsonservice("getCloudServerCfg",refreshgetCloudServerCfg,"");
	}
	function refreshgetCloudServerCfg(data){
	//系统其它配置
		if(data != null  ){
		document.getElementById('cloudaddress').value = data.cloudaddress;
		document.getElementById('cloudName').value = data.cloudName;
		document.getElementById('cloudPwd').value = data.cloudPwd;
		} else{
		alert("系统SC配置结果为空！");
		}
	}
	function FsetCloudServerCfg(){
	//保存系统设置
		if(checksetCloudServerCfg() != 0) return;
		var cloudaddress=document.getElementById('cloudaddress').value;
		var cloudName=document.getElementById('cloudName').value;
		var cloudPwd=document.getElementById('cloudPwd').value;
		var info = cloudaddress + "$";
		info += cloudName + "$";
		info += cloudPwd + "$";
	 callsetservice("setCloudServerCfg",info);
	}
	function checksetCloudServerCfg(){
	//检查系统设置配置是否满足
		var cloudaddress=document.getElementById('cloudaddress').value;
		var cloudName=document.getElementById('cloudName').value;
		var cloudPwd=document.getElementById('cloudPwd').value;
			 if(!checkIP(cloudaddress)){
			 alert("云服务器配置 服务器IP错误,请重新输入.");
		 return -1;
		 }
		if(cloudName.length > 20){
			alert("云服务器配置用户名配置错误,请重新输入.");
			return -1;
		}
		if(cloudPwd.length > 20){
			alert("云服务器配置密码配置错误,请重新输入.");
			return -1;
		}
		return 0;
	}
//////////////////////系统云服务器配置配置结束////////////////////////////////////
//////////////////////系统时钟配置配置开始////////////////////////////////////
		//fsutime
		var lastarttime=0;
		var fsutimeresp;
		var settimeresp;
		var timeint;
	function FgetFsuTime(){
	//获得系统设置
		callnotjsonservice("getFsuTime",refreshgetFsuTime,"");
		timeint=self.setInterval("setclock()",1000);

 
	}
	function setclock(){
	var mydate = new Date();
		 var nowtime=mydate.getTime();
		 var dfsu=new Date(fsutimeresp.getTime()+nowtime-lastarttime);
		  var dlocal=new Date(settimeresp.getTime()+nowtime-lastarttime);
		 document.getElementById('fsutime').value=dfsu.format("yyyy-MM-dd hh:mm:ss");
		  document.getElementById('localtime').value=dlocal.format("yyyy-MM-dd hh:mm:ss");
	}
	function refreshgetFsuTime(data){
	//系统其它配置
		if(data != null  ){
		fsutimeresp  = new Date(data.fsutime.replace(/-/ig,'/'));
		settimeresp=new Date();
		var mydate = new Date();
		 lastarttime=mydate.getTime(); 
		 
		} else{
		alert("系统时钟配置结果为空！");
		}
	}
	function FsetFsuTime(){
	//保存系统设置
 
		var localtime=document.getElementById('localtime').value;
		 
		var info = localtime + "$";
		 
	 callsetservice("setFsuTime",info);
	}
 //////////////////////系统时钟配置配置结束////////////////////////////////////
 	//////////////////////系统VPN配置开始////////////////////////////////////
	/////VPNAddress,VPNServerName, VPNAddress1,VPNServerName1, VPNAddress2,VPNServerName2,
	//VPNName,VPNPwd,VPNLineIp,VPNLineNetMask,VPNGateWay,VPNNetMode,VPNAuthMode,VPNWorkMode
	function FselectVpnCfg(){
	//获得系统设置
		callnotjsonservice("selectVpnCfg",refreshselectVpnCfg,"");
	}
	function refreshselectVpnCfg(data){
	//系统其它配置
		if(data != null  ){
		//var msg = data.split("$");
		document.getElementById('VPNAddress').value = data.VPNAddress;
					document.getElementById('VPNServerName').value = data.VPNServerName;
			document.getElementById('VPNAddress1').value = data.VPNAddress1;
			document.getElementById('VPNServerName1').value = data.VPNServerName1;
			document.getElementById('VPNAddress2').value = data.VPNAddress2;
			document.getElementById('VPNServerName2').value = data.VPNServerName2;
			document.getElementById('VPNName').value = data.VPNName;
			document.getElementById('VPNPwd').value = data.VPNPwd;
			document.getElementById('VPNLineIp').value = data.VPNLineIp;
			document.getElementById('VPNLineNetMask').value = data.VPNLineNetMask;
			document.getElementById('VPNGateWay').value = data.VPNGateWay;
			document.getElementById('VPNNetMode').value = data.VPNNetMode;
			//document.getElementById('VPNAuthMode').value = data.VPNAuthMode;
			if(data.VPNAuthMode!=null){
				document.getElementById('VPNAuthMode'+data.VPNAuthMode).checked=true;
			}
				if(data.VPNWorkMode!=null){
				document.getElementById('VPNWorkMode'+data.VPNWorkMode).checked=true;
			}
			
					} else{
					alert("系统其它配置结果为空！");
				}
	}
	
	
	function FupdateVpnCfg(){
	//保存系统设置
		/////VPNAddress,VPNServerName, VPNAddress1,VPNServerName1, VPNAddress2,VPNServerName2,
	//VPNName,VPNPwd,VPNLineIp,VPNLineNetMask,VPNGateWay,VPNNetMode,VPNAuthMode,VPNWorkMode
		if(checkupdateVpnCfg() != 0) return;
		var VPNAddress=document.getElementById('VPNAddress').value;
		var VPNServerName=document.getElementById('VPNServerName').value;
		var VPNAddress1=document.getElementById('VPNAddress1').value;
		var VPNServerName1=document.getElementById('VPNServerName1').value;
		var VPNAddress2=document.getElementById('VPNAddress2').value;
		var VPNServerName2=document.getElementById('VPNServerName2').value;
		var VPNName=document.getElementById('VPNName').value;
		var VPNPwd=document.getElementById('VPNPwd').value;
		var VPNLineIp=document.getElementById('VPNLineIp').value;
		var VPNLineNetMask=document.getElementById('VPNLineNetMask').value;
		var VPNGateWay=document.getElementById('VPNGateWay').value;
		var VPNNetMode=document.getElementById('VPNNetMode').value;
		var VPNAuthMode=$('input[name="VPNAuthMode"]:checked').val(); 
		var VPNWorkMode=$('input[name="VPNWorkMode"]:checked').val(); 
		
		var info = VPNAddress + "$";
		info += VPNServerName + "$";
		info += VPNAddress1 + "$";
		info += VPNServerName1 + "$";
		info += VPNAddress2 + "$";
		info += VPNServerName2 + "$";
		info += VPNName + "$";
		info += VPNPwd + "$";
		info += VPNLineIp + "$";
		info += VPNLineNetMask + "$";
		info += VPNGateWay + "$";
		info += VPNNetMode + "$";	
		info += VPNAuthMode + "$";	
		info += VPNWorkMode + "$";	
		
	 callsetservice("updateVpnCfg",info);
		
	}
	
	function checkupdateVpnCfg(){
	//检查系统设置配置是否满足
var VPNAddress=document.getElementById('VPNAddress').value;
		var VPNServerName=document.getElementById('VPNServerName').value;
		var VPNAddress1=document.getElementById('VPNAddress1').value;
		var VPNServerName1=document.getElementById('VPNServerName1').value;
		var VPNAddress2=document.getElementById('VPNAddress2').value;
		var VPNServerName2=document.getElementById('VPNServerName2').value;
		var VPNName=document.getElementById('VPNName').value;
		var VPNPwd=document.getElementById('VPNPwd').value;
		var VPNLineIp=document.getElementById('VPNLineIp').value;
		var VPNLineNetMask=document.getElementById('VPNLineNetMask').value;
		var VPNGateWay=document.getElementById('VPNGateWay').value;
		var VPNNetMode=document.getElementById('VPNNetMode').value;
		var VPNAuthMode=$('input[name="VPNAuthMode"]:checked').val(); 
        var VPNWorkMode=$('input[name="VPNWorkMode"]:checked').val(); 
	 
		 if(!checkIP(VPNAddress)){
			 alert("VPN服务器IP错误,请重新输入.");
		 return -1;
		 }
		 if(VPNAddress1.length>0&&!checkIP(VPNAddress1)){
			 alert("VPN服务器IP1错误,请重新输入.");
		 return -1;
		 }
		 if(VPNAddress2.length>0&&!checkIP(VPNAddress2)){
			 alert("VPN服务器IP2错误,请重新输入.");
		 return -1;
		 }
		return 0;
	}
		//////////////////////系统VPN配置结束////////////////////////////////////
		/////设备重启Begin
		function FrestartDev(){
			callsetservice("restartDev","",controlfunc);
	}
	/////设备重启End
	/////设备强制重启Begin
		function FforcedReboot(){
			callsetservice("forcedReboot","",controlfunc);
	}
	/////设备重启End
	/////useBakCfg Begin
		function FuseBakCfg(){
			callsetservice("useBakCfg","",controlfunc);
	}
	/////useBakCfg End
		/////useDefaultCfg Begin
		function FuseDefaultCfg(){
			callsetservice("useDefaultCfg","",controlfunc);
	}
	/////useDefaultCfg End
	////获得通道实时数据Begin
		function FgetChanRtd(){
	//获得系统设置
		callnotjsonservice("getChanRtd",refreshgetChanRtd,"");
	}
	var initgridmap={};
	function initdatagrid(grid,pagesize,tablewidth,tableheight,columns1,columnDefs1){
		if(initgridmap[grid.attr('id')]==null){
			
		grid.dataTable({
			"sScrollX":tablewidth!=null?tablewidth:"disabled",
	 "sScrollY":tableheight!=null?tableheight:"disabled",
	 "bScrollInfinite":tableheight!=null?true:false,
	 
   "bScrollCollapse": true, 
  "bPaginate" : tableheight!=null||(pagesize!=null&&pagesize=="-1")?false:true, // 翻页功能
"bStateSave" : false, // 状态保存
"bLengthChange" : true, // 改变每页显示数据数量
"bFilter" : true, // 过滤功能
"bSort" : true, // 排序功能
"bInfo" :tableheight!=null||(pagesize!=null&&pagesize=="-1")?false:true, // 页脚信息
"bAutoWidth" : false,// 自动宽度
"bDestroy" : true,
"columns":columns1!=null?columns1:null,
"columnDefs":columnDefs1!=null?columnDefs1:null,
"iDisplayLength" : pagesize!=null?pagesize:50,// 每页显示多少行
  "oLanguage": {
                    "sProcessing": "正在加载中......",
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "对不起，查询不到相关数据！",
                    "sEmptyTable": "表中无数据存在！",
                    "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
                    "sSearch": "搜索",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "末页"
                    }

                }, //多语言配置
		"aLengthMenu": [[10, 25, 50, -1, 0], ["每页10条", "每页25条", "每页50条", "显示所有数据", "不显示数据"]]  //设置每页显示记录的下拉菜单		
		});
		initgridmap[grid.attr('id')]=true;
		}
	}
	var isinitdatagrid=false;
	function refreshgetChanRtd(data){
	//系统其它配置
	var grid=$('#realdatagrid');
	if(!isinitdatagrid){
	initdatagrid(grid);
	isinitdatagrid=true;
	}
	grid.dataTable().fnClearTable();
		if(data.record != null  &&data.record.length>0){
		//var msg = data.split("$");
for(var i=0;i<data.record.length;i++){
	if(data.record[i]!=null){
	grid.dataTable().fnAddData([
	i+1,
        data.record[i].devicetype,
        data.record[i].chantype,
         data.record[i].value,
	data.record[i].unit]);
	}
		// grid.dataTable().fnAddData(data.record[i]);
	
}

			
					} else{
					alert("系统其它配置结果为空！");
				}
	}
	
	////获得通道实时数据End
	var aididoCfg;
	////获得通道实时数据Begin
	function FgetAICfg(){
	//获得系统设置
		callnotjsonservice("getAdioCfg",refreshgetAiCfg,"");
	}
	function refreshgetAiCfg(data){
		aididoCfg=data.record;
		filtergetAiDiDOCfg(data,"00",true,400);
	}
		function FgetDICfg(){
	//获得系统设置
		callnotjsonservice("getAdioCfg",refreshgetDiCfg,"");
	}
		function refreshgetDiCfg(data){
		aididoCfg=data.record;
		filtergetAiDiDOCfg(data,"01",false);
	}
	function FgetDOCfg(){
	//获得系统设置
		callnotjsonservice("getAdioCfg",refreshgetDoCfg,"");
	}
		function refreshgetDoCfg(data){
		aididoCfg=data.record;
		filtergetAiDiDOCfg(data,"02",false);
		FgetDoDefaultStatus();
	}
	function FgetDoDefaultStatus(){
	//获得DO的默认状态
	callnotjsonservice("getDoDefaultStatus",refreshFgetDoDefaultStatus,"");
	}
	var isintdodatagridtest=false;
	function refreshFgetDoDefaultStatus(data){
	//刷新do默认状态
	var grid=$('#dodatagridtest');
if(!isintdodatagridtest){
	grid.dataTable({"bPaginate" : false, // 翻页功能
"bStateSave" : true, // 状态保存
"bLengthChange" : false, // 改变每页显示数据数量
"bFilter" : false, // 过滤功能
"bSort" : false, // 排序功能
"bInfo" : false,// 页脚信息
"bAutoWidth" : true,// 自动宽度
"bDestroy" : true,
"iDisplayLength" : 500,// 每页显示多少行
 "columns": [
        
		{"data": "checked", "bSortable": false},
		
		{"data": "seq", "bSortable": false},
		{"data": "channame", "bSortable": false},
        {"data": "doDefalutValue"},
		
		{"data": "needvalue"},
		{"data": "outtime"}
		 
      ],
"columnDefs": [
{
          "targets": [0],
          "data": "checked",
         "visable":true,
		   
          "render": function(data, type, full) {
			  var htmlstr="<input type='checkbox' onchange=\"robotcheckeditchange(this,'#dodatagridtest',"+full.seq+",'checked');\"   "+(data?"checked='checked'":"")+" >";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        },
		{
          "targets": [1],
          "data": "seq",
         "visable":true
        },
		{
          "targets": [2],
          "data": "channame",
         "visable":true
        },
        {
          "targets": [3],
          "data": "doDefalutValue" 
        },{
          "targets": [4],
          "data": "needvalue",
		            "render": function(data, type, full) {
			  var htmlstr="<select style='width:80px' class='form-control' onchange=\"robottexteditchange(this,'#dodatagridtest',"+full.seq+",'needvalue');\" >";
		 
					 htmlstr+="<option value='1' selected='selected'>开</option>";   
				 
				  htmlstr+="<option value='0'>关</option>"; 
			 
				htmlstr+="</select>";
            return htmlstr;
          }
        },{
          "targets": [5],
          "data": "outtime",
		   
          "render": function(data, type, full) {
			  var htmlstr="<input style='width:50px' type='text' class='form-control input' onchange=\"robottexteditchange(this,'#dodatagridtest',"+full.seq+",'outtime');\"   value='"+data+"'>";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        }
		 
      ]
                } //多语言配置
);
isintdodatagridtest=true;
}
grid.dataTable().fnClearTable(); 
if(aididoCfg!=null){
	var doCfg=new Array();
	var seq=0;
	for(var i=0;i<aididoCfg.length;i++){
	//"devicetype":item[0],"chantype":item[1],	"minout":item[2],"maxout":item[3],"deviation":item[4],"lowvalue":item[5],"hightvalue":item[6]
	if("02"==aididoCfg[i].chantypecode){
		doCfg[seq]={"checked":false,"seq":seq+1,"channame":aididoCfg[i].chantype,"doDefalutValue":0,"value":0,"needvalue":0,"outtime":"","dataindex":aididoCfg[i].dataindex};
		 
		for(var j=0;j<data.record.length;j++){
			if(doCfg[seq].dataindex==data.record[j].id){
				doCfg[seq].doDefalutValue=data.record[j].doDefalutValue==0?"常开":"常关";	
			}
		}
	 grid.dataTable().fnAddData( doCfg[seq]);
		seq++;
		 
	
	}
	
}
}	
	}
	function FupdateDoStatus(){
		//Do测试
			var datas=$('#dodatagridtest').dataTable().api().data();
var info="";
var icount=0;
for(var i=0;i<datas.length;i++){
  if(datas[i].checked){
	  icount++;
	 info+=datas[i].seq+"$"+datas[i].needvalue+"$"+datas[i].outtime; 
  }
}
if(icount!=1){
	alert("请选择一个要测试的DO通道！");
	return;
}

		callsetservice("updateDoStatus",info,refreshupdateDoStatus);
		
	}
	function refreshupdateDoStatus(data){
		//Do测试返回
		if(data=="ok"){
			alert("命令发送成功！");
		}else{
			alert(data);
		}
	}
	var initAiDiDOCfggrid=false;
		function filtergetAiDiDOCfg(data,filtercode,displayext,tableheight){
	//系统其它配置
	var grid=$('#realdatagrid');
if(!initAiDiDOCfggrid){
	grid.dataTable({
	//	"sScrollX":tablewidth!=null?tablewidth:"disabled",
	 "sScrollY":tableheight!=null?tableheight:"disabled",
	 "bScrollInfinite":tableheight!=null?true:false,
		"bPaginate" : false, // 翻页功能
"bStateSave" : false, // 状态保存
"bLengthChange" : false, // 改变每页显示数据数量
"bFilter" : false, // 过滤功能
"bSort" : false, // 排序功能
"bInfo" : false,// 页脚信息
"bAutoWidth" : true,// 自动宽度
"bDestroy" : true,
"iDisplayLength" : 500,// 每页显示多少行
 "columns": [
        
		{"data": "seq", "bSortable": false},
        {"data": "chantype"},
        {"data": "devicetype"},
		{"data": "minout"},
		{"data": "maxout"},
		{"data": "deviation"},
		{"data": "lowvalue"},
		{"data": "hightvalue"},
		{"data": "id", "bSortable": false}
      ],
"columnDefs": [
{
          "targets": [0],
          "data": "seq",
		  "width":"30px",
         "visable":true
        },
        {
          "targets": [2],
          "data": "devicetype",
          "render": function(data, type, full) {
			  var htmlstr="<select class='form-control' onchange=\"robottexteditchange(this,'#realdatagrid',"+full.seq+",'devicetype');\" >";
			  for(var i=0;i<pesDev.length;i++){
				  if(data==pesDev[i][0]){
					 htmlstr+="<option value='"+pesDev[i][0]+"' selected='selected'>"+pesDev[i][1]+"</option>";   
				  }else{
				  htmlstr+="<option value='"+pesDev[i][0]+"'>"+pesDev[i][1]+"</option>"; 
				  }
			  }
				htmlstr+="</select>";
            return htmlstr;
          }
        },{
          "targets": [3],
          "data": "minout",
		   "bVisible":displayext,
          "render": function(data, type, full) {
			  var htmlstr="<input style='width:80px' type='text' onchange=\"robottexteditchange(this,'#realdatagrid',"+full.seq+",'minout');\" class='form-control input'   value='"+data+"'>";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        },{
          "targets": [4],
          "data": "maxout",
		   "bVisible":displayext,
          "render": function(data, type, full) {
			  var htmlstr="<input style='width:80px' type='text' onchange=\"robottexteditchange(this,'#realdatagrid',"+full.seq+",'maxout');\" class='form-control input'   value='"+data+"'>";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        },{
          "targets": [5],
          "data": "deviation",
		   "bVisible":displayext,
          "render": function(data, type, full) {
			  var htmlstr="<input style='width:80px' type='text' class='form-control input' onchange=\"robottexteditchange(this,'#realdatagrid',"+full.seq+",'deviation');\"   value='"+data+"'>";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        }
		,{
          "targets": [6],
          "data": "lowvalue",
		   "bVisible":displayext,
          "render": function(data, type, full) {
			  var htmlstr="<input style='width:80px' type='text' class='form-control input' onchange=\"robottexteditchange(this,'#realdatagrid',"+full.seq+",'lowvalue');\"    value='"+data+"'>";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        },{
          "targets": [7],
          "data": "hightvalue",
		   "bVisible":displayext,
          "render": function(data, type, full) {
			  var htmlstr="<input style='width:80px' type='text' class='form-control input' onchange=\"robottexteditchange(this,'#realdatagrid',"+full.seq+",'hightvalue');\"  value='"+data+"'>";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        },{
          "targets": [8],
          "data": "id",
         "bVisible":false
        }
      ]
                } //多语言配置
);
initAiDiDOCfggrid=true;
}
grid.dataTable().fnClearTable(); 
		if(data.record != null  &&data.record.length>0){
		//var msg = data.split("$");
		var seq=0;
for(var i=0;i<data.record.length;i++){
	//"devicetype":item[0],"chantype":item[1],	"minout":item[2],"maxout":item[3],"deviation":item[4],"lowvalue":item[5],"hightvalue":item[6]
	if(filtercode==data.record[i].chantypecode){
		seq++;
		data.record[i].seq=seq;
	grid.dataTable().fnAddData( data.record[i]);
	}
	
}

			
					} else{
					alert("系统AI配置结果为空！");
				}
	}
	
//保存AI配置开始	
function updateAdioType(){
var datas=$('#realdatagrid').dataTable().api().data();
for(var i=0;i<datas.length;i++){
	aididoCfg[datas[i].id-1]=datas[i];
}
var info=aididoCfg.length+"@"; 
var infoHead = aididoCfg.length + "$";
var infoTail="";
var mark = "";
for(var i=0;i<aididoCfg.length;i++){
	info+=aididoCfg[i].devicetype+"$";
	info+=aididoCfg[i].chantypecode+"|";
	if(aididoCfg[i].chantypecode=="00"){
			mark += "0";
	}else{
			mark += "1";
	}
	infoTail+=aididoCfg[i].minout+"$";
    infoTail+=aididoCfg[i].maxout+"$";	
	infoTail+=aididoCfg[i].deviation+"$";
	infoTail+=aididoCfg[i].lowvalue+"$";
	infoTail+=aididoCfg[i].hightvalue+"|";
	
}
infoHead += mark + "@";
infoHead += infoTail;
 callsetservice("updatePesType",info,setoknopromptfunc);
  callsetservice("updateAdioCfg",infoHead);

}	
///保存AI配置结束
//获得AI校表数据
function FgetLinesCfg(){
	//获得系统设置
		callnotjsonservice("getLinesCfg",refreshgetLinesCfg,"");
	}
	var aiCheckCfg;//Ai校表配置
	var isinitrealdatagridcheck=false;
	function refreshgetLinesCfg(data){
		aiCheckCfg=data.record;
		
		//系统其它配置
	var grid=$('#realdatagridcheck');
if(!isinitrealdatagridcheck){
	grid.dataTable({"bPaginate" : false, // 翻页功能
"bStateSave" : true, // 状态保存
"bLengthChange" : false, // 改变每页显示数据数量
"bFilter" : false, // 过滤功能
"bSort" : false, // 排序功能
"bInfo" : false,// 页脚信息
"bAutoWidth" : true,// 自动宽度
"bDestroy" : true,
"iDisplayLength" : 500,// 每页显示多少行
 "columns": [
        
		{"data": "checked", "bSortable": false},
		
		{"data": "seq", "bSortable": false},
		{"data": "channame", "bSortable": false},
        {"data": "chandevicetype"},
		{"data": "lowvalue"},
		{"data": "Ad1value"},
		{"data": "hightvalue"},
		{"data": "Ad2value"},
        {"data": "linevalue"},
		{"data": "offsetvalue"},
		{"data": "testvalue"},
		{"data": "gathervalue"},
		{"data": "deviationvalue"},
		{"data": "id", "bSortable": false}
      ],
"columnDefs": [
{
          "targets": [0],
          "data": "checked",
         "visable":true,
		   
          "render": function(data, type, full) {
			  var htmlstr="<input type='checkbox' onchange=\"robotcheckeditchange(this,'#realdatagridcheck',"+full.seq+",'checked');\"   "+(data?"checked='checked'":"")+" >";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        },
		{
          "targets": [1],
          "data": "seq",
         "visable":true
        },
		{
          "targets": [2],
          "data": "channame",
         "visable":true
        },
        {
          "targets": [3],
          "data": "chandevicetype",
          "render": function(data, type, full) {
			  var htmlstr="<select style='width:80px' class='form-control' onchange=\"robotcheckaichandevicetypechange(this,'#realdatagridcheck',"+full.seq+",'chandevicetype');\" >";
			  for(var i=0;i<AiChanType.length;i++){
				  if(data==AiChanType[i][0]){
					 htmlstr+="<option value='"+AiChanType[i][0]+"' selected='selected'>"+AiChanType[i][1]+"</option>";   
				  }else{
				  htmlstr+="<option value='"+AiChanType[i][0]+"'>"+AiChanType[i][1]+"</option>"; 
				  }
			  }
				htmlstr+="</select>";
            return htmlstr;
          }
        },{
          "targets": [4],
          "data": "lowvalue",
		  
          "render": function(data, type, full) {
			  var htmlstr="<input style='width:50px' type='text' onchange=\"robottexteditchange(this,'#realdatagridcheck',"+full.seq+",'lowvalue');\" class='form-control input'   value='"+data+"'>";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        },{
          "targets": [5],
          "data": "Ad1value"
        },{
          "targets": [6],
          "data": "hightvalue",
		   
          "render": function(data, type, full) {
			  var htmlstr="<input style='width:50px' type='text' class='form-control input' onchange=\"robottexteditchange(this,'#realdatagridcheck',"+full.seq+",'hightvalue');\"   value='"+data+"'>";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        }
		,{
          "targets": [7],
          "data": "Ad2value"
        },{
          "targets": [8],
          "data": "linevalue" 
        },{
          "targets": [9],
          "data": "offsetvalue"
        },{
          "targets": [10],
          "data": "testvalue",
		   
          "render": function(data, type, full) {
			  var htmlstr="<input style='width:50px' type='text' class='form-control input' onchange=\"robottexteditchange(this,'#realdatagridcheck',"+full.seq+",'testvalue');\"    value='"+data+"'>";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        },{
          "targets": [11],
          "data": "gathervalue" 
        },{
          "targets": [12],
          "data": "deviationvalue"
        },{
          "targets": [13],
          "data": "id",
         "bVisible":false
        }
      ]
                } //多语言配置
);
isinitrealdatagridcheck=true;
}
$('#realdatagridcheck').dataTable().fnClearTable(); 
		if(data.record != null  &&data.record.length>0){
		//var msg = data.split("$");
		var seq=0;
for(var i=0;i<data.record.length;i++){
	//"devicetype":item[0],"chantype":item[1],	"minout":item[2],"maxout":item[3],"deviation":item[4],"lowvalue":item[5],"hightvalue":item[6]
 
	grid.dataTable().fnAddData( data.record[i]);
	 
	
}

			
					} else{
					alert("系统其它配置结果为空！");
				}
	}
function FgetAd1BySelectCh(){
	//取AD1
	var datas=$('#realdatagridcheck').dataTable().api().data();
var info="";
var icount=0;
for(var i=0;i<datas.length;i++){
  if(datas[i].checked){
	  icount++;
	 info+=datas[i].id+"$"; 
  }
}
if(info.length==0){
	alert("请选择要获取数据的AI通道！");
	return;
}
info=icount+"@"+info;
		callnotjsonservice("getAdBySelectCh",refreshgetAd1BySelectCh,info);
}	
function refreshgetAd1BySelectCh(data){
	if(data != null &&data.record!=null ){
		var rs=data.record;
		var datas=$('#realdatagridcheck').dataTable().api().data();
		for(var i=0;i<rs.length;i++){
			 for(var j=0;j<datas.length;j++){
				 if(datas[j].id==rs[i].id){
					 datas[j].Ad1value=rs[i].AdValue;
					 var obj=robotcalcLine( datas[j].lowvalue, datas[j].hightvalue, datas[j].Ad1value, datas[j].Ad2value);
					 if(obj!=null){
						datas[j].linevalue= obj.line;
						datas[j].offsetvalue= obj.offset;
					 }
				 }
			 }
		}
	}
	redrawrealdatagridcheck();
}
function FgetAd2BySelectCh(){
	//取AD1
	var datas=$('#realdatagridcheck').dataTable().api().data();
var info="";
var icount=0;
for(var i=0;i<datas.length;i++){
  if(datas[i].checked){
	  icount++;
	 info+=datas[i].id+"$"; 
  }
}
if(info.length==0){
	alert("请选择要获取数据的AI通道！");
	return;
}
info=icount+"@"+info;
		callnotjsonservice("getAdBySelectCh",refreshgetAd2BySelectCh,info);
}	
function refreshgetAd2BySelectCh(data){
	if(data != null &&data.record!=null ){
		var rs=data.record;
		var datas=$('#realdatagridcheck').dataTable().api().data();
		for(var i=0;i<rs.length;i++){
			 for(var j=0;j<datas.length;j++){
				 if(datas[j].id==rs[i].id){
					 datas[j].Ad2value=rs[i].AdValue;
					  var obj=robotcalcLine( datas[j].lowvalue, datas[j].hightvalue, datas[j].Ad1value, datas[j].Ad2value);
					 if(obj!=null){
						datas[j].linevalue= obj.line;
						datas[j].offsetvalue= obj.offset;
					 }
				 }
			 }
		}
	}
	redrawrealdatagridcheck();
}
function FgetAdTestBySelectCh(){
	//取AD1
	var datas=$('#realdatagridcheck').dataTable().api().data();
var info="";
var icount=0;
for(var i=0;i<datas.length;i++){
  if(datas[i].checked){
	  icount++;
	 info+=datas[i].id+"$"; 
  }
}
if(info.length==0){
	alert("请选择要测试的AI通道！");
	return;
}
info=icount+"@"+info;
		callnotjsonservice("getAdBySelectCh",refreshgetAdTestBySelectCh,info);
}
	
function refreshgetAdTestBySelectCh(data){
	if(data != null &&data.record!=null ){
		var rs=data.record;
		var datas=$('#realdatagridcheck').dataTable().api().data();
		for(var i=0;i<rs.length;i++){
			 for(var j=0;j<datas.length;j++){
				 if(datas[j].id==rs[i].id){
					 
					  var obj=robottestLine(datas[j].linevalue,datas[j].offsetvalue, datas[j].lowvalue, datas[j].hightvalue, rs[i].AdValue,datas[j].testvalue);
					 if(obj!=null){
						datas[j].gathervalue= obj.gathervalue;
						datas[j].deviationvalue= obj.deviationvalue;
					 }
				 }
			 }
		}
	}
	redrawrealdatagridcheck();
}
function robotcheckaichandevicetypechange(textobj,tablename,rowindex,pram){
		var val=textobj.value;
	var datas=$(tablename).dataTable().api().data();
	datas[rowindex-1][pram]=val;
    datas[rowindex-1].lowvalue=AiChanType[val][2];
	datas[rowindex-1].hightvalue=AiChanType[val][3];
	redrawrealdatagridcheck();
	}
function redrawrealdatagridcheck(){
		//重绘AI校表表格
var datas=$('#realdatagridcheck').dataTable().api().data();
$('#realdatagridcheck').dataTable() .fnClearTable(); 
for(var i=0;i<datas.length;i++){
$('#realdatagridcheck').dataTable() .fnAddData(datas[i]); 
}
}
function	robotcheckeditchange(checkobj,tablename,rowindex,pram){
	var val=checkobj.checked;
	var datas=$(tablename).dataTable().api().data();
	datas[rowindex-1][pram]=val;
	//alert(pram+"_"+rowindex+"="+val);
}	
function robottexteditchange(textobj,tablename,rowindex,pram){
	var val=textobj.value;
	var datas=$(tablename).dataTable().api().data();
	datas[rowindex-1][pram]=val;
	//alert(pram+"_"+rowindex+"="+val);
}	
function robotcalcLine(low,high,ad1,ad2){
//计算线性值和偏移值 
		if((ad1==null)||(ad2==null)||(ad1=="")||(ad2=="")||(low==null)||(high==null)||(low=="")||(high=="")||(ad1 == ad2) || (low == high)) {
			return null;
		}
		var ret={"line":"","offset":""};
		if(checkFloatRate(low) && checkFloatRate(high) && checkFloatRate(ad1) && checkFloatRate(ad2)){		
			if((parseFloat(low) < 4) && (parseFloat(high) < 5.1) && (parseFloat(low) < parseFloat(high))){
				var line = (parseFloat(high) -  parseFloat(low)) / (parseFloat(ad2) - parseFloat(ad1));
				var offset = parseFloat(low) - parseFloat(ad1) * line;
				ret.line= line;
				ret.offset = offset;
			}else if((parseFloat(low) < 10) && (parseFloat(high) < 20.1)){
				var line = (parseFloat(high) -  parseFloat(low)) / (parseFloat(ad2) - parseFloat(ad1)) / 4;
				var offset = parseFloat(low) / 4 - parseFloat(ad1) * line;
				ret.line= line;
				ret.offset = offset;
				
			}else{
				alert("校表参数错误,请重新填写");
				return null;
			}
			return ret;
		}
	}
function robottestLine(line,offset,low,high,ad,testValue){
//计算线性值和偏移值 
		if((offset==null)||(line==null)||(line=="")||(ad==null)||(ad=="")||(testValue==null)||(testValue=="")||(offset=="")||(low==null)||(high==null)||(low=="")||(high=="")||(ad == testValue) || (low == high)) {
			return null;
		}
		var ret={"gathervalue":"","deviationvalue":""};
						var rs = parseFloat(ad) * parseFloat(line) + parseFloat(offset);
						if(!((parseFloat(low) < 4) && (parseFloat(high) < 5.1))){
							rs *= 4;
						}
			
						ret.gathervalue = rs;
	 
						var error = (parseFloat(rs) - parseFloat(testValue))/ parseFloat(testValue) * 100;
						ret.deviationvalue= error + " %";
						return ret;
	}	
function FupdateLinesCfg(){
	//取AD1
	var datas=$('#realdatagridcheck').dataTable().api().data();
var info="";
var recordcount=0;
for(var i=0;i<datas.length;i++){
  if(datas[i].checked){
	 info+=datas[i].id+"$"+datas[i].linevalue+"$"+datas[i].offsetvalue+"|";
recordcount++;	 
  }
}
if(info.length==0){
	alert("请选择要保存的通道！");
	return;
}
info=recordcount+"@"+info;
		callsetservice("updateLinesCfg",info);
}	
///////////////////////////////////////////////////
	function FgetTypesList(){
	//获得设备类型设置
	
	if($.cookie("devicetypeList")!=null){
		devicetypeList=JSON.parse($.cookie("devicetypeList"));
		var data={"record":devicetypeList};
		refreshgetTypesList(data);
	}else{
	callnotjsonservice("getTypesList",refreshgetTypesList,"1$1000");
	}
	}
	function refreshgetTypesList(data){
	//刷新设备类型数据
		if(data != null  ){
			
		var grid=$('#datagrid');
		var griddataTable=grid.dataTable();
		initdatagrid(grid);
		griddataTable.fnClearTable();
		devicetypeList=new Array();
		for(var i=0;i<data.record.length;i++){
			griddataTable.fnAddData([data.record[i].id,data.record[i].code,data.record[i].devicename]);
			devicetypeList[i]={"id":data.record[i].id,"code":data.record[i].code,"devicename":data.record[i].devicename};
		}
		$.cookie("devicetypeList",JSON.stringify(devicetypeList));
		 
		} else{
		alert("设备类型数据结果为空！");
		}
	}
///////////获取设备信息Begin//////////////////
	function FgetYBMPSInfo(){
	//获得设备类型设置
		callnotjsonservice("getYBMPSInfo",refreshgetYBMPSInfo,"");
	}
	function refreshgetYBMPSInfo(data){
	//刷新设备类型数据
		if(data != null  ){
			
	 $('#devicecompany').html(data.devicecompany);
	 $('#modulecn').html(data.modulecn);
	 $('#softver').html(data.softver);
	 $('#devicesn').html(data.devicesn);
	 $('#createdate').html(data.createdate);
	 $('#verinfo').html(data.verinfo);
		} else{
		alert("设备类型数据结果为空！");
		}
	}
///////////获取设备信息End//////////////////	
///////////获取网络状态信息Begin//////////////////
	function FgetWorkNetState(){
	//获得设备类型设置
		callnotjsonservice("getNetWorkState",refreshgetWorkNetState,"");
	}
	function refreshgetWorkNetState(data){
	//刷新设备类型数据
		if(data != null  ){
	//"InternetIp":rs[0],"VPNIp":rs[1],"InternetState":rs[2],"VPNState":rs[3],"DeviceRegState":rs[4],"TargetVer":rs[5],"SignalIntensity":rs[6],"SignalLevel":rs[7]		
	 $('#InternetIp').html(data.InternetIp);
	 $('#VPNIp').html(data.VPNIp);
	 $('#InternetState').html(data.InternetState);
	 $('#VPNState').html(data.VPNState);
	 $('#DeviceRegState').html(data.DeviceRegState);
	 $('#TargetVer').html(data.TargetVer);
	 	 $('#SignalIntensity').html(data.SignalIntensity);
		 	 $('#SignalLevel').html(data.SignalLevel);
		} else{
		alert("设备类型数据结果为空！");
		}
	}
///////////获取网络状态信息End//////////////////
///////////获取系统状态信息Begin//////////////////
	function FgetSytemState(){
	//获得设备类型设置
		callnotjsonservice("getSytemState",refreshgetSytemState,"");
	}
	function refreshgetSytemState(data){
	//刷新设备类型数据
		if(data != null  ){
	//"InternetIp":rs[0],"VPNIp":rs[1],"InternetState":rs[2],"VPNState":rs[3],"DeviceRegState":rs[4],"TargetVer":rs[5],"SignalIntensity":rs[6],"SignalLevel":rs[7]		
	//"CpuRote":rs[0],"MemoRote":rs[1],"ExtMemoState":rs[2]=="1"?"在位":"不在位","FsuTime":rs[3]
	 $('#CpuRote').html(data.CpuRote+"%");
	 $('#MemoRote').html(data.MemoRote+"%");
	 $('#ExtMemoState').html(data.ExtMemoState);
	 		fsutimeresp  = new Date(data.FsuTime.replace(/-/ig,'/'));
	 $('#FsuTime').html(data.FsuTime);
	timeint=self.setInterval("setfsustateclock()",1000);
		var mydate = new Date();
		 lastarttime=mydate.getTime(); 
		} else{
		alert("系统状态结果为空！");
		}
	}
	function setfsustateclock(){
	var mydate = new Date();
		 var nowtime=mydate.getTime();
		 var dfsu=new Date(fsutimeresp.getTime()+nowtime-lastarttime);
			 $('#FsuTime').html(dfsu.format("yyyy-MM-dd hh:mm:ss"));

	}
///////////获取系统状态信息End//////////////////
///////////获取VPNLog信息Begin//////////////////
	function FgetVPNLog(){
	//获得设备类型设置
		callnotjsonservice("getVPNLog",refreshgetgetVPNLog,"");
	}
	function refreshgetgetVPNLog(data){
		 $('#VPNLog').html(data);
	}
///////////获取VPNLog信息End//////////////////
///获得智能设备状态数据Begin 
var devicetypeList;
try{
	if($.cookie("devicetypeList")!=null){
		devicetypeList=JSON.parse($.cookie("devicetypeList"));
		
}
}catch(error){
	
}
function FgetDevState(){
	if(devicetypeList==null){
		
	callnotjsonservice("getTypesList",refreshgetTypesListgetDevState,"1$1000");
	}else{

	callnotjsonservice("getDevState",refreshgetDevState,"");
	}
}
function 	refreshgetTypesListgetDevState(data){
	
	devicetypeList=data.record;
	FgetDevState();
}
function refreshgetDevState(data){

	if(data!=null){
	var grid=$("#comdevicerealdatagrid");
		
	initdatagrid(grid);
	grid.dataTable().fnClearTable();

		for(var i=0;i<data.record.length;i++){
			
			grid.dataTable().fnAddData([data.record[i].id,data.record[i].port,data.record[i].devicetype,data.record[i].deviceportcode,data.record[i].devicename,data.record[i].towncode,data.record[i].onlinestate]);
	}
	}else{
		alert("智能设备状态结果为空！");
	}
}
/////获得智能设备状态数据 End
///获得智能设备数据Begin
 function FgetDevRtd(towncode){
	callnotjsonservice("getDevRtd",refreshgetDevRtd,towncode);

}

function refreshgetDevRtd(data){

	if(data!=null){
	var grid=$("#realdatagrid");
		var columns=[{"data":"id"},
				{"data":"name"},
				{"data":"towncode"},
				{"data":"value"},
				{"data":"unit"},
				{"data":"state"},
				{"data":"uptime"} 
				];
	var columnDefs=[{
          "targets": [0],
          "data": "id",
          "width":"30px"
        },{
			"targets": [5],
          "data": "state",
			   "createdCell": function (td, cellData, rowData, row, col) {
      if ( cellData =="告警" ) {
        $(td).css('color', 'red');
      }
    }
		}
		];
	initdatagrid(grid,"-1",null,null,columns,columnDefs);
	grid.dataTable().fnClearTable();

		for(var i=0;i<data.record.length;i++){
			
			grid.dataTable().fnAddData(data.record[i]);
	}
	}else{
		alert("智能设备状态结果为空！");
	}
}
///获得智能设备数据End
function FgetDevTree(){
		if(devicetypeList==null){
		
	callnotjsonservice("getTypesList",refreshgetTypesListgetDevTreeState,"1$1000");
	}else{

	callnotjsonservice("getDevState",refreshgetDevTreeState,"");
	}
		
}	
function 	refreshgetTypesListgetDevTreeState(data){
	
	devicetypeList=data.record;
	FgetDevTree();
}
function refreshgetDevTreeState(data){
	 var treedata=new Array();

	 
		for(var i=0;i<data.record.length;i++){
		if(treedata.length==0){
			treedata[0]={text:data.record[i].devicetype,nodes:[{text:data.record[i].devicename+"【"+data.record[i].port+"】","towncode":data.record[i].towncode,"deviceportcode":data.record[i].deviceportcode}]};
		}else{
			var item=null;
			
			for (j=0;j<treedata.length;j++){
				if(treedata[j].text==data.record[i].devicetype){
					item=treedata[j];
					break;
				}
			}
			if(item==null){
				treedata[treedata.length]={text:data.record[i].devicetype,nodes:[{text:data.record[i].devicename+"【"+data.record[i].port+"】", "towncode":data.record[i].towncode,"deviceportcode":data.record[i].deviceportcode}]};
			}else{
				item.nodes[item.nodes.length]= {text:data.record[i].devicename+"【"+data.record[i].port+"】","towncode":data.record[i].towncode,"deviceportcode":data.record[i].deviceportcode} ;
			}
		}
		}
		
	$('#treediv').treeview({data:treedata,
	  onNodeSelected: function(event, data) {
   FQuerygetDevRtd(data.towncode,data.text,data.deviceportcode);
  }});
}
////获得协议列表///
function FgetProtolList(){
		if(devicetypeList==null){
		
	callnotjsonservice("getTypesList",refreshgetTypesListgetProtolList,"1$1000");
	}else{

	callnotjsonservice("getProtolList",refreshgetProtolList,"");
	}
		
}	
function 	refreshgetTypesListgetProtolList(data){
	
	devicetypeList=data.record;
	FgetProtolList();
}
var ProtolList=null;
try{
	if($.cookie("ProtolList")!=null){
		ProtolList=JSON.parse($.cookie("ProtolList"));
		
}
}catch(error){
	
}
 
function refreshgetProtolList(data){
		if(data!=null){
	var grid=$("#realdatagrid");
		 
		var columns=[{"data":"checked",  "bSortable": false},
				{"data":"id"},
				{"data":"protocol_code"},
				{"data":"devtype_name"},
				{"data":"dev_name"},
				{"data":"lua_name"},
				{"data":"lua_ver"},
				{"data":"polling_time"},
				{"data":"baud"},
				{"data":"stopbit"},
				{"data":"parity"},
				{"data":"dataLen"}
				];
	var columnDefs=[{
          "targets": [0],
          "data": "checked",
         "visable":true,
		    "bSortable": false,
          "render": function(data, type, full) {
			  var htmlstr="<input style='width:20px' type='checkbox' onchange=\"robotcheckeditchange(this,'#realdatagrid',"+full.id+",'checked');\"   "+(data?"checked='checked'":"")+" >";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        },{
			"targets":[1],
			"width":"30px"
		},{
			"targets":[2],
			"width":"80px"
		}
		];
		if(typeof(grid) != "undefined"){
	initdatagrid(grid,"-1",null,null,columns,columnDefs);
		grid.dataTable().fnClearTable();
		}
ProtolList=new Array();
var seq=0;
		for(var i=0;i<data.record.length;i++){
			var item=data.record[i];
			if(item.protocol_code==null||item.protocol_code.length<1){
				continue;
			}
			seq++;
			if(item.baud!=null){
				item.baud=boudMap[item.baud];
			}
			if(item.parity!=null){
				item.parity=checkMap[item.parity];
			}
			if(item.dataLen!=null){
				item.dataLen=datalenMap[item.dataLen];
			}
			if(item.stopbit!=null){
				item.stopbit=stopMap[item.stopbit];
			}
			if(item.devtype_name==null&&item.devtype_code!=null){
					var devicetype="";
					for(var j=0;j<devicetypeList.length;j++){
						if(devicetypeList[j].code==item.devtype_code){
							devicetype=devicetypeList[j].devicename;
						}
					}
					item.devtype_name=devicetype;
			}
			item.id=seq;
			for(var j=0;j<columns.length;j++){
				item[columns[j].data]=item[columns[j].data]!=null?item[columns[j].data]:"";
			}
				if(typeof(grid) != "undefined"){
					grid.dataTable().fnAddData(item );
				}
				if(item.dev_name!=null&&item.dev_name.length>1){
					hasDeviceDeviceTypeMap[""+item.devtype_code]="1";
					}
			ProtolList[seq-1]=item;
	}
	$.cookie("ProtolList",JSON.stringify(ProtolList));
	}else{
		alert("协议配置结果为空！");
	}
}
////////获得协议列表end///////////////// 
///////getComType Begin///////////////////
var ComTypeList;
function FgetComType(){
		callnotjsonservice("getComType",refreshgetComType,"0$8$");
}
function refreshgetComType(data){
	if(data!=null){
		ComTypeList=data.record;
		for(var i=0;i<data.record.length;i++){
			if(data.record[i].boxcomport=="1"){
					document.getElementById('Serialport1set').value=data.record[i].itemmode;
			}
			if(data.record[i].boxcomport=="2"){
					document.getElementById('Serialport2set').value=data.record[i].itemmode;
			}
			if(data.record[i].boxcomport=="5"){
					document.getElementById('Serialport5set').value=data.record[i].itemmode;
			}
			if(data.record[i].boxcomport=="6"){
					document.getElementById('Serialport6set').value=data.record[i].itemmode;
			}
		}
	 
	}else{
		alert("可复用串口配置结果为空");
	}
}
///////getComType end///////////////////
/////updateComType Begin////////
function FupdateComType(){
	if(ComTypeList!=null){
		var info="";
		for(var i=0;i<ComTypeList.length;i++){
			info+=ComTypeList[i].comtype+"$";
			if(ComTypeList[i].boxcomport=="1"){
				info+=document.getElementById('Serialport1set').value+"$";
			}else if(ComTypeList[i].boxcomport=="2"){
				info+=document.getElementById('Serialport2set').value+"$";
			}else if(ComTypeList[i].boxcomport=="5"){
				info+=document.getElementById('Serialport5set').value+"$";
			}else if(ComTypeList[i].boxcomport=="6"){
				info+=document.getElementById('Serialport6set').value+"$";
			}else {
				info+=ComTypeList[i].itemmode+"$";
			}
			info+=ComTypeList[i].cpucomport+"$"+ComTypeList[i].boxcomport+"|";
		}
		info=ComTypeList.length+"@"+info;
		callsetservice("updateComType",info);
	}else{
		alert("请先获取串口配置");
	}
	
}
/////updateComType end///////////////////
////获得串口协议列表///
function FgetSerialDevCfg(){
		if(devicetypeList==null){
		
	callnotjsonservice("getTypesList",refreshgetTypesListgetSerialDevCfg,"1$1000");
	}else{

	callnotjsonservice("getSerialDevCfg",refreshgetSerialDevCfg,"");
	}
		
}	
function 	refreshgetTypesListgetSerialDevCfg(data){
	
	devicetypeList=data.record;
	FgetSerialDevCfg();
}
 
var serialportmaxcode={}; 
function refreshgetSerialDevCfg(data){
		if(data!=null){
	var grid=$("#Serialdatagrid");
var othergrid=$("#OtherSerialdatagrid");
		var columns=[{"data":"checked",  "bSortable": false},
				{"data":"id"},
				{"data":"Serialport"},
				{"data":"devtype_name"},
				{"data":"device_name"},
				{"data":"tower_id"},
				{"data":"protocolCode"},
				{"data":"protocolparam"},
				{"data":"baud"},
				{"data":"stopbit"},
				{"data":"check"},
				{"data":"data_len"},
				{"data":"pollingTime"},
				{"data":"noteinfo"}
				];
	var columnDefs=[{
          "targets": [0],
          "data": "checked",
         "visable":true,
		    "bSortable": false,
          "render": function(data, type, full) {
			  var htmlstr="<input style='width:20px' type='checkbox' onchange=\"robotcheckeditchange(this,'#Serialdatagrid',"+full.id+",'checked');\"   "+(data?"checked='checked'":"")+" >";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        },{
			"targets":[1],
			"width":"30px"
		},{
			"targets":[2],
			"width":"80px"
		}
		];
		
		var othercolumns=[{"data":"checked",  "bSortable": false},
				{"data":"id"},
				{"data":"Serialport"},
				{"data":"devtype_name"},
				{"data":"device_name"},
				{"data":"tower_id"},
			
				{"data":"pollingTime"},
				{"data":"noteinfo"}
				];
	var othercolumnDefs=[{
          "targets": [0],
          "data": "checked",
         "visable":true,
		    "bSortable": false,
          "render": function(data, type, full) {
			  var htmlstr="<input style='width:20px' type='checkbox' onchange=\"robotcheckeditchange(this,'#OtherSerialdatagrid',"+full.id+",'checked');\"   "+(data?"checked='checked'":"")+" >";
			   
				htmlstr+="</input>";
            return htmlstr;
          }
        },{
			"targets":[1],
			"width":"30px"
		},{
			"targets":[2],
			"width":"80px"
		}
		];
		var griddataTable;
		var othergriddataTable;
		if(typeof(grid) != "undefined"){
	initdatagrid(grid,"-1",null,null,columns,columnDefs);
	griddataTable=grid.dataTable();
		griddataTable.fnClearTable();
		}
if(typeof(othergrid) != "undefined"){
	initdatagrid(othergrid,"-1",null,null,othercolumns,othercolumnDefs);
		othergriddataTable=othergrid.dataTable();
		othergriddataTable.fnClearTable();
		}
		var serid=1;
		var otherserid=1;
		for(var i=0;i<data.record.length;i++){
			var item=data.record[i];
			if(item.platform_id==null||(""+item.platform_id).length!=6){
				//如果串口号不正确，则跳过
			 	continue;
			 }
			item.Serialport=interfaceDef[item.platform_id.substring(0,4)];
			if(serialportmaxcode[item.Serialport]==null||serialportmaxcode[item.Serialport]<parseInt(item.platform_id.substring(4,6))){
				serialportmaxcode[item.Serialport]=parseInt(item.platform_id.substring(4,6));
				
			} 
			if(item.baud!=null){
				item.baud=boudMap[item.baud];
			}
			if(item.check!=null){
				item.check=checkMap[item.check];
			}
			if(item.data_len!=null){
				item.data_len=datalenMap[item.data_len];
			}
			if(item.stopbit!=null){
				item.stopbit=stopMap[item.stopbit];
			}
			if(item.devtype_name==null&&item.device_type!=null){
					var devicetype="";
					for(var j=0;j<devicetypeList.length;j++){
						if(devicetypeList[j].code==item.device_type){
							devicetype=devicetypeList[j].devicename;
						}
					}
					item.devtype_name=devicetype;
			}
			item.id=i+1;
			for(var j=0;j<columns.length;j++){
				item[columns[j].data]=item[columns[j].data]!=null?item[columns[j].data]:"";
			}
				if(typeof(grid) != "undefined"&&item.Serialport.indexOf("串口")==0){
					item.id=serid;
					serid++;
					griddataTable.fnAddData(item );
				}
				if(typeof(othergrid) != "undefined"&&item.Serialport.indexOf("串口")<0){
					item.id=otherserid;
					otherserid++;
					othergriddataTable.fnAddData(item );
				}
		 
	}
 
	}else{
		alert("串口配置结果为空！");
	}
}
////////获得协议列表end///////////////// 