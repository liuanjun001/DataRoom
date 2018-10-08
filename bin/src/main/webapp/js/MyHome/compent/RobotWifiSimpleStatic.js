var RobotWifiSimpleStatic={
		id:1,
compentname:'RobotWifiSimpleStatic',
	classname:'PowerManagerService',
	functionname:'QueryCSCGeneratorFeeSimpleStatic',
	viewObject:null,
	container:null,
getHtml:function(item,nwidth,nheight){
	var htmlstr="<table border='0' style='width: 100%;'>"+
			"<tr>"+
				"<td colspan='1'><label><font size='4' style='color:#ffffff'>今年Wifi使用情况</font></label></td>"+
				"<td colspan='1'><label><font size='4' style='color:#ffffff'>今日Wifi使用情况</font></label></td>"+
			"</tr>"+
			"<tr>"+
				"<td colspan='1' style='border-bottom-style: groove;'><label style='color:#DAD55E' id='l_yearsum'>12345678次 总1234.1Gb</label></td>"+
				"<td colspan='1' style='border-bottom-style: groove;'><label style='color:#DAD55E' id='l_todaysum'>12345678 总1234.1Gb</label></td>"+
			"</tr>"+
			"<tr>"+
				"<td><label><font size='2' color='#0052A3'>本月总情况</font></label></td>"+
				"<td><label><font size='2' color='#0052A3'>上月总情况</font></label></td>"+
			"</tr>"+
			"<tr >"+
				"<td style='border-bottom-style: groove;'><label><font size='2' color='#0052A3'  id='l_currmonthsum'>12345678次 总1234.1Gb</font></label></td>"+
				"<td style='border-bottom-style: groove;'><label><font size='2' color='#0052A3'  id='l_prewmonthsum'>12345678次 总1234.1Gb</font></label></td>"+
			"</tr>"+
			"<tr >"+
				"<td><label><font size='2' color='#0052A3'  >本周总情况</font></label></td>"+
				"<td><label><font size='2' color='#0052A3'>昨日总情况</font></label></td>"+
			"</tr>"+
			"<tr>"+
				"<td><label><font size='2' id='l_weeksum' color='#0052A3'>12345678次 总1234.1Gb</font></label></td>"+
				"<td><label><font size='2'  id='l_yesterdaysum' style='color:#DAD55E'>12345678次 总1234.1Gb</font></label></td>"+
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
RobotMyHome.compentlib.push({compentname:"Wifi使用情况统计",icon:"assets/myhome/arealinechart.png",type:"grid",sizetype:"small",counttype:"month",
reportname:"wififeereport",value:"com.robot.module.monitor.RobotWifiSimpleStatic",
cls:RobotWifiSimpleStatic});