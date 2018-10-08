var RobotWarnInfoCompentLib={};
var RobotWarnInfo={
	id:'0',
	selectwarncode:'',
	selectwarntype:'-1',
	selectdevicetype:'-1',
	selectwarnlevel:'-1',
	pagebar:{},
	_val:null,
		val:function(){
	
		var cb_warnInfo=$("#cb_warnInfo"+this.id);
		var ret={warncode:'-1',warntype:'全部'};
		if(this._val!=null){
			//this._val=cb_warnInfo.combotree("getText");
			return this._val;
		}
//		if(cb_warnInfo!=null&&cb_warnInfo.combotree("getValues")!=null){
//			ret.warnInfo=cb_warnInfo.combotree("getValues").toString();
//			if(ret.warncode==""){
//			ret.warncode="-1";	
//			}else{
//			ret.warntype=cb_warnInfo.combotree("getText");
//	    	}
//			}
		return ret;
	},
	getHtml:function(item){
//				var ret="<input   multiple='multiple'   style='width:100px' id='cb_warnInfo"+this.id+"'></input>";
//		return ret;
//var ret="<table border='0'><tr><td>&nbsp;告警:</td><td><input type='text' class='form-control-sm' style='width:88px' id='cb_warnInfo"+this.id+"' readonly='readonly'></input></td><td><button class='btn btn-default btn-sm dropdown-toggle'><span class='caret'></span></button></td></tr></table>";
var ret="<table border='0'><tr><td>&nbsp;告警:</td><td><span class='textbox combo' style='width: 107px; height: 22px;'><input type='text' class='form-control input-sm' style='width:88px;height:21px' id='cb_warnInfo"+this.id+"' readonly='readonly'></input><span onclick='FshowSelectWarnInfoWindow("+this.id+");' class='textbox-addon textbox-addon-right' style='right: 0px;'><a href='javascript:void(0)' class='textbox-icon combo-arrow' icon-index='0' tabindex='-1' style='width: 18px; height: 20.6667px;'></a></span></span></td></tr></table>";
    RobotWarnInfoCompentLib[this.id]=this;
    return ret;
	},
	refresh:function(){
		if(1==1){
			return;
		}
		var cb_warnInfo=$("#cb_warnInfo"+this.id);
		cb_warnInfo.combotree({panelWidth:'250px',multiple:true}) ;
		var tree=cb_warnInfo.combotree("tree");
		tree.tree({checkbox:true});
		if(this._val!= null){
			this.selectwarncode=this._val.warncode;
			cb_warnInfo.combotree({ disabled: true });  
		}
		var warnInfoList;
try{
		if(localStorage){
			warnInfoList=JSON.parse(localStorage.getItem("reportParam" )).warnInfo;
	}
}catch(error){
	warnInfoList=null;
}
		if(warnInfoList!=null){
			 var datalist=new Array();
		for(var i=0;i<warnInfoList.length;i++){
			var item=warnInfoList[i];
			 if((this.selectwarnlevel=="-1"&&this.selectwarntype=="-1"&&this.selectdevicetype=="-1")||
			 ( (","+this.selectwarnlevel+",").indexOf(","+item.warnlevel+",")>=0 && (","+this.selectwarntype+",").indexOf(","+item.warntype+",")>=0 && (","+this.selectdevicetype+",").indexOf(",'"+item.devicetypeid+"',")>=0 )||
			 
			 ((","+this.selectwarnlevel+",").indexOf(","+item.warnlevel+",")>=0 && (","+this.selectwarntype+",").indexOf(","+item.warntype+",")>=0 && this.selectdevicetype=="-1" )||
			 ( (","+this.selectwarnlevel+",").indexOf(","+item.warnlevel+",")>=0 &&  this.selectwarntype=="-1" && (","+this.selectdevicetype+",").indexOf(",'"+item.devicetypeid+"',")>=0 )||
			 ( this.selectwarnlevel=="-1" && (","+this.selectwarntype+",").indexOf(","+item.warntype+",")>=0 && (","+this.selectdevicetype+",").indexOf(",'"+item.devicetypeid+"',")>=0 )||
			
			( (","+this.selectwarnlevel+",").indexOf(","+item.warnlevel+",")>=0 && this.selectwarntype=="-1"&& this.selectdevicetype=="-1" )||
			( this.selectwarnlevel=="-1" && (","+this.selectwarntype+",").indexOf(","+item.warntype+",")>=0 && this.selectdevicetype=="-1" )||
			 ( this.selectwarnlevel=="-1" &&  this.selectwarntype=="-1" && (","+this.selectdevicetype+",").indexOf(",'"+item.devicetypeid+"',")>=0 ) 
			
			 ){
	 datalist[datalist.length]={"id":item.warncode,"text":"【"+item.warncode+"】"+item.warninfo+"("+item.warnlevel+"级)","checked":this.selectwarncode!=null&&(","+this.selectwarncode+",").indexOf(","+item.warncode+",")>=0?true:false};
		 }
			}
	 	tree.tree({data:datalist});
		} 
},
showSelectWarnInfoWindow:function(){
	var htmlstr='<div  id="SelectWarnInfoWindowDiv"    class="modal fade in" style="display: none;">'+
 '  <div class="modal-dialog">'+
 '     <div class="modal-content">'+
  '       <div class="modal-header">'+
 '           <button type="button" class="close"'+ 
  '             data-dismiss="modal" aria-hidden="true">'+
  '                &times;'+
  '          </button>'+
  '          <h4 class="modal-title">选择告警 </h4>'+
  '       </div>'+
   '      <div class="modal-body" style="height:'+($(document).height()-200)+'px;overflow:auto;">'+
   '	<div class="container" style="width:100%"   ><div style="position: absolute;left: 10px;top: 0px;right: 0px;height: 40px;">'+
    			'	<div class="btn-toolbar" role="toolbar">'+
 '<div class="btn-group">'+ 
 '<table border="0">'+
' <tr>'+
 '<td><input type="text" placeholder="编码或名称模糊查询" id="t_query" style="width: 160px;" /></td>'+
 '<td><button type="button"   class="btn btn-primary btn-sm" onclick="FshowSelectWarnInfoWindowrefreshdata('+this.id+');" ><i class="glyphicon glyphicon-search" ></i>查询</button>'+ 
 ' </td>'+
 '</tr>'+
 '</table>'+
 '</div>'+ 
' </div>'+
  '  	</div>'+
    '	<div style="position:absolute;top: 40px;left: 10px;right: 10px;bottom: 40px;">'+
    		'<table id="showwarninfowindowdatagrid"  class="table table-bordered table-hover display" border="1"  style="width: 100%;height:100%;margin:0px;padding:0px;table-layout:fixed">'+
   	'<thead style="color: #ECF0F1; background: rgba(52, 73, 94, 0.94);">'+
 	'	<tr class="theader">'+
 	 	'	<th width="20"></th>'+
 	'	<th width="80">告警编码</th>'+
 	'	<th width="180">告警名称</th>'+
 	'	<th width="80">告警级别</th>'+
 	'	</tr>'+
 '	</thead>'+
 '	<tbody></tbody>'+
 '   		</table>'+
  '  	</div>'+
 '   	<div style="position:absolute;top:auto;left: 10px;right: 10px;bottom: 0px;" id="showwarninfowindowpagebardiv"></div></div>'+
  '       </div>'+
  	  '<div class="modal-footer">'+
//				'<div class="col-sm-offset-5 col-sm-10">'+
//				'<button id="btn_cancel" class="btn btn-primary" onclick="FCacelEdit();"><i class="glyphicon glyphicon-remove-sign"></i>取消</button>&nbsp;&nbsp;'+
					'<button class="btn btn-primary" onclick="FshowwarninfowindowSubmit('+this.id+');"><i class="glyphicon glyphicon-floppy-disk"></i>选择</button>'+
	//			'</div>'+
			  '</div>'+
   '      </div>'+
   '      </div>'+
   '      </div>';
	  $("body").append(htmlstr);
    $("#SelectWarnInfoWindowDiv").modal().css({    width: "auto",
     height: "auto",
    'margin-left': function () {
    	 
       return  ( $(document).width()-$(this).width() )/ 2;
   }});
   $("#SelectWarnInfoWindowDiv").on("hide.bs.modal",function(){
    $("#SelectWarnInfoWindowDiv").remove();
   });
   var pagebar=Object.create(RobotPageBar);
   this.pagebar=pagebar;
this.pagebar.id=0;

$("#showwarninfowindowpagebardiv").append(this.pagebar.getHtml());
var callobj=this;
this.pagebar.refreshdata=function(){
	robotservice.callrobotservice("alarmConfigService","QueryWarntypeStandardListOrderbyCode",{"query":$("#t_query").val(),"pageIndex":pagebar.pageIndex,"pageSize":pagebar.pageSize},callobj.fshowdata,callobj,false);
};
  setTimeout(this.refreshdata,100,this);
		//this.refreshdata();
},
refreshdata:function(callobj){
	if(callobj==null){
		callobj=this;
	}
	robotservice.callrobotservice("alarmConfigService","QueryWarntypeStandardListOrderbyCode",{"query":$("#t_query").val(),"pageIndex":callobj.pagebar.pageIndex,"pageSize":callobj.pagebar.pageSize},callobj.fshowdata,callobj,false);
},
fshowdata:function(data,callobj){
var grid=$("#showwarninfowindowdatagrid");
grid.dataTable({
			"sScrollX":"auto",
	 "sScrollY":$(document).height()-320,
	 "bScrollInfinite":true,//是否开启内置滚动条
   "bScrollCollapse": true, 
  "bPaginate" : false, // 翻页功能
"bStateSave" : false, // 状态保存
"bLengthChange" : false, // 改变每页显示数据数量
"bFilter" : false, // 过滤功能
"bSort" : false, // 排序功能
"bInfo" : false, // 页脚信息
"bAutoWidth" : true,// 自动宽度
"bDestroy" : true,
  "oLanguage": {
                    "sProcessing": "正在加载中......",
                    "sZeroRecords": "对不起，查询不到相关数据！",
                    "sEmptyTable": "表中无数据存在！"
                }, //多语言配置
"columns":[{data:"selected"},{data:"warncode"},{data:"warninfo"},{data:"warnlevel"}],
"columnDefs":[{targets:[0],"render": function(data, type, full) {

			  var htmlstr="<input type='checkbox' onchange='Fshowwarninfowindowset(this,\""+callobj.id+"\");' "+(full.selected==1?"checked='checked'":"")+">";
			   
				htmlstr+="</input>";
            return htmlstr;
         }} 
]
		}); 
			var datatable=grid.dataTable();
		try{
			datatable.fnClearTable();
			grid.fnDraw();
		}catch(e){
			//TODO handle the exception
		}
				if(data!=null&&data.rs!=null){
		callobj.pagebar.recordcount=data.RecordCount;

	 callobj.pagebar.refreshstatu();
		 for (var i = 0; i < data.rs.length; i++) {
		 var itemobj=data.rs[i];
		 itemobj.rownumber=i+1;
		 itemobj.selected=0;
		 	datatable.fnAddData(itemobj,false);
		 }
		grid.fnDraw();
		
	}else{
	
		callobj.pagebar.recordcount=0;

	 callobj.pagebar.refreshstatu();
	}
}
}
function FshowSelectWarnInfoWindow(id){
	RobotWarnInfoCompentLib[""+id].showSelectWarnInfoWindow();
}
function FshowSelectWarnInfoWindowrefreshdata(id){
	RobotWarnInfoCompentLib[""+id].refreshdata();
}
function Fshowwarninfowindowset(chk,id){
	//RobotWarnInfoCompentLib[id];
	var grid=$("#showwarninfowindowdatagrid");
	var selectdata=grid.dataTable().fnGetData($(chk).closest('tr'));
	selectdata.selected=chk.checked?1:0;

}
function FshowwarninfowindowSubmit(id){
		var datas=$('#showwarninfowindowdatagrid').dataTable().api().data();
 var _warncode="";
 var _warnname="";
 var icount=0;
for(var i=0;i<datas.length;i++){
  if(datas[i].selected==1){
  	icount++;
	 _warncode+=(icount>1?",":"")+"'"+datas[i].warncode+"'";
	 _warnname+=(icount>1?",":"")+""+datas[i].warninfo+""; 
  }
}
RobotWarnInfoCompentLib[id]._val={warncode:_warncode,warntype:_warnname};
$("#cb_warnInfo"+id).val(_warnname);
 $("#SelectWarnInfoWindowDiv").modal('hide');
}
