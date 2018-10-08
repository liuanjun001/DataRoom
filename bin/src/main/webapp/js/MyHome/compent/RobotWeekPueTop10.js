var RobotWeekPueTop10Grid={
		id:1,
	viewObject:null,
	container:null,
	myChart:null,
	 option:null,
	getHtml:function(item,nwidth,nheight){
		return "<table id='GridRobotWeekPueTop10"+this.id+"' class='table table-bordered table-hover'  style='table-layout:fixed;height:"+(nheight!=null?nheight+"px":"100%")+";width:"+(nwidth!=null?nwidth+"px":"100%")+"' border='1'>"+
		"<thead style='color: #ECF0F1; background: rgba(52, 73, 94, 0.94);width:100%'><tr class='theader' style='width:100px'>"+
		"<th>局站</th><th>近7日平均PUE最高值</th><th>前一周平均PUE最高值</th><th>前两周平均PUE最高值</th><th>参考值</th><th>&nbsp;</th>"+
		"</tr></thead><tbody></tbody></table>";
	},
	initWiget:function(){
			var grid=$("#GridRobotWeekPueTop10"+this.id);
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
"columns":[{data:"stationname"},{data:"maxavgpue"},{data:"oneweekmaxavgpue"},{data:"twoweekmaxavgpue"},{data:"referencepue"},{data:"imgtype"}],

"columnDefs":[{targets:[0],data:"stationname"},{targets:[1],data:"maxavgpue"},{targets:[2],data:"oneweekmaxavgpue"},{targets:[3],data:"twoweekmaxavgpue"},{targets:[4],data:"referencepue"}
,{targets:[5],data:"imgtype",	  "render": function(data, type, full) {
			  var htmlstr="<img src='"+(data==1?"images/redup.png":"images/greendown.png")+"'/>";
			 
            return htmlstr;
         },}]
	
		});
		 this.refresh();
	},
	refresh:function(event){
				var obj=null;
		if(event!=null){
			obj=event.data.targetobj;
		}
		robotservice.callrobotservice("pueservice","getWeekTopPue10",{},obj==null?this.showdata:obj.showdata,obj==null?this:obj);
	},
	showdata:function(item,callobj){
				var grid=$("#GridRobotWeekPueTop10"+callobj.id).dataTable();
		grid.fnClearTable();
if(item.length>0){
grid.fnAddData(item ,false);
grid.fnDraw();
}
	}
}
