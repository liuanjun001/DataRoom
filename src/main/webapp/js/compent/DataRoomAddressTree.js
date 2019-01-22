(function ($){
	$.fn.addresstree=function(options,param1){
		if(options=="selectRoot"){
			selectRoot($(this));
			return;
		}else if(options=="checkRoot"){
			checkRoot($(this));
			return;
		}else if(options=="getSelected"){
			return getSelected($(this));
		}else if(options=="getChecked"){
			return  getChecked(param1,$(this));
		}
	 
		 var opts1 = $.extend({},$.fn.addresstree.defaults,$(this).data(), $(this).data("opts"), options) ;
		$(this).data("opts",opts1);
		 return this.each(function() {     
      var $this = $(this);     
      var opts =    $this.data("opts")  ; 
	   $this.css("display","flex").css("flex-direction","column").css("width",opts.width)
	   .css("overflow","auto");
	   if(opts.treeid==null){
	   if(opts.showTitle){
		   $this.append("<div   style='display: flex; justify-content: space-between; height: 40px; '><div data-v-4e8c78ef='' style='width: 150px; height: 40px; display: flex; align-items: center;'><div class='addresstreetitle'>"+opts.title+"</div></div> <div style='width: 150px; height: 40px; display: flex; align-items: center; justify-content: flex-end;'></div></div><div  class='modify-divider' style='margin:0px'></div> ");
	   }
	   var treeid="tree"+Math.ceil(Math.random()*10000);
	   opts.treeid=treeid;
	   $this.append('<div id="'+treeid+'" style="margin:12px 0px 50px 0px;overflow:auto;height: calc(100% - 62px);min-height:'+opts.minHeight+'"></div>');
       }	   
	   var  tree=$("#"+opts.treeid);
	  tree.tree({
		  cascadeCheck:opts.cascadeCheck, animate:opts.animate,lines:opts.lines,onClick:opts.onClick,onDblClick:opts.onDblClick,onSelect:function(node){
			  var checkedNode = tree.tree('getChecked');
              if (!opts.muiltselect&&checkedNode != null && checkedNode.length > 0) {
                  $.each(checkedNode, function (index, value) {
                	  tree.tree('uncheck', value.target);
                  })
              }
              if (node.checked) {
            	  tree.tree('uncheck', node.target);
              }
              else {
            	  tree.tree('check', node.target);
              }
              if(opts.onSelect!=null&&node.checkState=='checked'){
            	//  opts.onSelect(node) ;   
              }
			 
		  }
			  ,onCheck:function(node, checked){
				  var checkedNode = tree.tree('getChecked');
	              if (!opts.muiltselect&&checkedNode != null && checkedNode.length > 1) {
	                  $.each(checkedNode, function (index, value) {
	                	  if(value.target!=node.target){
	                		  tree.tree('uncheck', value.target);
	                	  }
	                	  
	                  })
	              }
	             /* if (node.checked) {
	            	  tree.tree('uncheck', node.target);
	              }
	              else {
	            	  tree.tree('check', node.target);
	              }*/
	              if( opts.onCheck!=null){
				  opts.onCheck(node, checked);
				  }
	              if(!opts.muiltselect&&opts.onSelect!=null&&node.checkState=='checked'){
	            	  opts.onSelect(node) ;
	            	}
			  } ,
         checkbox:opts.checkbox,data:opts.data, onLoadSuccess: function (node, data) {
 
             //取消checkbox的默认行为
            /* $(this).find('span.tree-checkbox0').unbind().click(function () {
                 return false;
             });
             $(this).find('span.tree-checkbox1').unbind().click(function () {
                 return false;
             });*/
         }
	 });
	  $(".tree-icon,.tree-file").removeClass("tree-icon tree-file");
	    $(".tree-icon,.tree-folder").removeClass("tree-icon tree-folder tree-folder-open tree-folder-closed");
	    //$(".tree-expanded:first").css("display","none");
	   if(!opts.muiltselect){ $(".tree-checkbox,.tree-checkbox1").unbind("click");}
	 $this.data("opts",opts)  ;
		if(opts.data==null){
			getAddressList( $this);
		}
    });     
  };     
	function getAddressList(callobj){
	DataRoomService.callDataRoomService("ResourceService","QueryAddressTree",{},  refreshAddressListtree,callobj,true);
}
function refreshAddressListtree(data,callobj){
	 $(callobj).addresstree({"data":data});
 
selectRoot(callobj);
if($(callobj).data("opts").checkroot){
checkRoot(callobj);
}
} 
function selectRoot(callobj){
		if(callobj==null){
		callobj=$(this);
	}
  var  tree=$("#"+callobj.data("opts").treeid) ;
  var rootnode=tree.tree("getRoot");
	tree.tree("select",rootnode.target);
	tree.tree("collapseAll");
	tree.tree("expand",rootnode.target);
};
 

function checkRoot(callobj){
	if(callobj==null){
		callobj=$(this);
	}
  var  tree=$("#"+callobj.data("opts").treeid) ;
  var rootnode=tree.tree("getRoot");
	tree.tree("check",rootnode.target);
};
function getSelected(callobj){
	if(callobj==null){
		callobj=$(this);
	}
  var  tree=$("#"+callobj.data("opts").treeid) ;
 	return tree.tree("getSelected");
};
function getChecked(param,callobj){
  var  tree=$("#"+callobj.data("opts").treeid) ;
  if(param!=null){
	 return tree.tree("getChecked",param); 
  }
 	return tree.tree("getChecked");
};
	$.fn.addresstree.defaults={
		tree:null,checkbox:false,animate:true,lines:false,
		showTitle:true,minHeight:"30vh",cascadeCheck:false,muiltselect:false,width:"330px",
		title:'位置信息'
	};
	 return $;
})(jQuery);