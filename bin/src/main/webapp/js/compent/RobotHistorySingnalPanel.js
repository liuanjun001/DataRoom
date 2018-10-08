var RobotHistorySingnalPanel={
	id:1,
	stationid:null,
	targetcode:null,
	targetname:null,
	uptime:null,
	starttime:'',
	endtime:'',
	grid:null,
	pagebar:null,
	griddata:null,
	targetvaluemap:null,
	init:function(content){
		this.pagebar=RobotPageBar;
		this.pagebar.pageSize=20
			var s_pagebar="";
 
		this.pagebar.id=this.id;
		s_pagebar=this.pagebar.getHtml(null);
 
				var itemstr='<div class="panel panel-primary" style="height:100%;margin-bottom:3px;padding:1px">'+
   '<div class="panel-heading">'+
      '<h3 class="panel-title" id="targetname'+this.id+'">请选信号量</h3>'+
   '</div>'+
   '<div class="panel-body" style="width:100%;margin:1px;padding:1px;overflow:auto;height:250px"><table style="width:100%;margin:1px;padding:1px;overflow:auto;height:100%" border="0" ><tr style="height:30px"><td valign="middle"><div id="historytimerange" class="pull-left dateRange" style="width:310px">'+  
'                        <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>'+  
'                       <span id="searchDateRange"></span>  '+
'                        <b class="caret"></b>  '+
'                    </div> <button class="btn btn-primary btn-sm" id="btn_queryhistory"><i class="glyphicon glyphicon-search"></i>查询</button>&nbsp;<button class="btn btn-primary btn-sm" id="btn_exporthistory"><i class="glyphicon glyphicon-floppy-save"></i>导出</button>&nbsp;<button class="btn btn-primary btn-sm" id="btn_charthistory"><i class="glyphicon glyphicon-stats"></i>曲线</button></td></tr><tr  valign="top"><td>'+
   '<div style="position: absolute;overflow:auto;width:97%;height:180px;margin-right:1px;padding:1px"><table id="historydatagrid'+this.id+'" class="table table-bordered table-hover"  style="width:100%;margin:1px;padding:1px" border="1">'+
                   ' <thead style="color: #ECF0F1; background: rgba(52, 73, 94, 0.94);"><tr><th>时间</th><th>值</th><th>单位</th></tr></thead>'+
                    ' <tbody></tbody>'+  
                  '</table></div></td></tr><tr valign="bottom" style="height:30px"><td>'+s_pagebar+'</td></tr></table></div></div>';
                  content.append(itemstr);
                  		this.grid=$("#historydatagrid"+this.id);
            this.grid.dataTable({

	 "bScrollInfinite":false,
   "bScrollCollapse": false, 
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
"columns":[{data:"uptime",  "bSortable": true},{data:"value",  "bSortable": true},{data:"unit",  "bSortable": true}],

"columnDefs":[{targets:[0],data:"uptime",  "bSortable": true},{targets:[1],data:"value",  "bSortable": true},{targets:[2],data:"unit",  "bSortable": true}]
	
		});
		var datatable=this.grid.dataTable();
		datatable.fnClearTable();   
		if(RobotHistorySingnalPanel.starttime==''){
			RobotHistorySingnalPanel.starttime=moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
		}
		if (RobotHistorySingnalPanel.endtime=='') {
		RobotHistorySingnalPanel.endtime=moment().format('YYYY-MM-DD HH:mm:ss');	
		}
		
	$('#historytimerange span').html( RobotHistorySingnalPanel.starttime+ ' - ' + RobotHistorySingnalPanel.endtime);
		
					$('#historytimerange').daterangepicker(
							{
								// startDate: moment().startOf('day'),
								//endDate: moment(),
								//minDate: '01/01/2012',	//最小时间
								maxDate : moment(), //最大时间 
//								dateLimit : {
//									days : 30
//								}, //起止时间的最大间隔
                                linkedCalendars:false,
								showDropdowns : true,
								showWeekNumbers : false, //是否显示第几周
								timePicker : true, //是否显示小时和分钟
								timePickerIncrement : 60, //时间的增量，单位为分钟
								timePicker12Hour : false, //是否使用12小时制来显示时间
								ranges : {
									//'最近1小时': [moment().subtract('hours',1), moment()],
									'今日': [moment().startOf('day'), moment()],
				                    '昨日': [moment().subtract(1,'days').startOf('day'), moment().subtract(1,'days').endOf('day')],
				                    '最近7日': [moment().subtract(6,'days'), moment()],
				                    '最近30日': [moment().subtract(29,'days'), moment()]
								},
								opens : 'right', //日期选择框的弹出位置
								buttonClasses : [ 'btn btn-default' ],
								applyClass : 'btn-small btn-primary blue',
								cancelClass : 'btn-small',
								format : 'YYYY-MM-DD HH:mm:ss', //控件中from和to 显示的日期格式
								separator : ' to ',
								locale : {
									applyLabel : '确定',
									cancelLabel : '取消',
									fromLabel : '起始时间',
									toLabel : '结束时间',
									customRangeLabel : '自定义',
									daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
									monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
											'七月', '八月', '九月', '十月', '十一月', '十二月' ],
									firstDay : 1
								}
							}, function(start, end, label) {//格式化日期显示框
				                RobotHistorySingnalPanel.starttime=start.format('YYYY-MM-DD HH:mm:ss');
				                RobotHistorySingnalPanel.endtime=end.format('YYYY-MM-DD HH:mm:ss');
			                 	$('#historytimerange span').html(start.format('YYYY-MM-DD HH:mm:ss') + ' - ' + end.format('YYYY-MM-DD HH:mm:ss'));
			               });	
			          $("#btn_queryhistory").click({callobj:this},function(e){
			          	//查询历史数据
			          	var callobj=e.data.callobj;
			          	
			          			robotservice.callrobotservice("ProtocolsetService","QueryTargetHistoryByTime",{stationid:callobj.stationid,targetCode:callobj.targetcode, pageIndex:1,pageSize:callobj.pagebar.pageSize,starttime:RobotHistorySingnalPanel.starttime,endtime:RobotHistorySingnalPanel.endtime},callobj.displaydata,callobj,true);
			          });
			                    $("#btn_exporthistory").click({callobj:this},function(e){
			          	//导出历史数据
			          	var callobj=e.data.callobj;
			          	
			          			robotservice.callrobotservice("ProtocolsetService","ExportTargetHistoryByTime",{stationid:callobj.stationid,targetCode:callobj.targetcode, pageIndex:1,pageSize:callobj.pagebar.pageSize,starttime:RobotHistorySingnalPanel.starttime,endtime:RobotHistorySingnalPanel.endtime},callobj.displayexportdata,callobj,true);
			          });
			                 $("#btn_charthistory").click({callobj:this},function(e){
			          	//显示历史数据
			          	var callobj=e.data.callobj;
			          	    //添加右击事件
                    
                     	var htmlstr='<div  id="showHistoryChartDiv"    class="modal fade in" style="display: none">'+
 '  <div class="modal-dialog" style="width:'+($(document).width()-80)+'px">'+
 '     <div class="modal-content">'+
  '       <div class="modal-header">'+
 '           <button type="button" class="close"'+ 
  '             data-dismiss="modal" aria-hidden="true">'+
  '                &times;'+
  '          </button>'+
  '          <h4 class="modal-title" id="myOtherSerialModalLabel">'+callobj.targetname+'- 历史曲线       </h4>'+
  '       </div>'+
   '      <div class="modal-body">'+
   '	<div  id="showtargethistorychart" style="width:'+($(document).width()-85)+'px;height:'+($(document).height()-160)+'px;padding:1px;margin:1px;overflow:auto"   > '+

 
'	 </div>'+
  '       </div>'+
   '      </div>'+
   '      </div>'+
   '      </div>';
   $("body").append(htmlstr);
  
    $("#showHistoryChartDiv").modal().css({    width: "auto",
     height: "auto",
    'margin-left': function () {
    	 
       return  ( $(document).width()-$(this).width() )/ 2;
   }});
   $("#showHistoryChartDiv").on("hide.bs.modal",function(){
    $("#showHistoryChartDiv").remove();
   });
 	   var myChart = echarts.init(document.getElementById('showtargethistorychart'));
		 var option = {
color:['#ff0000','#ffae00','#f6ff00','#26c0fe'],
      legend: {
                data:[callobj.targetname ],
             position: 'right',
            },
    tooltip : {
        trigger: 'axis' 
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data:[0],
             boundaryGap : false,
            position: 'bottom',
             splitLine: {show: true},
              axisLabel: {show:true},
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
        	position: 'left',
            type : 'value',
             splitLine: {show: true},
              axisLabel:{formatter:'{value}'},
             data : [callobj.targetname ]
        }
    ],
    noDataLoadingOption: {
                        text: '暂无数据',
                        effect: 'bubble',
                        effectOption: {
                            effect: {
                                n: 0
                            }
                        }
 },

    series : [
        {
            name:callobj.targetname,
                type:'line',
                   data:[0]
        } 
    ]
};
 myChart.setOption(option);
 		var timedata=new Array();
		var  data1=new Array();
		var  data2=new Array();
	 if(callobj.griddata!=null){
	 	var datalen=callobj.griddata.length;
		for(var i=0;i<datalen;i++){
			timedata[i]=callobj.griddata[datalen-i-1].uptime.substr(11,8);
			 data1[i]=callobj.griddata[datalen-i-1].targetvalue;
 
		}
		option.xAxis[0].data=timedata;
		option.series[0].data=data1;
	 }
	 
	 
	 	myChart.setOption(option);
 
   ////////////显示曲线End
                    
			          			
			          });
			          
			          callobj=this;
			          window.FReportFirstPage=function (){
			          		 callobj.pagebar.pageIndex=1;
	 	                     callobj.refreshpage(callobj.id);
			          };
			          window.FReportPrewPage=function (){
			          		 callobj.pagebar.pageIndex=callobj.pagebar.pageIndex-1;
	 	                     callobj.refreshpage(callobj.id);
			          };
			          window.FReportNextPage=function (){
			          		 callobj.pagebar.pageIndex=callobj.pagebar.pageIndex+1;
	 	                     callobj.refreshpage(callobj.id);
			          };
			          window.FReportLastPage=function (){
			          		 callobj.pagebar.pageIndex=callobj.pagebar.pageCount;
	 	                     callobj.refreshpage(callobj.id);
			          };
			          window.FReportRefreshPage=function (){
			          		
	 	                     callobj.refreshpage(callobj.id);
			          };
			          window.FReportChangePageSize=function (){
			          		 callobj.pagebar.pageSize=$("#t_pageSizeInfo"+callobj.id).val();
			          		 
	 	                     callobj.refreshpage(callobj.id);
			          };
			          window.FReportChangeIndex=function (){
			  	 callobj.pagebar.pageIndex=$("#pageselect"+callobj.id).val();
	 	                     callobj.refreshpage(callobj.id);
			          };
			            
},
	refreshpage:function(id){
	robotservice.callrobotservice("ProtocolsetService","QueryTargetHistoryByTime",{stationid:this.stationid,targetCode:this.targetcode, pageIndex:this.pagebar.pageIndex,pageSize:this.pagebar.pageSize,starttime:RobotHistorySingnalPanel.starttime,endtime:RobotHistorySingnalPanel.endtime},this.displaydata,this,true);
	},
	queryhistory:function(stationid, targetcode, targetname, uptime,targetvaluemap){
		this.stationid=stationid;
		this.targetcode=targetcode;
		this.targetname=targetname;
		this.uptime=uptime;
		this.targetvaluemap=targetvaluemap;
		RobotHistorySingnalPanel.starttime=uptime.substr(0,10)+" 00:00:00";
		RobotHistorySingnalPanel.endtime=uptime;
		$('#historytimerange').data("daterangepicker").setStartDate(new Date(RobotHistorySingnalPanel.starttime));
	 	$('#historytimerange').data("daterangepicker").setEndDate(new Date(RobotHistorySingnalPanel.endtime));
	 	$('#historytimerange').data("daterangepicker").updateCalendars();
			$('#historytimerange span').html(RobotHistorySingnalPanel.starttime + ' - ' + RobotHistorySingnalPanel.endtime);
		$("#targetname"+this.id).html(targetname+"——历史数据");
		//stationid, targetcode, targetname, uptime
		robotservice.callrobotservice("ProtocolsetService","QueryTargetHistoryByTime",{stationid:this.stationid,targetCode:this.targetcode,pageIndex:1,pageSize:20,starttime:uptime.substr(0,10)+" 00:00:00",endtime:uptime},this.displaydata,this,true);
	},
	displayexportdata:function(data,callobj){
		RobotComm.showDownLoadWindow(data.result);
	},
	displaydata:function(data,callobj){
		
			var datatable=callobj.grid.dataTable();
					datatable.fnClearTable();
		if(data!=null&&data.rs!=null){
			 callobj.pagebar.pageIndex=data.pageIndex;
			  callobj.pagebar.pageSize=data.pageSize;
		callobj.pagebar.recordcount=data.RecordCount;

	 callobj.pagebar.refreshstatu();
	 callobj.griddata=new Array();
		 for (var i = 0; i < data.rs.length; i++) {
		 var itemobj=data.rs[i];
		 itemobj.rownumber=i+1;
		 itemobj.value=converttargetvaluemap(itemobj.targetvalue,callobj.targetvaluemap);
		 	datatable.fnAddData(itemobj,false);
		 	callobj.griddata[i]=itemobj;
		 }
		callobj.grid.fnDraw();
		
	}else{
	
		callobj.pagebar.recordcount=0;

	 callobj.pagebar.refreshstatu();
	}
	}
}
