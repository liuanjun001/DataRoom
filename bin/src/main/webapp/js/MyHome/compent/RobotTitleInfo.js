var RobotTitleInfo={
	id:1,
compentname:'RobotTitleInfo',
	classname:'',
	functionname:'',
	viewObject:null,
	container:null,
	title:null,
	 option:null,
	getHtml:function(item,nwidth,nheight){
		return "<div class='col-md-12 col-xs-12 span12'  id='RobotTitleInfo"+this.compentname+this.id+"' style='height:"+(nheight!=null?nheight+"px":"100%")+";width:"+(nwidth!=null?nwidth+"px":"100%")+";margin:0px;padding:0px'><p style='color:#ffffff'>"+this.title+"</p></div>";
	},
	initWiget:function(){},
	refresh:function(event){},
	showdata:function(data,callobj){}
}
