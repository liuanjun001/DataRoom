var RobotMyHomeStyle11={
	modelcn:9,
	viewObject:null,
	container:null,
	getHtml:function(item){
		var panelheight=$(document).height()-120;
	
		var htmlstr="<div  style='position:absolute;left:0px;top:0px;width:7680px;height:3240px;padding:0px;margin:0px;overflow:hidden;background-color: #383838;'>"+

"			<div class='panel panel-primary' style='border:2px solid transparent;border-radius:20px;border-color:#666666;background:transparent;position:absolute;left:5px;top:5px;width:1910px;height:1070px;margin:0px;padding:0px;overflow:hidden;'>"+
"				<div id='robotmyhomepanelhead1' class='panel-heading' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;text-align:center;cursor:pointer'>"+
"					<h3 id='robotmyhomepaneltitle1' class='panel-title'>"+
item.module1title+
"					</h3>"+
"				</div>"+
"				<div id='robotmyhomepanel1' class='panel-body' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;height:1040px;overflow:hidden;padding:5px'>"+
"<p style='color:#ffffff'>请选择分析模块...</p>"+
"				</div>"+
"			</div>"+

"			<div class='panel panel-primary' style='border:2px solid transparent;border-radius:20px;border-color:#666666;background:transparent;position:absolute;left:5px;top:1085px;width:1910px;height:1070px;margin:0px;padding:0px;overflow:hidden;'>"+
"				<div id='robotmyhomepanelhead2' class='panel-heading' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;text-align:center;cursor:pointer'>"+
"					<h3 id='robotmyhomepaneltitle2' class='panel-title'>"+
item.module2title+
"					</h3>"+
"				</div>"+
"				<div id='robotmyhomepanel2' class='panel-body' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;height:1040px;overflow:hidden;padding:5px'>"+
"<p style='color:#ffffff'>请选择分析模块...</p>"+
"				</div>"+
"			</div>"+

"			<div class='panel panel-primary' style='border:2px solid transparent;border-radius:20px;border-color:#666666;background:transparent;position:absolute;left:5px;top:2165px;width:1910px;height:1070px;margin:0px;padding:0px;overflow:hidden;'>"+
"				<div id='robotmyhomepanelhead3' class='panel-heading' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;text-align:center;cursor:pointer'>"+
"					<h3 id='robotmyhomepaneltitle3' class='panel-title'>"+
item.module3title+
"					</h3>"+
"				</div>"+
"				<div id='robotmyhomepanel3' class='panel-body' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;height:1040px;overflow:hidden;padding:5px'>"+
"<p style='color:#ffffff'>请选择分析模块...</p>"+
"				</div>"+
"			</div>"+

"			<div class='panel panel-primary' style='border:2px solid transparent;border-radius:20px;border-color:#666666;background:transparent;position:absolute;left:1925px;top:5px;width:3830px;height:2150px;margin:0px;padding:0px;overflow:hidden;'>"+
"				<div id='robotmyhomepanelhead4' class='panel-heading' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;text-align:center;cursor:pointer'>"+
"					<h3 id='robotmyhomepaneltitle4' class='panel-title'>"+
item.module4title+
"					</h3>"+
"				</div>"+
"				<div id='robotmyhomepanel4' class='panel-body' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;height:2120px;overflow:hidden;padding:5px'>"+
"<p style='color:#ffffff'>请选择分析模块...</p>"+
"				</div>"+
"			</div>"+

"			<div class='panel panel-primary' style='border:2px solid transparent;border-radius:20px;border-color:#666666;background:transparent;position:absolute;left:1925px;top:2165px;width:1910px;height:1070px;margin:0px;padding:0px;overflow:hidden;'>"+
"				<div id='robotmyhomepanelhead5' class='panel-heading' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;text-align:center;cursor:pointer'>"+
"					<h3 id='robotmyhomepaneltitle5' class='panel-title'>"+
item.module5title+
"					</h3>"+
"				</div>"+
"				<div id='robotmyhomepanel5' class='panel-body' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;height:1040px;overflow:hidden;padding:5px'>"+
"<p style='color:#ffffff'>请选择分析模块...</p>"+
"				</div>"+
"			</div>"+

"			<div class='panel panel-primary' style='border:2px solid transparent;border-radius:20px;border-color:#666666;background:transparent;position:absolute;left:3845px;top:2165px;width:1910px;height:1070px;margin:0px;padding:0px;overflow:hidden;'>"+
"				<div id='robotmyhomepanelhead6' class='panel-heading' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;text-align:center;cursor:pointer'>"+
"					<h3 id='robotmyhomepaneltitle6' class='panel-title'>"+
item.module6title+
"					</h3>"+
"				</div>"+
"				<div id='robotmyhomepanel6' class='panel-body' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;height:1040px;overflow:hidden;padding:5px'>"+
"<p style='color:#ffffff'>请选择分析模块...</p>"+
"				</div>"+
"			</div>"+

"			<div class='panel panel-primary' style='border:2px solid transparent;border-radius:20px;border-color:#666666;background:transparent;position:absolute;left:5765px;top:5px;width:1910px;height:1070px;margin:0px;padding:0px;overflow:hidden;'>"+
"				<div id='robotmyhomepanelhead7' class='panel-heading' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;text-align:center;cursor:pointer'>"+
"					<h3 id='robotmyhomepaneltitle7' class='panel-title'>"+
item.module7title+
"					</h3>"+
"				</div>"+
"				<div id='robotmyhomepanel7' class='panel-body' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;height:1040px;overflow:hidden;padding:5px'>"+
"<p style='color:#ffffff'>请选择分析模块...</p>"+
"				</div>"+
"			</div>"+

"			<div class='panel panel-primary' style='border:2px solid transparent;border-radius:20px;border-color:#666666;background:transparent;position:absolute;left:5765px;top:1085px;width:1910px;height:1070px;margin:0px;padding:0px;overflow:hidden;'>"+
"				<div id='robotmyhomepanelhead8' class='panel-heading' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;text-align:center;cursor:pointer'>"+
"					<h3 id='robotmyhomepaneltitle8' class='panel-title'>"+
item.module8title+
"					</h3>"+
"				</div>"+
"				<div id='robotmyhomepanel8' class='panel-body' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;height:1040px;overflow:hidden;padding:5px'>"+
"<p style='color:#ffffff'>请选择分析模块...</p>"+
"				</div>"+
"			</div>"+

"			<div class='panel panel-primary' style='border:2px solid transparent;border-radius:20px;border-color:#666666;background:transparent;position:absolute;left:5765px;top:2165px;width:1910px;height:1070px;margin:0px;padding:0px;overflow:hidden;'>"+
"				<div id='robotmyhomepanelhead9' class='panel-heading' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;text-align:center;cursor:pointer'>"+
"					<h3 id='robotmyhomepaneltitle9' class='panel-title'>"+
item.module9title+
"					</h3>"+
"				</div>"+
"				<div id='robotmyhomepanel9' class='panel-body' style='border:0px solid transparent;border-radius:20px;border-color:#666666;background:transparent;height:1040px;overflow:hidden;padding:5px'>"+
"<p style='color:#ffffff'>请选择分析模块...</p>"+
"				</div>"+
"			</div>"+

 "</div>";
		return htmlstr;
	}
}