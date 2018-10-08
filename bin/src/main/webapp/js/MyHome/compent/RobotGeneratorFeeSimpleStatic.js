var RobotGeneratorFeeSimpleStatic={
		id:1,
compentname:'RobotGeneratorFeeSimpleStatic',
	classname:'PowerManagerService',
	functionname:'QueryCSCGeneratorFeeSimpleStatic',
	viewObject:null,
	container:null,
getHtml:function(item,nwidth,nheight){
	var htmlstr="<table border='0' style='width: 100%;'>"+
			"<tr>"+
				"<td colspan='2'><label><font size='4'>今年发电费用</font></label></td>"+
			"</tr>"+
			"<tr>"+
				"<td colspan='2' style='border-bottom-style: groove;'><label style='color:#DAD55E' id='l_yearsum'>0元</label></td>"+
			"</tr>"+
			"<tr>"+
				"<td><label><font size='2' color='#0052A3'>本月发电</font></label></td>"+
				"<td><label><font size='2'>上月发电</font></label></td>"+
			"</tr>"+
			"<tr >"+
				"<td style='border-bottom-style: groove;'><label><font size='2' color='#0052A3'  id='l_currmonthsum'>0</font></label></td>"+
				"<td style='border-bottom-style: groove;'><label><font size='2'  id='l_prewmonthsum'>0</font></label></td>"+
			"</tr>"+
			"<tr >"+
				"<td><label><font size='2' color='#0052A3'  >本周发电</font></label></td>"+
				"<td><label><font size='2' >昨日发电</font></label></td>"+
			"</tr>"+
			"<tr>"+
				"<td><label><font size='2' id='l_weeksum' color='#0052A3'>0</font></label></td>"+
				"<td><label><font size='2'  id='l_yesterdaysum' style='color:#DAD55E'>0</font></label></td>"+
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
RobotMyHome.compentlib.push({compentname:"发电费用统计",icon:"assets/myhome/arealinechart.png",type:"grid",sizetype:"small",counttype:"month",
reportname:"generatorreport",value:"com.robot.module.monitor.warn.RobotGeneratorFeeSimpleStatic",
cls:RobotGeneratorFeeSimpleStatic});