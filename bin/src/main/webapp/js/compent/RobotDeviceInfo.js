
var RobotDeviceInfo={
	id:'',
	selectdeviceinfo:'',
	selectdeviceinfoname:'',
	selectdevicecompany:'-1',
	selectdevicetype:'-1',
	multiple:true,
	checkbox:true,
	_val:null,	
		val:function(){
		var cb_deviceinfo=$("#cb_input_deviceinfo"+this.id);
		var ret={deviceid:'-1',devicename:'全部'};
		if(this._val!=null){
			this._val.deivceid=cb_deviceinfo.combotree("getValues");
			return this._val;
		}
		if(cb_deviceinfo!=null&&cb_deviceinfo.combotree("getValues")!=null){
			ret.deviceinfo=cb_deviceinfo.combotree("getValues").toString();
			if(ret.deviceid==""){
			ret.deviceid="-1";	
			}else{
			ret.devicename=cb_deviceinfo.combotree("getText");
	    	}
			}
		return ret;
	},
	getHtml:function(item){
				var ret="<div id='input_group_cb_deviceinfo"+this.id+"' class='input-group input-group-sm'><span class='input-group-addon'><img src='"+RobotComm.baseurl+"img/deviceinfo1816.png' ></img>设备:</span>  <input  type='text'  class='combobox form-control ' style='min-width:150px'    id='cb_input_deviceinfo"+this.id+"'></input></div>";
		return ret;
	},
	refresh:function(){
		var cb_deviceinfo=$("#cb_input_deviceinfo"+this.id);
			var cb_deviceinfo_width=cb_deviceinfo.width();
				if(cb_deviceinfo_width<200){
					cb_deviceinfo_width=200;
				}
		cb_deviceinfo.combotree({panelWidth:cb_deviceinfo_width+'px',multiple:this.multiple}) ;
		var tree=cb_deviceinfo.combotree("tree");
		tree.tree({checkbox:this.checkbox});
		if(this._val!=null){
			this.selectdeviceinfoname=this._val.devicename;
				cb_deviceinfo.combotree({ disabled: true });  
		}
		var deviceinfoList;
try{
	if(localStorage){
			deviceinfoList=JSON.parse(localStorage.getItem("reportParam" )).deviceinfo;
	}
}catch(error){
	deviceinfoList=null;
}
		if(deviceinfoList!=null){
			 var datalist=new Array();
		for(var i=0;i<deviceinfoList.length;i++){
			var item=deviceinfoList[i];
	
			 if(this._val!=null||	(this.selectdevicetype=="-1"&&this.selectdevicecompany=="-1")||((","+this.selectdevicecompany+",").indexOf(","+item.devicecompanyid+",")>=0&&(","+this.selectdevicetype+",").indexOf(",'"+item.devicetypeid+"',")>=0)||((","+this.selectdevicecompany+",").indexOf(","+item.devicecompanyid+",")>=0&& this.selectdevicetype=="-1" )||(this.selectdevicecompany=="-1"&&(","+this.selectdevicetype+",").indexOf(",'"+item.devicetypeid+"',")>=0  )){
	 datalist[datalist.length]={"id":item.id,"text":item.devicename,"checked":(this.selectdeviceinfo!=null&&(","+this.selectdeviceinfo+",").indexOf(","+item.id+",")>=0)||(this.selectdeviceinfoname!=null&&(","+this.selectdeviceinfoname+",").indexOf(",'"+item.devicename+"',")>=0)?true:false};
		 }
			}
	 	tree.tree({data:datalist});
		} 
	 
		$("#input_group_cb_deviceinfo"+this.id).find(".textbox.combo").css("width",(cb_deviceinfo_width)+"px");
		$("#input_group_cb_deviceinfo"+this.id).find(".textbox.combo").css("height","30px").css("border-left-width","0px");
		$("#input_group_cb_deviceinfo"+this.id).find(".textbox-icon.combo-arrow").css("height","28px");
		$("#input_group_cb_deviceinfo"+this.id).find(".textbox-icon.combo-arrow").css("width","28px");
	 
	}
}
$(window).load(function() {
	var areadiv=$(".RobotDeviceInfo");
	for (var i=0;areadiv!=null&&i<areadiv.length;i++){
		var areadivitem=$(areadiv[i]);
		var robotDeviceInfo=Object.create( RobotDeviceInfo);
		robotDeviceInfo.id=i;
		if(areadivitem[0].dataset!=null&&areadivitem[0].dataset.checkbox!=undefined){
		robotDeviceInfo.checkbox=areadivitem[0].dataset.checkbox=="false"?false:true;
		}
		if(areadivitem[0].dataset!=null&&areadivitem[0].dataset.multiple!=undefined){
		robotDeviceInfo.multiple=areadivitem[0].dataset.multiple=="false"?false:true;;
		}
		robotDeviceInfo.selectdevicetype="'"+areadivitem[0].dataset.devicetype+"'";
		areadivitem.html(robotDeviceInfo.getHtml());
		robotDeviceInfo.refresh();
		
		areadivitem[0].RobotDeviceInfo=function(){return robotDeviceInfo;};
	}
});
