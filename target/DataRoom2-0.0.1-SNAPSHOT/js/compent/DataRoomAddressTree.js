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
	   $this.css("display","flex").css("flex-direction","column").css("width","330px")
	   .css("overflow","auto");
	   if(opts.treeid==null){
	   if(opts.showTitle){
		   $this.append("<div   style='display: flex; justify-content: space-between; height: 40px; margin: 0px 20px;'><div data-v-4e8c78ef='' style='width: 150px; height: 40px; display: flex; align-items: center;'><div style='font-weight: initial; font-size: 14px;'>"+opts.title+"</div></div> <div style='width: 150px; height: 40px; display: flex; align-items: center; justify-content: flex-end;'></div></div><div  class='modify-divider'></div> ");
	   }
	   var treeid="tree"+Math.ceil(Math.random()*10000);
	   opts.treeid=treeid;
	   $this.append('<div id="'+treeid+'" style="margin:12px 20px 50px;overflow:auto;min-height:'+opts.minHeight+'"></div>');
       }	   
	   var  tree=$("#"+opts.treeid);
	  tree.tree({
		  cascadeCheck:opts.cascadeCheck, animate:opts.animate,lines:opts.lines,onClick:opts.onClick,onDblClick:opts.onDblClick,onSelect:opts.onSelect,onCheck:opts.onCheck,
         checkbox:opts.checkbox,data:opts.data
	 });
	  $(".tree-icon,.tree-file").removeClass("tree-icon tree-file");
	    $(".tree-icon,.tree-folder").removeClass("tree-icon tree-folder tree-folder-open tree-folder-closed");

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
		showTitle:true,minHeight:"30vh",cascadeCheck:false,
		title:'位置信息'
	};
	 return $;
})(jQuery);