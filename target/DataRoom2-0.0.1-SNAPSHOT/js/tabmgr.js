function setIframeHeight(iframe) {
    //设置IFrame高度
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
			
            iframe.height = $(window).height() - 64 - 31;
			iframe.style.minHeight=($(window).height() - 64 - 31)+"px";
        }
    }
};
/*创建iframe*/
function creatIframe(href, llid, titleName) {
   var topWindow = $(window.parent.document);
     //   show_nav = topWindow.find('#min_title_list'),
    var    iframe_box = document.getElementById('iframe_box');
    /*     iframeBox = iframe_box.find('.show_iframe'),
        $tabNav = topWindow.find(".acrossTab"),
        $tabNavWp = topWindow.find(".Hui-tabNav-wp"),
        $tabNavmore = topWindow.find(".Hui-tabNav-more");
    var taballwidth = 0;
    show_nav.find("span");
    var isload = false;
    var lilist = show_nav.find('li');
    if (lilist.length >= 10) {
        alert("打开的功能页面不能超过10个，请先关掉不用的功能页面！");
        return false;
    }
    for (var i = 0; i < lilist.length; i++) {
        if (lilist[i].dataset["id"] == llid) {
            isload = true;
            $(lilist[i]).trigger("click");
        }
    }

    if (isload) {
        return;
    }
    $("#min_title_list li").removeClass("active");
    show_nav.append('<li data-id="' + llid + '" class="active"><span data-href="' + href + '">' + titleName + '</span><i></i><em></em></li>');
    if ('function' == typeof $('#min_title_list li').contextmenu) {
        $("#min_title_list li").contextmenu('Huiadminmenu', {
            bindings: {
                'closethis': function(t) {
                    var $t = $(t);
                    if ($t.find("i")) {
                        $t.find("i").trigger("click");
                    }
                },
                'closeall': function(t) {
                    $("#min_title_list li i").trigger("click");
                },
            }
        });
    } else {

    }
    var $tabNavitem = topWindow.find(".acrossTab li");
    if (!$tabNav[0]) {
        return;
    }
    $tabNavitem.each(function(index, element) {
        taballwidth += Number(parseFloat($(this).width() + 60))
    });
    $tabNav.width(taballwidth + 25);
    var w = $tabNavWp.width();
    iframeBox.hide();*/
    iframe_box.src=href;
	setIframeHeight(iframe_box);
    /*
	var showBox = iframe_box.find('.show_iframe:visible');
    showBox.find('iframe').load(function() {
        //	showBox.find('.loading').hide();
    });
	*/
}

/*关闭iframe*/
function removeIframe() {
    var topWindow = $(window.parent.document),
        iframe = topWindow.find('#iframe_box .show_iframe'),
        tab = topWindow.find(".acrossTab li"),
        showTab = topWindow.find(".acrossTab li.active"),
        showBox = topWindow.find('.show_iframe:visible'),
        i = showTab.index();
    tab.eq(i - 1).addClass("active");
    tab.eq(i).remove();
    iframe.eq(i - 1).show();
    iframe.eq(i).remove();
}

/*关闭所有iframe*/
function removeIframeAll() {
    var topWindow = $(window.parent.document),
        iframe = topWindow.find('#iframe_box .show_iframe'),
        tab = topWindow.find(".acrossTab li");
    for (var i = 0; i < tab.length; i++) {
        if (tab.eq(i).find("i").length > 0) {
            tab.eq(i).remove();
            iframe.eq(i).remove();
        }
    }
}