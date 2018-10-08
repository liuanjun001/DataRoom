var RobotMonthPowerdownwarnchartreport={
	id:1,
	viewObject:null,
	container:null,
	myChart:null,
	 option:null,
	getHtml:function(item,nwidth,nheight){
		return "<div class='col-md-12 col-xs-12 span12'  id='RobotMonthPowerdownwarnchart"+this.id+"' style='height:"+(nheight!=null?nheight+"px":"100%")+";width:"+(nwidth!=null?nwidth+"px":"100%")+";margin:0px;padding:0px'></div>";
	},
	initWiget:function(){
		   this.myChart = echarts.init(document.getElementById('RobotMonthPowerdownwarnchart'+this.id),echarttheme);
		 this.option = {
color:['#ff0000','#ffae00','#f6ff00','#26c0fe'],
      legend: {
                data:['总数', '局站数']
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
             data : ['总数', '局站数']
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
            name:'总数',
                type:'line',
                   data:[0]
        },{
            name:'局站数',
                type:'line',
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
		robotservice.callrobotservice("RTWarnService","QueryMonthPowerDownWarn",{},obj==null?this.showdata:obj.showdata,obj==null?this:obj);
	},
	showdata:function(data,callobj){
		var timedata=new Array();
		var  data1=new Array();
		var  data2=new Array();
	 
		for(var i=0;i<data.length;i++){
			timedata[i]=data[i].durtimename;
			 data1[i]=data[i].cn;
			 data2[i]=data[i].distcn;
			 
	 
		}
		callobj.option.xAxis[0].data=timedata;
		callobj.option.series[0].data=data1;
		callobj.option.series[1].data=data2;
	 
	 
	 	callobj.myChart.setOption(callobj.option);
	}
}
