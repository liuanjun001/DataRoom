var RobotSingnalinfoPanel={
	id:1,
	statioid:"",
	stationname:"",
	historypanel:null,
	panel:{},
	targettree:{},
	targetdatadef:null,
	realdata:null,
	filtertargetname:null,
	init:function(content){
	this.panel=content;	

	var str='<div class="panel panel-primary" style="height:100%;margin-bottom:1px;padding:1px">'+
   '<div class="panel-heading">'+
      '<h3 class="panel-title" id="stationname'+this.id+'">请选择局站</h3>'+
   '</div>'+
   '<div class="panel-body" style="width:100%;min-height:'+($(window).height()-60)+'px;bottom:1px;margin:1px;padding:1px">'+
    '<table  id="treegrid'+this.id+'" idField:"id" treeField:"targetname" class="easyui-treegrid table table-bordered table-hover" fit="true" style="width:100%;margin:0px;padding:0px;"><thead style="color: #ECF0F1; background: rgba(52, 73, 94, 0.94);"><tr class="theader"><th field="warnlevel" width="20px"></th><th field="targetname" >名称</th><th field="value" width="100px">值</th><th field="unit" width="100px" >单位</th><th field="uptime" width="180px">上传时间</th></tr></thead></table>'+
   '</div>'+
'</div>'+
	'<div id="div_singnalmm" class="easyui-menu" style="width:80px;">'+
	
	'</div>';
	this.panel.append(str);
	this.targettree=$("#treegrid"+this.id);
 
	this.targettree.treegrid({idField:"id",treeField:"targetname",fitColumns:true,columns:[[
	{title:'',field:'warnlevel',width:'20px',formatter : function(value, row, index) {
			var scolor="ff0000";
	//'#ff0000','#ffae00','#f6ff00','#26c0fe'
	if(row.targettype==1){
		
		return "<i class='glyphicon glyphicon-wrench' onclick='controlsignal(\""+row.targetcode+"\",\""+row.deviceitemid+"\",\""+row.targetname+"\",\""+row.stationname+"\",\""+row.targetvaluemap+"\");'></i>";
	}
	if(row.targettype==2){
		
		return "<i class='glyphicon glyphicon-cog' onclick='setsignal(\""+row.targetcode+"\",\""+row.deviceitemid+"\",\""+row.targetname+"\",\""+row.stationname+"\",\""+row.targetvaluemap+"\");'></i>";
	}
	if(row.warnlevel==undefined||row.warnlevel==""){
		scolor="000000";
		return "";
	}else	if(row.warnlevel==2){
		scolor="ffae00";
	}else if(row.warnlevel==3){
		scolor="f6ff00";
	}else if(row.warnlevel==4){
		scolor="26c0fe";
	}
	return "<canvas   width='18px' height='18px' style='background:#"+scolor+"'></canvas> ";
					
				}
}
	,{title:'<table style="border:0;width:100%;margin:0px;padding:0px"><tr style="width:100%;margin:0px;padding:0px"><td style="width:100%;margin:0px;padding:0px">名称<input type="text"  style="width:100px"  id="i_filtertargetname'+this.id+'">  <button class="btn btn-primary btn-sm" id="btn_filtertargetname'+this.id+'"><i class="glyphicon glyphicon-search"></i></button> </td></tr></table>',field:'targetname',fixed:true,width:this.targettree.width()>680?this.targettree.width()-540:200	}
	//,{title:'数据类型',field:'targettype',width:'100px'	}
	,{title:'值',field:'value',width:'100px'	}
	,{title:'单位',field:'unit',width:'100px'}
	,{title:'时间',field:'uptime',width:'180px' }
	]],
	
onDblClickRow:function(row){
	if(row==null){
		return;
	}
	if(row.targettype==1){
		document.controlsignal(row.targetcode,row.deviceitemid,row.targetname,row.stationname,row.targetvaluemap);
		return ;
	}
	if(row.targettype==2){
		document.setsignal(row.targetcode,row.deviceitemid,row.targetname,row.stationname,row.targetvaluemap);	
		return;
	}
 try{
 		FRobotQueryhistory(row.stationid,row.targetcode,row.targetname,row.uptime,row.targetvaluemap,row.unit,row.stationname);
 }catch(e){
  console.log(e);
 }
 
  
 
},
onClickRow:function(row){
 try{
 		FRobotHiddenQueryhistory(row.stationid,row.targetcode,row.targetname,row.uptime,row.targetvaluemap);
 }catch(e){
  console.log(e);
 }	
},
onContextMenu:function(e,row){
	//右键时触发事件(鼠标右键菜单)
	//三个参数：e里面的内容很多，rowIndex就是当前点击时所在行的索引，rowData当前行的
	e.preventDefault(); //阻止浏览器捕获右键事件
	 $(this).treegrid("unselectAll"); //取消所有选中项
     $(this).treegrid('select', row.id); //根据索引选中该行
 var menudiv= $("#div_singnalmm");
 menudiv.empty();
 menudiv.menu({
     onClick:function(item){

     }
 });
 if(row.targettype!="1"&&row.targettype!="2"&&row.unit==""&&row.value==""&&row.uptime==""){
	  //如果是设备
	 menudiv.menu('appendItem', {
			text: '刷新数据',
			iconCls: 'icon_refresh',
			onclick: function(){alert('New Item')}
		});
	 menudiv.menu('appendItem', {
			text: '获取配置',
			iconCls: 'icon_getdev_conf',
			onclick: function(){alert('New Item')}
		});
	 menudiv.menu('appendItem', {
			text: '修改配置',
			iconCls: 'icon_set',
			onclick: function(){alert('New Item')}
		}); 
	 //  <div data-options="iconCls:'icon-save'">Save</div>
	 //   <div class="menu-sep"></div>
 }else if(row.targettype!="1"&&row.targettype!="2"&&row.value!=""&&row.uptime!=""){
	//如果是指标 
	  //如果是设备
	 menudiv.menu('appendItem', {
			text: '监控数据',
			iconCls: 'icon_monitor',
			onclick: function(){
				//alert(row.targetcode+"#"+row.targetname+"#"+row.deviceitemid+"#"+row.stationid);
				fmonitorsingnal(row.stationid,row.deviceitemid,row.targetcode,row.targetname,row.unit);
				}
		});
	 menudiv.menu('appendItem', {
			text: '获取配置',
			iconCls: 'icon_getdev_conf',
			onclick: function(){alert('New Item')}
		});
	 menudiv.menu('appendItem', {
			text: '修改配置',
			iconCls: 'icon_set',
			onclick: function(){alert('New Item')}
		}); 
 }

     $("#div_singnalmm").menu('show', {//显示右键菜单
 	 left: e.pageX,//在鼠标点击处显示菜单
	 top: e.pageY
	 });
}
 });
 $("#i_filtertargetname"+this.id).keydown({callobj:this},function(e){
if(e.keyCode==13){
  e.data.callobj.searchtargetname(e);
}
}); 
        $("#btn_filtertargetname"+this.id).click({callobj:this},this.searchtargetname);

	},
	searchtargetname:function(e){
	var callobj=e.data.callobj;	
 callobj.filtertargetname=$("#i_filtertargetname"+  callobj.id).val();
 callobj.refreshData(callobj.realdata);
		//alert($("#i_filtertargetname"+ e.data.callobj.id).val());
	},
	refreshstation:function(stationid,stationname){
		//刷新局站
		this.stationid=stationid;
		this.stationname=stationname;
	$("#stationname"+this.id).html(stationname);	
	this.targettree.treegrid('loadData', []);
	robotservice.callrobotservice("irobotcommService","QueryData_StationTargetDefinitionNew",{"stationId":stationid,"viewtype":"监控视角"}, this.refreshTargetDefinitionNew,this,true);

	},
	rowid:1,
	refreshTargetDefinitionNew:function(data,callobj){
		//刷新局站数据
		callobj.targetdatadef=data.datadef;
		callobj.targettree.treegrid('loadData', []);
		if(data.datalist!=null){
		 callobj.realdata=data.datalist[0];
		callobj.refreshData(callobj.realdata);
	}
	},
	refreshData:function(realdata){
		
		this.rowid=1;
		this.updatenodevalue(this.targetdatadef,realdata,1);
			this.targettree.treegrid('loadData', this.targetdatadef);
		//this.addnode(this.targettree,this.targetdatadef,realdata,1);	
	},
	updatenodevalue:function(data,realdata,parentid){
		for (var i = 0; i < data.length; i++) {
			if(data[i].children!=null&&data[i].children.length>0){
				this.rowid++;
				data[i].stationname=this.stationname;
				data[i].id=this.rowid;
				data[i].uptime="";
				data[i].value="";
				data[i].warnlevel="";	
				this.updatenodevalue(data[i].children,realdata,data[i].id);
			}else{
				var val=realdata[data[i].targetcode];
				if(val!=null&&(this.filtertargetname==null||makePy(data[i].targetname)[0].toUpperCase().indexOf(makePy(this.filtertargetname)[0].toUpperCase())>=0)){
					var targettype="告警";
					if(data[i].targettype=="4"){
						targettype="遥信";
					}else if(data[i].targettype=="3"){
						targettype="遥测";
					} else if(data[i].targettype=="2"){
						targettype="遥调";
					} else if(data[i].targettype=="1"){
						targettype="遥控";
					}
					var vals=val.split("#");
					this.rowid++;
					data[i].stationname=this.stationname;
				data[i].id=this.rowid;
				data[i].uptime=vals[0];
				data[i].value=converttargetvaluemap(vals[1],data[i].targetvaluemap);
				data[i].warnlevel=vals[2];
				//tree.treegrid("append",{parent:parentid==1?null:parentid,data:[{id:data[i].id,targetname:data[i].targetname,uptime:vals[0],value:converttargetvaluemap(vals[1],data[i].targetvaluemap),unit:data[i].unit,targettype:targettype,warnlevel:vals[2],stationid:this.stationid,targetcode:data[i].targetcode,targetvaluemap:data[i].targetvaluemap}]});
				}else{
					this.rowid++;
					data[i].stationname=this.stationname;
					data[i].id=this.rowid;
					data[i].uptime="";
					data[i].value="";
					data[i].warnlevel="";	
				}
			}
		}		
	},
	addnode:function(tree,data,realdata,parentid){
		var options=tree.treegrid('options');
		for (var i = 0; i < data.length; i++) {
			if(data[i].children!=null&&data[i].children.length>0){
				this.rowid++;
				data[i].id=this.rowid;
				tree.treegrid("append",{parent:parentid==1?null:parentid,data:[{id:data[i].id,targetname:data[i].targetname,uptime:"",value:"",unit:"",targettype:"",warnlevel:""}]});
				this.addnode(tree,data[i].children,realdata,data[i].id);
			}else{
				var val=realdata[data[i].targetcode];
				if(val!=null&&(this.filtertargetname==null||makePy(data[i].targetname)[0].toUpperCase().indexOf(makePy(this.filtertargetname)[0].toUpperCase())>=0)){
					var targettype="告警";
					if(data[i].targettype=="4"){
						targettype="遥信";
					}else if(data[i].targettype=="3"){
						targettype="遥测";
					} else if(data[i].targettype=="2"){
						targettype="遥调";
					} else if(data[i].targettype=="1"){
						targettype="遥控";
					}
					var vals=val.split("#");
					this.rowid++;
				data[i].id=this.rowid++;
				tree.treegrid("append",{parent:parentid==1?null:parentid,data:[{id:data[i].id,targetname:data[i].targetname,uptime:vals[0],value:converttargetvaluemap(vals[1],data[i].targetvaluemap),unit:data[i].unit,targettype:data[i].targettype,warnlevel:vals[2],stationid:this.stationid,targetcode:data[i].targetcode,targetvaluemap:data[i].targetvaluemap}]});
				}
			}
		}
	}
}
 var monitorSingnalChart;
var monitorseq;
var monitortimeseq;
var monitorparam;
var anchor = null;
//监控指标
function fmonitorsingnal(stationid,deviceitemid,targetcode,targetname,unit){
	fbeginmonitorsingnal(stationid,deviceitemid,targetcode,targetname,unit);
 	var htmlstr='<div  id="monitorSingnalChartDiv"    class="modal fade in" style="display: none">'+
'  <div class="modal-dialog" style="width:'+($(document).width()-80)+'px">'+
'     <div class="modal-content">'+
'       <div class="modal-header">'+
'           <button type="button" class="close"'+ 
'             data-dismiss="modal" aria-hidden="true">'+
'                &times;'+
'          </button>'+
'          <h4 class="modal-title" id="myOtherSerialModalLabel">'+targetname+'- 监控曲线       </h4>'+
'       </div>'+
'      <div class="modal-body">'+
'	<div  id="monitortargetchart" style="width:'+($(document).width()-95)+'px;height:'+($(document).height()-160)+'px;padding:1px;margin:1px;overflow:auto"   > '+


'	 </div>'+
'       </div>'+
'      </div>'+
'      </div>'+
'      </div>';
$("body").append(htmlstr);

$("#monitorSingnalChartDiv").modal().css({    width: "auto",
height: "auto",
'margin-left': function () {

return  ( $(document).width()-$(this).width() )/ 2;
}});
$("#monitorSingnalChartDiv").on("hide.bs.modal",function(){
$("#monitorSingnalChartDiv").remove();
fstopmonitorsingnal();
});
monitorSingnalChart = echarts.init(document.getElementById('monitortargetchart'));
var time1 = new Date();
var s_time1=time1.format("yyyy/MM/dd hh:mm:ss"); 
var time2 = new Date();
time2.setTime(time1.getTime()+1000*3600);
var e_time2 =time2.format("yyyy/MM/dd hh:mm:ss"); 
//a_uptime=[time2];
anchor= [
	     {name:s_time1, value:[time1, 0]},
	     {name:e_time2, value:[time2, 0]}
	     ];
var option = {
color:['#ff0000','#ffae00','#f6ff00','#26c0fe'],
legend: {
'data':[targetname],
	x: 'center', 
y: 'top'
},
toolbox : {  
'show':true,  
orient:'horizontal',  
x:'right',  
y:'top',  
'feature':{  
'mark':{'show':true},  
'dataView':{'show':true,'readOnly':false},  
'magicType':{'show':true,'type':['line','bar','stack','tiled']},  
'restore':{'show':true},  
'saveAsImage':{'show':true}  
}  
},  
tooltip : {
	      trigger: 'axis',
	        formatter: function (params) {
	            params = params[0];
	            var date = new Date(params.name);
	if(params.value!=null){
	            return date.getFullYear() +'-'+(date.getMonth() + 1) +'-'+date.getDate()  +' '+ date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+ ' = ' + params.value[1];
	}
	        },
	        axisPointer: {
	            animation: false
	        }
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis : [
	{

		 type: 'time',
		        splitLine: {
		            show: false
		        }


	}
	],
yAxis : [
{
position: 'left',
type : 'value',
splitLine: {show: true},
axisLabel:{formatter:'{value}'},
data : [targetname ]
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
		//name:targetname,
		type:'line',
	showSymbol: false,
	hoverAnimation: false,
	data:[]
	} ,{
		name:'.anchor',
		        type:'line', 
		        showSymbol:false, 
		        data:anchor,
		        itemStyle:{normal:{opacity:0}},
		        lineStyle:{normal:{opacity:0}}
	}
	]
};
monitorSingnalChart.setOption(option);
}

function fbeginmonitorsingnal(stationid,deviceitemid,targetcode,targetname,unit){
	// a_targetvalue=[null];
	a_targetvalue=[];
	monitorparam={"stationid":stationid,"targetcode":targetcode,"deviceitemid":deviceitemid,"freq":15000,"targetname":targetname};
	robotservice.callrobotservice("irobotcommService","beginmonitorsinganl",monitorparam, 
			resultbeginmonitorsinganl,this,false);
 
	
}

function resultbeginmonitorsinganl(data,callobj){
	if(data.result!=null&&data.result.indexOf("error")>=0){
		alert(data.result);
		return;
	}
	if(data.result!=null){
	monitorseq=data.result;
	monitortimeseq=setInterval(ftimeshowtagetvalue,10000);
	}
}
function ftimeshowtagetvalue(){
	robotservice.callrobotservice("irobotcommService","QuerysinganlRealValue",monitorparam, 
			resultQuerysinganlRealValue,this,false);
}
var a_targetvalue=[];

function resultQuerysinganlRealValue(data,callobj){
	if(data!=null&&data.result!=null){
		var _data=data.result.split("#");
	var uptimedt=new Date(_data[1].replace(/\-/g,"/"));
//	
		if(a_targetvalue.length>0&&uptimedt==a_targetvalue[a_targetvalue.length-1].value[0]){
			return;
		}
		 
 
		a_targetvalue.push({name:uptimedt,value:[uptimedt,_data[0]]});
		 
		monitorSingnalChart.setOption({
			series : [
				{
					name:monitorparam.targetname,
					type:'line',
				showSymbol: true,
				hoverAnimation: false,
				data:a_targetvalue
				} ,{
					name:'.anchor',
					        type:'line', 
					        showSymbol:false, 
					        data:anchor,
					        itemStyle:{normal:{opacity:0}},
					        lineStyle:{normal:{opacity:0}}
				}
				]
		});
	}
}
function fstopmonitorsingnal(){
	clearInterval(monitortimeseq);
	robotservice.callrobotservice("irobotcommService","stopmonitorsinganl",{"seq":monitorseq}, 
			resultbeginmonitorsinganl,this,false);
}