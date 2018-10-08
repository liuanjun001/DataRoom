
var RobotWarnLevel={
	id:'',
	selectwarnlevel:'',
	_val:null,
		val:function(){
		var cb_warnlevel=$("#cb_warnlevel"+this.id);
		var ret={warnlevel:'-1',warnlevelname:'全部'};
		if(this._val!=null){
			this._val.warnlevelname=cb_warnlevel.combotree("getText");
			return;
		}
		if(cb_warnlevel!=null&&cb_warnlevel.combotree("getValues")!=null){
			ret.warnlevel=cb_warnlevel.combotree("getValues").toString();
			if(ret.warnlevel==""){
			ret.warnlevel="-1";	
			}else{
			ret.warnlevelname=cb_warnlevel.combotree("getText");
	    	}
			}
		return ret;
	},
	getHtml:function(item){
				var ret="<input   multiple='multiple'   style='width:80px' id='cb_warnlevel"+this.id+"'></input>";
		return ret;
	},
	refresh:function(){
		var cb_warnlevel=$("#cb_warnlevel"+this.id);
		cb_warnlevel.combotree({panelWidth:'120px',multiple:true}) ;
		var tree=cb_warnlevel.combotree("tree");
		tree.tree({checkbox:true});
		if(this._val!=null){
			this.selectwarnlevel=this._val.warnlevel;
				cb_warnlevel.combotree({ disabled: true });  
		}
		var WarnLevelList;
try{
	if(localStorage){
			WarnLevelList=JSON.parse(localStorage.getItem("reportParam" )).warnlevelset;
	}
}catch(error){
	WarnLevelList=null;
}
		if(WarnLevelList!=null){
			 var datalist=new Array();
		for(var i=0;i<WarnLevelList.length;i++){
			var item=WarnLevelList[i];
			 
	 datalist[datalist.length]={"id":item.warnlevel,"text":item.levelname,"checked":this.selectwarnlevel!=null&&(this.selectwarnlevel+",").indexOf(item.warnlevel+",")>=0?true:false};
		 
			}
	 	tree.tree({data:datalist});
		} 
	}
}
