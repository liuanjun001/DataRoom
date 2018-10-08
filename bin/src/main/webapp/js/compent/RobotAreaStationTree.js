RobotComm.includecss("./css/RobotAreaStationTree.css");
var RobotAreaStationTree={
	id:1,
	stationtree:{},
	servicename:'robotservice',
	stationtreedata:null,
	listenObjs:new Array(),
	showcheckbox:false,
	init:function(content){
		var str='<table width="100%"  valign="top" height="100%" style="overflow:hidden;"><tr valign="top" height="30px"><td><table border="0" cellpadding="0px" cellspacing="0px"><tr><td><input type="text" width="150px" class="form-control" id="i_filterstationtree'+this.id+'"></input></td><td> <span class="input-group-btn"><button class="btn btn-primary btn-sm" id="btn_filterstationtree'+this.id+'"><i class="glyphicon glyphicon-search"></i></button></span></td></tr></table></td></tr><tr valign="top"><td><div style="overflow:hidden;width:100%;top:0px;bottom:0px"><ul id="stationtree'+this.id+'"  ></ul></div></td></tr></table>';
	content.append(str);
	this.stationtree=$("#stationtree"+this.id);
	  this.stationtree.tree({
          checkbox:this.showcheckbox,
          onClick:function(node){
          	for (var i = 0; i < RobotAreaStationTree.listenObjs.length; i++) {
          		var father = $(this).tree("getParent",node.target);
          		  if(father!=null){
          		  	try{
                        var haschild=!(node.children==null||node.children.length==0);
          		  	  RobotAreaStationTree.listenObjs[i].refreshstation(node.node_id,node.node_name,father.node_id,father.node_name,haschild);	
          		  	}catch(e){
          		  		console.log(e);
          		  	}
        
          }else    {
          	try{
           RobotAreaStationTree.listenObjs[i].refresharea(node.node_id,node.node_name);
           }catch(e){
          		  		console.log(e);
          		  	}
          }
          	}
        
          
          }
       
        });
        this.refreshStation ();
        $("#i_filterstationtree"+this.id).keydown({callobj:this},function(e){
if(e.keyCode==13){
  e.data.callobj.searchstation(e);
}
}); 
        $("#btn_filterstationtree"+this.id).click({callobj:this},this.searchstation);
	},
	searchstation:function(e){

		e.data.callobj.stationtree.tree("search", $("#i_filterstationtree"+e.data.callobj.id).val());	 
	},
	refreshStation:	function (){
        		robotservice.callrobotservice("commService","getAreaStationTreeByServiceNameNew",{account:robotservice.robotusername,userid:robotservice.robotuserid,serviceName:this.servicename,type:5}, this.refreshStationtree,this,true);
        },
        refreshStationtree:	function (data,callobj){
        	callobj.copytree(data);
        	if(data.length>1){
        		var rootdata=[{text:"",children:data,node_id:"-1",node_type:"a",node_name:"全部"}];
        			callobj.stationtreedata=rootdata ;
        	callobj.stationtree.tree({"data":callobj.stationtreedata});
        	}else{
        		callobj.stationtreedata=data;
        	callobj.stationtree.tree({"data":callobj.stationtreedata});	
        	}
        localStorage.setItem("stationtreedata",JSON.stringify(callobj.stationtreedata));
        	
      //  	callobj.refreshStationStatu(callobj);
    //var refreshStationStatuid=window.setInterval(callobj._refreshStationStatu(callobj),60000); 
        },
        copytree:	function (data){
        	for(var i=0;data!=null&&i<data.length;i++){
        	data[i].text=data[i].node_name+(data[i].node_num>0?"("+data[i].node_num+")":"");
        	data[i].iconCls="icon-"+data[i].node_type+"normal";
        	if(data[i].node_num==0){
        	data[i].iconCls="icon-"+data[i].node_type+"normal";
        		if(data[i].icon_url=="0"){
        	data[i].iconCls="icon-"+data[i].node_type+"disable";
        	} else	if(data[i].icon_url=="2"){
        	data[i].iconCls="icon-"+data[i].node_type+"down";
        	} else{
        	data[i].iconCls="icon-"+data[i].node_type+"normal";	
        	}
        	} 
       
        	data[i].children=data[i].tempChildren;

        	    this.copytree(data[i].children);
        	    if(data[i].children!=null&&data.length>1){
                data[i].state="closed";
        	    }
        	  }
        },
        _refreshStationStatu:function(callobj){
        	return function(){ 
callobj.refreshStationStatu(callobj); 
} 
        },
        refreshStationStatu:	function (callobj){
         
       robotservice.callrobotservice("irobotcommService","getStationStatus",{ userid:robotservice.robotuserid}, callobj.refreshStationtreestatu,callobj,false);
	
        },
        	refreshStationtreestatu:function (data,callobj){
        		 
        		if(data!=null){
        			var nodes  =callobj.stationtree.tree('getChildren');
        			for(var i=0;i<nodes.length;i++){
        			if(nodes[i].node_type=="s"){
        			for(var k in data){
        			if(data[k].node_id==nodes[i].node_id){
        			 var icons = $(nodes[i].target).find("span.tree-icon");
            if (icons) {
                if (data[k].onlinestate=="0") {
                    $(icons[0]).addClass("icon-"+nodes[i].node_type+"down");
                    $(icons[0]).removeClass("icon-"+nodes[i].node_type+"normal");
                }
                else {
                    $(icons[0]).addClass("icon-"+nodes[i].node_type+"-normal");
                    $(icons[0]).removeClass("icon-"+nodes[i].node_type+"down");
                }
            }
        			break;	
        			}
        			 
        			}
        			  }
        			}
        			
        			 
        		}
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