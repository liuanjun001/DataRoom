var RobotDeviceWarnListGrid={
		id:1,
	viewObject:null,
	container:null,
	myChart:null,
	 option:null,
	 sid:null,
	getHtml:function(item,nwidth,nheight){
		this.sid=""+(new Date()).getTime();
		return "<table id='GridRobotDeviceWarn"+this.id+"' class='table table-bordered table-hover'  style='table-layout:fixed;height:"+(nheight!=null?nheight+"px":"100%")+";width:"+(nwidth!=null?nwidth+"px":"100%")+"' border='1'>"+
		"<thead style='color: #ECF0F1; background: rgba(52, 73, 94, 0.94);'><tr class='theader'>"+
		"<th>&nbsp;</th><th>告警位置</th><th>开始时间</th><th>告警原因</th>"+
		"</tr></thead><tbody></tbody></table>";
	},
	initWiget:function(){
			var grid=$("#GridRobotDeviceWarn"+this.id);
		//	alert(grid.height());
						grid.dataTable({
			"sScrollX":"auto",
	 "sScrollY":"auto",
	 "bScrollInfinite":false,
   "bScrollCollapse": true, 
  "bPaginate" : false, // 翻页功能
"bStateSave" : false, // 状态保存
"bLengthChange" : false, // 改变每页显示数据数量
"bFilter" : false, // 过滤功能
"bSort" : true, // 排序功能
"bInfo" : false, // 页脚信息
"bAutoWidth" : false,// 自动宽度
"bDestroy" : true,
  "oLanguage": {
                    "sProcessing": "正在加载中......",
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "对不起，查询不到相关数据！",
                    "sEmptyTable": "表中无数据存在！",
                    "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
                    "sSearch": "搜索"
                }, //多语言配置
"columns":[{data:"warnlevel"},{data:"warninfo"},{data:"startuptime"},{data:"warndesc"}],

"columnDefs":[{targets:[0],data:"warnlevel","width":"20px",
"render":function(data, type, full) {
	var scolor="ff0000";
	//'#ff0000','#ffae00','#f6ff00','#26c0fe'
	if(full.warnlevel==undefined){
		scolor="000000";
	}else	if(full.warnlevel==2){
		scolor="ffae00";
	}else if(full.warnlevel==3){
		scolor="f6ff00";
	}else if(full.warnlevel==4){
		scolor="26c0fe";
	}
	return "<canvas   width='20px' height='20px' style='background:#"+scolor+"'></canvas> ";
}
},{targets:[1],data:"warninfo",
"render":function(data, type, full) {
	return "【"+full.stationname+"】【"+full.devicename+"】【"+full.warninfo+"】";
}
},{targets:[2],data:"startuptime"},{targets:[3],data:"warndesc",
"render":function(data, type, full) {
	var warndesc  =full.warndesc  ;
				if(warndesc==null){return "";}
				if(warndesc!=null&&warndesc.length>40){
					return warndesc.substr(0,40)+" ...";
				}
				else {
					return warndesc;
				}
}
}]
	
		});
		 this.refresh();
	},
	refresh:function(event){
				var obj=null;
		if(event!=null){
			obj=event.data.targetobj;
		}
		robotservice.callrobotservice("RTWarnService","QueryRealWarn",{"queryseq":obj==null?this.sid:obj.sid},obj==null?this.showdata:obj.showdata,obj==null?this:obj);
	},
	showdata:function(item,callobj){
				var grid=$("#GridRobotDeviceWarn"+callobj.id).dataTable();
//		grid.fnClearTable();
//				for (var i = 0; i < item.length; i++) {
//					grid.fnAddData(item[i],false);
//				}
if(item.length>0){
grid.fnAddData(item ,false);
grid.fnDraw();
}
	}
}
