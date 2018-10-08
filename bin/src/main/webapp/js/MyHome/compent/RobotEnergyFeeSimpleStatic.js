var RobotEnergyFeeSimpleStatic={
		id:1,
compentname:'RobotGeneratorFeeSimpleStatic',
	classname:'PowerManagerService',
	functionname:'QueryCSCGeneratorFeeSimpleStatic',
	viewObject:null,
	container:null,
getHtml:function(item,nwidth,nheight){
	var htmlstr="<table border='0' style='width: 100%;'>"+
			"<tr>"+
				"<td colspan='1'><label><font size='5' style='color:#ffffff'>今年耗电</font></label></td>"+
				"<td colspan='1'><label><font size='5' style='color:#ffffff'>今日耗电</font></label></td>"+
			"</tr>"+
			"<tr>"+
				"<td colspan='1' style='border-bottom-style: groove;'><font  size='4' color='#DAD55E' id='l_yearsum'>0度</font></td>"+
				"<td colspan='1' style='border-bottom-style: groove;'><font  size='4' color='#DAD55E' id='l_todaysum'>0度</font></td>"+
			"</tr>"+
			"<tr>"+
				"<td><label><font size='5' color='#ffffff'>本月耗电</font></label></td>"+
				"<td><label><font size='5' color='#ffffff'>上月耗电</font></label></td>"+
			"</tr>"+
			"<tr >"+
				"<td style='border-bottom-style: groove;'><label><font size='4' color='#DAD55E'  id='l_currmonthsum'>0度</font></label></td>"+
				"<td style='border-bottom-style: groove;'><label><font size='4' color='#DAD55E'  id='l_prewmonthsum'>0度</font></label></td>"+
			"</tr>"+
			"<tr >"+
				"<td><label><font size='5' color='#ffffff'  >本周耗电</font></label></td>"+
				"<td><label><font size='5' color='#ffffff'>昨日耗电</font></label></td>"+
			"</tr>"+
			"<tr>"+
				"<td><label><font size='4' id='l_weeksum' color='#DAD55E'>0度</font></label></td>"+
				"<td><label><font size='4'  id='l_yesterdaysum' style='color:#DAD55E'>0度</font></label></td>"+
			"</tr>"+
		"</table>";
		return htmlstr;
	},
	initWiget:function(){
		this.refresh();
	},
	refresh:function(event){
		var obj=null;
		if(event!=null){
			obj=event.data.targetobj;
		}
		robotservice.callrobotservice(obj==null?this.classname:obj.classname,obj==null?this.functionname:obj.functionname,{},obj==null?this.showdata:obj.showdata,obj==null?this:obj);
	}	,
	showdata:function(data,callobj){
		 if(data!=null){
		 	$("#l_yearsum").html(data.yearsumtimelen+"元");
		 	$("#l_currmonthsum").html(data.monthsumtimelen+"元");
		 	$("#l_prewmonthsum").html(data.prewmonthsumtimelen+"元");
		 	$("#l_weeksum").html(data.weeksumtimelen+"元");
		 	$("#l_yesterdaysum").html(data.yesterdaysumtimelen+"元");
		 }
	}
}
RobotMyHome.compentlib.push({compentname:"能耗费用统计",icon:"assets/myhome/arealinechart.png",type:"grid",sizetype:"small",counttype:"month",
reportname:"energyfeereport",value:"com.robot.module.monitor.RobotEnergyFeeSimpleStatic",
cls:RobotEnergyFeeSimpleStatic});