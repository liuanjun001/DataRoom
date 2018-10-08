var RobotCSC90dayAreagenerator={
	id:1,
compentname:'RobotCSC90dayAreagenerator',
	classname:'PowerManagerService',
	functionname:'QueryCSC90dayAreaGenerator',
	viewObject:null,
	container:null,
	myChart:null,
	 option:null,
	getHtml:function(item,nwidth,nheight){
		return "<div class='col-md-12 col-xs-12 span12'  id='RobotCSC90dayAreagenerator"+this.compentname+this.id+"' style='height:"+(nheight!=null?nheight+"px":"100%")+";width:"+(nwidth!=null?nwidth+"px":"100%")+";margin:0px;padding:0px'></div>";
	},
	initWiget:function(){
		   this.myChart = echarts.init(document.getElementById('RobotCSC90dayAreagenerator'+this.compentname+this.id));
		 this.option = {
//color:['#ff0000','#ffae00','#f6ff00','#26c0fe'],
      legend: {
                data:['发电时长(小时)' ]
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
             boundaryGap : ['5px','5px'],
            position: 'bottom',
             splitLine: {show: true},
              axisLabel: {
              	show:true,interval:'auto'
              },
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
             data:['发电时长(小时)']
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
            name:'发电时长(小时)',
                type:'bar',
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
		robotservice.callrobotservice(obj==null?this.classname:obj.classname,obj==null?this.functionname:obj.functionname,{},obj==null?this.showdata:obj.showdata,obj==null?this:obj);
	},
	showdata:function(data,callobj){
		var timedata=new Array();
		var  data1=new Array();
		var  data2=new Array();
	 var  data3=new Array();
		for(var i=0;i<data.length;i++){
			timedata[i]=data[i].areaname.split("").join("\n");
			 data1[i]=data[i].durtime;
//			 data2[i]=data[i].stationcn;
//			  data3[i]=data[i].notwarncn;
	 
		}
		callobj.option.xAxis[0].data=timedata;
		callobj.option.series[0].data=data1;
//		callobj.option.series[1].data=data2;
//	 callobj.option.series[2].data=data3;
	 
	 	callobj.myChart.setOption(callobj.option);
	}
}
RobotMyHome.compentlib.push({compentname:"90天发电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
reportname:"generatorreport",value:"com.robot.module.monitor.warn.Robot90CSCdayAreagenerator",
cls:RobotCSC90dayAreagenerator});