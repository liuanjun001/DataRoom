var RobotPageBarCompentLib={};
var RobotPageBar={
	id:'0',
	pageCount:0,
	pageIndex:1,
	pageSize:20,
	recordcount:0,
	refreshdata:null,
		getHtml:function (item){
			RobotPageBarCompentLib[this.id]=this;
			var ret="<table width='100%' style='bottom:0px' border='0'><tr><td   >第<select onchange='FReportChangeIndex0("+this.id+")' id='pageselect"+this.id+"'></select>/<font id='pagecount"+this.id+"'></font>页,总<font id='recordcount"+this.id+"'></font>条,每页<input style='width:40px' onchange='FReportChangePageSize0("+this.id+")' type='number' id='t_pageSizeInfo"+this.id+"' />条</td><td align='right'><a id='a_firstpage"+this.id+"' href='#'  onclick='FReportFirstPage0("+this.id+")'>首页</a>&nbsp;&nbsp;<a  id='a_prewpage"+this.id+"' href='#'  onclick='FReportPrewPage0("+this.id+")'>上一页</a>&nbsp;&nbsp;<a  id='a_nextpage"+this.id+"' href='#'  onclick='FReportNextPage0("+this.id+")'>下一页</a>&nbsp;&nbsp;<a  id='a_lastpage"+this.id+"' href='#'  onclick='FReportLastPage0("+this.id+")'>末页</a>&nbsp;&nbsp;<a href='#' onclick='FReportRefreshPage0("+this.id+")'>刷新</a>&nbsp;&nbsp;</td></tr></table>";
			return ret;
		},
		refreshstatu:function(){
				this.pageCount=parseInt(this.recordcount/this.pageSize)+1;
					$("#pagecount"+this.id).html(this.pageCount);
		$("#recordcount"+this.id).html(this.recordcount);
			$("#t_pageSizeInfo"+this.id).val(this.pageSize);
			var pageselect=$("#pageselect"+this.id);
		pageselect.empty();
		for(var k=1;k<=this.pageCount;k++){
			pageselect.append("<option value='"+k+"' "+(k==this.pageIndex?"selected":"")+">"+k+"</option>");
		}
				if(this.pageIndex==1){
					$("#a_firstpage"+this.id).attr("disabled",true);
				$("#a_prewpage"+this.id).attr("disabled",true);
				$("#a_nextpage"+this.id).attr("disabled",false);
					$("#a_lastpage"+this.id).attr("disabled",false);
		}
		if(this.pageIndex==this.pageCount){
			if(this.pageCount==1){
					$("#a_firstpage"+this.id).attr("disabled",true);
				$("#a_prewpage"+this.id).attr("disabled",true);
			}
				$("#a_nextpage"+this.id).attr("disabled",true);
					$("#a_lastpage"+this.id).attr("disabled",true);
		}
	
		}
}
function FReportFirstPage0(_id){
 	RobotPageBarCompentLib[""+_id].pageIndex=1;
 	if(RobotPageBarCompentLib[""+_id].refreshdata!=null){
 		RobotPageBarCompentLib[""+_id].refreshdata();
 	}else{
 		document.FReportFirstPage(_id);
 	}
 		
 }
 function FReportPrewPage0(_id){
 	RobotPageBarCompentLib[""+_id].pageIndex=RobotPageBarCompentLib[""+_id].pageIndex>1?RobotPageBarCompentLib[""+_id].pageIndex-1:1;
 	if(RobotPageBarCompentLib[""+_id].refreshdata!=null){
 		RobotPageBarCompentLib[""+_id].refreshdata();
 	}else{
 		document.FReportPrewPage(_id);
 	}
 }
  function FReportLastPage0(_id){
 	RobotPageBarCompentLib[""+_id].pageIndex=RobotPageBarCompentLib[""+_id].pageCount;
 	if(RobotPageBarCompentLib[""+_id].refreshdata!=null){
 		RobotPageBarCompentLib[""+_id].refreshdata();
 	}else{
 		document.FReportLastPage(_id);
 	}
 }
   function FReportNextPage0(_id){
 	RobotPageBarCompentLib[""+_id].pageIndex=RobotPageBarCompentLib[""+_id].pageIndex<RobotPageBarCompentLib[""+_id].pageCount?RobotPageBarCompentLib[""+_id].pageIndex+1:RobotPageBarCompentLib[""+_id].pageCount;
 	if(RobotPageBarCompentLib[""+_id].refreshdata!=null){
 		RobotPageBarCompentLib[""+_id].refreshdata();
 	}else{
 		document.FReportNextPage(_id);
 	}
 }
  function FReportChangeIndex0(_id){
 	RobotPageBarCompentLib[""+_id].pageIndex=$("#pageselect"+_id).val();
 	if(RobotPageBarCompentLib[""+_id].refreshdata!=null){
 		RobotPageBarCompentLib[""+_id].refreshdata();
 	}else{
 		document.FReportChangeIndex(_id);
 	}
 }
    function FReportChangePageSize0(_id){
 	RobotPageBarCompentLib[""+_id].pageSize=$("#t_pageSizeInfo"+_id).val();
 	if(RobotPageBarCompentLib[""+_id].refreshdata!=null){
 		RobotPageBarCompentLib[""+_id].refreshdata();
 	}else{
 		document.FReportChangePageSize(_id);
 	}
 }
    function FReportRefreshPage0(_id){
 	if(RobotPageBarCompentLib[""+_id].refreshdata!=null){
 		RobotPageBarCompentLib[""+_id].refreshdata();
 	}else{
 		document.FReportRefreshPage(_id);
 	}
    }