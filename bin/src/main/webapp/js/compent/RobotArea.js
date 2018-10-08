var RobotArea={
	id:'',
	baseurl:'',
	areaid:null,
	selectareaid:"",
	robotdata:null,
	multiple:true,
	checkbox:true,
	_val:null,
		getHtml:function(item){
		var ret="<div id='input_group_cb_area"+this.id+"' class='input-group input-group-sm'><span class='input-group-addon'><img  src='"+RobotComm.baseurl+"img/area1816.png'  ></img>区域:</span>  <input  type='text'  class='combobox form-control ' style='min-width:150px'    id='cb_input_area"+this.id+"'></input></div>";
		return ret;
	},
	 	val:function(){
	 		if(this._val!=null){
	 			return this._val;
	 		}
		var cb_area=$("#cb_input_area"+this.id);
		var ret={areaids:'-1',areanames:'全部'};
		if(cb_area!=null&&cb_area.combotree("getValues")!=null){
			ret.areaids=cb_area.combotree("getValues").toString();
			ret.areanames=cb_area.combotree("getText");
			if(ret.areaids==""){
				ret.areaids="-1";
				ret.areanames="全部";
			}
		}
		return ret;
	},
			refresh:function(areaid){
				var cb_area=$("#cb_input_area"+this.id);
				var cb_area_width=cb_area.width();
				if(cb_area_width<200){
					cb_area_width=200;
				}
		cb_area.combotree({panelWidth:cb_area_width+'px',multiple:this.multiple}) ;
			var tree=cb_area.combotree("tree");
			tree.tree({checkbox:this.checkbox});
	//	cb_station.options.checkAllText="全选";
	if(this._val!=null){
			cb_area.combotree({ disabled: true });  
		cb_area.combotree("setText",this._val.areanames);
		return;
	}
		this.areaid=areaid;
		//刷新数据
		if(localStorage.getItem("areadata")==null||localStorage.getItem("areadatatime")==null||((new Date()).getTime()-localStorage.getItem("areadatatime")>8640000)){
			robotservice.callrobotservice("commService","QueryMyAreaInfo",{},this.result,this);
		}else{
		RobotArea.robotdata=JSON.parse(localStorage.getItem("areadata"));	
		}
		if((this.areaid==null||this.areaid=="-1"||this.areaid==-1)&&this.robotdata!=null){
		this.showit(this.robotdata);	
		}
		$("#input_group_cb_area"+this.id).find(".textbox.combo").css("width",(cb_area_width)+"px");
		$("#input_group_cb_area"+this.id).find(".textbox.combo").css("height","30px").css("border-left-width","0px");
		$("#input_group_cb_area"+this.id).find(".textbox-icon.combo-arrow").css("height","28px");
		$("#input_group_cb_area"+this.id).find(".textbox-icon.combo-arrow").css("width","28px");
		
	},
	result:function(data,callobj){
		localStorage.setItem("areadata",JSON.stringify(data));
		localStorage.setItem("areadatatime",(new Date()).getTime());
		RobotArea.robotdata=data;
		callobj.refresh(callobj.areaid);
	},
	showit:function(data){
		//展示数据
		var cb_area=$("#cb_input_area"+this.id);
		var datalist=new Array();
		var areamap={};
	for (var i = 0; i < data.length; i++) {
		var item=data[i];
		if(item.upcode==null){
			var areaitem={id:item.areaid,text:item.areaname,"checked":this.selectareaid!=null&&(this.selectareaid+",").indexOf(item.areaid+",")>=0?true:false,iconCls:'',hasparent:false};
			areamap[item.areacode]=areaitem;
			
		}else{
			if(areamap.hasOwnProperty(item.upcode)){
				var fatheritem=areamap[item.upcode];
				var areaitem={id:item.areaid,text:item.areaname, "checked":this.selectareaid!=null&&(this.selectareaid+",").indexOf(item.areaid+",")>=0?true:false,iconCls:'',hasparent:true};
				if(fatheritem.hasOwnProperty("children")){
						fatheritem.children[fatheritem.children.length]=areaitem;
				}else{
					fatheritem.children=[areaitem];
				}
				
				areamap[item.areacode]=areaitem;
			}else{
				var areaitem={id:item.areaid,text:item.areaname,"checked":this.selectareaid!=null&&(this.selectareaid+",").indexOf(item.areaid+",")>=0?true:false,iconCls:'',hasparent:false};
			areamap[item.areacode]=areaitem;
				
			}
		}

	}
		 for (var keys in areamap) {
	 	var items=areamap[keys];
	 	if(typeof(items)!="function"&&items.hasparent==false){
	 		datalist[datalist.length]=items;
	 	}
	 }
	 cb_area.combotree("tree").tree({data:datalist});
	}
}
$(window).load(function() {
	var areadiv=$(".RobotArea");
	for (var i=0;areadiv!=null&&i<areadiv.length;i++){
		var areadivitem=$(areadiv[i]);
		var robotArea=Object.create( RobotArea);
		robotArea.id=i;
		if(areadivitem[0].dataset!=null&&areadivitem[0].dataset.checkbox!=undefined){
		robotArea.checkbox=areadivitem[0].dataset.checkbox=="false"?false:true;
		}
		if(areadivitem[0].dataset!=null&&areadivitem[0].dataset.multiple!=undefined){
		robotArea.multiple=areadivitem[0].dataset.multiple=="false"?false:true;;
		}
		areadivitem.html(robotArea.getHtml());
		robotArea.refresh();
		areadivitem[0].RobotArea=function(){return robotArea;};
	}
});