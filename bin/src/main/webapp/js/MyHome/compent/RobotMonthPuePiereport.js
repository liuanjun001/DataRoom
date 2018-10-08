var RobotMonthPuePiereport={
	id:1,
	viewObject:null,
	container:null,
	myChart:null,
	 option:null,
	getHtml:function(item,nwidth,nheight){
		return "<div class='col-md-12 col-xs-12 span12'  id='RobotMonthPuePiechart"+this.id+"' style='height:"+(nheight!=null?nheight+"px":"100%")+";width:"+(nwidth!=null?nwidth+"px":"100%")+";margin:0px;padding:0px'></div>";
	},
	initWiget:function(){
		   this.myChart = echarts.init(document.getElementById('RobotMonthPuePiechart'+this.id),echarttheme);
		 this.option = {
    legend: {
        orient: 'vertical',
        x: 'right',
        data:["0"]
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    
    
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
            name:'PUE分布',
            type:'pie',
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[0 ]
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
		robotservice.callrobotservice("PueService","getMonthPueDistributed",{},obj==null?this.showdata:obj.showdata,obj==null?this:obj);
	},
	showdata:function(data,callobj){
		var timedata=new Array();
		var  data1=new Array();
		 
	 
		for(var i=0;i<data.length;i++){
			timedata[i]=data[i].units;
			 data1[i]={"value":data[i].cn,"name":data[i].units};
			 
			 
	 
		}
		callobj.option.legend.data=timedata;
		callobj.option.series[0].data=data1;
	 
	 
	 
	 	callobj.myChart.setOption(callobj.option);
	}
}
