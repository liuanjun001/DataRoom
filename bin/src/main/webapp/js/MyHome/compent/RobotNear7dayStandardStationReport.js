var RobotNear7dayStandardStationReport={
	id:1,
	viewObject:null,
	container:null,
	myChart:null,
	 option:null,
	getHtml:function(item,nwidth,nheight){
		return "<div class='col-md-12 col-xs-12 span12'  id='RobotNear7dayStandardStationReportchart"+this.id+"' style='height:"+(nheight!=null?nheight+"px":"100%")+";width:"+(nwidth!=null?nwidth+"px":"100%")+";margin:0px;padding:0px'></div>";
	},
	initWiget:function(){
		   this.myChart = echarts.init(document.getElementById('RobotNear7dayStandardStationReportchart'+this.id),echarttheme);
		 this.option = {
color:['#ff0000','#ffae00','#f6ff00','#26c0fe'],
      legend: {
  
                data:['局站总数', '标准化局站', '在线局站']
            },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },

    xAxis : [
        {
            type : 'category',
            data:[0],
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
             data : ['局站总数', '标准化局站', '在线局站']
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
            name:'局站总数',
                type:'line',
            stack: '总量',
         
              data:[0]
        },{
            name:'标准化局站',
                type:'line',
            stack: '总量1',
              data:[0]
        },{
            name:'在线局站',
            type:'line',
            stack: '总量2',
              data:[0]
        } 
    ]
};
 this.myChart.setOption(this.option);
 this.refresh();
	},
	refresh:function(event){
		var obj=null;
		if(event!=null){
			obj=event.data.targetobj;
		}
		robotservice.callrobotservice("RTWarnService","QueryNear7DayStandardStationCount",{},obj==null?this.showdata:obj.showdata,obj==null?this:obj);
	},
	showdata:function(data,callobj){
		var timedata=new Array();
		var stationcndata=new Array();
		var standardstationcndata=new Array();
		var onlinecndata=new Array();
		var level4data=new Array();
		for(var i=0;i<data.length;i++){
			timedata[i]=data[i].uptime;
			stationcndata[i]=data[i].stationcn;
			standardstationcndata[i]=data[i].standardstationcn;
			onlinecndata[i]=data[i].onlinecn;
			
	 
		}
		callobj.option.xAxis[0].data=timedata;
		callobj.option.series[0].data=stationcndata;
		callobj.option.series[1].data=standardstationcndata;
		callobj.option.series[2].data=onlinecndata;
		
	 
	 	callobj.myChart.setOption(callobj.option);
	 	
	}
}
