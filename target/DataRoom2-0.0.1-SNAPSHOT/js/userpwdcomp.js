var fchangepassword = function () {
	    var htmlstr = '<div  id="ChangePasswordDiv"    class="modal fade in" style="display: none;">' +
        '  <div class="modal-dialog">' +
        '     <div class="modal-content">' +
        '       <div class="modal-header">' +
        '           <button type="button" class="close"' +
        '             data-dismiss="modal" aria-hidden="true">' +
        '                &times;' +
        '          </button>' +
        '          <h4 class="modal-title" id="myOtherSerialModalLabel">' +
        '修改密码' +
        '          </h4>' +
        '       </div>' +
        '      <div class="modal-body">' +
        '	<div class="container" style="width:100%"   ><!---->' +
        '<form id="editDeviceDivForm" class="form-horizontal" >' +
        '<div class="item form-group">' +
        '<label class="control-label col-md-4 col-sm-4 col-xs-4">原始密码</label>' +
        '<div class="col-md-5 col-sm-5 col-xs-5">' +
        '<input id="i_oldpassword" type="password"    class="form-control col-md-7 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div class="item form-group">' +
        '<label class="control-label col-md-4 col-sm-4 col-xs-4">新密码</label>' +
        '<div class="col-md-5 col-sm-5 col-xs-5">' +
        '<input id="i_newpassword" type="password"    class="form-control col-md-7 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div class="item form-group">' +
        '<label class="control-label col-md-4 col-sm-4 col-xs-4">确认密码</label>' +
        '<div class="col-md-5 col-sm-5 col-xs-5">' +
        '<input id="i_confirmpassword" type="password"    class="form-control col-md-7 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<div class="col-sm-offset-5 col-sm-10">' +
        '	<button class="btn btn-primary" onclick=" $(\'#ChangePasswordDiv\').modal(\'hide\');"><i class="glyphicon glyphicon-remove-sign"></i>取消</button>&nbsp;&nbsp;' +
        '<button class="btn btn-primary" onclick="FSavePassword();"><i class="glyphicon glyphicon-floppy-disk"></i>保存</button>' +
        '</div>' +
        '</div>' +
        '</form>' +
        '<!----></div>' +
        '       </div>' +
        '      </div>' +
        '      </div>' +
        '      </div>';
    $("body").append(htmlstr);
    $("#ChangePasswordDiv").modal().css({
        width: "auto",
        height: "auto",
        'margin-left': function() {
            return ($(document).width() - $(this).width()) / 2;
        }
    });
    $("#ChangePasswordDiv").on("hide.bs.modal", function() {
        $("#ChangePasswordDiv").remove();
    });
};

var FSavePassword = function () {
    var _oldPassword = $("#i_oldpassword").val();
    var _newPassword = $("#i_newpassword").val();
    var _confirmpassword = $("#i_confirmpassword").val();
    if (_newPassword != _confirmpassword) {
        alert("新密码和确认密码不一致！");
        $("#i_confirmpassword").focus();
        return;
    }
    if (_oldPassword == "") {
        alert("请输入旧密码！");
        $("#i_oldpassword").focus();
        return;
    }
    if (_newPassword == "") {
        alert("新密码不能为空！");
        $("#i_newpassword").focus();
        return;
    }
    if (_newPassword.length < 6) {
        alert("新密码至少要6位！");
        $("#i_newpassword").focus();
        return;
    }
    robotservice.callrobotservice("IrobotloginService", "modPassword", {
        "user_id": robotservice.robotuserid,
        "oldPassword": _oldPassword,
        "newPassword": _newPassword
    }, savepasswordresult, this);
};

var savepasswordresult = function (data, callobj) {
    if (data.result == 1) {
        $('#ChangePasswordDiv').modal('hide');
        alert("修改密码成功！");
    } else if (data.result == -1) {
        alert("原始密码错误！");
    } else if (data.result == -2) {
        alert("请重新登录！");
    } else {
        alert("修改密码失败！");
    }
};