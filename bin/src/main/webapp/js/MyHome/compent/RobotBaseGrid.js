var RobotBaseGrid={
	compentname:'RobotBaseGrid',
	classname:'',
	functionname:'',
	fielddisplay:[],
	columns:[],
	columnDefs:[],
		id:1,
	viewObject:null,
	container:null,
	myChart:null,
	 option:null,
	 sid:null,
	getHtml:function(item,nwidth,nheight){
		this.sid=""+(new Date()).getTime();
		var str_head="";
		for(var i=0;this.fielddisplay!=null&&i<this.fielddisplay.length;i++){
			str_head+="<th>"+this.fielddisplay[i]+"</th>";
		}
		return "<table id='GridRobotBase"+this.compentname+this.id+"' class='table table-bordered table-hover'  style='table-layout:fixed;height:100%;width:"+(nwidth!=null?nwidth+"px":"100%")+"' border='1'>"+
		"<thead style='color: #ECF0F1; background: rgba(52, 73, 94, 0.94);'><tr class='theader'>"+
		str_head+
		"</tr></thead><tbody></tbody></table>";
	},
	initWiget:function(){
	
//		var callobj=this;
//		setTimeout(function(){
//			callobj.refresh();
//		},100);
		 this.refresh();
	},
	refresh:function(event){
				var obj=null;
		if(event!=null){
			obj=event.data.targetobj;
		}
		robotservice.callrobotservice(obj==null?this.classname:obj.classname,obj==null?this.functionname:obj.functionname,{"queryseq":obj==null?this.sid:obj.sid},obj==null?this.showdata:obj.showdata,obj==null?this:obj);
	},
	showdata:function(item,callobj){
 
		
			var grid=$("#GridRobotBase"+callobj.compentname+callobj.id);
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
"bSort" : false, // 排序功能
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
"columns":callobj.columns,

"columnDefs":callobj.columnDefs
	
		});
				//var grid=$("#GridRobotBase"+callobj.compentname+callobj.id).dataTable();
				try{
					grid.fnClearTable();
				}catch(e){
					//TODO handle the exception
				}
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
