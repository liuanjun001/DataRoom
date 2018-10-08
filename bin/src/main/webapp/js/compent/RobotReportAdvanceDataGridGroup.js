	include("js/compent/RobotPageBar.js");
var RobotReportAdvanceDataGridGroup={
	id:"",
	groupcoldef:"",
	robotdata:{},
	defdata:{},
	viewObject:{},//对像的可视化组件
	queryparam:{},
	container:{},
	pagebar:null,
	columns:new Array(),
	columnDefs:new Array(),
	a_thhead:new Array(),
	initWigetData:function(){},
	calevel:function(item,lvl){
		//计算数据的最大树级别
		var maxlvl=lvl;
		for(var i=0;i<item.length;i++){
			if(item[i].hasOwnProperty("children")){
			var _lvl=this.calevel(item[i].children,lvl+1);
			if(_lvl>maxlvl){
				maxlvl=_lvl;
			}
			}
		}
		return maxlvl;
	},
	createcolumndef:function (coldef,maxlvl,curlvl,colindex){
		if(this.a_thhead[curlvl-1]==undefined){
			this.a_thhead[curlvl-1]="";
		};
			for(var i=0;i<coldef.length;i++){
			 var child=coldef[i].children;
			  if(child==null){
			this.columns[this.columns.length]={"data":!coldef[i].hasOwnProperty("datafield")?coldef[i].headtext:coldef[i].datafield,  "bSortable": true};
			this.columnDefs[this.columnDefs.length]={ "targets": [colindex],
          "data":!coldef[i].hasOwnProperty("datafield")?coldef[i].headtext:coldef[i].datafield,
         "visable":child==null?true:false,
		    "bSortable": true};
    	colindex++;
			  }
				this.a_thhead[curlvl-1]+="<th "+(maxlvl-curlvl+1>1&&child==null?"rowspan='"+(maxlvl-curlvl+1)+"' ":"")+(child!=null?" colspan='"+child.length+"'":"")+(coldef[i].hasOwnProperty("width")&&coldef[i].width!=""&&coldef[i].width>0?" width='"+coldef[i].width+"px'":"")+">"+coldef[i].headtext+"</th>";
	if(child!=null){
	colindex=this.createcolumndef(child,maxlvl,curlvl+1,colindex);
	}
			}
			return colindex;
	},
	getHtml:function (item){
		this.defdata=item;
		this.pagebar=RobotPageBar;
		this.pagebar.pageSize=item.pagesize;
		this.groupcoldef=item.groupcoldef;
		var coldef=JSON.parse(item.groupcoldef);
	var s_thead="";
	this.autowidth=true;
	if(coldef!=null){
		//遍历表格的列定义属性
		var maxlevel=this.calevel(coldef,1);
		 if(maxlevel==1){
		for(var i=0;i<coldef.length;i++){
			this.columns[this.columns.length]={"data":!coldef[i].hasOwnProperty("datafield")?coldef[i].headtext:coldef[i].datafield,  "bSortable": true};
			this.columnDefs[this.columnDefs.length]={ "targets": [i],
          "data":!coldef[i].hasOwnProperty("datafield")?coldef[i].headtext:coldef[i].datafield,
         "visable":true,
		    "bSortable": true};
			s_thead+="<th "+(coldef[i].hasOwnProperty("width")&&coldef[i].width!=""&&coldef[i].width>0?" width='"+coldef[i].width+"px'":"")+">"+coldef[i].headtext+"</th>";
			
		}
		s_thead="<tr class='theader'>"+s_thead+"</tr>";
		 }else{
		 	//如果是多级表头
		 	this.a_thhead=new Array();
		 	this.createcolumndef(coldef,maxlevel,1,0);
		 	for(var ii=0;ii<this.a_thhead.length;ii++){
		 		s_thead+="<tr >"+this.a_thhead[ii]+"</tr>";	
		 	}
		 		this.columnDefs[this.columnDefs.length]={ "visible": true, "targets": -1};
		 }
	}
	var s_pagebar="";
	if(item.showpagebar){
		this.pagebar.id=this.id;
		s_pagebar=this.pagebar.getHtml(item);
		//"<table width='100%' style='bottom:0px' border='0'><tr><td   >第<select onchange='FReportChangeIndex("+this.id+")' id='pageselect"+this.id+"'></select>/<font id='pagecount"+this.id+"'></font>页,总<font id='recordcount"+this.id+"'></font>条,每页<input style='width:40px' onchange='FReportChangePageSize("+this.id+")' type='number' id='t_pageSizeInfo"+this.id+"' />条</td><td align='right'><a id='a_firstpage"+this.id+"' href='#'  onclick='FReportFirstPage("+this.id+")'>首页</a>&nbsp;&nbsp;<a  id='a_prewpage"+this.id+"' href='#'  onclick='FReportPrewPage("+this.id+")'>上一页</a>&nbsp;&nbsp;<a  id='a_nextpage"+this.id+"' href='#'  onclick='FReportNextPage("+this.id+")'>下一页</a>&nbsp;&nbsp;<a  id='a_lastpage"+this.id+"' href='#'  onclick='FReportLastPage("+this.id+")'>末页</a>&nbsp;&nbsp;<a href='#' onclick='FReportRefreshPage("+this.id+")'>刷新</a>&nbsp;&nbsp;</td></tr></table>";
	}
//		var itemstr="<div style='position: absolute;overflow:auto;left:"+(item.hasOwnProperty("left")?item.left:item.x)+"px;top:"+(item.hasOwnProperty("top")?item.top:item.y)+"px"+(item.hasOwnProperty("right")?";right:"+item.right+"px":"")+(item.hasOwnProperty("bottom")?";bottom:"+item.bottom+"px":"")+(item.hasOwnProperty("width")&&!item.hasOwnProperty("right")?";width:"+item.width+(item.width.indexOf("%")>0?"%":"px"):"")+(item.hasOwnProperty("height")&&!item.hasOwnProperty("bottom")?";height:"+item.height+(item.height.indexOf("%")>0?"%":"px"):"")+"'><table id='datagrid"+this.id+"' class='table table-bordered table-hover' style='table-layout:fixed'  width='100%' border='1'>"+
//                 " <thead style='color: #ECF0F1; background: rgba(52, 73, 94, 0.94);'>"+ 
//              		s_thead+
//					  "</thead>"+
//                   "<tbody></tbody>"+  
//                "</table>"+s_pagebar+"</div>";
//                return itemstr;
		var itemstr="<div style='position: absolute;overflow:hidden;left:"+(item.hasOwnProperty("left")?item.left:item.x)+"px;top:"+(item.hasOwnProperty("top")?item.top:item.y)+"px"+(item.hasOwnProperty("right")?";right:"+item.right+"px":"")+(item.hasOwnProperty("bottom")?";bottom:"+item.bottom+"px":"")+(item.hasOwnProperty("width")&&!item.hasOwnProperty("right")?";width:"+item.width+(item.width.indexOf("%")>0?"%":"px"):"")+(item.hasOwnProperty("height")&&!item.hasOwnProperty("bottom")?";height:"+item.height+(item.height.indexOf("%")>0?"%":"px"):"")+"'>"+
		"<div style='position: absolute;left: 0px;right: 0px; top:0px;bottom: 31px;overflow: auto;margin:1px'><table id='datagrid"+this.id+"' class='table table-bordered table-hover' style='table-layout:fixed;margin:0px;top:0px;bottom:0px'  width='100%'   border='1'>"+
                   " <thead style='color: #ECF0F1; background: rgba(52, 73, 94, 0.94);'>"+ 
                		s_thead+
					  "</thead>"+
                     "<tbody></tbody>"+  
                  "</table></div><div  style='position: absolute;left: 1px;right: 0px; height:30px;bottom: 2px;overflow: auto;'> "+s_pagebar+"</div></div>";
                  return itemstr;
	},
    query:function(param){
		//查询函数
				if(this.defdata.hasOwnProperty("querymethods")){
						param["querymethods"]=this.defdata.querymethods;
				}
				if(this.defdata.hasOwnProperty("procedurename")){
					param["procedurename"]=this.defdata.procedurename;
				}
				param["pageindex"]=this.pagebar.pageIndex;
				param["pagesize"]=this.pagebar.pageSize;
				this.queryparam=param;
				robotservice.callrobotservice("ReportService","doGridQuery",{"arg":JSON.stringify(param)},this.refreshdata,this);
	},
	refresh:function(){
		//翻页刷新
	this.queryparam["pageindex"]=this.pagebar.pageIndex;
	this.queryparam["pagesize"]=this.pagebar.pageSize;
    robotservice.callrobotservice("ReportService","doGridQuery",{"arg":JSON.stringify(this.queryparam)},this.refreshdata,this);
	},
	exportfile:function(param){
		//导出函数
//						for (var sProp in param) {
////alert("export："+sProp+"="+param[sProp]);
//      }
				if(this.defdata.hasOwnProperty("querymethods")){
						param["querymethods"]=this.defdata.querymethods;
				}
				if(this.defdata.hasOwnProperty("procedurename")){
					param["procedurename"]=this.defdata.procedurename;
				}
				param["pageindex"]=1;
					param["pagesize"]=65534;
							robotservice.callrobotservice("ReportService","doGridExportAll",{"arg":JSON.stringify(param),"header":this.groupcoldef},this.exportdataresult);
	},
	exportdataresult:function(data,callobj){
		RobotComm.showDownLoadWindow(data.result);
	},
	refreshdata:function(data,callobj){
	 var docheight=$(window).height();
	 var gridheight=100;
	 if(callobj.defdata.hasOwnProperty("bottom")){
	 	gridheight=docheight-(callobj.defdata.hasOwnProperty("top")?callobj.defdata.top:callobj.defdata.y)-callobj.defdata.bottom-135;
	 }else{
	 	gridheight=callobj.defdata.height;
	 }
				var grid=$("#datagrid"+callobj.id);
						grid.dataTable({
			"sScrollX":"auto",
	 "sScrollY":gridheight,
	 "bScrollInfinite":false,
   "bScrollCollapse": true, 
  "bPaginate" : false, // 翻页功能
"bStateSave" : false, // 状态保存
"bLengthChange" : false, // 改变每页显示数据数量
"bFilter" : false, // 过滤功能
"bSort" : true, // 排序功能
"bInfo" : false, // 页脚信息
"bAutoWidth" : true,// 自动宽度
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
		var datatable=grid.dataTable();
		datatable.fnClearTable();
	if(data!=null&&data.rs!=null){
		callobj.pagebar.recordcount=data.param[0].recordcount;

	 callobj.pagebar.refreshstatu();
		 for (var i = 0; i < data.rs.length; i++) {
		 var itemobj=data.rs[i];
		 itemobj.rownumber=i+1;
		 	datatable.fnAddData(itemobj,false);
		 }
		grid.fnDraw();
		
	}else{
	
		callobj.pagebar.recordcount=0;

	 callobj.pagebar.refreshstatu();
	}
	}
	
}
