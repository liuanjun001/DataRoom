var RobotVarLabel={
		id:"",
	robotdata:{},
	defdata:{},
	container:{},
	getHtml:function (item){
		this.defdata=item;
		itemstr="<div style='position: absolute;"+(item.hasOwnProperty("right")&&item.right>0?"":(item.hasOwnProperty("left")?"left:"+item.left+"px;":"left:"+item.x+"px"))+((item.hasOwnProperty("top")||item.hasOwnProperty("y"))&&(!item.hasOwnProperty("bottom")||item.bottom==0)?(item.hasOwnProperty("top")?";top:"+item.top:";top"+item.y)+"px":"")+(item.hasOwnProperty("right")?";right:"+item.right+"px":"")+(item.hasOwnProperty("bottom")?";bottom:"+item.bottom+"px":"")+(item.hasOwnProperty("width")?";width:"+item.width+(item.width.indexOf("%")>0?"%":"px"):"")+(item.hasOwnProperty("height")?";height:"+item.height+(item.height.indexOf("%")>0?"%":"px"):"")+"'><p id='robotvarlabel"+this.id+"' style='white-space:nowrap;font-family:"+item.fontFamily+";font-size:"+item.fontSize+";font-color:"+ Number(item.color).toString( 16 )+";font-weight:"+item.fontWeight+"'></p></div>";
		return itemstr;
	},
	query:function(data){
		//变量
		var val="";
		if(this.defdata==null||!this.defdata.hasOwnProperty("varname")||this.defdata.varname==null){
			return;
		}
		if(this.defdata.varname=="curtime"){
			val=(new Date()).format("hh:mm:ss");
		}else	if(this.defdata.varname=="curdate"){
			val=(new Date()).format("yyyy-MM-dd");
		}else	if(this.defdata.varname=="curdatetime"){
			val=(new Date()).format("yyyy-MM-dd hh:mm:ss");
		}else	if(this.defdata.varname=="curyear"){
			val=(new Date()).format("yyyy");
		}else	if(this.defdata.varname=="lastyear"){
			val=""+((new Date()).getFullYear()-1);
		}else if(this.defdata.varname=="displayName"){
			val=robotservice.robotdisplayname;
		}else if(this.defdata.varname=="user_id"||this.defdata.varname=="username"){
			val=robotservice.robotusername;
		}else if(data!=null&&data.hasOwnProperty(this.defdata.varname)){
			val=data[this.defdata.varname];
		}
		$("#robotvarlabel"+this.id).html(val);
	}
}
