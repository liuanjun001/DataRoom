
var RobotWarnType={
	id:'',
	selectwarntype:'',
	_val:null,
		val:function(){
		var cb_warntype=$("#cb_warntype"+this.id);
		var ret={warntype:'-1',warntypename:'全部'};
		if(this._val!=null){
			this._val.warntypename=cb_warntype.combotree("getText");
			return this._val;
		}
		if(cb_warntype!=null&&cb_warntype.combotree("getValues")!=null){
			ret.warntype=cb_warntype.combotree("getValues").toString();
			if(ret.warntype==""){
			ret.warntype="-1";	
			}else{
			ret.warntypename=cb_warntype.combotree("getText");
	    	}
			}
		return ret;
	},
	getHtml:function(item){
				var ret="<input   multiple='multiple'   style='width:130px' id='cb_warntype"+this.id+"'></input>";
		return ret;
	},
	refresh:function(){
		var cb_warntype=$("#cb_warntype"+this.id);
		cb_warntype.combotree({panelWidth:'160px',multiple:true}) ;
		var tree=cb_warntype.combotree("tree");
		tree.tree({checkbox:true});
		if(this._val!=null){
			this.selectwarntype=this._val.warntype;
			cb_warntype.combotree({ disabled: true });  
		}
		var warntypeList;
try{
	if(localStorage){
			warntypeList=JSON.parse(localStorage.getItem("reportParam" )).warntype;
	}
}catch(error){
	warntypeList=null;
}
		if(warntypeList!=null){
			 var datalist=new Array();
		for(var i=0;i<warntypeList.length;i++){
			var item=warntypeList[i];
			 
	 datalist[datalist.length]={"id":item.warntype,"text":item.warntype,"checked":this.selectwarntype!=null&&(this.selectwarntype+",").indexOf(item.warntype+",")>=0?true:false};
		 
			}
	 	tree.tree({data:datalist});
		} 
	}
}
