/**
 * 拓朴图封装
 * 在jtopo的基础上封装
 * 对于节点类型，可以自由定义，对应的节点图片有两个，一个是普通节点，一个是有下级拓扑的节点，位置在img目录下，文件名为nodetype.jpg，nodetype为节点类型
 */
var TopoLink = {
	canvas: null, //画布
	stage: null, //一个抽象的舞台对象,对应一个Canvas和多个场景对象(Scene)
	scene: null, //场景对象，概念上同很多图形系统中的Layer
	links: [], //连线
	showTips: false, //是否显示信息框
	parentNodeId: null, //上级节点编号，用于返回上级时使用
	showEagleEye: false, //是否显示鹰眼，缺省不显示
	flash: false, //是否闪烁
	nodeData: null, //当前图的数据
	nodes: [],
	backImgUrl: null,
	cfg:{},//拓扑图配置项
	topoId:0,
	/**
	 * 创建对象，初始化JTOPO环境
	 * @param {Object} div 页面中用于显示拓朴图的canvas
	 */
	createTopoLink: function(div) {
		if(div == undefined || div == null) return null;
		this.canvas = div;
//		console.log("left="+div.style.left+",top="+div.style.top);
		this.stage = new JTopo.Stage(this.canvas);
		this.scene = new JTopo.Scene(this.stage);
		/**
		 * 舞台模式，不同模式下有不同的表现:
			设置舞台模式，例如：stage.mode = "drag";
			normal[默认]：可以点击选中单个节点（按住Ctrl可以选中多个），点中空白处可以拖拽整个画面
			drag: 该模式下不可以选择节点，只能拖拽整个画面
			select: 可以框选多个节点、可以点击单个节点
			edit: 在默认基础上增加了：选中节点时可以通过6个控制点来调整节点的宽、高
		 */
		TopoLink.scene.mode = "select";
		this.stage.eagleEye.visible = TopoLink.showEagleEye;
		setInterval(function() {
			TopoLink.flash_alarm();
//			TopoLink.refreshData();
		}, 600);
		return this;
	},
	/**
	 * 拓扑图配置，为json数据格式
	 * nodeTypes 节点类型配置，如配置此项，则节点类型范围爱限，显示图片为配置中的图片
	 * mode 拓扑图的显示模式，view是为查看模式，不能编辑，不能拖动,edit为编辑模式，可操作
	 * @param {Object} cfg
	 */
	config:function(cfg){
		if(cfg == undefined || cfg == null)return;
		if(cfg.nodeTypes != undefined && cfg.nodeTypes != null)
			this.cfg.nodeTypes = cfg.nodeTypes;
		this.mode = "view";
		if(cfg.mode != undefined && cfg.mode != null)
			this.cfg.mode = cfg.mode;
	},
	/**
	 * 清理场景
	 */
	clear: function() {
		//this.stage.clear();
		//this.scene = new JTopo.Scene(this.stage);
		//this.scene.mode = 'select';
		
		this.scene.clear();
		this.scene.setBackground('');
		this.topoId =0;
		var dlg = document.getElementById("ndoeInfoDlg");
		if(dlg != null) {
			dlg.parentNode.removeChild(dlg);
		}
	},
	/**
	 * 设置背景图片
	 * @param {Object} pic 图片url
	 */
	setBackground: function(pic) {
		this.backImgUrl = pic;
		if(this.scene != null) this.scene.background = pic;
	},
	/**
	 * 设置背景颜色，与背景图片冲突，优先级低与图片
	 * @param {Object} c 背景颜色
	 */
	setBackgroundColor: function(c) {
//		console.log("this.seene=" + this.scene + ",color=" + c);
		if(this.scene != null) this.scene.setBackgroundColor(c);
	},
	// 简单连线
	newLink: function(nodeA, nodeZ, text, dashedPattern,linkStyle) {
		var link;
		if(linkStyle == undefined || linkStyle == null || linkStyle.type == undefined || linkStyle.type=="link")
			link = new JTopo.Link(nodeA,nodeZ,text);
		else{
			link= new JTopo.FoldLink(nodeA, nodeZ, text);
		}
		
		link.lineWidth = 3; // 线宽
		link.dashedPattern = dashedPattern; // 虚线
//		link.bundleOffset = 60; // 折线拐角处的长度
//		link.bundleGap = 20; // 线条之间的间隔
		link.textOffsetY = 3; // 文本偏移量（向下3个像素）
		link.strokeColor = '0,200,255';
		if(linkStyle != undefined && linkStyle.color != undefined)
			link.strokeColor = linkStyle.color;
		if(linkStyle != undefined && linkStyle.width != undefined)
			link.lineWidth = linkStyle.width;
		if(linkStyle != undefined && linkStyle.dash != undefined)
			link.dashedPattern = linkStyle.dash;
		if(linkStyle != undefined && linkStyle.arrow != undefined)
			link.arrowsRadius = linkStyle.arrow;
		link.direction = 'vertical'||'horizontal';
		this.scene.add(link);
		this.links.push(link);
		var s = this.scene;
		if(nodeA.children == undefined || nodeA.children == null)
			nodeA.children = [];
		nodeA.children.push(nodeZ);
//		console.log("link:" + nodeA.nodeName + "------" + nodeZ.nodeName);
		link.addEventListener("mouseup", function(event) {
//			console.log("连线起点：" + link.nodeA.nodeName + ",终点：" + link.nodeZ.nodeName);
			//s.remove(link);

		});
		return link;
	},
	/**
	 * 获取节点的图片，优先使用用户在配置中定义的节点图片，如没有采用缺省的图片
	 * @param {Object} nodeType 节点类型
	 * @param {Object} nodeData 节点数据
	 */
	getNodeImage: function(nodeType, nodeData) {
		if(this.cfg == null || this.cfg.nodeTypes == undefined || this.cfg.nodeTypes == null){
			if(nodeData != null && nodeData.hasChildMap != undefined && nodeData.hasChildMap == 1)
				return "img/" + nodeType + "-folder.jpg";
			else
				return("img/" + nodeType + ".jpg");
			return "img/default-node.jpg";
		}
		for(var i = 0;i<this.cfg.nodeTypes.length;i++){
			if(this.cfg.nodeTypes[i].id==nodeType){
				if(nodeData != null && nodeData.hasChildMap != undefined && nodeData.hasChildMap == 1)
					return this.cfg.nodeTypes[i].image_folder;
				else
					return this.cfg.nodeTypes[i].image;
			}
		}
		return "img/default-node.jpg";
		
	},
	/**
	 * 添加节点
	 * @param {Object} nodeId 节点编号，不可重复
	 * @param {Object} nodeName 节点名称，显示在拓扑图上
	 * @param {Object} nodeType 节点类型
	 * @param {Object} nodeData 节点数据
	 * @param {Object} nodeParent 上级节点
	 */
	addNode: function(nodeId, nodeName, nodeType, nodeData, nodeParent) {
//		console.log("add node:id="+nodeId+",name="+nodeName+",type="+nodeType+",parent="+nodeParent);
		var node = new JTopo.Node(nodeName);
		node.nodeId = nodeId;
		node.nodeName = nodeName;
		node.nodeType = nodeType;
		node.nodeData = nodeData;
		var nt = null;
		for(var i = 0;this.cfg != null && this.cfg.nodeTypes != undefined && i<this.cfg.nodeTypes.length;i++){
			if(this.cfg.nodeTypes[i].id==nodeType){
				nt = this.cfg.nodeTypes[i];
				break;
			}
		}
		if(nt != null && nt.width != undefined && nt.height != undefined)
			node.setSize(nt.width, nt.height);
		else
			node.setSize(40, 40);
		if(nodeData != null && nodeData.x != undefined && nodeData.y != undefined)
			node.setLocation(nodeData.x, nodeData.y);
		else
			node.setLocation(this.canvas.clientWidth / 2, this.canvas.clientHeight / 2);
		node.fontColor = "#0000ff";
		node.setImage(this.getNodeImage(nodeType, nodeData));
		if(nodeData != undefined && nodeData != null && nodeData.alarmed == 1)
			node.fontColor = "255,0,0";
		this.scene.add(node);
		if(nodeParent != undefined && nodeParent != null) {
//			console.log("link node:"+nodeParent);
			this.newLink(nodeParent, node, "", 1,nodeData.link);
		}
		node.mode = "view";
//		console.log("mode="+this.cfg.mode);
		if(this.cfg.mode != undefined && this.cfg.mode == "view")
			node.dragable = false;
		node.mouseover(this.nodeMouseOver);
		node.mouseout(this.nodeMouseOut);
		node.dbclick(this.nodeDoubleClick);
		node.click(this.nodeClick);
		if(nodeParent == undefined || nodeParent == null)
			TopoLink.nodes.push(node);
		return node;
	},
	/**
	 * 自动布局，节点支持数量有限，不适用
	 */
	doLayout: function() {
		this.scene.doLayout(JTopo.layout.TreeLayout("down", 30, 107));
	},
	/**
	 * 鼠标按下事件，暂无功能
	 * @param {Object} event
	 */
	nodeMouseDown: function(event) {
		if(event.button == 2) {
			//node.text = "按下右键";
		} else if(event.button == 1) {
			//node.text = '按下中键';
		} else if(event.button == 0) {
			//node.text = '按下左键';
		}
	},
	/**
	 * 鼠标松开事件，暂无功能
	 * @param {Object} event
	 */
	nodeMouseUp: function(event) {
		if(event.button == 2) {
			//node.text = '松开右键';
		} else if(event.button == 1) {
			//node.text = '松开中键';
		} else if(event.button == 0) {
			//node.text = '松开左键';
		}
	},
	/**
	 * 鼠标点击事件，暂无功能
	 * @param {Object} event
	 */
	nodeClick: function(event) {
		
//		console.log(event.target + " be clicked! this is " + this);
	},
	/**
	 * 节点的双击事件，用于打开下级拓扑图
	 * 打开的方法由用户在外部定义loadChildMap函数来实现
	 * @param {Object} event
	 */
	nodeDoubleClick: function(event) {
		if(this.nodeData != undefined && this.nodeData != null) {
//			if(this.nodeData.hasChildMap != undefined && this.nodeData.hasChildMap == 1) {
				console.log("open child map");
				try {
					if(loadChildMap && typeof(loadChildMap) == "function") {
						loadChildMap(this.nodeIdData);
					}
				} catch(e) {
					console.log(e);
				}
//			}
		}
//		console.log(event.target + " be double clicked!");
	},
	/**
	 * 节点拖动事件，暂无功能
	 * @param {Object} event
	 */
	nodeMouseDrag: function(event) {
		console.log(event.source + "," + event.target + " dragging!");
	},
	/**
	 * 鼠标从节点上经过，显示节点信息
	 * 用户可以通过showTipCallback来定义显示的内容及样式
	 * @param {Object} event
	 */
	nodeMouseOver: function(event) {
//		console.log(TopoLink.showTips + "," + TopoLink.scene);
		if(!TopoLink.showTips) return;
		var dlg = document.getElementById("nodeInfoDlg");
		if(dlg != null) {
			dlg.parentNode.removeChild(dlg);
		}
//		console.log(event.target.nodeName + " overed!");
		var div = document.createElement("div");
		div.id = "ndoeInfoDlg";

		div.className = "info-dlg";

		var location = event.target.getLocation();
		var size = event.target.getSize();
		div.style.left = (location.x + size.width + 10) + "px";
//		console.log("left=" + div.style.left + "," + div.style.getPropertyValue("left") + ",str=" + (location.x + size.width + 10));
		div.style.setProperty("top", (location.y + 10) + "px");
		div.style.setProperty("z-index",1000);
		TopoLink.canvas.parentElement.appendChild(div);
		try {
				showTipCallback(this, div);
				return;
		} catch(e) {
			//console.log(e);
		}
		var infoTbl = document.createElement("table");
		infoTbl.className = "info-table";
		var row = infoTbl.insertRow(0);
		var cell = row.insertCell(0);
		cell.className = "info-table title";
		cell.innerText = "节点编码";
		cell = row.insertCell(1);
		cell.innerText = this.nodeId;
		row = infoTbl.insertRow(1);
		cell = row.insertCell(0);
		cell.className = "info-table title";
		cell.innerText = "节点名称";
		cell = row.insertCell(1);
		cell.innerText = this.nodeName;
		row = infoTbl.insertRow(2);
		cell = row.insertCell(0);
		cell.className = "info-table title";
		cell.innerText = "节点类型";
		cell = row.insertCell(1);
		cell.innerText = this.nodeType;

		row = infoTbl.insertRow(3);
		cell = row.insertCell(0);
		cell.className = "info-table title";
		cell.innerText = "告警状态";
		cell = row.insertCell(1);
		if(this.nodeData != undefined && this.nodeData != null && this.nodeData.alarmed == 1) {
			cell.innerHTML = "<font color='red'>告警</font>";
		} else {
			cell.innerHTML = "正常";
		}
		div.appendChild(infoTbl);

//		console.log(div.style.left + "," + div.style.top + ",location:" + location.x + "," + location.y + ",size:" + size.width + "," + size.height);
	},

	nodeMouseMove: function(event) {
		console.log(event.target.data + " mouse moved");
	},
	/**
	 * 关闭提示信息框
	 * @param {Object} event
	 */
	nodeMouseOut: function(event) {
		var dlg = document.getElementById("ndoeInfoDlg");
		if(dlg != null) {
			dlg.parentNode.removeChild(dlg);
		}
	},
	/**
	 * 闪烁告警信息
	 */
	flash_alarm: function() {
		if(!TopoLink.flash) return;
		var nodes = TopoLink.scene.find("node");
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i].nodeData != undefined && nodes[i].nodeData != null && nodes[i].nodeData.alarmed == 1) {
				if(nodes[i].fontColor == "255,0,0")
					nodes[i].fontColor = "0,0,0";
				else
					nodes[i].fontColor = "255,0,0";
			}
		}

	},
	/**
	 * 从json数据中加载拓扑图
	 * @param {Object} data JSON数据
	 * @param {Object} parentNode 上级节点
	 */
	loadFromJSonObject: function(data, parentNode) {
//		console.log("load from jsonobject:"+JSON.stringify(data));
		if(data == undefined || data == null) return;
//		this.data = data;
		if(data.root != undefined)
			this.nodeData = data.root;
		if(data.background != undefined)
			TopoLink.setBackground(data.background);
//		console.log(data.nodes);
		for(var i = 0; data.nodes != undefined && i < data.nodes.length; i++) {
			var node = TopoLink.addNode(data.nodes[i].nodeData.nodeId, data.nodes[i].nodeData.nodeName, data.nodes[i].nodeData.nodeType, data.nodes[i].nodeData, parentNode);
			if(data.nodes[i].children != undefined)
				TopoLink.loadFromJSonObject(data.nodes[i].children, node);
		}
//		console.log("load complete");
	},
	/**
	 * 删除选中的节点
	 */
	removeSelectNode: function() {
		console.log("sfad");
		for(var i = 0; i < TopoLink.scene.selectedElements.length; i++) {
			var obj = TopoLink.scene.selectedElements[i];
			console.log("remove node:"+obj);
			try{
				deleteNode(obj);
			}catch(e){console.log(e);}
			TopoLink.scene.remove(obj);
			
		}
	},
	/**
	 * 删除节点
	 * @param {Object} node
	 */
	removeNode: function(node){
		if(node.elementType != "node")return;
		this.scene.remove(node);
	},
	removeElement: function(item){
		this.scene.remove(item);
	},
	/**
	 * 获取选中的组件数组
	 */
	getSelectedElements: function() {
		return TopoLink.scene.selectedElements;
	},
	canDelete: function(){
		var nodes = this.getSelectedElements();
		var res = true;
		nodes.forEach(function(value,index,arr){
			if(value.elementType == "node" && value.outLinks.length > 0){
				res = false;
				return;
			}
		});
		return res;
	},
	/**
	 * 获取节点数据
	 * @param {Object} node 节点
	 * @param {Object} item 返回的节点数据
	 */
	getNodeData: function(node,item) {
		item.nodeData = node.nodeData;
		item.text = node.nodeData.nodeName;
		item.nodeData.x = node.getLocation().x;
		item.nodeData.y = node.getLocation().y;
		
		item.hasChildMap = node.hasChildMap == undefined?0:node.hasChildMap;
		item.children = {nodes:[]};
		
		var inLinks = node.inLinks;
		inLinks.forEach(function(value,index,arr){
			item.nodeData.link={};
			item.nodeData.link.type = value.path.length==2?"link":"fold";
			item.nodeData.link.width = value.lineWidth;
			item.nodeData.link.color = value.strokeColor;
			item.nodeData.link.dash = value.dashedPattern;
			item.nodeData.link.arrow = value.arrowsRadius;
		});
		var links = node.outLinks;
		for(var l = 0; l < links.length; l++) {
			var itemChild={};
			item.children.nodes.push(TopoLink.getNodeData(links[l].nodeZ,itemChild));
		}
		return item;
	},
	/**
	 * TOPO图的JSON对象信息
	 */
	getTopoData: function() {
		var obj = {};
		obj.background = TopoLink.backImgUrl;
		obj.root = null;
		obj.nodes = [];
		obj.mapid = this.topoId;
		obj.parent = this.parentNodeId;
		var ns = this.stage.find("node");
		for(var i = 0; i < ns.length; i++) {
			var node = ns[i];
			if(node.inLinks.length >0)continue;
			var item = {};
			TopoLink.getNodeData(node,item);
			obj.nodes.push(item);
		}
		return obj;
	},
	/**
	 * 返回TOPO图的JSON字符串
	 */
	toJSonString: function() {
		return JSON.stringify(TopoLink.getTopoData());
	},
	/**
	 * 查找节点
	 * @param {Object} id 节点的数据编号
	 */
	findNode:function(id){
		var nodes =  this.scene.findElements(function(e){
			return e.elementType != 'link' && e.nodeData.nodeId == id;
		});
		var ns = this.stage.find("node");
		for(var i  = 0;i<ns.length; i++){
			ns[i].selected = false;
		}
		for(var i = 0; nodes != null && i < nodes.length; i++){
			nodes[i].selected = true;
		}
		return nodes;
	},
	/**
	 * 返回图中的所有节点
	 */
	getNodes:function(){
		return this.stage.find('node');
	},
	/**
	 * 删除连接线
	 * @param {Object} link
	 */
	removeLink:function(link){
		this.scene.remove(link);
	},
	getRoot:function(){
		var nodes = this.stage.find("node");
		var root = null;
		nodes.forEach(function(value,index,arr){
			if(value.inLinks==null||value.inLinks.length ==0){
				root = value;
				return;
			}
		});
		return root;
	},
	sColor2HexColor:function(c){
		var ss = c.split(",");
		var cc="#";
		ss.forEach(function(value,index,arr){
			var v = parseInt(value).toString(16);
			if(v.length < 2)
				v = "0"+v;
			cc += v;
		});
		return cc;
	},
	hexColor2SColor:function(c){
		console.log("c="+c);
		var s= "";
		var c1 = c.substring(1,3);
		s += parseInt(c1,16)+",";
		var c2 = c.substring(3,5);
		s += parseInt(c2,16)+",";
		var c3 = c.substring(5,7);
		s += parseInt(c3,16);
		return s;
	},
	selectAll:function(){
		var nodes = this.scene.find("node");
		nodes.forEach(function(value,index,arr){
			value.selected = true;
		});
	}
};