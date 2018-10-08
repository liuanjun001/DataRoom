RobotBaiduMapMonitor={
		id:1,
		viewObject:null,
		container:null,
		map:{},//Map变量
		    querytimeid:'',//查询计时器的ID
lastclicktime:0,//最后点击时间
		 queryareacn:0,//需要查询的区域数量
		 queryretareacn:0,//返回查询的区域数量
	   displaylevel:2,//显示级别
	   displayareacode:"43",
	  displaycity:"湖南",
	   isbrowsedetail:false,
	   navControl :null,
	   overviewControl:null,
	   scaleControl:null,
	    markerClusterer:null,
	  	 pointArray:new Array(),
	  	GlobalAreahashMap : {  
	  			Set:function(key,value){this[key] = value},  
	  			Get:function(key){return this[key]},  
	  			Contains:function(key){return this.Get(key) == null?false:true},  
	  			Remove:function(key){delete this[key]}  
	  			},
		getHtml:function(item,nwidth,nheight,_index){
			var	html='<div  id="allmap'+this.id+'" style="height:'+(nheight!=null?nheight+"px":"100%")+';width:'+(nwidth!=null?nwidth+"px":"100%")+';margin:0px;padding:0px;overflow:hidden;background:transparent;"   > ';
		     return html;
		},
		initWiget:function(){
		      this.map = new BMap.Map("allmap"+this.id); 
			  this.changemapstyle();
			  $('#allmap'+this.id+' div.anchorBL').remove();
			  this.refresh();
		},
		refresh:function(event){
			var obj=null;
			if(event!=null){
				obj=event.data.targetobj;
			}else{
				obj=this;
			}
			obj.queryglobalmapinfo();
		},
		changemapstyle:function(){
			if(this.displaylevel<=3){
				this.map.disableScrollWheelZoom();
				this.map.disableDragging();
				this.map.disableKeyboard();
				this.map.disableDoubleClickZoom();
				this.map.removeControl(this.navControl);
				this.map.removeControl(this.overviewControl);
				this.map.removeControl(this.scaleControl);
				this.map.setMapStyle({
			   	  styleJson:[
			   	        {
			                   "featureType": "poi",
			                   "elementType": "all",
			                   "stylers": {
			                             "color": "#ffffff",
			                             "visibility": "off"
			                   }
					         },
					         {
					                   "featureType": "road",
					                   "elementType": "all",
					                   "stylers": {
					                             "color": "#ffffff",
					                             "visibility": "off"
					                   }
					         },
					         {
					                   "featureType": "background",
					                   "elementType": "all",
					                   "stylers": {
					                             "color": "#666666",
					                             "visibility": "on" 
					                   }
					         
					         },
					         {
					                   "featureType": "administrative",
					                   "elementType": "all",
					                   "stylers": {
					                             "color": "#ffffff",
					                             "visibility": "off"
					                   }
					         }
						]
			});
			}else{
				this.map.enableScrollWheelZoom();
				this.map.enableKeyboard();
				this.map.enableDragging();
				this.map.enableDoubleClickZoom()
			this.map.addEventListener("zoomend",this.domapresize);	
				this.map.setMapStyle({
			   	  styleJson:[
			   	        {
			                   "featureType": "poi",
			                   "elementType": "all",
			                   "stylers": {
			                             "color": "#ffffff",
			                             "visibility": "on"
			                   }
					         },
					         {
					                   "featureType": "road",
					                   "elementType": "all",
					                   "stylers": {
					                             
					                             "visibility": "on"
					                   }
					         },
							 {
					                   "featureType": "water",
					                   "elementType": "all",
					                   "stylers": {
					                             
					                             "visibility": "on"
					                   }
					         },
							 {
					                   "featureType": "land",
					                   "elementType": "all",
					                   "stylers": {
					                             
					                             "visibility": "on"
					                   }
					         },
							 {
					                   "featureType": "building",
					                   "elementType": "all",
					                   "stylers": {
					                             
					                             "visibility": "on"
					                   }
					         },
					         {
					                   "featureType": "background",
					                   "elementType": "all",
					                   "stylers": {
					                             "color": "#ffffff"
					                   }
					         },
					         {
					                   "featureType": "administrative",
					                   "elementType": "all",
					                   "stylers": {
					                             "color": "#ffffff",
					                             "visibility": "on"
					                   }
					         }
						]
			});	
			
			}
		},
		domapresize:function(type, target){
			if(this.map.getZoom()<12&&this.isbrowsedetail){
				this.displaylevel=3;
				this.displayareacode=this.displayareacode.substring(0,4);
				this.changemapstyle();
				this.clearTimeout(querytimeid);
				this.map.clearOverlays();   
	if(this.markerClusterer!=undefined){
		this.markerClusterer.clearMarkers() ;
	}			
	this.queryglobalmapinfo();
			}
			//alert(type+","+target+","+map.getZoom() );
		},
	    //向地图添加控件
	     addMapControl:function(){
		//	map.setCurrentCity("长沙市"); 
	        this.scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	        this.scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
	        this.map.addControl( this.scaleControl);
	        this.navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	        this.map.addControl( this.navControl);
		//   map.addControl(new BMap.OverviewMapControl());
	        this.overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
	        this.map.addControl( this.overviewControl);
	    },//区域热点点击事件
		  doplyclick:function(e){
			 if(this.displaylevel<3){
				 if(e.target.lampcn<=0){
					 alert("该区域下面没有设备");
					 return;
				 }
				 this.changemapstyle();
				 this.displaylevel++;
				 this.pointArray=[];
				 this.displayareacode=e.target.data;
				 this.displaycity=e.target.displaycity;
				 // alert(displayareacode+","+displaycity);
				 this.map.clearOverlays();        //清除地图覆盖物 
				 this.queryglobalmapinfo();
			 }else{
				  if(e.target.lampcn<=0){
					 alert("该区域下面没有设备");
					 return;
				 }
				  this.displayareacode=e.target.data;
				  this.displaycity=e.target.displaycity;
				  this.displaylevel=4;
				  this.addMapControl();
				  this.map.clearOverlays();  
				  this. changemapstyle();
				  this.map.reset();
				
				 //map.centerAndZoom(displaycity,15); 
				 clearTimeout(this.querytimeid);
				 this.querymapinfo(); 
			 }
		 },
	queryglobalmapinfo:function(){
				var nowdt=new Date();
			 	 if(this.lastclicktime==0||nowdt.getTime()-this.lastclicktime.getTime()>30000){
					 //如果30秒钟无动作，则作处理
robotservice.callrobotservice("BaiduMapServerice","QueryMapstaticInfo",
							{"level":this.displaylevel,"areacode":this.displayareacode},this.showglobalmapinfo,this,false);
//		$.ajax( {
//		type:"GET",
//		url:"smartlightinterface.jsp?type=globalinfo&level="+displaylevel+"&areacode="+displayareacode, 
//		cache:false,
//		dataType:"json",
//		success:function(data){
//			showglobalmapinfo(data);
//				 }});
				 }
			 	this.querytimeid=window.setTimeout(this.queryglobalmapinfo,60000); 
			},
			 showglobalmapinfo:function(data,callobj){
				// alert("showglobalmapinfo0"); 
			// map.clearOverlays();        //清除地图覆盖物 
			// alert("showglobalmapinfo1"); 
				 callobj.pointArray= new Array();	
		//alert("showglobalmapinfo"); 
				 callobj.queryareacn=data.length;
				 callobj.queryretareacn=0;
			 $.each(data, function(i, item) {
			             // 将标注添加到地图中
						 
				 callobj.getBoundary(item.areaname,item.displaycolor,item.cn,item.warncn,item.areacode);
		 
		        });
				//alert(pointArray);
			//  map.setViewport(pointArray);    //调整视野   

		 
				//最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
			  
			},
			  getBoundary:function(s_city,n_color,n_count,n_warncn,v_areacode){   
				this.isbrowsedetail=false;  
				if(this.GlobalAreahashMap.Contains(s_city)){
					this.GlobalAreahashMap.Get(s_city).setContent(s_city+":"+n_warncn+"/"+n_count);
					return;
				}
				var mapdivobj=this;
						var bdary = new BMap.Boundary();
						bdary.get(s_city, function(rs){       //获取行政区域
							//map.clearOverlays();        //清除地图覆盖物       
							var count = rs.boundaries.length; //行政区域的点有多少个
							if (count === 0) {
								alert('未能获取当前输入行政区域');
								return ;
							}
							var maxlng=0;
							var minlng=180;
							var maxlat=0;
							var minlat=90;
				        
							for (var i = 0; i < count; i++) {
								var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000",fillColor:n_color}); //建立多边形覆盖物
								mapdivobj.map.addOverlay(ply);  //添加覆盖物
					 		 var arrPts = ply.getPath();
								for(var j=0;j<arrPts.length;j++){
								if(maxlng<arrPts[j].lng){
									maxlng=arrPts[j].lng;
								}
								if(minlng>arrPts[j].lng){
									minlng=arrPts[j].lng;
								}
								if(maxlat<arrPts[j].lat){
									maxlat=arrPts[j].lat;
								}
								if(minlat>arrPts[j].lat){
									minlat=arrPts[j].lat;
								}
								} 
								    ply.addEventListener("click",mapdivobj.doplyclick);                
								    mapdivobj.pointArray = mapdivobj.pointArray.concat(ply.getPath());
								ply.data=v_areacode;
								ply.displaycity=s_city;
								ply.lampcn=n_count;
							}    
							//alert(minlng+","+maxlng+" "+minlat+","+maxlat+" "+(minlng+(maxlng-minlng)/2)+","+(minlat+(maxlat-minlat)/2));
								 var label = new BMap.Label(s_city+":"+n_warncn+"/"+n_count,{position:new BMap.Point(minlng+(maxlng-minlng)/2,minlat+(maxlat-minlat)/2),offset:new BMap.Size(0,0)});
								 	 label.data=v_areacode;
								label.displaycity=s_city;
								label.lampcn=n_count;
								mapdivobj.map.addOverlay(label); 
							
								  label.addEventListener("click",mapdivobj.doplyclick);  
								  mapdivobj.GlobalAreahashMap.Set(s_city,label);
								  mapdivobj.queryretareacn++;
				if(mapdivobj.queryareacn==mapdivobj.queryretareacn){				  
					mapdivobj.map.setViewport(mapdivobj.pointArray);    //调整视野       
				}     
						});   
					}
}
