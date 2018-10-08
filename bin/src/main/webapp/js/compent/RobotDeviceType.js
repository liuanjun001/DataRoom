
var RobotDeviceType={
	id:'',
	selectdevicetype:'',
	_val:null,
		val:function(){
		var cb_devicetype=$("#cb_devicetype"+this.id);
		var ret={devicetypeid:'-1',devicetypename:'全部'};
		if(this._val!=null){
			this._val.devicetypename=cb_devicetype.combotree("getText");
			return this._val;
		}
		if(cb_devicetype!=null&&cb_devicetype.combotree("getValues")!=null){
			ret.devicetype=cb_devicetype.combotree("getValues").toString();
			if(ret.devicetypeid==""){
			ret.devicetypeid="-1";	
			}else{
			ret.devicetypename=cb_devicetype.combotree("getText");
	    	}
			}
		return ret;
	},
	getHtml:function(item){
				var ret="<input   multiple='multiple'   style='width:100px' id='cb_devicetype"+this.id+"'></input>";
		return ret;
	},
	refresh:function(){
		var cb_devicetype=$("#cb_devicetype"+this.id);
		cb_devicetype.combotree({panelWidth:'250px',multiple:true}) ;
		var tree=cb_devicetype.combotree("tree");
		tree.tree({checkbox:true});
		if(this._val!=null){
			this.selectdevicetype=this._val.devicetypeid;
			cb_devicetype.combotree({ disabled: true });  
		}
		var devicetypeList;
try{
	if(localStorage){
			devicetypeList=JSON.parse(localStorage.getItem("reportParam" )).devicetype;
	}
}catch(error){
	devicetypeList=null;
}
		if(devicetypeList!=null){
			 var datalist=new Array();
		for(var i=0;i<devicetypeList.length;i++){
			var item=devicetypeList[i];
			 
	 datalist[datalist.length]={"id":"'"+item.id+"'","text":item.devicetype,"checked":this.selectdevicetype!=null&&(","+this.selectdevicetype+",").indexOf(",'"+item.id+"',")>=0?true:false};
		 
			}
	 	tree.tree({data:datalist});
		} 
	}
}
