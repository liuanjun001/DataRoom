var RobotMonthWarnReport={
	id:1,
	viewObject:null,
	container:null,
	myChart:null,
	 option:null,
	getHtml:function(item,nwidth,nheight){
		return "<div class='col-md-12 col-xs-12 span12'  id='RobotMonthWarnReportchart"+this.id+"' style='height:"+(nheight!=null?nheight+"px":"100%")+";width:"+(nwidth!=null?nwidth+"px":"100%")+";margin:0px;padding:0px'></div>";
	},
	initWiget:function(){
		   this.myChart = echarts.init(document.getElementById('RobotMonthWarnReportchart'+this.id),echarttheme);
		 this.option = {
color:['#ff0000','#ffae00','#f6ff00','#26c0fe'],
      legend: {
  
                data:['一级告警','二级告警','三级告警','四级告警']
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
              axisLabel:{formatter:'{value}次'},
             data : ['一级告警', '二级告警', '三级告警', '四级告警']
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
            name:'一级告警',
                type:'bar',
            stack: '总量',
         
              data:[0]
        },{
            name:'二级告警',
                type:'bar',
            stack: '总量',
              data:[0]
        },{
            name:'三级告警',
            type:'bar',
            stack: '总量',
              data:[0]
        },{
            name:'四级告警',
            type:'bar',
            stack: '总量',
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
		robotservice.callrobotservice("RTWarnService","QueryMonthReport",{},obj==null?this.showdata:obj.showdata,obj==null?this:obj);
	},
	showdata:function(data,callobj){
		var timedata=new Array();
		var level1data=new Array();
		var level2data=new Array();
		var level3data=new Array();
		var level4data=new Array();
		for(var i=0;i<data.length;i++){
			timedata[i]=data[i].warntime;
			level1data[i]=data[i].level1;
			level2data[i]=data[i].level2;
			level3data[i]=data[i].level3;
			level4data[i]=data[i].level4;
	 
		}
		callobj.option.xAxis[0].data=timedata;
		callobj.option.series[0].data=level1data;
		callobj.option.series[1].data=level2data;
		callobj.option.series[2].data=level3data;
		callobj.option.series[3].data=level4data;
	 
	 	callobj.myChart.setOption(callobj.option);
	 	
	}
}
