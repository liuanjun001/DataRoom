var RobotStation={
	id:"",
	areaid:"-1",
	allowmuiltselected:true,
	robotdata:null,
	selectstationid:null,
	stationtype:"-1",
	_val:null,
	getHtml:function(item){
		var ret="<select   "+ (this.allowmuiltselected?"multiple='multiple'":"") +"  style='width:"+(item!=null&&item.width!=null?(item.width+"px"):"100px")+"' id='cb_station"+this.id+"'></select >";
		return ret;
	},
	val:function(){
		if(this._val!=null){
			return this._val;
		}
		var cb_station=$("#cb_station"+this.id);
		var ret={stationids:'-1',stationnames:'全部'};
		if(cb_station!=null&&cb_station.combotree("getValues")!=null){
			ret.stationids=cb_station.combotree("getValues").toString();
			if(ret.stationids==""){
			ret.stationids="-1";	
			}else{
			ret.stationnames=cb_station.combotree("getText");
	    	}
			}
		return ret;
	},
	refresh:function(areaid){
//		$("#cb_station"+this.id).multiselect({header:true,minWidth:50,  checkAllText: '全选',
//    uncheckAllText: '清除',
//     includeSelectAllOption: true,
//     selectAllText: true,
//       enableFiltering: true,
//       enableCaseInsensitiveFiltering: true,
//       filterPlaceholder: 'Search',
//    noneSelectedText: '请选择',menuWidth:200,selectedText:'选中#个'}).multiselectfilter();
 
var cb_station=$("#cb_station"+this.id);
	cb_station.combotree({panelWidth:'200px',multiple:this.allowmuiltselected,editable:true}) ;
			 var tree=cb_station.combotree("tree");
			tree.tree({checkbox:this.allowmuiltselected});
	//	cb_station.options.checkAllText="全选";
		if(this._val!=null){
			cb_station.combotree({ disabled: true });  
		cb_station.combotree("setText",this._val.stationname);
		return;
	}
		$(".textbox-text").bind("input propertychange", function() {
var tree=$(cb_station).combotree('tree');

tree.tree("search",$(this).val());

if($(this).val()==""||null==$(this).val()){

cb_station.combotree('tree').tree("collapseAll");

}

});

	if(areaid!=null){
	this.areaid=areaid;	
	}
		
		//刷新数据
		if(localStorage.getItem("stationdatauserid")==null||localStorage.getItem("stationdatauserid")!=robotservice.robotuserid||localStorage.getItem("stationdata")==null||localStorage.getItem("stationdatatime")==null||((new Date()).getTime()-localStorage.getItem("stationdatatime")>8640000)){
			
			var server=robotservice;
			server.callrobotservice("commService","QueryStation",{"areaId":"-1"},this.result,this);
		}else{
		RobotStation.robotdata=JSON.parse(localStorage.getItem("stationdata"));	
		}
		if( this.robotdata!=null){
			this.selectstationid="";
		this.showit(this.robotdata);	
		}else{
			 	 cb_station.combotree("tree").tree({data:[]});
		}
	},
	result:function(data,callobj){
		localStorage.setItem("stationdatauserid",robotservice.robotuserid);
		localStorage.setItem("stationdata",JSON.stringify(data));
		localStorage.setItem("stationdatatime",(new Date()).getTime());
		RobotStation.robotdata=data;
		callobj.refresh(callobj.areaid);
	},
	showit:function(data){
		//展示数据
		var cb_station=$("#cb_station"+this.id);
	//	console.log(data);
	//	cb_station.empty();
 var datalist=new Array();
		for(var i=0;i<data.length;i++){
			var item=data[i];
		if(((","+this.areaid+",").indexOf( ","+item.areaid+",")>=0&& ( (","+this.stationtype+",").indexOf( ","+item.stationtype+",")>=0||this.stationtype=="-1"))||(((","+this.areaid+",").indexOf( ","+item.areaid+",")>=0||this.areaid=="-1")&&  (","+this.stationtype+",").indexOf( ","+item.stationtype+",")>=0 )||(this.areaid=="-1"&&this.stationtype=="-1")){
	 datalist[datalist.length]={"id":item.stationid,"text":item.stationname,"checked":this.selectstationid!=null&&(this.selectstationid+",").indexOf(item.stationid+",")>=0?true:false};
		}
			}
	 	 cb_station.combotree("tree").tree({data:datalist});
	}
};


/**
 * 1）扩展jquery easyui tree的节点检索方法。使用方法如下：
 * $("#treeId").tree("search", searchText);	 
 * 其中，treeId为easyui tree的根UL元素的ID，searchText为检索的文本。
 * 如果searchText为空或""，将恢复展示所有节点为正常状态
 */
(function($) {	
	
	$.extend($.fn.tree.methods, {
		/**
		 * 扩展easyui tree的搜索方法
		 * @param tree easyui tree的根DOM节点(UL节点)的jQuery对象
		 * @param searchText 检索的文本
		 * @param this-context easyui tree的tree对象
		 */
		search: function(jqTree, searchText) {
			//easyui tree的tree对象。可以通过tree.methodName(jqTree)方式调用easyui tree的方法
			var tree = this;
			
			//获取所有的树节点
			var nodeList = getAllNodes(jqTree, tree);
			
	  		//如果没有搜索条件，则展示所有树节点
			searchText = $.trim(searchText);
	  		if (searchText == "") {
	  			for (var i=0; i<nodeList.length; i++) {
	  				$(".tree-node-targeted", nodeList[i].target).removeClass("tree-node-targeted");
	  	  			$(nodeList[i].target).show();
	  	  		}
	  			//展开已选择的节点（如果之前选择了）
	  			var selectedNode = tree.getSelected(jqTree);
	  			if (selectedNode) {
	  				tree.expandTo(jqTree, selectedNode.target);
	  			}
	  			return;
	  		}
	  		
	  		//搜索匹配的节点并高亮显示
	  		var matchedNodeList = [];
	  		var cnsearchText=makePy(searchText)[0].toUpperCase();
	  		if (nodeList && nodeList.length>0) {
	  			var node = null;
	  			for (var i=0; i<nodeList.length; i++) {
	  				node = nodeList[i];
	  				
	  				var cnnodeText=makePy(node.text)[0].toUpperCase();
	  				if (isMatch(searchText, node.text)||isMatch(cnsearchText,cnnodeText)) {
	  					matchedNodeList.push(node);
	  				}
	  			}
	  			
	  			//隐藏所有节点
	  	  		for (var i=0; i<nodeList.length; i++) {
	  	  			$(".tree-node-targeted", nodeList[i].target).removeClass("tree-node-targeted");
	  	  			$(nodeList[i].target).hide();
	  	  		}  			
	  			
	  			//折叠所有节点
	  	  		tree.collapseAll(jqTree);
	  			
	  			//展示所有匹配的节点以及父节点  			
	  			for (var i=0; i<matchedNodeList.length; i++) {
	  				showMatchedNode(jqTree, tree, matchedNodeList[i]);
	  			}
	  		} 	 
		},
		
		/**
		 * 展示节点的子节点（子节点有可能在搜索的过程中被隐藏了）
		 * @param node easyui tree节点
		 */
		showChildren: function(jqTree, node) {
			//easyui tree的tree对象。可以通过tree.methodName(jqTree)方式调用easyui tree的方法
			var tree = this;
			
			//展示子节点
			if (!tree.isLeaf(jqTree, node.target)) {
				var children = tree.getChildren(jqTree, node.target);
				if (children && children.length>0) {
					for (var i=0; i<children.length; i++) {
						if ($(children[i].target).is(":hidden")) {
							$(children[i].target).show();
						}
					}
				}
			}  	
		},
		
		/**
		 * 将滚动条滚动到指定的节点位置，使该节点可见（如果有滚动条才滚动，没有滚动条就不滚动）
		 * @param param {
		 * 	  treeContainer: easyui tree的容器（即存在滚动条的树容器）。如果为null，则取easyui tree的根UL节点的父节点。
		 *    targetNode:  将要滚动到的easyui tree节点。如果targetNode为空，则默认滚动到当前已选中的节点，如果没有选中的节点，则不滚动
		 * } 
		 */
		scrollTo: function(jqTree, param) {
			//easyui tree的tree对象。可以通过tree.methodName(jqTree)方式调用easyui tree的方法
			var tree = this;
			
			//如果node为空，则获取当前选中的node
			var targetNode = param && param.targetNode ? param.targetNode : tree.getSelected(jqTree);
			
			if (targetNode != null) {
				//判断节点是否在可视区域				
				var root = tree.getRoot(jqTree);
				var $targetNode = $(targetNode.target);
				var container = param && param.treeContainer ? param.treeContainer : jqTree.parent();
				var containerH = container.height();
				var nodeOffsetHeight = $targetNode.offset().top - container.offset().top;
				if (nodeOffsetHeight > (containerH - 30)) {
					var scrollHeight = container.scrollTop() + nodeOffsetHeight - containerH + 30;
					container.scrollTop(scrollHeight);
				}							
			}
		}
	});
	
	
	
	
	/**
	 * 展示搜索匹配的节点
	 */
	function showMatchedNode(jqTree, tree, node) {
  		//展示所有父节点
  		$(node.target).show();
  		$(".tree-title", node.target).addClass("tree-node-targeted");
  		var pNode = node;
  		while ((pNode = tree.getParent(jqTree, pNode.target))) {
  			$(pNode.target).show();  			
  		}
  		//展开到该节点
  		tree.expandTo(jqTree, node.target);
  		//如果是非叶子节点，需折叠该节点的所有子节点
  		if (!tree.isLeaf(jqTree, node.target)) {
  			tree.collapse(jqTree, node.target);
  		}
  	}  	 
	
	/**
	 * 判断searchText是否与targetText匹配
	 * @param searchText 检索的文本
	 * @param targetText 目标文本
	 * @return true-检索的文本与目标文本匹配；否则为false.
	 */
	function isMatch(searchText, targetText) {
  		return $.trim(targetText)!="" && targetText.indexOf(searchText)!=-1;
  	}
	
	/**
	 * 获取easyui tree的所有node节点
	 */
	function getAllNodes(jqTree, tree) {
		var allNodeList = jqTree.data("allNodeList");
		if (!allNodeList) {
			var roots = tree.getRoots(jqTree);
  			allNodeList = getChildNodeList(jqTree, tree, roots);
  			jqTree.data("allNodeList", allNodeList);
		}
  		return allNodeList;
  	}
  	
	/**
	 * 定义获取easyui tree的子节点的递归算法
	 */
  	function getChildNodeList(jqTree, tree, nodes) {
  		var childNodeList = [];
  		if (nodes && nodes.length>0) {  			
  			var node = null;
  			for (var i=0; i<nodes.length; i++) {
  				node = nodes[i];
  				childNodeList.push(node);
  				if (!tree.isLeaf(jqTree, node.target)) {
  					var children = tree.getChildren(jqTree, node.target);
  					childNodeList = childNodeList.concat(getChildNodeList(jqTree, tree, children));
  				}
  			}
  		}
  		return childNodeList;
  	}

})(jQuery);