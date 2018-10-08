var num = 0, oUl = $("#min_title_list"), hide_nav = $("#Hui-tabNav");

var firstmeunurl = null;
var firstmenuid = null;
var firstmenuname = null;
var menuid=0;
var rendermenu = function(_menuid, info) {
	var htmlstr = "<li class=\"treeview"
			+ (firstmeunurl == null ? " active" : "")
			+ "\"><a href=\"#\">"
			+ (info["menu_icon"].indexOf("glyphicon") >= 0 ? "<i class=\""
					+ info["menu_icon"] + "\"></i>" : "<img src=\""
					+ info["menu_icon"]
					+ "\" width=\"20\" height=\"20\" alt=\""
					+ info["menu_name"] + "\">") + "<span>" + info["menu_name"]
			+ "</span><i class=\"fa fa-angle-left pull-right\"></i> </a> ";
	if (info.children != null) {
		htmlstr = htmlstr + "<ul class=\"treeview-menu\">";
		for (var i = 0; info.children != null && i < info.children.length; i++) {
			menuid++;
			if (firstmeunurl == null) {
				firstmeunurl = info.children[i].menu_url;
			}
			if (firstmenuid == null) {
				firstmenuid = "li_" + menuid;
				firstmenuname = info.children[i].menu_name;
			}
			htmlstr = htmlstr + "<li class=\"treeview\"><a _href='"
					+ info.children[i].menu_url
					+ "' href=\"javascript:void(0);\"  data-title='"
					+ info.children[i].menu_name + "' onclick=\"doclickurl('"
					+ info.children[i].menu_url + "','li_" + menuid + "','"
					+ info.children[i].menu_name + "');\"><i id=\"li_" + menuid
					+ "\" class=\"fa fa-star-o\"></i> "
					+ info.children[i].menu_name + "</a></li>";
		}
		htmlstr = htmlstr + "</ul>";
	}
	htmlstr = htmlstr + "</li>";
	return htmlstr;
};

function doclickurl(url, liid, t_title) {
	// 单击菜单
	$("body").removeClass("sidebar-collapse");
	if (curselectmenu != null) {
		curselectmenu.removeClass("fa fa-star").addClass("fa fa-star-o");
	}
	$("#" + liid).removeClass("fa fa-star-o").addClass("fa fa-star");
	curselectmenu = $("#" + liid);
	
	if(url.indexOf("newfullwindow:")==0){
		 
		window.open(url.substring("newfullwindow:".length),t_title,'width='+ (window.screen.availWidth)+',height='+(window.screen.availHeight)+ ',top=0,left=0,resizable=no,status=no,menubar=no,scrollbars=no,fullscreen=yes,location=no');
		return;
	}
		if(url.indexOf("newwindow:")==0){
		 
		window.open(url.substring("newwindow:".length),t_title);
		return;
	}
	creatIframe(url, liid, t_title);
}

function initlocalStorageparam() {
	doclickurl(firstmeunurl, firstmenuid, firstmenuname);
}
/*
$(function() {
	$(document).on(
			"click",
			"#min_title_list li",
			function() {
				var bStopIndex = $(this).index();
				var iframe_box = $("#iframe_box");
				$("#min_title_list li").removeClass("active").eq(bStopIndex)
						.addClass("active");
				iframe_box.find(".show_iframe").hide().eq(bStopIndex).show();
			});
	$(document).on("click", "#min_title_list li i", function() {
		var aCloseIndex = $(this).parents("li").index();
		$(this).parent().remove();
		$('#iframe_box').find('.show_iframe').eq(aCloseIndex).remove();
		num == 0 ? num = 0 : num--;

	});
	$(document).on("dblclick", "#min_title_list li", function() {
		var aCloseIndex = $(this).index();
		var iframe_box = $("#iframe_box");
		if (aCloseIndex >= 0) {
			var show_iframe = iframe_box.find('iframe');
			show_iframe[aCloseIndex].src = show_iframe[aCloseIndex].src;
		} else {
			return false;
		}
	});
});*/