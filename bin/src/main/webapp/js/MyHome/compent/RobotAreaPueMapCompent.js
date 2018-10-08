var RobotAreaPueMapCompent={
	id:1,
	viewObject:null,
	container:null,
	myChart:null,
	showareacode:null,
	 option:null,
	 areamap:{},
	getHtml:function(item,nwidth,nheight){
		if(localStorage.getItem("areadata")!=null&&localStorage.getItem("areadata").length>1){
			var areadata=JSON.parse(localStorage.getItem("areadata"));
			for (var i = 0; i < areadata.length; i++) {
RobotAreaPueMapCompent.areamap[areadata[i].areacode]=areadata[i].areaname;
			}
			 robotservice.areacode=areadata[0].areacode;
			 this.showareacode=robotservice.areacode;
		}
		return "<div class='col-md-12 col-xs-12 span12'  id='RobotAreaPueMonthchart"+this.id+"' style='height:"+(nheight!=null?nheight+"px":"100%")+";width:"+(nwidth!=null?nwidth+"px":"100%")+";margin:0px;padding:0px'></div>";
	},
	initWiget:function(){
		var mapdata=localStorage.getItem( this.showareacode+"map");
		if(mapdata==null||mapdata==undefined){
	document.callobj=this;	
			$.getJSON("map/"+this.showareacode+".json",this.initmap);
	//	robotservice.callrobotservice("irobotsystemService","QueryEchartsMapData",{areacode: this.showareacode},this.initmap,this);
	}else{
		this.initmap(JSON.parse(mapdata),this);
	}
		
	},
	initmap:function(data,callobj){
	if(callobj==null||callobj=="success"){
		callobj=document.callobj;
	}
		try{
			if(echarts.registerMap){
				var htmlstr=JSON.stringify(data);
				if(htmlstr!=null&&htmlstr.length>10){
		localStorage.setItem(callobj.showareacode+"map",htmlstr);
 		 }
				
		echarts.registerMap(callobj.showareacode,data);
			}else{
				console.log('ECharts Map is not loaded');
			}
		}catch(e){
			console.log(e);
		}
			callobj.myChart = echarts.init(document.getElementById('RobotAreaPueMonthchart'+callobj.id),echarttheme);	
	callobj.myChart.robotdata=callobj;

		 callobj.option = {
	 	tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c}'
        },
      
        visualMap: {
            min: 1,
            max: 3,
            text:['高','低'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue','yellow', 'orangered']
            }
        },
        series: [
            {
                name: 'PUE值分布',
                type: 'map',
                mapType:callobj.showareacode,
                //mapType: '湖南', // 自定义扩展图表类型
                selectedMode : 'single',
                itemStyle:{
                    normal:{label:{show:true}},
                    emphasis:{label:{show:true}}
                },
                data:[{name:'长沙县',value:0}
                   ]
//              ],
//              // 自定义名称映射
//              nameMap: {
//                  'Central and Western': '中西区',
//                  'Eastern': '东区',
//                  'Islands': '离岛',
//                  'Kowloon City': '九龙城',
//                  'Kwai Tsing': '葵青',
//                  'Kwun Tong': '观塘',
//                  'North': '北区',
//                  'Sai Kung': '西贡',
//                  'Sha Tin': '沙田',
//                  'Sham Shui Po': '深水埗',
//                  'Southern': '南区',
//                  'Tai Po': '大埔',
//                  'Tsuen Wan': '荃湾',
//                  'Tuen Mun': '屯门',
//                  'Wan Chai': '湾仔',
//                  'Wong Tai Sin': '黄大仙',
//                  'Yau Tsim Mong': '油尖旺',
//                  'Yuen Long': '元朗'
//              }
            }
        ]
   };
 

 callobj.myChart.setOption(callobj.option,true);
callobj.refresh({data:{targetobj:callobj}});

           callobj.myChart.on("click",function (param) {
                //市级的点击事件
                var selectedCity = param.data.areacode;
                if(selectedCity!=null){
     this.robotdata.showareacode=selectedCity;
        this.robotdata.initWiget();
       }
            });



	},
	refresh:function(event){
		var obj=null;
		if(event!=null){
			obj=event.data.targetobj;
		}
		robotservice.callrobotservice("Pueservice","MonitorMyMapPue",{lenareacode:obj==null?this.showareacode.length+2:obj.showareacode.length+2,areacode:obj==null?this.showareacode:obj.showareacode},obj==null?this.showdata:obj.showdata,obj==null?this:obj);
	},
	showdata:function(data,callobj){
		var timedata=new Array();
		var  data1=new Array();
		var  data2=new Array();
	 
		for(var i=0;i<data.length;i++){
			timedata[i]=data[i].areacode;
			 data1[i]={name:RobotAreaPueMapCompent.areamap[data[i].areacode],value:data[i].cn,areacode:data[i].areacode};
 
		}
		//callobj.option.xAxis[0].data=timedata;
		callobj.option.series[0].data=data1;
	 
	 
	 
	 	callobj.myChart.setOption(callobj.option);
	}
}
