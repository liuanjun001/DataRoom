var RobotMyAreaReportGrid={
		id:1,
	viewObject:null,
	container:null,
	myChart:null,
	 option:null,
	getHtml:function(item,nwidth,nheight){
		return "<table id='GridRobotMyAreaReport"+this.id+"' class='table table-bordered table-hover'  style='height:"+(nheight!=null?nheight+"px":"100%")+";width:"+(nwidth!=null?nwidth+"px":"100%")+"' border='1'>"+
		"<thead style='color: #ECF0F1; background: rgba(52, 73, 94, 0.94);'><tr class='theader'>"+
		"<th width='30px'></th><th>报表</th>"+
		"</tr></thead><tbody></tbody></table>";
	},
	initWiget:function(){
			var grid=$("#GridRobotMyAreaReport"+this.id);
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
"columns":[{data:"reporturl"},{data:"reportname"} ],

"columnDefs":[{targets:[0],data:"reporturl",width:"30px",
"render":function(data, type, full) {
	return "<a href='"+full.reporturl+"' target='_blank'><i class='glyphicon glyphicon-save-file'></a>";
}
},{targets:[1],data:"reportname"} ]
	
		});
		 this.refresh();
	},
	refresh:function(event){
				var obj=null;
		if(event!=null){
			obj=event.data.targetobj;
		}
		robotservice.callrobotservice("BaseStationInfo","QueryAreaReportInfo",{"queryareaid":"-1"},obj==null?this.showdata:obj.showdata,obj==null?this:obj);
	},
	showdata:function(item,callobj){
				var grid=$("#GridRobotMyAreaReport"+callobj.id).dataTable();
		grid.fnClearTable();
//				for (var i = 0; i < item.length; i++) {
//					grid.fnAddData(item[i]);
//		}
if(item.reportedlist!=null&&item.reportedlist.length>0){
grid.fnAddData(item.reportedlist ,false);
grid.fnDraw();
}
	}
}
