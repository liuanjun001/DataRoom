
var RobotDeviceCompany={
	id:'',
	selectdevicecompany:'',
	selectdevicecompanyname:'',
	_val:null,
		val:function(){
		var cb_devicecompany=$("#cb_devicecompany"+this.id);
		var ret={companyid:'-1',companyname:'全部'};
		if(this._val!=null){
			this._val.companyid=cb_devicecompany.combotree("getValues");
			return this._val;
		}
		if(cb_devicecompany!=null&&cb_devicecompany.combotree("getValues")!=null){
			ret.devicecompany=cb_devicecompany.combotree("getValues").toString();
			if(ret.companyid==""){
			ret.companyid="-1";	
			}else{
			ret.companyname=cb_devicecompany.combotree("getText");
	    	}
			}
		return ret;
	},
	getHtml:function(item){
				var ret="<input   multiple='multiple'   style='width:100px' id='cb_devicecompany"+this.id+"'></input>";
		return ret;
	},
	refresh:function(){
		var cb_devicecompany=$("#cb_devicecompany"+this.id);
		cb_devicecompany.combotree({panelWidth:'250px',multiple:true}) ;
		var tree=cb_devicecompany.combotree("tree");
		tree.tree({checkbox:true});
		 if(this._val!=null){ 
		 this.selectdevicecompanyname=this._val.companyname;
		 cb_devicecompany.combotree({ disabled: true });  
		 }
		var devicecompanyList;
try{
	if(localStorage){
			devicecompanyList=JSON.parse(localStorage.getItem("reportParam" )).devicecompany;
	}
}catch(error){
	devicecompanyList=null;
}
		if(devicecompanyList!=null){
			 var datalist=new Array();
		for(var i=0;i<devicecompanyList.length;i++){
			var item=devicecompanyList[i];
			 
	 datalist[datalist.length]={"id":item.id,"text":item.companyname,"checked":(this.selectdevicecompany!=null&&(","+this.selectdevicecompany+",").indexOf(","+item.id+",")>=0)||(this.selectdevicecompanyname!=null&&(","+this.selectdevicecompanyname+",").indexOf(",'"+item.companyname+"',")>=0)?true:false};
		 
			}
	 	tree.tree({data:datalist});
		} 
	}
}
