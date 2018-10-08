
var RobotStationType={
	id:'',
	selectstationtype:'',
	_val:null,
		val:function(){
		var cb_stationtype=$("#cb_stationtype"+this.id);
		var ret={stationtype:'-1',stationtypename:'全部'};
		if(this._val!=null){
			this._val.stationtypename=cb_stationtype.combotree("getText");
			return this._val;
		}
		if(cb_stationtype!=null&&cb_stationtype.combotree("getValues")!=null){
			ret.stationtype=cb_stationtype.combotree("getValues").toString();
			if(ret.stationtype==""){
			ret.stationtype="-1";	
			}else{
			ret.stationtypename=cb_stationtype.combotree("getText");
	    	}
			}
		return ret;
	},
	getHtml:function(item){
				var ret="<input   multiple='multiple'   style='width:90px' id='cb_stationtype"+this.id+"'></input>";
		return ret;
	},
	refresh:function(){
		var cb_stationtype=$("#cb_stationtype"+this.id);
		cb_stationtype.combotree({panelWidth:'120px',multiple:true}) ;
		var tree=cb_stationtype.combotree("tree");
		tree.tree({checkbox:true});
		if(this._val!=null){
			this.selectstationtype=this._val.stationtype;
				cb_stationtype.combotree({ disabled: true });  
		}
		var stationtypeList;
try{
	if(localStorage){
			stationtypeList=JSON.parse(localStorage.getItem("reportParam" )).stationtype;
	}
}catch(error){
	stationtypeList=null;
}
		if(stationtypeList!=null){
			 var datalist=new Array();
		for(var i=0;i<stationtypeList.length;i++){
			var item=stationtypeList[i];
			 
	 datalist[datalist.length]={"id":item.stationtype,"text":item.stationtypename,"checked":this.selectstationtype!=null&&(this.selectstationtype+",").indexOf(item.stationtype+",")>=0?true:false};
		 
			}
	 	tree.tree({data:datalist});
	  
		} 
	}
}
