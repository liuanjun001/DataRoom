var  RobotDesigner={
	//Flex转H5设计器主类
	mainPanel:{},
		varLabelObjects:new Array(),//可展示Wiget集
	viewObjects:new Array(),//可展示Wiget集
	querybarObjects:new Array(),//查询条件Wiget集
 LoadDesigner:function(content,MainPanel){
 	//加载设计
 	this.mainPanel=MainPanel;

for(var i=0;i<content.length;i++){
	this.AddItem(MainPanel,content[i],i);
}
document.FReportQuery=this.query;
document.FReportExport=this.exportfile;
document.FReportNextPage=this.ReportNextPage;
document.FReportLastPage=this.ReportLastPage;
document.FReportFirstPage=this.ReportFirstPage;
document.FReportPrewPage=this.ReportPrewPage;
document.FReportChangeIndex=this.ReportChangeIndex;
document.FReportChangePageSize=this.ReportChangePageSize;
document.FReportRefreshPage=this.ReportRefreshPage;
	for (var i = 0; i < robotDesigner.querybarObjects.length; i++) {
		var obj=robotDesigner.querybarObjects[i].initWigetData();
		 
	}
		for (var i = 0; i < robotDesigner.viewObjects.length; i++) {
			try{
					var obj=robotDesigner.viewObjects[i].initWigetData();
			}catch(e){
				//TODO handle the exception
			}
	
		 
	}
},
 AddItem:function(container,item,index){
 	var itemstr="";
	if(item.componentsType=="com.robot.module.bussiness.Configuration.components::RobotLabel"){
		//文字组件
		itemstr="<div style='position: absolute;"+(item.hasOwnProperty("right")&&item.right>0?"":(item.hasOwnProperty("left")?"left:"+item.left+"px;":"left:"+item.x+"px"))+((item.hasOwnProperty("top")||item.hasOwnProperty("y"))&&(!item.hasOwnProperty("bottom")||item.bottom==0)?(item.hasOwnProperty("top")?";top:"+item.top:";top"+item.y)+"px":"")+(item.hasOwnProperty("right")?";right:"+item.right+"px":"")+(item.hasOwnProperty("bottom")?";bottom:"+item.bottom+"px":"")+(item.hasOwnProperty("width")?";width:"+item.width+(item.width.indexOf("%")>0?"%":"px"):"")+(item.hasOwnProperty("height")?";height:"+item.height+(item.height.indexOf("%")>0?"%":"px"):"")+"'><p style='white-space:nowrap;font-family:"+item.fontFamily+";font-size:"+item.fontSize+";font-color:"+ Number(item.color).toString( 16 )+";font-weight:"+item.fontWeight+"'>"+item.text+"</p></div>";
	container.append(itemstr);
	}else	if(item.componentsType=="com.robot.module.bussiness.Configuration.components::RobotImage"){
		//图片组件
		itemstr="<div style='position: absolute;left:"+(item.hasOwnProperty("left")?item.left:item.x)+"px;top:"+(item.hasOwnProperty("top")?item.top:item.y)+"px"+(item.hasOwnProperty("right")?";right:"+item.right+"px":"")+(item.hasOwnProperty("bottom")?";margin-bottom:"+item.bottom+"px":"")+(item.hasOwnProperty("width")?";width:"+item.width+(item.width.indexOf("%")>0?"%":"px"):"")+(item.hasOwnProperty("height")?";height:"+item.height+(item.height.indexOf("%")>0?"%":"px"):"")+"'><img src='"+item.source+"' /></div>";
	container.append(itemstr);
	}else	if(item.componentsType=="com.robot.module.bussiness.Configuration.components.report::RobotReportAdvanceDataGridGroup"){
		//表格组件
	var obj=Object.create(RobotReportAdvanceDataGridGroup);
		obj.id=index;
	obj.viewObject=container.append(obj.getHtml(item));
	obj.container=this;

	this.viewObjects[this.viewObjects.length]=obj;
	}else	if(item.componentsType=="com.robot.module.bussiness.Configuration.components::RobotPDF"){
		//表格组件
	var obj=Object.create(RobotPdf);
		obj.id=index;
	obj.viewObject=container.append(obj.getHtml(item));
	obj.container=this;
	this.viewObjects[this.viewObjects.length]=obj;
	}else  	if(item.componentsType=="com.robot.module.bussiness.Configuration.components::RobotVarLabel"){
		//变量
	var obj=Object.create(RobotVarLabel);
		obj.id=index;
	obj.viewObject=container.append(obj.getHtml(item));
	obj.container=this;
    obj.query();
	this.varLabelObjects[this.varLabelObjects.length]=obj;
	}else	if(item.componentsType=="com.robot.module.bussiness.Configuration.components.report::RobotReportQueryBar"){
		//查询工具条
    var obj=Object.create(RobotReportQueryBar);
    	obj.id=index;
	obj.viewObject=container.append(obj.getHtml(item));
		obj.container=this;
	
	this.querybarObjects[this.querybarObjects.length]=obj;
	//obj.initWigetData();
		}
},
query:function(){
	//查询函数1、先从查询bar中得到参数，2异步查询数据
	var param={};
	var varparam={};
	for (var i = 0; i < robotDesigner.querybarObjects.length; i++) {
		var obj=robotDesigner.querybarObjects[i].getQueryParam();
		for (var sProp in obj) {
param[sProp]=obj[sProp]!=null&&(obj[sProp]=="全部"||obj[sProp]=="'-1'"||obj[sProp]=="''")?"-1":obj[sProp];
   varparam[sProp]= obj[sProp];
        }
	}
		for (var i = 0; i < robotDesigner.viewObjects.length; i++) {
		robotDesigner.viewObjects[i].query(param);
	}
		for (var i = 0; i < robotDesigner.varLabelObjects.length; i++) {
		robotDesigner.varLabelObjects[i].query(varparam);
	}
},
exportfile:function(){
	//导出函数1、先从查询bar中得到参数，2异步导出数据
		var param={};
	for (var i = 0; i < robotDesigner.querybarObjects.length; i++) {
		var obj=robotDesigner.querybarObjects[i].getQueryParam();
			for (var sProp in obj) {
  param[sProp]=obj[sProp]!=null&&(obj[sProp]=="全部"||obj[sProp]=="'-1'"||obj[sProp]=="''")?"-1":obj[sProp];
 
        }
	}
		for (var i = 0; i < robotDesigner.viewObjects.length; i++) {
		robotDesigner.viewObjects[i].exportfile(param);
	}
},
ReportNextPage:function(id){
	//表格查询中下一页
		for (var i = 0; i < robotDesigner.viewObjects.length; i++) {
		if(robotDesigner.viewObjects[i].id==id){
			if(robotDesigner.viewObjects[i].pagebar.pageIndex<robotDesigner.viewObjects[i].pagebar.pageCount){
				robotDesigner.viewObjects[i].pagebar.pageIndex++;
	
				robotDesigner.viewObjects[i].pagebar.refreshstatu();
				robotDesigner.viewObjects[i].refresh();
			}else{
		robotDesigner.viewObjects[i].pagebar.refreshstatu();
			}
			break;
		}
	}
},
ReportLastPage:function(id){
		for (var i = 0; i < robotDesigner.viewObjects.length; i++) {
		if(robotDesigner.viewObjects[i].id==id){
			if(robotDesigner.viewObjects[i].pagebar.pageIndex<robotDesigner.viewObjects[i].pagebar.pageCount){
				robotDesigner.viewObjects[i].pagebar.pageIndex=robotDesigner.viewObjects[i].pagebar.pageCount;
			robotDesigner.viewObjects[i].pagebar.refreshstatu();
				robotDesigner.viewObjects[i].refresh();
			}
			break;
		}
	}
},
ReportPrewPage:function(id){
		for (var i = 0; i < robotDesigner.viewObjects.length; i++) {
		if(robotDesigner.viewObjects[i].id==id){
			if(robotDesigner.viewObjects[i].pagebar.pageIndex>1){
				robotDesigner.viewObjects[i].pagebar.pageIndex--;
			robotDesigner.viewObjects[i].pagebar.refreshstatu();
				robotDesigner.viewObjects[i].refresh();
			}else{
	robotDesigner.viewObjects[i].pagebar.refreshstatu();
			}
			break;
		}
	}
},
ReportFirstPage:function(id){
		for (var i = 0; i < robotDesigner.viewObjects.length; i++) {
		if(robotDesigner.viewObjects[i].id==id){
			if(robotDesigner.viewObjects[i].pagebar.pageIndex>1){
				robotDesigner.viewObjects[i].pagebar.pageIndex=1;
		robotDesigner.viewObjects[i].pagebar.refreshstatu();
				robotDesigner.viewObjects[i].refresh();
				
			}
			break;
		}
	}
},
ReportRefreshPage:function(id){
		for (var i = 0; i < robotDesigner.viewObjects.length; i++) {
		if(robotDesigner.viewObjects[i].id==id){
		robotDesigner.viewObjects[i].refresh();
			break;
		}
	}
},
ReportChangeIndex:function(id){
			for (var i = 0; i < robotDesigner.viewObjects.length; i++) {
		if(robotDesigner.viewObjects[i].id==id){
			robotDesigner.viewObjects[i].pagebar.pageIndex=$("#pageselect"+id).val();
		if(robotDesigner.viewObjects[i].pagebar.pageIndex==1){
				robotDesigner.viewObjects[i].pagebar.refreshstatu();
		}
		if(robotDesigner.viewObjects[i].pagebar.pageIndex==robotDesigner.viewObjects[i].pagebar.pageCount){
		robotDesigner.viewObjects[i].pagebar.refreshstatu();
		}
		robotDesigner.viewObjects[i].refresh();
			break;
		}
	}
},
ReportChangePageSize:function(id){
			for (var i = 0; i < robotDesigner.viewObjects.length; i++) {
		if(robotDesigner.viewObjects[i].id==id){
			robotDesigner.viewObjects[i].pagebar.pageSize=$("#t_pageSizeInfo"+id).val();

		robotDesigner.viewObjects[i].refresh();
			break;
		}
	}
}
	
};
var robotDesigner=RobotDesigner;
//function FReportQuery(){
//	robotDesigner.query();
//}
//function FReportExport(){
//	robotDesigner.export();
//}
//function FReportNextPage(id){
//	robotDesigner.ReportNextPage(id);
//}
//function FReportLastPage(id){
//	robotDesigner.ReportLastPage(id);
//}
//function FReportFirstPage(id){
//	robotDesigner.ReportFirstPage(id);
//}
//function FReportPrewPage(id){
//	robotDesigner.ReportPrewPage(id);
//}
//function FReportRefreshPage(id){
//	robotDesigner.ReportRefreshPage(id);
//}
//function FReportChangeIndex(id){
//	robotDesigner.ReportChangeIndex(id);
//}
//function FReportChangePageSize(id){
//	robotDesigner.ReportChangePageSize(id);
//}
