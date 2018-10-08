var RobotPdf={
	id:'',
	reportname:'',
	robotdata:{},
	defdata:{},
	viewObject:{},//对像的可视化组件
	queryparam:null,
	container:{},
	querysid:'',
	pageindex:0,
	pagecount:0,
	getHtml:function(item){
		this.reportname=item.reportname;
		RobotPdf.reportname=this.reportname;
				var itemstr="<div  style='position: absolute;overflow:auto;left:"+(item.hasOwnProperty("left")?item.left:item.x)
				+"px;top:"+(item.hasOwnProperty("top")?item.top:item.y)+"px"+(item.hasOwnProperty("right")?";right:"+item.right+"px":"")+(item.hasOwnProperty("bottom")?";bottom:"+item.bottom+"px":"")+(item.hasOwnProperty("width")&&!item.hasOwnProperty("right")?";width:"+item.width+(item.width.indexOf("%")>0?"%":"px"):"")+(item.hasOwnProperty("height")&&!item.hasOwnProperty("bottom")?";height:"+item.height+(item.height.indexOf("%")>0?"%":"px"):"")+"'>"
				+"<table width='100%' height='100%' border='0'><tr valign='top' height='18px'><td><p><a href='#' id='robotpdfpagefirst' class='glyphicon glyphicon-step-backward'> </a><a href='#'  id='robotpdfpageprew' class='glyphicon glyphicon-backward'> </a>第<input type='number' style='width:30px' onchange='RobotPdf.changePage();' value='0' id='pdfpageindex'></input>页/共<font id='pdfpagecount'>0</font>页<a href='#'   id='robotpdfpagenext' class='glyphicon glyphicon-forward'> </a>"
				+"<a href='#'  id='robotpdfpagelast' class='glyphicon glyphicon-step-forward'> </a>&nbsp;&nbsp;<a href='#' onclick='RobotPdf.adjustPdfIndex();' id='robotadjugeindex' title='调整章节'><img src='images/index.png'  alt='调整章节'> </a>&nbsp;&nbsp;<a href='#' id='robotexportpdf' title='导出PDF' onclick='RobotPdf.exportfile(\"pdf\");'><img src='images/pdf.png'  alt='导出PDF'> </a><a href='#' id='robotexportexcel' alt='导出Excel'  onclick='RobotPdf.exportfile(\"excel\");'><img src='images/excel.png' title='导出Excel'> </a><a href='#' id='robotexportword' alt='导出Word'  onclick='RobotPdf.exportfile(\"word\");'><img src='images/word.png' title='导出Word'> </a><a href='#' id='robotexporthtml' alt='导出HTML'  onclick='RobotPdf.exportfile(\"html\");'><img src='images/html.png' title='导出HTML'> </a><a href='#' id='robotexportzip' alt='导出ZIP'  onclick='RobotPdf.exportfile(\"all\");'><img src='images/zip.png' title='导出zip'> </a></p></td></tr><tr height='1px'><td><hr style='margin-top:0;margin-bottom:0' width='100%' size=1 color=#000000 align=center noshade></td></tr><tr valign='top'><td id='robotpdfdiv"+this.id+"' valign='top'> <p>注意事项：1、导出报告需要在<button class='btn btn-primary' onclick='RobotPdf.query({});'>查询</button>后<font color='red'>1个小时</font>内完成<br>2、报告章节的内容和顺序可以通过\"调节章节\"按钮进行调节设置<br>3、报告生成时间较长，请耐心等待</p></td></tr></table></div>";
                  return itemstr;
	},
	query:function(param){
		$("#robotpdfdiv"+this.id).html("<p>查询中</p>");
		RobotPdf.queryparam=param;
		param.reportname=RobotPdf.reportname;
		robotservice.callrobotservice("reportservice","doPdfQuery",{"arg":JSON.stringify(param)},RobotPdf.showreport,this);
	},
	showreport:function(data){
	RobotPdf.querysid=data.result;	
	robotservice.callrobotservice("reportservice","getPdfHtmlPager",{seq:RobotPdf.querysid,page:0},RobotPdf.showreportcontent,this);
	},
	showreportcontent:function(data){
		
		var htmlstr=data.htmldata;
		RobotPdf.pageindex=data.pageindex;
		RobotPdf.pagecount=data.pagecount;
		htmlstr=htmlstr.replace(new RegExp("<br/>","gm"),"\n");
		htmlstr=htmlstr.replace(new RegExp("&quot;","gm"),"\"");
		htmlstr=htmlstr.replace(new RegExp("&#39;","gm"),"'");
		htmlstr=htmlstr.replace(new RegExp("&nbsp;","gm")," ");
		htmlstr=htmlstr.replace(new RegExp("&gt;","gm"),">");
		htmlstr=htmlstr.replace(new RegExp("&lt;","gm"),"<");
		htmlstr=htmlstr.replace(new RegExp("&amp;","gm"),"&");
		
		$("td[id^='robotpdfdiv'").html(htmlstr);
		$("#pdfpageindex").val(RobotPdf.pageindex);
		$("#pdfpagecount").html(RobotPdf.pagecount);
		if(RobotPdf.pageindex==1){
		$("#robotpdfpagefirst").off("click");
		$("#robotpdfpageprew").off("click");
		}else{
		$("#robotpdfpagefirst").on("click",RobotPdf.firstPage);
		$("#robotpdfpageprew").on("click",RobotPdf.prewPage);
			 
		}
			if(RobotPdf.pageindex==RobotPdf.pagecount){
			$("#robotpdfpagelast").attr("disabled",true);
			$("#robotpdfpagenext").attr("disabled",true);
			$("#robotpdfpagelast").off("click");
		$("#robotpdfpagenext").off("click");
			}else{
			$("#robotpdfpagenext").on("click",RobotPdf.nextPage);
			$("#robotpdfpagelast").on("click",RobotPdf.lastPage);
			$("#robotpdfpagelast").attr("disabled",false);
			$("#robotpdfpagenext").attr("disabled",false);
			}
	},
		initWigetData:function(){
//			$("#robotpdfpagefirst").on("click",RobotPdf.firstPage);
//			$("#robotpdfpageprew").on("click",RobotPdf.prewPage);
//			$("#robotpdfpagenext").on("click",RobotPdf.nextPage);
//			$("#robotpdfpagelast").on("click",RobotPdf.lastPage);
//			$("#robotpdfpagefirst").attr("enabled",false);
//			$("#robotpdfpageprew").attr("enabled",false);
//			$("#robotpdfpagenext").attr("enabled",false);
//			$("#robotpdfpagelast").attr("enabled",false);
		},
		firstPage:function(){
	if(RobotPdf.querysid==""){
		alert("请先执行查询！");
		return;
	}
	robotservice.callrobotservice("reportservice","getPdfHtmlPager",{seq:RobotPdf.querysid,page:0},RobotPdf.showreportcontent,this);
		},
		prewPage:function(){
				if(RobotPdf.querysid==""){
		alert("请先执行查询！");
		return;
	}
		RobotPdf.pageindex--;
		if(RobotPdf.pageindex==0){
			RobotPdf.pageindex=1;
		}
	robotservice.callrobotservice("reportservice","getPdfHtmlPager",{seq:RobotPdf.querysid,page:RobotPdf.pageindex-1},RobotPdf.showreportcontent,this);
		},
		nextPage:function(){
				if(RobotPdf.querysid==""){
		alert("请先执行查询！");
		return;
	}
			RobotPdf.pageindex++;
				if(RobotPdf.pageindex>RobotPdf.pagecount){
			RobotPdf.pageindex=RobotPdf.pagecount;
		}
	robotservice.callrobotservice("reportservice","getPdfHtmlPager",{seq:RobotPdf.querysid,page:RobotPdf.pageindex-1},RobotPdf.showreportcontent,this);
		},
		lastPage:function(){
				if(RobotPdf.querysid==""){
		alert("请先执行查询！");
		return;
	}
	robotservice.callrobotservice("reportservice","getPdfHtmlPager",{seq:RobotPdf.querysid,page:RobotPdf.pagecount-1},RobotPdf.showreportcontent,this);
		},
	changePage:function(){
	if(RobotPdf.querysid==""){
		alert("请先执行查询！");
		return;
	}
	RobotPdf.pageindex=parseInt($("#pdfpageindex").val());
	if(RobotPdf.pageindex>RobotPdf.pagecount){
	RobotPdf.pageindex=	RobotPdf.pagecount;
	}
	robotservice.callrobotservice("reportservice","getPdfHtmlPager",{seq:RobotPdf.querysid,page:RobotPdf.pageindex-1},RobotPdf.showreportcontent,this);
	},
	exportfile:function(filetype){
	if(RobotPdf.querysid==""){
		alert("请先执行查询！");
		return;
	}
        robotservice.callrobotservice("reportservice","exportbufferpdfreport",{seq:RobotPdf.querysid,filetype:filetype},RobotPdf.showreportexport,this);		
	},
	showreportexport:function(data){
		RobotComm.showDownLoadWindow(data.result);
	},
	upIndex:function(){
			var grid=$('#adjustindextable').dataTable();
		var datas=grid.api().data();
		for (var i = 1; i < datas.length; i++) {
			if(datas[i].checked){
			 var tmp=datas[i-1];
			 tmp.id=i+1;
			 datas[i].id=i;
			 datas[i-1]=datas[i];
			 datas[i]=tmp;
 
			}
			
		}
		grid.fnClearTable();
				for (var i = 0; i < datas.length; i++) {
					grid.fnAddData(datas[i]);
				}
	},
	downIndex:function(){
			var grid=$('#adjustindextable').dataTable();
		var datas=grid.api().data();
		for (var i = 0; i < datas.length-1; i++) {
			if(datas[i].checked){
			 var tmp=datas[i];
			 tmp.id=i+2;
			 datas[i]=datas[i+1];
			 	 datas[i].id=i+1;
			 datas[i+1]=tmp;
 
			}
			
		}
		grid.fnClearTable();
				for (var i = 0; i < datas.length; i++) {
					grid.fnAddData(datas[i]);
				}
	},
	adjustIndexsubmit:function(){
	var grid=$('#adjustindextable').dataTable();
		var datas=grid.api().data();
		var reportname="";
		for (var i = 0; i < datas.length; i++) {
			reportname+=(i==0?"":";")+datas[i].reportname+","+datas[i].reportdisplayname;
		}
		RobotPdf.reportname=reportname;
		  $("#adjustReportIndexDiv").modal('hide');
		  if(RobotPdf.queryparam!=null){
		RobotPdf.query(RobotPdf.queryparam);
		  }
	},
	delIndex:function(){
		var grid=$('#adjustindextable').dataTable();
		var datas=grid.api().data();
		for (var i = 0; i < datas.length; i++) {
			if(datas[i].checked){
			grid.fnDeleteRow(i);
			i--;
			datas=grid.api().data();
			}
		}
	 datas=grid.api().data();
	 if(datas.length==0){
	 	$("#btnadjustIndexsubmit").attr("disabled",true);
	 	$("#btnupIndex").attr("disabled",true);
	 	$("#btndownIndex").attr("disabled",true);
	 	$("#btndelIndex").attr("disabled",true);
	 }else{
	 	$("#btnadjustIndexsubmit").attr("disabled",false);
	 }
	},
	adjustPdfIndex:function(data){
		var htmlstr='<div  id="adjustReportIndexDiv"    class="modal fade in" style="display: none;">'+
 '  <div class="modal-dialog">'+
 '     <div class="modal-content">'+
  '       <div class="modal-header">'+
 '           <button type="button" class="close"'+ 
  '             data-dismiss="modal" aria-hidden="true">'+
  '                &times;'+
  '          </button>'+
  '          <h4 class="modal-title" id="myOtherSerialModalLabel">'+
 '              调整章节顺序'+
  '          </h4>'+
  '       </div>'+
   '      <div class="modal-body">'+
   '	<div class="container" style="width:100%"   ><div class="row" style="width:100%;margin:1px;padding:1px" >'+
'		<div class="col-md-10 col-xs-10 span10" > '+
'			<table id="adjustindextable" class="table table-bordered table-hover"  width="400px" border="1">'+
'				<thead  style="color: #ECF0F1; background: rgba(52, 73, 94, 0.94);width:400px">'+
'					<tr class="theader" style="width:400px"  >'+
						'<th width="80px" >编号</th>'+
'						<th width="320px">章节名称</th>'+
'					</tr>'+
'				</thead>'+
'				<tbody>'+
					''+
'				</tbody>'+
'			</table>'+
'		</div>'+
'		<div class="col-md-2 col-xs-2 span2"><div class="row-fluid">'+
'			<div class="col-md-12 col-xs-12 span12 offset2" style="padding-top:8px"> <button type="button" onclick="RobotPdf.upIndex();" id="btnupIndex" class="btn btn-default btn-default btn-primary"><span class="glyphicon glyphicon-arrow-up"></span>向上</button> </div>'+
'<div class="col-md-12 col-xs-12 span12 offset2"  style="padding-top:8px"> <button type="button" class="btn btn-default btn-primary" id="btndownIndex" onclick="RobotPdf.downIndex();"><span class="glyphicon glyphicon-arrow-down">向下</span></button> </div>'+
'<div class="col-md-12 col-xs-12 span12 offset2"  style="padding-top:8px"> <button type="button" class="btn btn-default btn-primary" id="btndelIndex"  onclick="RobotPdf.delIndex();"><span class="glyphicon glyphicon-remove">删除</span></button> </div>'+
'<div class="col-md-12 col-xs-12 span12 offset2"  style="padding-top:8px"><button type="button" class="btn btn-default  btn-primary" id="btnadjustIndexsubmit" onclick="RobotPdf.adjustIndexsubmit();"><span class="glyphicon glyphicon-floppy-saved"></span>确定</button></div>'+
'		</div></div>'+
'	</div></div>'+
  '       </div>'+
   '      </div>'+
   '      </div>'+
   '      </div>';
   $("body").append(htmlstr);
    $("#adjustReportIndexDiv").modal().css({    width: "auto",
     height: "auto",
    'margin-left': function () {
    	 
       return  ( $(document).width()-$(this).width() )/ 2;
   }});
   $("#adjustReportIndexDiv").on("hide.bs.modal",function(){
    $("#adjustReportIndexDiv").remove();
   });

   	var grid=$("#adjustindextable");
	grid.dataTable({

	 "bScrollInfinite":false,
   "bScrollCollapse": false, 
  "bPaginate" : false, // 翻页功能
"bStateSave" : false, // 状态保存
"bLengthChange" : false, // 改变每页显示数据数量
"bFilter" : false, // 过滤功能
"bSort" : false, // 排序功能
"bInfo" : false, // 页脚信息
"bAutoWidth" : true,// 自动宽度
"bDestroy" : true,

"columns":[{"data":"checked","bSortable": false},{"data":"reportdisplayname","bSortable": false}],

"columnDefs":[

{"targets":[0],
	 "visable":true,
	 "width":"50px",
	  "render": function(data, type, full) {
			  var htmlstr="<input type='checkbox' onchange=\"robotcheckeditchange(this,'#adjustindextable',"+full.id+",'checked');\"  style='width:25px' "+(data?"checked='checked'":"")+" >";
			   
				htmlstr+="</input>";
            return htmlstr;
         },
	"data":"checked"},
	{"targets":[1],
		 "width":"350px",
		"data":"reportdisplayname",
	 "visable":true}]
	
		});
		var datatable=grid.dataTable();
		datatable.fnClearTable();
		   var a_report=RobotPdf.reportname.split(";");
		 for (var i = 0; i < a_report.length; i++) {
		 	var a_item=a_report[i].split(",");
		 	 	datatable.fnAddData({id:i+1,"checked":true,"reportdisplayname":a_item[1],"reportname":a_item[0]});
		 }
		 }
}
function	robotcheckeditchange(checkobj,tablename,rowindex,pram){
	var val=checkobj.checked;
	var datas=$(tablename).dataTable().api().data();
	datas[rowindex-1][pram]=val;
	 	$("#btnupIndex").attr("disabled",true);
	 	$("#btndownIndex").attr("disabled",true);
	 	$("#btndelIndex").attr("disabled",true);
	for (var i = 0; i < datas.length; i++) {
		if(datas[i].checked){
 
	 	$("#btnupIndex").attr("disabled",false);
	 	$("#btndownIndex").attr("disabled",false);
	 	$("#btndelIndex").attr("disabled",false);
			return;
		}
	}
	//alert(pram+"_"+rowindex+"="+val);
}