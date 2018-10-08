var RobotMyHomeStyle1={
	modelcn:2,
	viewObject:null,
	container:null,
	getHtml:function(item){
		var panelheight=$(document).height()-60;
	
		var htmlstr="<div class='container' style='width:100% ;padding-right:5px;padding-left:0px'>"+
"	<div class='row' style='width:100%;height:100%;margin-right:5px;margin-left:5px;margin-top:5px;margin-bottom:5px'>"+
"		<div class='col-xs-6 col-md-6 span6' style='padding-right:5px;padding-left:5px;padding-top:5px;padding-bottom:5px'>"+
"			<div class='panel panel-primary' style='width:100%;height:100%;margin-bottom:0px'>"+
"				<div id='robotmyhomepanelhead1' class='panel-heading' style='cursor:pointer'>"+
"					<h3 id='robotmyhomepaneltitle1' class='panel-title'>"+
item.module1title+
"					</h3>"+
"				</div>"+
"				<div id='robotmyhomepanel1' class='panel-body' style='height:"+(panelheight)+"px;padding:5px'>"+
"<p>开发中...</p>"+
"				</div>"+
"			</div>"+
 "		</div>"+
"		<div class='col-xs-6 col-md-6 span6' style='padding-right:5px;padding-left:5px;padding-top:5px;padding-bottom:5px'>"+
 
"		<div class='panel panel-primary' style='width:100%;height:100%;margin-bottom:0px'>"+
"				<div id='robotmyhomepanelhead2' class='panel-heading' style='cursor:pointer'>"+
"					<h3 id='robotmyhomepaneltitle2' class='panel-title'>"+
item.module2title+
"					</h3>"+
"				</div>"+
"				<div id='robotmyhomepanel2' class='panel-body' style='height:"+(panelheight)+"px;padding:5px'>"+
"<p>开发中...</p>"+
"				</div>"+
 "		</div>"+
  "		</div>"+
    "		</div>"+
      "		</div>";
		return htmlstr;
	}
}
