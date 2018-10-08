
var onePageCount = 20;
Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
//判断ip地址的合法性
String.prototype.checkIP=function(){
	return checkIP(this);
}
//判断ip地址的合法性
function checkIP(value) {
    var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = value.match(exp);
    if (reg == null) {
        return false;
    } else {
        return true;
    }
}

function converttargetvaluemap(targetvalue, targetvaluemap) {
    if (targetvaluemap == null || targetvaluemap.length < 1) {
        return targetvalue;
    }
    try {
        var maparr = targetvaluemap.split(";");
        for (var i = 0; maparr != null && i < maparr.length; i++) {
            if (maparr[i].indexOf(targetvalue.replace(".00", "") + ",") == 0) {
                //如果能翻译
                return maparr[i].substr(maparr[i].indexOf(",") + 1);
            }
            if (maparr[i].indexOf("-") > 0) {
                //如果是范围翻译
                var startvalue = maparr[i].substr(0, maparr[i].indexOf("-", 1));
                var endvalue = maparr[i].substr(maparr[i].indexOf("-", 1) + 1, maparr[i].indexOf(",") - maparr[i].indexOf("-", 1) - 1);
                if (parseFloat(targetvalue) >= parseFloat(startvalue) && parseFloat(targetvalue) <= parseFloat(endvalue)) {
                    //如果能翻译
                    return maparr[i].substr(maparr[i].indexOf(",") + 1);
                }

            } else {
                if (maparr[i].indexOf(",", 1) > 0) {
                    var compvalue = maparr[i].substr(0, maparr[i].indexOf(",", 1));
                    if (parseFloat(targetvalue) == parseFloat(compvalue)) {
                        //如果能翻译
                        return maparr[i].substr(maparr[i].indexOf(",") + 1);
                    }
                } else {
                    return targetvalue;
                }
            }
        }
    } catch (e) {
        return targetvalue;
    }
}

var RobotComm = {
    mapdata: "",
	baseurl : "",
	include:function (path) {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.src = this.baseurl+path;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(a);
},
includecss:function (path) {
    var a = document.createElement("link");
    a.rel = "stylesheet";
    a.href = this.baseurl+path;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(a);
},
showDownLoadWindow: function(data) {
        var content = '<div  id="downloadwindow"  class="modal fade in" style="display: none;">' +
            '  <div class="modal-dialog">' +
            '     <div class="modal-content">' +
            '       <div class="modal-header">' +
            '           <button type="button" class="close"' +
            '             data-dismiss="modal" aria-hidden="true">' +
            '                &times;' +
            '          </button>' +
            '          <h4 class="modal-title" id="myOtherSerialModalLabel">' +
            '              文件下载' +
            '          </h4>' +
            '       </div>' +
            '      <div class="modal-body">' +
            '  <p>请点击“数据下载”链接进行数据下载,或者点击“复制地址”复制链接地址到其它下载工具完成下载</p> ' +
            '<p><a id="robotdownurl" href="' + data + '" target="_blank">数据下载</a> &nbsp;&nbsp; <a href="#" onclick="CopyToClipboard(\'Text\',\'' + data + '\')" target="_self">复制地址</a></p> ' +
            '</div>' +
            '       </div>' +
            '      </div>' +
            '      </div>' +
            '      </div>';
        $("body").append(content);
        $("#downloadwindow").modal();

        $("#downloadwindow").on("hide.bs.modal", function() {
            $("#downloadwindow").remove();
        });
    },
	showPopUpWindowId:1,
showPopUpWindow: function(url,title,param,callback) {
	//url 地址  title 标题 param 参数 callback 回调函数
	RobotComm.showPopUpWindowId++;
	var winid=RobotComm.showPopUpWindowId;
	var content_width="100%";
	var content_height="100%";
	var win_width="220px";
	var win_height="140px";
	if(param!=undefined&&param!=null&&param.width!=undefined&&param.width!=null){
	content_width=param.width+"px";
	win_width=(param.width+40)+"px";
	}
	if(param!=undefined&&param!=null&&param.height!=undefined&&param.height!=null){
	content_height=param.height+"px";
	win_height=(param.height+40)+"px";
	}
        var content = '<div  id="PopUpWindow'+winid+'"  class="modal fade in" style="display: none"  data-backdrop="static" data-keyboard="false">' +
            '  <div class="modal-dialog" style="width:'+win_width+';height:'+win_height+'">' +
            '     <div class="modal-content">' +
            '       <div class="modal-header">' +
            '           <button type="button" class="close"' +
            '             data-dismiss="modal" aria-hidden="true">' +
            '                &times;' +
            '          </button>' +
            '          <h4 class="modal-title" id="myOtherSerialModalLabel">' +
            title +
            '          </h4>' +
            '       </div>' +
            '      <div class="modal-body">' +
            ' <iframe id="iframe_PopUpWindow" style="width:'+content_width+';height:'+content_height+';min-height:100px;min-width:200px;overflow:auto" scrolling="auto" frameborder="0" src="'+RobotComm.baseurl+url+'"> </iframe> ' +
            '</div>' +
            '       </div>' +
            '      </div>' +
            '      </div>' +
            '      </div>';
        $("body").append(content);
		
        $("#PopUpWindow"+winid).modal();

        $("#PopUpWindow"+winid).on("hide.bs.modal", function() {
		 $("#iframe_PopUpWindow").remove();
            $("#PopUpWindow"+winid).remove();
        });
		var closecallpack=function(param){
			 $("#PopUpWindow"+winid).modal('hide');
			if(callback!=null){
				callback(param);
			}
		}
		$("#iframe_PopUpWindow").load(function() {
		try
		{
			this.contentWindow.setCallParam(param,closecallpack);
		}
		catch(err)
		{
  
		}
      
         });
    }	
}

function CopyToClipboard(type, textToClipboard) {
    var url = document.location.href;
    var lastindex = url.lastIndexOf("/");
    textToClipboard = url.substr(0, lastindex + 1) + textToClipboard;
    var success = true;
    if (window.clipboardData) { // Internet Explorer
        window.clipboardData.setData("Text", textToClipboard);
    } else {
        // create a temporary element for the execCommand method
        var forExecElement = CreateElementForExecCommand(textToClipboard);
        /* Select the contents of the element 
        (the execCommand for 'copy' method works on the selection) */
        SelectContent(forExecElement);
        var supported = true;
        // UniversalXPConnect privilege is required for clipboard access in Firefox
        try {
            if (window.netscape && netscape.security) {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            // Copy the selected content to the clipboard
            // Works in Firefox and in Safari before version 5
            success = document.execCommand("copy", false, null);
        } catch (e) {
            success = false;
        }
        // remove the temporary element
        document.body.removeChild(forExecElement);
    }
    if (success) {
        alert("复制到粘贴版成功!");
    } else {
        alert("浏览器不支持复制操作!");
    }
}

function CreateElementForExecCommand(textToClipboard) {
    var forExecElement = document.createElement("div");
    // place outside the visible area
    forExecElement.style.position = "absolute";
    forExecElement.style.left = "-10000px";
    forExecElement.style.top = "-10000px";
    // write the necessary text into the element and append to the document
    forExecElement.textContent = textToClipboard;
    document.body.appendChild(forExecElement);
    // the contentEditable mode is necessary for the execCommand method in Firefox
    forExecElement.contentEditable = true;
    return forExecElement;
}

function SelectContent(element) {
    // first create a range
    var rangeToSelect = document.createRange();
    rangeToSelect.selectNodeContents(element);
    // select the contents
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(rangeToSelect);
}

function mkRslt(arr) {
    var arrRslt = [""];
    for (var i = 0, len = arr.length; i < len; i++) {
        var str = arr[i];
        var strlen = str.length;
        if (strlen == 1) {
            for (var k = 0; k < arrRslt.length; k++) {
                arrRslt[k] += str;
            }
        } else {
            var tmpArr = arrRslt.slice(0);
            arrRslt = [];
            for (k = 0; k < strlen; k++) {
                //复制一个相同的arrRslt
                var tmp = tmpArr.slice(0);
                //把当前字符str[k]添加到每个元素末尾
                for (var j = 0; j < tmp.length; j++) {
                    tmp[j] += str.charAt(k);
                }
                //把复制并修改后的数组连接到arrRslt上
                arrRslt = arrRslt.concat(tmp);
            }
        }
    }
    return arrRslt;
}

//两端去空格函数
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 删除左边的空格
 */
String.prototype.ltrim = function() {    
    return this.replace(/(^\s*)/g, "");
}

/**
 * 删除右边的空格
 */
String.prototype.rtrim = function() {    
    return this.replace(/(\s*$)/g, "");
}

String.prototype.isFloat = function() {
    return /^(-?\d+)(\.\d+)?$/.test(this);
}
var util = {
    /**
     * 根据主题颜色修改图片颜色
     * @param  {[type]}   imgUrl    图片url
     * @param  {[type]}   rgb_color 主题颜色
     * @param  {Function} callback  返回值 返回base64
     * @return {[type]}             [description]
     */
    changeImageColor: function (imgUrl, rgb_color, canvas) {
        var threshold = 114; //默认颜色阀值 为 114 －>和默认图相关
         var img = new Image();
        img.src = imgUrl;
        //计算对应的通道值
        rgb_color = rgb_color || '#727272';
        var newR = parseInt('0x' + rgb_color.substr(1,2));
        var newG = parseInt('0x' + rgb_color.substr(3,2));
        var newB = parseInt('0x' + rgb_color.substr(5,2));
        //图片加载后进行处理
         img.onload = function () {
            var width = img.width, 
                height = img.height,
               // canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');
		
            canvas.width = width;
            canvas.height = height;
			ctx.fillStyle = 'rgba(255, 255, 255, 0)';
			canvas.style.verticalAlign="middle";
            // 将源图片复制到画布上
            ctx.drawImage(img, 0, 0, width, height);
            // 获取画布的像素信息
            var imageData = ctx.getImageData(0, 0, width, height);
            var data = imageData.data;
            // 对像素集合中的单个像素进行循环，每个像素是由4个通道组成，所以要注意
            var i = 0;
            while (i < data.length) {
                var r = data[i++],
                    g = data[i++],
                    b = data[i++],
                    a = data[i++];
                //计算透明度
                var alp = (255 - r) / (255 - threshold);
                //判断是否透明
                var isTransparent = (r == 255 && g == 255 && b == 255 && a == 255);
                if (isTransparent) { 
                    data[i - 1] = 0;
                } else {
                    data[i - 4] = newR;
                    data[i - 3] = newG;
                    data[i - 2] = newB;
                    data[i - 1] = (a !== 255) ? (255 - a) : (alp * 255); //处理透明的图片和不透明的图片
                }
            }
            // 将修改后的代码复制回画布中
            ctx.putImageData(imageData, 0, 0);
            // 图片导出为 png 格式
            var type = 'png';
            var imgData = canvas.toDataURL(type);
            // console.log(imgData); // 生成base64
           // srcdiv.append(canvas);
         };
    }
};
  
//使用方式 其中 data、style 为通过api读取的值
 
$(window).load(function() {
	var rbimg=$(".RobotImage");
	for(var i=0;i<rbimg.length;i++){
	util.changeImageColor(rbimg[i].dataset.src,'#FF0000',rbimg[i]);
	}
});