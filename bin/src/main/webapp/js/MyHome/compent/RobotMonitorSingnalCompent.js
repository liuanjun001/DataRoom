RobotMonitorSingnalCompent={
	deviceid:'',
	parm:{},
	id:'',
	targetcodes:[],
	targetnames:[],
	monitorSingnalChart:null,
	anchor:[],
	seq:'',
	timeInterval:'',
	parm:{},
	chardata:{},
	getHtml:function(item,nwidth,nheight,_index){
		if(item["module"+_index+"parm"]!=null){
			this.parm=item["module"+_index+"parm"];	
		}
		this.chardata={};
	var	html='<div  id="monitortargetchart'+this.id+'" style="height:'+(nheight!=null?nheight+"px":"100%")+';width:'+(nwidth!=null?nwidth+"px":"100%")+';margin:0px;padding:0px;overflow:hidden"   > ';
     return html;
	},
	initWiget:function(){
		this.monitorSingnalChart = echarts.init(document.getElementById('monitortargetchart'+this.id),echarttheme);
		var time1 = new Date();
		var s_time1=time1.format("yyyy/MM/dd hh:mm:ss"); 
		var time2 = new Date();
		time2.setTime(time1.getTime()+1000*3600);
		var e_time2 =time2.format("yyyy/MM/dd hh:mm:ss"); 
		//a_uptime=[time2];
		this.anchor= [
			     {name:s_time1, value:[time1, 0]},
			     {name:e_time2, value:[time2, 0]}
			     ];
		this.monitorSingnalChart.setOption(this.option);
		this.seq=(new Date()).getTime();
		this.refresh();
		var callobj=this;
		this.timeInterval=self.setInterval(function(){
			callobj.refresh({"data":{"targetobj":callobj}});
		},30000);
	},
	
	refresh:function(event){
		var obj=this;
		if(event!=null){
			obj=event.data.targetobj;
		}
//		var parm=[{"stationid":42,"targetcode":"99076302001"},{"stationid":42,"targetcode":"99076303001"}];
		robotservice.callrobotservice("SingnalService","MonitorTargets",
				{"parm":JSON.stringify(obj.parm.querydata),"seq":this.seq},obj.displaydata,obj,true);
	},
	option : {
			//color:['#ff0000','#ffae00','#f6ff00','#26c0fe'],
			legend: {
			x: 'left', 
			y: 'top'
			},
			toolbox : {  
			'show':false,  
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
					    var ret='';
					for(var i=0;params!=null&&i<params.length;i++){
				          var   param = params[i];
				if(param!=null&&param.value!=null){
					 var date = new Date(param.value[0]);
				     ret+= (ret.length>0?'</br>':'')+'【'+param.name+'】</br>'+date.getFullYear() +'-'+(date.getMonth() + 1) +'-'+date.getDate()  +' '+ date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+ ' = ' + param.value[1];
				}
					}
					return ret;
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
			axisLabel:{formatter:'{value}'}
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
				hoverAnimation: false
			
				}
				]
			},
			
	displaydata:function(data,callobj){
		if(data!=null&&data.length>0){
			var _stationname="";
			for(var i=0;i<data.length;i++){
				var key=data[i].stationname+data[i].targetname;
				_stationname=data[i].stationname;
				if(callobj.chardata[key]==null){
					callobj.chardata[key]={"stationname":data[i].stationname,"targetname":data[i].targetname,"data":[{name:key, value:[data[i].uptime,data[i].targetvalue]}]};
				}else{
					callobj.chardata[key].data.push({name:key, value:[data[i].uptime,data[i].targetvalue]});
					if(callobj.parm.maxpoint!=null){
					if(callobj.chardata[key].data.length>callobj.parm.maxpoint){
						callobj.chardata[key].data.splice(0,1);
					}
					}
				}
			}
			
			var isnotsamestationname=false;
			for(var _key in callobj.chardata ){
				if(_stationname!=callobj.chardata[_key].stationname){
					isnotsamestationname=true;
					break;
				}
			}
			var _series=[];
			var _legenddata=[];
			for(var _key in callobj.chardata ){
				_series.push({
					name:isnotsamestationname?_key:callobj.chardata[_key].targetname,
					type:'line',
				showSymbol: true,
				hoverAnimation: false,
				data:callobj.chardata[_key].data

				});
				_legenddata.push(isnotsamestationname?_key:callobj.chardata[_key].targetname);
			}
//			var _option={series:_series,	legend: {
//			'data':_legenddata,
//				x: 'left', 
//			y: 'top'
//			}};
			
			callobj.option.legend.data=_legenddata;
			callobj.option.series=_series;
			callobj.monitorSingnalChart.setOption(callobj.option);
		}
	},
	dosetparm:function(){
		//alert(this.parm);
		var htmlstr='<div  id="adjustModelparmDiv"    class="modal fade in" style="display: none" aria-hidden="true" data-backdrop="static">'+
		 '  <div class="modal-dialog" style="width:800px;height:600px">'+
		 '     <div class="modal-content">'+
		  '       <div class="modal-header">'+
		 '           <button type="button" class="close"'+ 
		  '             data-dismiss="modal" aria-hidden="true">'+
		  '                &times;'+
		  '          </button>'+
		  '          <h4 class="modal-title" id="myOtherSerialModalLabel">修改参数</h4>'+
		  '       </div>'+
		   '      <div class="modal-body">'+
		   '	<div class="container"  id="showDetailcontainer" style="width:100%;height:550px;padding:1px;margin:1px;overflow:hidden"   > '+
		   	'<form role="form" class="form-horizontal" id="winzardform"  style="width:730px;padding:1px;margin:1px"> '+

			'<div class="form-group"> '+
						 '<label for="i_maxpoint"  class="col-sm-2 control-label">最大数据点数<font color="red">*</font></label> '+
						 '<div class="col-sm-10"> '+
				'<input class="form-control" style="width:60px" placeholder="请输入最多数据点数" value="20" id="i_maxpoint" type="number" /> 注：在echart曲线中显示最多的数据点'+
						 '</div> '+
			'</div> '+
		'<fieldset> <legend>监控指标</legend>'+
			'<table style="top:40px;border:0px;width:700px;height:300px;"><tr valign="top"><td>'+
		 	'<div     style="width:300px;padding:1px;margin:1px"> '+
			'<div class="form-group"> '+
			 '<label for="i_station"  class="col-sm-4 control-label">监测点</label> '+
			 '<div class="col-sm-8"> '+
	'<select class="form-control"   id="i_station" type="number" /> '+
			 '</div> '+
'</div> '+
'<div class="form-group"> '+
'<label for="i_targetcode"  class="col-sm-4 control-label">指标</label> '+
'<div class="col-sm-8"> '+
'<select class="form-control"  id="i_targetcode"   /> '+
'</div> '+
'</div> '+
 		'</div>'+
'</td><td width="60px" align="center" valign="top">'+
			'<table style="border:0px;width:40px;height:60px"><tr><td>'+
			'<button><i class="glyphicon glyphicon-arrow-right" /></button>'+
			'</td></tr><tr><td>'+
			'<button><i class="glyphicon glyphicon-arrow-left" /></button>'+
			'</td></tr></table>'+
			'</td><td >'+
			'<table id="datagrid" class="table table-bordered table-hover display" border="1"  style="width: 200px;height:100%;margin:0px;padding:0px;table-layout:fixed">'+
		 	'<thead style="color: #ECF0F1; background: rgba(52, 73, 94, 0.94);">'+
		 		'<tr class="theader">'+
		 		'<th width="150">监测点</th>'+
		 		'<th width="150">指标</th>'+
		 		'</tr>'+
		 	'</thead>'+
		 '</table>'+
			'</td></tr></table>'+
			'</fieldset>'+
			 '</form>'+
		'	 </div>'+
		  '       </div>'+
	  	  '<div class="modal-footer">'+
	  					'	<button class="btn btn-primary" id="btn_save" onclick="saveconfig();" ><i class="glyphicon glyphicon-floppy-disk"></i>保存</button>'+
						'<button class="btn btn-primary" onclick="$(\'#adjustModelparmDiv\').modal(\'hide\');"><i class="glyphicon glyphicon-remove"></i>取消</button>'+

				 ' </div>'+
		   '      </div>'+
		   '      </div>'+
		   '      </div>';
		   $("body").append(htmlstr);
		  
		    $("#adjustModelparmDiv").modal().css({    width: "auto",
		     height: "auto",
		    'margin-left': function () {
		    	 
		       return  ( $(document).width()-$(this).width() )/ 2;
		   }});
		   $("#adjustModelparmDiv").on("hide.bs.modal",function(){
		    $("#adjustModelparmDiv").remove();
		   });

	}
}