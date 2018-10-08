
var RobotMyHome={
	setcompentvalue:'',
	setcompentname:'',
	setcompentstylevalue:'',
	setcompentstylename:'',
	setcompentindex:'',
	setcompentreportname:'',
	stylelib:[{compentname:"两列样式",icon:"myhome/style1.png",value:"com.robot.module.myhome.myhomestyle::style1",cls:RobotMyHomeStyle1},
	{compentname:"两列多行样式1",icon:"myhome/style2.png",value:"com.robot.module.myhome.myhomestyle::style2",cls:RobotMyHomeStyle2},
	{compentname:"5模块样式1",icon:"myhome/style3.png",value:"com.robot.module.myhome.myhomestyle::style3",cls:RobotMyHomeStyle3},
	{compentname:"6模块样式1",icon:"myhome/style4.png",value:"com.robot.module.myhome.myhomestyle::style4",cls:RobotMyHomeStyle4},
	{compentname:"6宫格(2X3)",icon:"myhome/style5.png",value:"com.robot.module.myhome.myhomestyle::style5",cls:RobotMyHomeStyle5},
	{compentname:"6宫格(3X2)",icon:"myhome/style6.png",value:"com.robot.module.myhome.myhomestyle::style6",cls:RobotMyHomeStyle6},
	{compentname:"8宫格(2X4)",icon:"myhome/style7.png",value:"com.robot.module.myhome.myhomestyle::style7",cls:RobotMyHomeStyle7},
	{compentname:"8宫格(4X2)",icon:"myhome/style8.png",value:"com.robot.module.myhome.myhomestyle::style8",cls:RobotMyHomeStyle8},
	{compentname:"9宫格",icon:"myhome/style9.png",value:"com.robot.module.myhome.myhomestyle::style9",cls:RobotMyHomeStyle9},
	{compentname:"呈现样式1",icon:"myhome/style9.png",value:"com.robot.module.myhome.myhomestyle::style10",cls:RobotMyHomeStyle10},
	{compentname:"大屏(4*3*108p)背景黑",icon:"myhome/style9.png",value:"com.robot.module.myhome.myhomestyle::style11",cls:RobotMyHomeStyle11},
	{compentname:"大屏(108p)背景黑",icon:"myhome/style9.png",value:"com.robot.module.myhome.myhomestyle::style12",cls:RobotMyHomeStyle12}
	],
	compentlib:[{compentname:"实时告警电子地图",icon:"myhome/gisreport.png",type:"chart",sizetype:"big",counttype:"day",reportname:"SelfGisCompent",value:"com.robot.module.selfgis.SelfGisCompent",cls:RobotAreaWarnMapCompent},
				{compentname:"实时告警级别分析",icon:"myhome/piechart.png",type:"chart",sizetype:"big",counttype:"day",reportname:"warnlevelReport",value:"com.robot.module.monitor.warnreport.warnlevelReport",cls:RobotWarnLevelPiereport},
				{compentname:"实时告警时长分析",icon:"myhome/columnchart.png",type:"chart",sizetype:"big",counttype:"day",reportname:"warntimeReport",value:"com.robot.module.monitor.warnreport.warntimeReport",cls:RobotWarnTimeColumnReport},
				{compentname:"设备实时告警",icon:"myhome/grid.png",type:"grid",sizetype:"big",counttype:"day",reportname:"devicewarnlist",value:"com.robot.module.monitor.warnreport.devicewarnlist",cls:RobotDeviceWarnListGrid},
				{compentname:"近7日告警分析",icon:"myhome/columnchart.png",type:"columnchart",counttype:"day",sizetype:"big",reportname:"near7dayReport",value:"com.robot.module.monitor.warnreport.near7dayReport",cls:RobotNear7dayReport},
//				{compentname:"近7日局站标准化分析",icon:"myhome/columnchart.png",type:"columnchart",counttype:"day",sizetype:"big",reportname:"near7dayReport",value:"com.robot.module.monitor.warnreport.near7daystandardstationReport",cls:RobotNear7dayStandardStationReport},
				{compentname:"月度告警分析",icon:"myhome/columnchart.png",type:"columnchart",sizetype:"small",counttype:"month",reportname:"monthwarnlevelreport",value:"com.robot.module.monitor.warnreport.monthReport",cls:RobotMonthWarnReport},
				{compentname:"周告警分析",icon:"myhome/columnchart.png",type:"columnchart",sizetype:"small",counttype:"week",reportname:"weekwarnlevelreport",value:"com.robot.module.monitor.warnreport.weekReport",cls:RobotweekReport}
//				{compentname:"上周频繁告警Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",reportname:"freqwarnreport",value:"com.robot.module.monitor.warnreport.freqReport",cls:RobotFreqWarnGrid},
//				{compentname:"上周长时间告警Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",reportname:"longwarnreport",value:"com.robot.module.monitor.warnreport.longwarnreport",cls:RobotLongWarnGrid},
//				{compentname:"上周高温告警分析",icon:"myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"week",reportname:"highttemplatewarnreport",value:"com.robot.module.monitor.warnreport.highttemplatewarnchartreport",cls:RobotHighttemplatewarnchartreport},
//				{compentname:"上周高温告警Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",reportname:"highttemplatewarnreport",value:"com.robot.module.monitor.warnreport.highttemplatewarnreport",cls:RobotHighttemplatewarnGridreport},
//				{compentname:"上周停电告警分析",icon:"myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"week",reportname:"powerdownwarnreport",value:"com.robot.module.monitor.warnreport.powerdownwarnchartreport",cls:RobotPowerdownwarnchartreport},
//				{compentname:"上周局站标准化分析",icon:"myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"week",reportname:"powerdownwarnreport",value:"com.robot.module.monitor.warnreport.weekstandardstationReport",cls:RobotWeekStandardStationReport},
//				{compentname:"上周停电告警Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",reportname:"powerdownwarnreport",value:"com.robot.module.monitor.warnreport.powerdownwarnreport",cls:RobotPowerdownwarnGridreport},
//				{compentname:"上周蓄电池电压低告警分析",icon:"myhome/arealinechart.png",type:"chart",counttype:"week",sizetype:"small",reportname:"lowerbatterywarnreport",value:"com.robot.module.monitor.warnreport.lowerbatterywarnchartreport",cls:RobotLowerbatterychartreport},
//				{compentname:"上周蓄电池电压低告警Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",reportname:"lowerbatterywarnreport",value:"com.robot.module.monitor.warnreport.lowerbatterywarnreport",cls:RobotLowerbatteryGridreport},
//				{compentname:"上周FSU中断告警分析",icon:"myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"week",reportname:"fsuwarnreport",value:"com.robot.module.monitor.warnreport.fsuwarnchartreport",cls:RobotFsuwarnchartreport},
//				{compentname:"上周FSU中断告警Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",reportname:"fsuwarnreport",value:"com.robot.module.monitor.warnreport.fsuwarnreport",cls:RobotFsuwarnGridreport},
//				{compentname:"上月频繁告警Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",reportname:"monthfreqwarnreport",value:"com.robot.module.monitor.warnreport.monthfreqReport",cls:RobotMonthFreqWarnGrid},
//				{compentname:"上月长时间告警Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",reportname:"monthlongwarnreport",value:"com.robot.module.monitor.warnreport.monthlongwarnreport",cls:RobotMonthLongWarnGrid},
//				{compentname:"上月高温告警分析",icon:"myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",reportname:"monthhighttemplatewarnreport",value:"com.robot.module.monitor.warnreport.monthhighttemplatewarnchartreport",cls:RobotMonthHighttemplatewarnchartreport},
//				{compentname:"上月高温告警Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",reportname:"monthhighttemplatewarnreport",value:"com.robot.module.monitor.warnreport.monthhighttemplatewarnreport",cls:RobotMonthHighttemplatewarnGridreport},
//				{compentname:"上月停电告警分析",icon:"myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",reportname:"monthpowerdownwarnreport",value:"com.robot.module.monitor.warnreport.monthpowerdownwarnchartreport",cls:RobotMonthPowerdownwarnchartreport},
//				{compentname:"上月局站标准化分析",icon:"myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",reportname:"powerdownwarnreport",value:"com.robot.module.monitor.warnreport.monthstandardstationReport",cls:RobotMonthStandardStationReport},
//			 	{compentname:"上月停电告警Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",reportname:"monthpowerdownwarnreport",value:"com.robot.module.monitor.warnreport.monthpowerdownwarnreport",cls:RobotMonthPowerdownwarnGridreport},
//				{compentname:"上月蓄电池电压低告警分析",icon:"myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",reportname:"monthlowerbatterywarnreport",value:"com.robot.module.monitor.warnreport.monthlowerbatterywarnchartreport",cls:RobotMonthLowerbatterychartreport},
//			 	{compentname:"上月蓄电池电压低告警Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",reportname:"monthlowerbatterywarnreport",value:"com.robot.module.monitor.warnreport.monthlowerbatterywarnreport",cls:RobotMonthLowerbatteryGridreport},
//				{compentname:"上月FSU中断告警分析",icon:"myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",reportname:"monthfsuwarnreport",value:"com.robot.module.monitor.warnreport.monthfsuwarnchartreport",cls:RobotMonthFsuwarnchartreport},
//				{compentname:"上月FSU中断告警Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",reportname:"monthfsuwarnreport",value:"com.robot.module.monitor.warnreport.monthfsuwarnreport",cls:RobotMonthFsuwarnGridreport},
			//	{compentname:"局站分布分析",icon:"myhome/piechart.png",type:"chart",sizetype:"small",reportname:"areareport",value:"com.robot.module.monitor.warnreport.areastationcountReport",cls:com.robot.module.monitor.warnreport.areastationcountReport},
			//	{compentname:"设备分布分析",icon:"myhome/piechart.png",type:"chart",sizetype:"small",reportname:"devicecountReport",value:"com.robot.module.monitor.warnreport.devicecountReport",cls:com.robot.module.monitor.warnreport.devicecountReport},
			//	{compentname:"设备数量统计",icon:"myhome/grid.png",type:"grid",sizetype:"big",reportname:"devicereport.jrxml",value:"com.robot.module.monitor.warnreport.devicestaticreport",cls:com.robot.module.monitor.warnreport.devicestaticreport},
			//	{compentname:"PUE电子地图",icon:"myhome/gisreport.png",type:"chart",sizetype:"big",counttype:"day",reportname:"PueGisCompent",value:"com.robot.module.selfgis.PueGisCompent",cls:RobotAreaPueMapCompent},
			//	{compentname:"PUE24小时走势图",icon:"myhome/areachart.png",type:"chart",sizetype:"big",counttype:"day",reportname:"AreaPueLineCompent",value:"com.robot.comm.compent.pue.AreaPueLineCompent",cls:RobotAreaPue24HLineCompent},
			//	{compentname:"PUE周走势图",icon:"myhome/areachart.png",type:"chart",sizetype:"big",counttype:"week",reportname:"weekpuereport",value:"com.robot.comm.compent.pue.AreaPueWeekLineCompent",cls:RobotAreaPueWeekLineCompent},
			//	{compentname:"PUE月走势图",icon:"myhome/areachart.png",type:"chart",sizetype:"big",counttype:"month",reportname:"monthpuereport",value:"com.robot.comm.compent.pue.AreaPueMonthLineCompent",cls:RobotAreaPueMonthLineCompent},
			//	{compentname:"PUE周Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",reportname:"weekpuereport",value:"com.robot.comm.compent.pue.weekpuetop10compent",cls:RobotWeekPueTop10Grid},
			//	{compentname:"PUE月Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",reportname:"monthpuereport",value:"com.robot.comm.compent.pue.monthpuetop10compent",cls:RobotMonthPueTop10Grid},
			//	{compentname:"PUE值分布周分析",icon:"myhome/piechart.png",type:"chart",counttype:"week",sizetype:"small",reportname:"weekpuereport",value:"com.robot.comm.compent.pue.PueWeekDistributedReport",cls:RobotWeekPuePiereport},
			//	{compentname:"PUE值分布月分析",icon:"myhome/piechart.png",type:"chart",sizetype:"small",counttype:"month",reportname:"monthpuereport",value:"com.robot.comm.compent.pue.PueMonthDistributedReport",cls:RobotMonthPuePiereport},
			//	{compentname:"运维报告",icon:"myhome/grid.png",type:"grid",sizetype:"chart",counttype:"day",reportname:"",value:"com.robot.module.myhome.compent.myAreaReportListGrid",cls:RobotMyAreaReportGrid},
			//	{compentname:"上周变压器利用率Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",reportname:"DeviceUtilizationReport",value:"com.robot.module.monitor.resourcesreport.byqReport",cls:RobotByqUtilizationGrid},
			//	{compentname:"上月变压器利用率Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",reportname:"DeviceUtilizationReport",value:"com.robot.module.monitor.resourcesreport.monthbyqReport",cls:RobotMonthByqUtilizationGrid},
			//	{compentname:"上周油机利用率Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",reportname:"DeviceUtilizationReport",value:"com.robot.module.monitor.resourcesreport.YJReport",cls:RobotYjUtilizationGrid},
			//	{compentname:"上月油机利用率Top10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",reportname:"DeviceUtilizationReport",value:"com.robot.module.monitor.resourcesreport.monthYJReport",cls:RobotMonthYjUtilizationGrid}
//				{compentname:"90天频繁放电TOP10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",reportname:"batterydeschargereport",value:"com.robot.module.monitor.resourcesreport.Robot90dayfreqbatterydischargetop10Grid",cls:Robot90dayfreqbatterydischargetop10Grid},
//				{compentname:"90天放电时长TOP10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",reportname:"batterydeschargereport",value:"com.robot.module.monitor.resourcesreport.Robot90daylongbatterydischargetop10Grid",cls:Robot90daylongbatterydischargetop10Grid},
//				{compentname:"90天频繁发电TOP10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",reportname:"generatorreport",value:"com.robot.module.monitor.resourcesreport.Robot90dayfreqgeneratortop10Grid",cls:Robot90dayfreqgeneratortop10Grid},
//				{compentname:"90天发电时长TOP10",icon:"myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",reportname:"generatorreport",value:"com.robot.module.monitor.resourcesreport.Robot90daylonggeneratortop10Grid",cls:Robot90daylonggeneratortop10Grid}
				
	],
		mainPanel:{},
		defdata:null,
		modelcn:1,
		viewObjects:new Array(),//可展示Wiget集
		viewItemObjects:new Array(),//可展示Wiget集
LoadDesigner:function(content,container){
 	//加载设计
 	this.mainPanel=container;
 	
 	RobotMyHome.mainPanel=container;
 	
 	container.empty();
 	var htmlstr=content.result;
 		htmlstr=htmlstr.replace(new RegExp("<br/>","gm"),"\n");
		htmlstr=htmlstr.replace(new RegExp("&quot;","gm"),"\"");
		htmlstr=htmlstr.replace(new RegExp("&#39;","gm"),"'");
		htmlstr=htmlstr.replace(new RegExp("&nbsp;","gm")," ");
		htmlstr=htmlstr.replace(new RegExp("&gt;","gm"),">");
		htmlstr=htmlstr.replace(new RegExp("&lt;","gm"),"<");
		htmlstr=htmlstr.replace(new RegExp("&amp;","gm"),"&");
		var item=JSON.parse(htmlstr);
		RobotMyHome.defdata=item;
	
		var modelcn=1;
		var obj={};
 	 if(item.stylecls=="com.robot.module.myhome.myhomestyle::style1"){
 		  obj=Object.create(RobotMyHomeStyle1);
	} 	else if(item.stylecls=="com.robot.module.myhome.myhomestyle::style2"){
 		  obj=Object.create(RobotMyHomeStyle2);
	}else if(item.stylecls=="com.robot.module.myhome.myhomestyle::style3"){
          obj=Object.create(RobotMyHomeStyle3);
	}else if(item.stylecls=="com.robot.module.myhome.myhomestyle::style4"){
          obj=Object.create(RobotMyHomeStyle4);
	}else if(item.stylecls=="com.robot.module.myhome.myhomestyle::style5"){
          obj=Object.create(RobotMyHomeStyle5);
	}else if(item.stylecls=="com.robot.module.myhome.myhomestyle::style6"){
          obj=Object.create(RobotMyHomeStyle6);
	}else if(item.stylecls=="com.robot.module.myhome.myhomestyle::style7"){
          obj=Object.create(RobotMyHomeStyle7);
	}else  if(item.stylecls=="com.robot.module.myhome.myhomestyle::style8"){
          obj=Object.create(RobotMyHomeStyle8);
	}else if(item.stylecls=="com.robot.module.myhome.myhomestyle::style9"){
 		  obj=Object.create(RobotMyHomeStyle9);
	}else if(item.stylecls=="com.robot.module.myhome.myhomestyle::style10"){
 		  obj=Object.create(RobotMyHomeStyle10);
	}else if(item.stylecls=="com.robot.module.myhome.myhomestyle::style11"){
 		  obj=Object.create(RobotMyHomeStyle11);
	}else{
		var isfound=false;
		for (var j = 0; j < RobotMyHome.stylelib.length; j++) {
 			var tmpitem=RobotMyHome.stylelib[j];
 			if(item.stylecls==tmpitem.value){
 			  obj=Object.create(tmpitem.cls);
 			  isfound=true;
 			  break;
 			 }
 		}
		if(!isfound){return;}
	}
	obj.viewObject=container.append(obj.getHtml(item));
	obj.container=this;
      modelcn=obj.modelcn;
      	RobotMyHome.modelcn=modelcn;
	this.viewObjects[this.viewObjects.length]=obj;
  
 	for (var i = 1; i <= modelcn; i++) {
 	try{
 		var obj={};
 		var isfound=false;
 		for (var j = 0; j < RobotMyHome.compentlib.length; j++) {
 			var tmpitem=RobotMyHome.compentlib[j];
 			if(item["module"+i]==tmpitem.value){
 			  obj=Object.create(tmpitem.cls);
 			  isfound=true;
 			  break;
 			 }
 		}
 		if(!isfound){
 			continue;
 		}

 	obj.id=i;
	obj.viewObject=$("#robotmyhomepanel"+i).html(obj.getHtml(item,null,null,i));
	obj.container=this;
	obj.initWiget();
	RobotMyHome.viewItemObjects[RobotMyHome.viewItemObjects.length]=obj;
	$("#robotmyhomepanelhead"+i).on("dblclick",{targetobj:obj},obj.refresh);

 	}catch(e){
 	console.log(e);
 	}
 	 
 	}
	//container.fadeOut(1);
	//container.fadeIn(1000);
 	//填加右键操作
 	  var menu=new BootstrapMenu('.panel-heading',{       //.DynamicAdd是tbody下的tr的class名称
            fetchElementData:function($rowElem){     //fetchElementData获取元数据
                var data = $rowElem.attr("id");   //获取表格数据
                return data;    //return的目的是给下面的onClick传递参数
            },

            actionsGroups: [  //给右键菜单的选项加一个分组，分割线
                ['zoomout','changemodel','saveastemplate','modelset'] ,
                ['exportpdf','exportexcel','exportword','exporthtml','exportzip'] 
              

            ],
            /* you can declare 'actions' as an object instead of an array,
            * and its keys will be used as action ids. */
            //自定义右键菜单的功能
            actions: {
                zoomout: {
                    name: '<font size=3>弹出</font>',
                    iconClass: 'fa-external-link',
                    onClick: function(row) {    //添加右击事件
                    	var index=row.substr("robotmyhomepanelhead".length);
                     	var htmlstr='<div  id="adjustReportIndexDiv"    class="modal fade in" style="display: none">'+
 '  <div class="modal-dialog" style="width:'+($(document).width()-80)+'px">'+
 '     <div class="modal-content">'+
  '       <div class="modal-header">'+
 '           <button type="button" class="close"'+ 
  '             data-dismiss="modal" aria-hidden="true">'+
  '                &times;'+
  '          </button>'+
  '          <h4 class="modal-title" id="myOtherSerialModalLabel">'+
  $("#robotmyhomepaneltitle"+index).html()+
  '          </h4>'+
  '       </div>'+
   '      <div class="modal-body">'+
   '	<div class="container"  id="showDetailcontainer" style="width:100%;height:100%;padding:1px;margin:1px;overflow:auto"   > '+

 
'	 </div>'+
  '       </div>'+
   '      </div>'+
   '      </div>'+
   '      </div>';
   $("body").append(htmlstr);
  
    $("#adjustReportIndexDiv").modal().css({    width: "auto",
     height: "auto",
    'margin-left': function () {
    	 
       return  ( $(document).width()-$(this).width() )/ 2;
   }});
   $("#adjustReportIndexDiv").on("hide.bs.modal",function(){
    $("#adjustReportIndexDiv").remove();
   });

   for (var i = 0; i < RobotMyHome.viewItemObjects.length; i++) {
   	 //showDetailcontainer
   	 if(RobotMyHome.viewItemObjects[i].id==index){
   	 	var objj=Object.create(RobotMyHome.viewItemObjects[i]);
   	 	//var tmpid=obj.id;
   	 	objj.id=99;
   	 	var container=$("#showDetailcontainer");
   	 
   	 	container.width( ($(document).width()-120));
   	 	container.height( $(document).height()-80-150);
   	 	objj.viewObject=container.append(objj.getHtml(RobotMyHome.defdata,($(document).width()-120),$(document).height()-80-150),index);
	objj.container=this;
	objj.initWiget();
	//RobotMyHome.viewItemObjects[i].id=tmpid;
   	 }
   }
   ////////////弹出End
                    },
                    isEnabled: function(row) {
                       return true;
                    }
                },
                changemodel:{
                	//修改模块
                	 name: '<font size=3>设置</font>',
                      iconClass: 'glyphicon glyphicon-cog',
                      onClick: function(row) {   //修改右击事件
                      	var index=row.substr("robotmyhomepanelhead".length);
                       RobotMyHome.changemodel(index);
                           //定义你自己的修改事件
                      },
                      isShown: function(row) {  
                          return setname.indexOf("我的动环")>=0||setname.indexOf("myhome")>=0||setname.indexOf("我的工作台")>=0;
                      }
                	//修改模块结束
                },
                saveastemplate:{
                	//另存为模块
                	 name: '<font size=3>另存为模板</font>',
                      iconClass: 'glyphicon glyphicon-cog',
                      onClick: function(row) {   //修改右击事件
                      	var index=row.substr("robotmyhomepanelhead".length);
                    //   RobotMyHome.changemodel(index);
                           //定义你自己的修改事件
                      },
                      isShown: function(row) {  
                          return setname.indexOf("我的动环")>=0||setname.indexOf("myhome")>=0||setname.indexOf("我的工作台")>=0;
                      }
                	//修改模块结束
                },
                modelset:{
                	//修改模块
                	 name: '<font size=3>修改配置信息</font>',
                      iconClass: 'glyphicon glyphicon-cog',
                      onClick: function(row) {   //修改右击事件
                      	var index=row.substr("robotmyhomepanelhead".length);
                     
                       for(var i=0;RobotMyHome.viewItemObjects.length;i++){
                    	   if(RobotMyHome.viewItemObjects[i].id==index){
                    		   try {
                    			   RobotMyHome.viewItemObjects[i].dosetparm();
							} catch (e) {
								console.log(e);
							}
                    		   return;
                    	   }
                       }
                           //定义你自己的修改事件
                      },
                      isShown: function(row) {
                    	  var index=row.substr("robotmyhomepanelhead".length);
                    	  
                          return 	 RobotMyHome.defdata["module"+index+"parm"]!=null;
                      }
                	//修改模块结束
                },
                exportpdf: {
                      name: '<font size=3>pdf</font>',
                      iconClass: 'fa-file-pdf-o',
                      onClick:function(row) {
                    	  RobotMyHome.exportfile("pdf");
                      },
                      isEnabled: function(row) {  
                          return true;
                      }
               },
               exportexcel: {
                   name: '<font size=3>excel</font>',
                   iconClass: 'fa-file-excel-o',
                   onClick: function(row) {  //删除右击事件
                    RobotMyHome.exportfile('excel');
                       //定义你自己的删除事件
                   },
                   isEnabled: function(row) {
                        return true;
                   }
               },
               exportword: {
                   name: '<font size=3>word</font>',
                   iconClass: 'fa-file-word-o',
                   onClick: function(row) {  //删除右击事件
                       RobotMyHome.exportfile('word');
                       //定义你自己的删除事件
                   },
                   isEnabled: function(row) {
                        return true;
                   }
               },
                 exporthtml: {
                   name: '<font size=3>HTML</font>',
                   iconClass: 'fa-file',
                   onClick: function(row) {  //删除右击事件
                       RobotMyHome.exportfile('html');
                       //定义你自己的删除事件
                   },
                   isEnabled: function(row) {
                        return true;
                   }
               },
                 exportzip: {
                   name: '<font size=3>ZIP</font>',
                   iconClass: 'fa-file-archive-o',
                   onClick: function(row) {  //删除右击事件
                      RobotMyHome.exportfile('all');
                       //定义你自己的删除事件
                   },
                   isEnabled: function(row) {
                        return true;
                   }
               }
               
               
               
            }
        });
 	 var vzoom=$(document).width()/1920;
	 var hzoom=$(document).height()/1080;
	 container.css("zoom",""+(vzoom>hzoom?hzoom:vzoom)+"");
},
exportfile:function(filetype){
	var reportname="";
	for(var i=1;i<=RobotMyHome.modelcn;i++){
		reportname+=(reportname.length>1?";":"")+RobotMyHome.defdata["module"+i+"reportname"]+","+RobotMyHome.defdata["module"+i+"title"];
	}
	robotservice.callrobotservice("reportservice","ExportRTFReport",{"reportname":reportname,"arg":"{rand:1}","filetype":filetype},RobotMyHome.showexportresult,this);
	
},
showexportresult:function(data){
	RobotComm.showDownLoadWindow(data.result);
},
changemodel:function(index){
	RobotMyHome.setcompentindex=index;
	                   	var htmlstr='<div  id="adjustSetDiv"   role="dialog"  class="modal fade in" style="display: none;width:'+($(document).width()-80)+'px">'+
	'<div class="modal-dialog"  style="width:'+($(document).width()-80)+'px;max-width:1024px">'+
		'<div class="modal-content">'+
'       <div class="modal-header">'+
 '           <button type="button" class="close"'+ 
  '             data-dismiss="modal" aria-hidden="true">'+
  '                &times;'+
  '          </button>'+
  '          <h4 class="modal-title" id="myOtherSerialModalLabel">'+
  '展板'+index+'设置'+
  '          </h4>'+
  '       </div>'+
   '      <div class="modal-body">'+
   '	<div class="container"  id="showDatacontainer" style="width:100%;height:'+($(document).height()-280)+'px;max-height:1024px;padding:1px;margin:1px;overflow:auto"   > '+
'	 </div>'+
  '       </div>'+
  '<div class="modal-footer">'+
  ' <input type="radio"  onclick="RobotMyHome.filtercompentlib(null,null,null);" name="optionsRadiosinline" id="optionsRadios1" value="all" checked>全部'+
   ' <input type="radio"  onclick="RobotMyHome.filtercompentlib(\'grid\',null,null);" name="optionsRadiosinline" id="optionsRadios1" value="grid" >表格'+
    ' <input type="radio" onclick="RobotMyHome.filtercompentlib(\'chart\',null,null);" name="optionsRadiosinline" id="optionsRadios1" value="chart" >图表'+
     ' <input type="radio" onclick="RobotMyHome.filtercompentlib(null,\'big\',null);" name="optionsRadiosinline" id="optionsRadios1" value="grid" >大'+
     ' <input type="radio" onclick="RobotMyHome.filtercompentlib(null,\'small\',null);" name="optionsRadiosinline" id="optionsRadios1" value="grid" >小'+
       ' <input type="radio" onclick="RobotMyHome.filtercompentlib(null,null,\'day\');" name="optionsRadiosinline" id="optionsRadios1" value="grid" >日'+
          ' <input type="radio" onclick="RobotMyHome.filtercompentlib(null,null,\'week\');" name="optionsRadiosinline" id="optionsRadios1" value="grid" >周'+
         ' <input type="radio" onclick="RobotMyHome.filtercompentlib(null,null,\'month\');" name="optionsRadiosinline" id="optionsRadios1" value="grid" >月'+
		'&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">关闭</button> <button class="btn btn-primary" onclick="RobotMyHome.saveset();">设置</button><button class="btn btn-primary" onclick="RobotMyHome.changestylemodel();">切换样式</button>'+
				'</div>'+
	'</div>'+
		'</div>'+
   '      </div>';
   $("body").append(htmlstr);
  
    $("#adjustSetDiv").modal().css({    width: "auto",
     height: "auto",
    'margin-left': function () {
    	 
       return  ( $(document).width()-$(this).width() )/ 2;
   }});
   $("#adjustSetDiv").on("hide.bs.modal",function(){
    $("#adjustSetDiv").remove();
   });
   var compentlibs=RobotMyHome.compentlib;
   var rows=compentlibs.length/6;
   htmlstr="";
   for (var i = 0; i < rows; i++) {
   	htmlstr+='<div class="row" style="width:100%;margin:1px">';
   	 for (var j = 0; j < 6; j++) {
   	 	if((i*6+j)>=compentlibs.length){
   	 		break;
   	 	}
   	 	var _compentitem=compentlibs[i*6+j];
   	 	 	htmlstr+='<div class="col-sm-2 col-md-2">'+
        '<a href="#" onclick="RobotMyHome.setcompentvalue=\''+_compentitem.value+'\';RobotMyHome.setcompentname=\''+_compentitem.compentname+'\';RobotMyHome.setcompentreportname=\''+_compentitem.reportname+'\';" class="thumbnail">'+
           ' <img src="'+_compentitem.icon+'"'+
           '      alt="'+_compentitem.compentname+'">'+
           '<div class="caption"><h5>'+_compentitem.compentname+'</h5></div>'+
        '</a>'+
    '</div>';
   	 }
   		htmlstr+='</div>'; 
   }
    $("#showDatacontainer").append(htmlstr);
},
filtercompentlib:function(filttype,sizetype,counttype){
	 
var compentlibs=new Array();
for (var i = 0; i < RobotMyHome.compentlib.length; i++) {
var _item=	RobotMyHome.compentlib[i];
if((sizetype==null&&filttype==null&&counttype==null)){
compentlibs[compentlibs.length]=_item;
continue;
}
if(filttype!=null&&_item.type!=null&&((filttype=='grid'&&_item.type=='grid')||(filttype!='grid'&&_item.type!='grid'))){
compentlibs[compentlibs.length]=_item;
continue;
}
if(sizetype!=null&&_item.sizetype!=null&&((sizetype=='big'&&_item.sizetype=='big')||(sizetype!='big'&&_item.sizetype!='big'))){
compentlibs[compentlibs.length]=_item;
continue;
}
if(counttype!=null&&_item.counttype!=null&&((counttype=='day'&&_item.counttype=='day')||(counttype=='week'&&_item.counttype=='week')||(counttype=='month'&&_item.counttype=='month'))){
compentlibs[compentlibs.length]=_item;
continue;
}
}
   var rows=compentlibs.length/6;
   htmlstr="";
   for (var i = 0; i < rows; i++) {
   	htmlstr+='<div class="row" style="width:100%;margin:1px">';
   	 for (var j = 0; j < 6; j++) {
   	 	if((i*6+j)>=compentlibs.length){
   	 		break;
   	 	}
   	 	var _compentitem=compentlibs[i*6+j];
   	 	 	htmlstr+='<div class="col-sm-2 col-md-2" >'+
        '<a href="#" onclick="RobotMyHome.setcompentvalue=\''+_compentitem.value+'\';RobotMyHome.setcompentname=\''+_compentitem.compentname+'\';RobotMyHome.setcompentreportname=\''+_compentitem.reportname+'\';" class="thumbnail">'+
           ' <img src="'+_compentitem.icon+'"'+
           '      alt="'+_compentitem.compentname+'">'+
           '<div class="caption"><h5>'+_compentitem.compentname+'</h5></div>'+
        '</a>'+
    '</div>';
   	 }
   		htmlstr+='</div>'; 
   }
    $("#showDatacontainer").html(htmlstr);	
},
saveset:function(){
	RobotMyHome.defdata["module"+RobotMyHome.setcompentindex]=RobotMyHome.setcompentvalue;
	RobotMyHome.defdata["module"+RobotMyHome.setcompentindex+"title"]=RobotMyHome.setcompentname;
		RobotMyHome.defdata["module"+RobotMyHome.setcompentindex+"reportname"]=RobotMyHome.setcompentreportname;
	robotservice.callrobotservice("IrobotuserService","saveMyHomeSet",{sets:JSON.stringify(RobotMyHome.defdata)},RobotMyHome.saveok,this);
},
saveok:function(data,callobj){
	if(data.result){
		RobotMyHome.mainPanel.html("");
	RobotMyHome.LoadDesigner({result:JSON.stringify(RobotMyHome.defdata)},RobotMyHome.mainPanel);	
	}
},
savestyleset:function(){
	RobotMyHome.defdata={};
	var setcompentstylecls=null;
	for (var i = 0; i < RobotMyHome.stylelib.length; i++) {
	var item=	RobotMyHome.stylelib[i];
	if(item.value==RobotMyHome.setcompentstylevalue){
		setcompentstylecls=item.cls;
		break;
	  }
	}
	if(setcompentstylecls==null){
		return;
	}
	RobotMyHome.defdata["stylecls"]=RobotMyHome.setcompentstylevalue;
	for (var i = 1; i <= setcompentstylecls.modelcn; i++) {
	RobotMyHome.defdata["module"+i]="";	 
	RobotMyHome.defdata["module"+i+"title"]="";	 
	RobotMyHome.defdata["module"+i+"reportname"]="";	 
	}

	robotservice.callrobotservice("IrobotuserService","saveMyHomeSet",{sets:JSON.stringify(RobotMyHome.defdata)},RobotMyHome.savestyleok,this);
},
savestyleok:function(data,callobj){
	if(data.result){
		RobotMyHome.mainPanel.html("");
	RobotMyHome.LoadDesigner({result:JSON.stringify(RobotMyHome.defdata)},RobotMyHome.mainPanel);	
	}
},
changestylemodel:function(){

	                   	var htmlstr='<div  id="adjuststyleSetDiv"   role="dialog"  class="modal fade in" style="display: none;width:'+($(document).width()-80)+'px;max-width:1024px">'+
	'<div class="modal-dialog"  style="width:'+($(document).width()-80)+'px;max-width:1024px">'+
		'<div class="modal-content">'+
'       <div class="modal-header">'+
 '           <button type="button" class="close"'+ 
  '             data-dismiss="modal" aria-hidden="true">'+
  '                &times;'+
  '          </button>'+
  '          <h4 class="modal-title" id="myOtherSerialModalLabel">'+
  '展板样式设置'+
  '          </h4>'+
  '       </div>'+
   '      <div class="modal-body">'+
   '	<div class="container"  id="showstyleDatacontainer" style="width:100%;height:'+($(document).height()-280)+'px;max-height:968px;padding:1px;margin:1px;overflow:auto"   > '+
'	 </div>'+
  '       </div>'+
  '<div class="modal-footer">'+
 		'<button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">关闭</button> <button class="btn btn-primary" onclick="RobotMyHome.savestyleset();">设置</button>'+
				'</div>'+
	'</div>'+
		'</div>'+
   '      </div>';
   $("body").append(htmlstr);
  
    $("#adjuststyleSetDiv").modal().css({    width: "auto",
     height: "auto",
    'margin-left': function () {
    	 
       return  ( $(document).width()-$(this).width() )/ 2;
   }});
   $("#adjuststyleSetDiv").on("hide.bs.modal",function(){
    $("#adjuststyleSetDiv").remove();
   });
   var compentlibs=RobotMyHome.stylelib;
   var rows=compentlibs.length/6;
   htmlstr="";
   for (var i = 0; i < rows; i++) {
   	htmlstr+='<div class="row" style="width:100%;margin:1px">';
   	 for (var j = 0; j < 6; j++) {
   	 	if((i*6+j)>=compentlibs.length){
   	 		break;
   	 	}
   	 	var _compentitem=compentlibs[i*6+j];
   	 	 	htmlstr+='<div class="col-sm-2 col-md-2">'+
        '<a href="#" onclick="RobotMyHome.setcompentstylevalue=\''+_compentitem.value+'\';RobotMyHome.setcompentstylename=\''+_compentitem.compentname+'\';" class="thumbnail">'+
           ' <img src="'+_compentitem.icon+'"'+
           '      alt="'+_compentitem.compentname+'">'+
           '<div class="caption"><h5>'+_compentitem.compentname+'</h5></div>'+
        '</a>'+
    '</div>';
   	 }
   		htmlstr+='</div>'; 
   }
    $("#showstyleDatacontainer").append(htmlstr);
}
}
