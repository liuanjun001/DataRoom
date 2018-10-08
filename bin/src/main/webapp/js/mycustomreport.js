/////////////////////////////
function fchangereportset(){
	var htmlstr='<div  id="ChangeReportSetDiv"    class="modal fade in" style="display: none;" aria-hidden="true" data-backdrop="static">'+
 '  <div class="modal-dialog">'+
 '     <div class="modal-content">'+
  '       <div class="modal-header">'+
 '           <button type="button" class="close"'+ 
  '             data-dismiss="modal" aria-hidden="true">'+
  '                &times;'+
  '          </button>'+
  '          <h4 class="modal-title" >自定义报告设置</h4>'+
  '       </div>'+
   '      <div class="modal-body">'+
   '	<div class="container" style="width:100%"   ><!---->'+
     ' <div class="btn-toolbar" role="toolbar">'+
	                	 	 ' <div class="btn-group">'+
		                	 	  ' <button type="button"  onclick="gridselectreportset=null;feditreportset();"  class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-plus-sign"></i></button>'+
	                	 	  ' <button type="button" id="btn_editreportset" onclick="feditreportset();"  class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-pencil"></i></button>'+
	                	 	  ' <button type="button" id="btn_delreportset" onclick="FdelMyReportSet();"  class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-minus-sign"></i></button>'+
	                	 	 ' </div>'+
	                	 	' <div class="btn-group">'+
		                	 	  ' <button type="button" id="btn_prewreportset"  onclick="FprewselectedReport();"  class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-file"></i>预览报告</button>'+
	                	 	 ' </div>'+
	                	 	 '</div>'+
	                	 	 '<div style="height:400px;overflow:auto;width:100%"><table id="myreportsetgrid" class="table table-bordered table-hover display" border="1"  style="width: 100%;height:100%;margin:0px;padding:0px;table-layout:fixed"><thead style="color: #ECF0F1; background: rgba(52, 73, 94, 0.94);">'+
 		'<tr class="theader">'+
'<th width="120">任务名</th>'+
 		'<th width="200">报告内容</th>'+
 		'<th width="200">生成时间规则</th>'+
 		'<th width="200">收件人</th>'+
 		'</tr>'+
 	'</thead>'+
 	'<tbody></tbody></table></div>'+
   '<!----></div>'+
  '       </div>'+
   '      </div>'+
   '      </div>'+
   '      </div>';
	  $("body").append(htmlstr);
    $("#ChangeReportSetDiv").modal().css({    width: "auto",
     height: "auto",
    'margin-left': function () {
    	 
       return  ( $(document).width()-$(this).width() )/ 2;
   }});
   $("#ChangeReportSetDiv").on("hide.bs.modal",function(){
    $("#ChangeReportSetDiv").remove();
   });	
  setTimeout(frefreshmyreportsetgrid,500);
   
}
function frefreshmyreportsetgrid(){

	robotservice.callrobotservice("irobotuserService","QueryMyCustomReport",{},fshowmyreportsetgrid,this);
	robotservice.callrobotservice("irobotuserService","QueryMyavailableReportlist",{},fQueryMyavailableReportlistresult,this);
}
var availableReportlist=[];
function fQueryMyavailableReportlistresult(data,callobj){
	availableReportlist=data;
}
var gridselectreportset=null;
function fshowmyreportsetgrid(data,callobj){
		 var grid=$("#myreportsetgrid");
	grid.dataTable({
			"sScrollX":"auto",
	 "sScrollY":"400",
	 "bScrollInfinite":true,//是否开启内置滚动条
   "bScrollCollapse": true, 
  "bPaginate" : false, // 翻页功能
"bStateSave" : false, // 状态保存
"bLengthChange" : false, // 改变每页显示数据数量
"bFilter" : false, // 过滤功能
"bSort" : false, // 排序功能
"bInfo" : false, // 页脚信息
"bAutoWidth" : false,// 自动宽度
"bDestroy" : true,
  "oLanguage": {
                    "sProcessing": "正在加载中......",
                    "sZeroRecords": "对不起，查询不到相关数据！",
                    "sEmptyTable": "表中无数据存在！"
                }, //多语言配置
"columns":[{data:"jobname"},{data:"reportnames"},{data:"timerule"},{data:"mailto"}],
"columnDefs":[{targets:[0],data:"jobname"},{targets:[1],data:"reportname"}]
		});
		var datatable=grid.dataTable();
		try{
			datatable.fnClearTable();
		}catch(e){
			//TODO handle the exception
		}
		grid.on('click', 'tr', function (e) {
    gridselectreportset= grid.dataTable().fnGetData( this ); 
     $("#btn_editreportset").attr("disabled",null);
     $("#btn_delreportset").attr("disabled",null);
     $("#btn_prewreportset").attr("disabled",null);
     
    $(this).siblings('.selected').removeClass('selected');
     $(this).addClass('selected'); // add selected row
   });
   gridselectreportset=null;
   $("#btn_editreportset").attr("disabled","disabled");
   $("#btn_delreportset").attr("disabled","disabled");
   $("#btn_prewreportset").attr("disabled","disabled");
			 for (var ii = 0; ii < data.length; ii++) {
		 var itemobj=data[ii];
		 itemobj.rownumber=ii+1;
		 if(itemobj.reportname!=null){
		 var a_reportname=itemobj.reportname.split(";");
		 itemobj.reportnames="";
		 for(var j=0;j<a_reportname.length;j++){
		 var aa_reportname=a_reportname[j].split(",");
		 itemobj.reportnames+=(j==0?"":";")+(aa_reportname.length==2?aa_reportname[1]:a_reportname[j]);
		   }
		 }else{
		 itemobj.reportnames="";
		 }
		 itemobj.timerule="";
		 if(itemobj.weekset!=null){
		 	 itemobj.timerule+="每周";
		 	 var weekdict=["日","一","二","三","四","五","六"];
		 	 var a_weekset=itemobj.weekset.split(",");
		 	 for(var i=0;i<a_weekset.length;i++){
		 	 if(a_weekset[i]=="1"){
		 	 itemobj.timerule+=(itemobj.timerule.length==2?"":",")+weekdict[i];
		 	   }
		 	 }
		 }
		 if(itemobj.monthset!=null){
		 	 itemobj.timerule+=itemobj.timerule.length>0?"\r每月":"";
		 	 var monthdict=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","最后1天","最后2天","最后3天"];
		 	 var a_weekset=itemobj.monthset.split(",");
		 	 for(var i=0;i<a_weekset.length;i++){
		 	 if(a_weekset[i]=="1"){
		 	 itemobj.timerule+=(itemobj.timerule.length==2?"":",")+monthdict[i];
		 	   }
		 	 }
		 }
		 itemobj.timerule+="的"+itemobj.sendtime+"点";
		 	datatable.fnAddData(itemobj,false);
		 }
		grid.fnDraw();
}
var myavailablereportsetgridselect=null;
function feditreportset(){
	var htmlstr='<div  id="AddReportSetDiv"    class="modal fade in" style="display: none;">'+
 '  <div class="modal-dialog">'+
 '     <div class="modal-content">'+
  '       <div class="modal-header">'+
 '           <button type="button" class="close"'+ 
  '             data-dismiss="modal" aria-hidden="true">'+
  '                &times;'+
  '          </button>'+
  '          <h4 class="modal-title" >'+(gridselectreportset!=null?'修改':'新增')+'报告设置</h4>'+
  '       </div>'+
   '      <div class="modal-body">'+
   '	<div class="container" style="width:100%"   ><!---->'+
	//'<form id="editDeviceDivForm" class="form-horizontal" >'+
   		'<div class="item form-group">'+
					'<label class="control-label col-md-3 col-sm-3 col-xs-3">任务名称</label>'+
					'<div class="col-md-8 col-sm-8 col-xs-8">'+
						'<input id="i_jobname" type="text" value="'+(gridselectreportset!=null?gridselectreportset.jobname:'')+'" placeholder="请输入任务名称"   class="form-control col-md-7 col-xs-12">'+
					'</div>'+
		'</div>'+
		'<div class="item form-group">'+
					'<label class="control-label col-md-3 col-sm-3 col-xs-3">报告内容</label>'+
					'<div class="col-md-8 col-sm-8 col-xs-8">'+
						'<table  border=0><tr><td><div style="height:200px;overflow:auto;width:300px"><table id="myavailablereportsetgrid" class="table table-bordered table-hover display" border="1"  style="width: 100%;height:100%;margin:0px;padding:0px;table-layout:fixed"><thead style="color: #ECF0F1; background: rgba(52, 73, 94, 0.94);">'+
 		'<tr class="theader">'+
 		'<th width="20"></th>'+
'<th width="120">报告名称</th>'+
 		'</tr>'+
 	'</thead>'+
 	'<tbody></tbody></table></div></td><td><table border=0 style="width=30px">'+
 	'<tr><td><button  id="btn_upreportname" onclick="fupreportnamerow();" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-arrow-up"></button></td></tr><tr style="height:2px"><td></td></tr>'+
 	'<tr><td><button  id="btn_downreportname" onclick="fdownreportnamerow();" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-arrow-down"></button></td></tr>'+
 	'</table></td></tr></table>'+
					'</div>'+
		'</div>'+
		   		'<div class="item form-group">'+
					'<label class="control-label col-md-3 col-sm-3 col-xs-3">规则</label>'+
					'<div class="col-md-8 col-sm-8 col-xs-8">'+
						'<table border=0><tr><td>每周:</td><td><input id="chk_week1" type="checkbox" >一<input id="chk_week2" type="checkbox" >二<input id="chk_week3" type="checkbox" >三<input id="chk_week4" type="checkbox" >四<input id="chk_week5" type="checkbox" >五<input id="chk_week6" type="checkbox" >六<input id="chk_week0" type="checkbox" >日</td></tr>'+
						'<tr><td>每月:</td><td><input id="chk_month1" type="checkbox" >1&nbsp;&nbsp;<input id="chk_month2" type="checkbox" >2&nbsp;&nbsp;<input id="chk_month3" type="checkbox" >3&nbsp;&nbsp;<input id="chk_month4" type="checkbox" >4&nbsp;&nbsp;<input id="chk_month5" type="checkbox" >5&nbsp;&nbsp;<input id="chk_month6" type="checkbox" >6&nbsp;&nbsp;<input id="chk_month7" type="checkbox" >7&nbsp;&nbsp;</td></tr>'+
						'<tr><td></td><td><input id="chk_month8" type="checkbox" >8&nbsp;&nbsp;<input id="chk_month9" type="checkbox" >9&nbsp;&nbsp;<input id="chk_month10" type="checkbox" >10<input id="chk_month11" type="checkbox" >11<input id="chk_month12" type="checkbox" >12<input id="chk_month13" type="checkbox" >13<input id="chk_month14" type="checkbox" >14</td></tr>'+
						'<tr><td></td><td><input id="chk_month15" type="checkbox" >15<input id="chk_month16" type="checkbox" >16<input id="chk_month17" type="checkbox" >17<input id="chk_month18" type="checkbox" >18<input id="chk_month19" type="checkbox" >19<input id="chk_month20" type="checkbox" >20<input id="chk_month21" type="checkbox" >21</td></tr>'+
						'<tr><td></td><td><input id="chk_month22" type="checkbox" >22<input id="chk_month23" type="checkbox" >23<input id="chk_month24" type="checkbox" >24<input id="chk_month25" type="checkbox" >25<input id="chk_month26" type="checkbox" >26<input id="chk_month27" type="checkbox" >27<input id="chk_month28" type="checkbox" >28</td></tr>'+
						'<tr><td></td><td><input id="chk_month29" type="checkbox" >29<input id="chk_month30" type="checkbox" >30<input id="chk_month31" type="checkbox" >31<input id="chk_month32" type="checkbox" >最后1天<input id="chk_month33" type="checkbox" >最后2天<input id="chk_month34" type="checkbox" >最后3天</td></tr>'+
						'<tr><td>的:</td><td><select style="width:40px" id="cb_sendtime"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option></select>点</td></tr>'+
						'</table>'+
					'</div>'+
		'</div>'+
			   		'<div class="item form-group">'+
					'<label class="control-label col-md-3 col-sm-3 col-xs-3">邮件地址</label>'+
					'<div class="col-md-8 col-sm-8 col-xs-8">'+
						'<input id="i_mailto" type="text" value="'+(gridselectreportset!=null?gridselectreportset.mailto:'')+'"  placeholder="多个邮件地址请用;号隔开"   class="form-control col-md-7 col-xs-12">'+
					'</div>'+
					'<div class="col-sm-offset-3 col-sm-8">'+
						'<label class="col-md-12 col-sm-12 col-xs-12" style="color:#ff0000">多个邮件地址请用,号隔开</label>'+
					'</div>'+
		'</div>'+
		'<div class="form-group">'+
				'<div class="col-sm-offset-5 col-sm-10">'+
				'	<button class="btn btn-primary" onclick=" $(\'#AddReportSetDiv\').modal(\'hide\');"><i class="glyphicon glyphicon-remove-sign"></i>取消</button>&nbsp;&nbsp;'+
				'<button class="btn btn-primary" onclick="FprewReport();"><i class="glyphicon glyphicon-file"></i>预览</button>&nbsp;&nbsp;'+
					'<button class="btn btn-primary" onclick="FSaveMyReportSet();"><i class="glyphicon glyphicon-floppy-disk"></i>保存</button>'+
				'</div>'+
			  '</div>'+
//   	'</form>'+
   '<!----></div>'+
  '       </div>'+
   '      </div>'+
   '      </div>'+
   '      </div>';
	  $("body").append(htmlstr);
    $("#AddReportSetDiv").modal().css({    width: "auto",
     height: "auto",
    'margin-left': function () {
    	 
       return  ( $(document).width()-$(this).width() )/ 2;
   }});
   $("#AddReportSetDiv").on("hide.bs.modal",function(){
    $("#AddReportSetDiv").remove();
   });	
if(gridselectreportset!=null){
	if(gridselectreportset.weekset!=null){
	var a_weekset=gridselectreportset.weekset.split(",");
	for(var i=0;i<a_weekset.length&&i<7;i++){
	if(a_weekset[i]=="1"){
	$("#chk_week"+i).attr("checked","checked");
	  }
	}
	}
	if(gridselectreportset.monthset!=null){
	var a_weekset=gridselectreportset.monthset.split(",");
	for(var i=0;i<a_weekset.length&&i<34;i++){
	if(a_weekset[i]=="1"){
	$("#chk_month"+(i+1)).attr("checked","checked");
	  }
	}
	}
	if(gridselectreportset.sendtime!=null){
document.getElementById("cb_sendtime").selectedIndex=gridselectreportset.sendtime;
	
	}

	
}
 	setTimeout(function(){
	var grid=$("#myavailablereportsetgrid");
	grid.dataTable({
			"sScrollX":"auto",
	 "sScrollY":"200",
	 "bScrollInfinite":true,//是否开启内置滚动条
   "bScrollCollapse": true, 
  "bPaginate" : false, // 翻页功能
"bStateSave" : false, // 状态保存
"bLengthChange" : false, // 改变每页显示数据数量
"bFilter" : false, // 过滤功能
"bSort" : false, // 排序功能
"bInfo" : false, // 页脚信息
"bAutoWidth" : false,// 自动宽度
"bDestroy" : true,
  "oLanguage": {
                    "sProcessing": "正在加载中......",
                    "sZeroRecords": "对不起，查询不到相关数据！",
                    "sEmptyTable": "表中无数据存在！"
                }, //多语言配置
"columns":[{data:"selected"},{data:"reportcnname"}],
"columnDefs":[{targets:[0],data:"selected","render": function(data, type, full) {
var htmlstr="<input onchange='Freportnamegridchkchange(this);' type='checkbox' "+(full.selected?"checked='checked'":"")+">";
return htmlstr;
}
},{targets:[1],data:"reportcnname"}]
		});
		myavailablereportsetgridselect=null;
		$("#btn_upreportname").attr("disabled","disabled");
		$("#btn_downreportname").attr("disabled","disabled");
				grid.on('click', 'tr', function (e) {
    myavailablereportsetgridselect= grid.dataTable().fnGetData( this ); 
    	$("#btn_upreportname").attr("disabled",null);
		$("#btn_downreportname").attr("disabled",null);
    $(this).siblings('.selected').removeClass('selected');
     $(this).addClass('selected'); // add selected row
 

   });
		var datatable=grid.dataTable();
		try{
			datatable.fnClearTable();
		}catch(e){
			//TODO handle the exception
		}
		var copy_availableReportlist=[];
		for(var ii=0;ii<availableReportlist.length;ii++){
			copy_availableReportlist[ii]={"id":availableReportlist[ii].id,"reportname":availableReportlist[ii].reportname,"reportcnname":availableReportlist[ii].reportcnname};
		}
		if(gridselectreportset!=null&&gridselectreportset.reportname!=null){
		var a_reportname=gridselectreportset.reportname.split(";");
		for(var j=0;j<a_reportname.length;j++){
		var aa_reportname=a_reportname[j].split(",");
		var itemobj={"selected":true,"reportname":aa_reportname[0],"reportcnname":aa_reportname.length==2?aa_reportname[1]:aa_reportname[0]};
		for(var k=0;k<copy_availableReportlist.length;k++){
		  if(copy_availableReportlist[k].reportname==aa_reportname[0]){
		  itemobj.id=""+copy_availableReportlist[k].id;
		  copy_availableReportlist[k].id=null;
		  break;
		  }
		}
			datatable.fnAddData(itemobj,false);
		  }
		}
			for(var k=0;k<copy_availableReportlist.length;k++){
			if(copy_availableReportlist[k].id!=null){
			copy_availableReportlist[k].selected=false;
				datatable.fnAddData(copy_availableReportlist[k],false);
			}
			}
		datatable.fnDraw();
	},500);  
}
function Freportnamegridchkchange(chk){
var grid=$("#myavailablereportsetgrid");
	var selectdata=grid.dataTable().fnGetData($(chk).closest('tr'));
	selectdata.selected=chk.checked;
}
function fupreportnamerow(){
var grid=$("#myavailablereportsetgrid");
	 var datatable=grid.dataTable();
	 var data=datatable.api().data();
	 for(var i=0;i<data.length;i++){
	 if(myavailablereportsetgridselect==data[i]){
	 if(i>0){
	 data[i]=data[i-1];
	 data[i-1]=myavailablereportsetgridselect;
	 break;
	 }
	 }
	 }
	 datatable.fnClearTable();
	  for(var i=0;i<data.length;i++){
	 	datatable.fnAddData(data[i],false);
	  }
	datatable.fnDraw();
}
function fdownreportnamerow(){
		 var grid=$("#myavailablereportsetgrid");
		 var datatable=grid.dataTable();
	 var data=datatable.api().data();
	 for(var i=0;i<data.length;i++){
	 if(myavailablereportsetgridselect==data[i]){
	 if(i<data.length-1){
	 data[i]=data[i+1];
	 data[i+1]=myavailablereportsetgridselect;
	 break;
	 }
	 }
	 }
	  datatable.fnClearTable();
  for(var i=0;i<data.length;i++){
	 	datatable.fnAddData(data[i],false);
	  }
	datatable.fnDraw();
}
function FSaveMyReportSet(){
//gridselectreportset
var jobname=$("#i_jobname").val();
if(jobname==null||jobname.length<1){
	alert("任务名不能为空");
	return;
}
var sendtime=document.getElementById("cb_sendtime").selectedIndex+"";
var mailto=$("#i_mailto").val();
		 var grid=$("#myavailablereportsetgrid");
	 var datatable=grid.dataTable();
	 var data=datatable.api().data();
	 var reportname="";
	 for (var i=0;i<data.length;i++) {
	 	if(data[i].selected){
	 	reportname+=(reportname.length==0?"":";")+data[i].reportname+","+data[i].reportcnname;
	 	}
	 }
	 if(reportname==null||reportname.length<1){
	 alert("请选择报表内容");
	return;
	 }
	 var weekset="";
	 for(var i=0;i<7;i++){
	 weekset+=(weekset.length==0?"":",")+(document.getElementById("chk_week"+i).checked?"1":"0");
	 }
	  var monthset="";
	 for(var i=1;i<=34;i++){
	 monthset+=(monthset.length==0?"":",")+(document.getElementById("chk_month"+i).checked?"1":"0");
	 }
if(gridselectreportset==null){
	robotservice.callrobotservice("irobotuserService","addMyCustomReport",{"jobname":jobname,"reportname":reportname,"sendtime":sendtime,"weekset":weekset,"monthset":monthset,"mailto":mailto},FSaveMyReportSetresult,this);
}else{
robotservice.callrobotservice("irobotuserService","updateMyCustomReport",{"jobname":jobname,"reportname":reportname,"sendtime":sendtime,"weekset":weekset,"monthset":monthset,"mailto":mailto,"id":gridselectreportset.id},FSaveMyReportSetresult,this);
}
}
function FSaveMyReportSetresult(data,callobj){
	if($('#AddReportSetDiv')!=null){
$('#AddReportSetDiv').modal('hide');
	}
frefreshmyreportsetgrid();
}
function FdelMyReportSet(){
var result = confirm('是否真的删除选中的记录，请确认是否要继续操作！');  
    if(result){ 
robotservice.callrobotservice("irobotuserService","delMyCustomReport",{"id":gridselectreportset.id},FSaveMyReportSetresult,this); 
       
    }else{  
      
    }  
 
}
function FprewReport(){
	 var grid=$("#myavailablereportsetgrid");
	 var datatable=grid.dataTable();
	 var data=datatable.api().data();
	 var reportname="";
	 for (var i=0;i<data.length;i++) {
	 	if(data[i].selected){
	 	reportname+=(reportname.length==0?"":";")+data[i].reportname+","+data[i].reportcnname;
	 	}
	 }
	 if(reportname==null||reportname.length<1){
	 alert("请选择报表内容");
	return;
	 }
	 robotservice.callrobotservice("BaseStationInfo","PrewUserReport",{"reportname":reportname},FprewReportresult,this);

}
function FprewselectedReport(){
 if(gridselectreportset==null){
 	 alert("请选择报表内容");
	return;
 }
	 var reportname=gridselectreportset.reportname;

	 robotservice.callrobotservice("BaseStationInfo","PrewUserReport",{"reportname":reportname},FprewReportresult,this);

}
function FprewReportresult(data,callobj){
	RobotComm.showDownLoadWindow(data.result);
}

////////////////////////////