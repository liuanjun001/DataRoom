var RobotRealWarn={
	id:1,
	queryseq:'',
	grid:null,
	warndata:null,
	ConditionTree:null,
	filterlevel:null,
	filterareaid:null,
	filterstationid:null,
	filterwarncode:null,
	warnlevelcount:new Array(),
	init:function(content){
		var str='<div class="panel panel-primary" style="margin-right: 1px;height:100%;margin-bottom:3px;padding:1px">'+ 
   '<div class="panel-heading">'+ 
   '   <h3 class="panel-title" style="margin-right: 1px;" >活动告警<span style="margin-right: 10px;float:right"><span class="badge" id="level1info" style="background-color:#ff0000;color:#ffffff">0</span> <span class="badge" id="level2info" style="background-color:#ffae00;color:#ffffff">0</span> <span class="badge" id="level3info" style="background-color:#f6ff00;color:#5bc0de">0</span> <span class="badge" id="level4info" style="background-color:#26c0fe;color:#ffffff">0</span>'+
  //'<button class="btn btn-primary btn-sm" id="btn_exportlivewarn"><i class="glyphicon glyphicon-floppy-save"></i></button> '  +
  '<span  class="glyphicon glyphicon-floppy-save" id="btn_exportlivewarn" style="margin-left:5px" ></span></span>  </h3>'+
   '</div>'+
   '<div class="panel-body" style="height:'+($(window).height()-80)+'px;min-height:200px;margin:1px;padding:1px">'+
   '<table  id="livewarngrid"   class="table table-bordered table-hover" border="1"  style="width: 100%;margin:0px;padding:0px;table-layout:fixed">'+
   '<thead style="color: #ECF0F1; background: rgba(52, 73, 94, 0.94);">'+
   '<tr class="theader">'+
   '<th field="warnlevel" width="20px"></th>'+
   '<th field="areaname" width="50px">区域</th>'+
   '<th field="stationname" width="150px" >局站</th>'+
   '<th field="warncode" width="70px">告警编码</th>'+
   '<th field="warninfo" width="120px">告警名称</th>'+
   '<th field="startuptime" width="140px" >告警时间</th>'+
   '<th field="devicename" width="220px">告警位置</th>'+
   '<th field="warndesc" width="220px">告警触发值</th>'+
    
   '<th field="confirmstate" width="80px">处理状态</th>'+
  '<th field="timeoutstate" width="80px">超时状态</th>'+
   '</tr></thead></table>'+
'</div>'+
'	</div>';
content.append(str);
	this.grid=$("#livewarngrid");
	this.queryseq=Date.parse(new Date()); 
	this.refreshrealwarn();
	
	this.grid.dataTable({
			"sScrollX":true,
			"sScrollXInner":"110%",
		 "sScrollY":$(window).height()-140,
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
"columns":[{data:"warnlevel","bSortable": true},{data:"areaname","bSortable": true},
{data:"stationname","bSortable": true},
{data:"warncode","bSortable": true},
{data:"warninfo","bSortable": true},
{data:"startuptime","bSortable": true},
{data:"devicename","bSortable": true},
{data:"warndesc","bSortable": true},

{data:"confirmstate","bSortable": true},
{data:"timeoutstate","bSortable": true}
],

"columnDefs":[{targets:[0],data:"warnlevel","bSortable": true,"render": function(data, type, full) {
			  var scolor="ff0000";
	//'#ff0000','#ffae00','#f6ff00','#26c0fe'
	if(full.warnlevel==undefined||full.warnlevel==""){
		scolor="000000";
		return "";
	}else	if(full.warnlevel==2){
		scolor="ffae00";
	}else if(full.warnlevel==3){
		scolor="f6ff00";
	}else if(full.warnlevel==4){
		scolor="26c0fe";
	}
	return "<canvas   width='18px' height='18px' style='background:#"+scolor+"'></canvas> ";
 
         }},{targets:[1],data:"areaname","bSortable": true},
{targets:[2],data:"stationname","bSortable": true},
{targets:[3],data:"warncode","bSortable": true},
{targets:[4],data:"warninfo","bSortable": true},
{targets:[5],data:"startuptime","bSortable": true},
{targets:[6],data:"devicename","bSortable": true},
{targets:[7],data:"warndesc","bSortable": true},
{targets:[8],data:"confirmstate","bSortable": true,"render": function(data, type, full) {
	if(full.confirmstate=="1"){
		return "确认";
	}else{
		return "未确认";
	}
}},
{targets:[9],data:"timeoutstate","bSortable": true,"render": function(data, type, full) {
	if(full.timeoutstate=="1"){
		return "超时";
	}else{
		return "正常";
	}
}}]
	
		});
		
		var datatable=this.grid.dataTable();
		datatable.fnClearTable();
		 //定时刷新告警
		 var refreshrealwarnid=window.setInterval( this._refreshrealwarn(this),15000);
		 //过滤树
		 $("#btn_exportlivewarn").click({callobj:this},function(e){
		 	var callobj=e.data.callobj;
		 	robotservice.callrobotservice("irobotcommService","ExportLiveWarnInfo",{},callobj.showexportresult,callobj,true);
		 });
		 if(this.ConditionTree!=null){
		 	var contiontree=this.ConditionTree.contiontree;
		 	var callobj=this;
		 	contiontree.tree({onCheck:function(node,selected){
		 		var nodes=contiontree.tree("getChecked");
		 		 
		 			callobj.filterlevel=null;
	callobj.filterareaid=null;
	callobj.filterstationid=null;
	callobj.filterwarncode=null;
		 	 
		 		for(var i=0;i<nodes.length;i++){
		 			var setdata=JSON.parse(nodes[i].data);
		 			if(setdata.warnlevel!="-1"){
		 				callobj.filterlevel=callobj.filterlevel==null?setdata.warnlevel:callobj.filterlevel+","+setdata.warnlevel;
		 			}
		 			if(setdata.areaid!="-1"){
		 				callobj.filterareaid=callobj.filterareaid==null?setdata.areaid:callobj.filterareaid+","+setdata.areaid;
		 			}
		 			if(setdata.stationids!="-1"){
		 				callobj.filterstationid=callobj.filterstationid==null?setdata.stationids:callobj.filterstationid+","+setdata.stationids;
		 			}
		 			if(setdata.warntypecodes!="-1"&&setdata.warnlevel=="-1"){
		 				callobj.filterwarncode=callobj.filterwarncode==null?setdata.warntypecodes:callobj.filterwarncode+","+setdata.warntypecodes;
		 			}
		 		}
		 		callobj.showwarndata(callobj.warndata,callobj);
		 	}});
		 }
	},
	        _refreshrealwarn:function(callobj){
        	return function(){ 
callobj.refreshrealwarn(callobj); 
} 
        },
	refreshrealwarn:function(callobj){
		if(callobj==null||callobj==undefined){
			callobj=this;
		}
	robotservice.callrobotservice("RTWarnService","QueryRealWarn",{queryseq:callobj.queryseq},callobj.showwarndata,callobj,false);	
	},
	showwarndata:function(data,callobj){
		if(data!=null&&data.length>0){
			callobj.warndata=data;
			var datatable=callobj.grid.dataTable();
		datatable.fnClearTable();
		callobj.warnlevelcount[0]=0;
		callobj.warnlevelcount[1]=0;
		callobj.warnlevelcount[2]=0;
		callobj.warnlevelcount[3]=0;
				 for (var i = 0; i < data.length; i++) {
		 var itemobj=data[i];
		 itemobj.rownumber=i+1;
		 callobj.warnlevelcount[itemobj.warnlevel-1]++;
		 if(itemobj.confirmstate==undefined){
		 	itemobj.confirmstate=0;
		 }
		  if(itemobj.timeoutstate==undefined){
		 	itemobj.timeoutstate=0;
		 }
		    if(itemobj.devicename==undefined){
		 	itemobj.devicename="";
		 }
		    if(callobj.filterlevel!=null&&callobj.filterlevel.length>0){
		    	if((","+callobj.filterlevel+",").indexOf(","+itemobj.warnlevel+",")<0){
		    		continue;
		    	}
		    }

		    if(callobj.filterareaid!=null&&callobj.filterareaid.length>0){
		    	if((","+callobj.filterareaid+",").indexOf(","+itemobj.areaid+",")<0){
		    		continue;
		    	}
		    }
		   if(callobj.filterstationid!=null&&callobj.filterstationid.length>0){
		    	if((","+callobj.filterstationid+",").indexOf(","+itemobj.stationid+",")<0){
		    		continue;
		    	}
		    }
		      if(callobj.filterwarncode!=null&&callobj.filterwarncode.length>0){
		    	if((","+callobj.filterwarncode+",").indexOf(","+itemobj.warncode+",")<0){
		    		continue;
		    	}
		    }
		 	datatable.fnAddData(itemobj,false);
		 }
		callobj.grid.fnDraw();
		$("#level1info").html(callobj.warnlevelcount[0]);
		$("#level2info").html(callobj.warnlevelcount[1]);
		$("#level3info").html(callobj.warnlevelcount[2]);
		$("#level4info").html(callobj.warnlevelcount[3]);
		}
	},
	showexportresult:function(data,callobj){
		RobotComm.showDownLoadWindow(data.result);
	}
}
