/*用于载入特效*/
function showLoading(over,layout)
{
	document.getElementById(over).style.display = "block";
	document.getElementById(layout).style.display = "block";
}

function disableLoading(over,layout)
{
	document.getElementById(over).style.display = "none";
	document.getElementById(layout).style.display = "none";
}

// indicator 类型定义
var valueType = new Array(
	['1', '整数'], 
	['2', '浮点数'],
	['3', '字符串指针'],
	['4', '其它数据指针'],
	['5', '告警']
	);

// serial 串口类型定义
var serialType = new Array(
	['1', 'serial'], 
	['2', 'rj45'],
	['3', 'di'],
	['4', 'do']	,
	['5', 'ai']
	);

function AddArrayHTML(lstItems, value, id){
	var descAndItem = lstItems.split("@");
	var desc = descAndItem[0].split("$");
	var all = desc[2];
	var items = descAndItem[1].split("|");
	for(var idy = 0; idy < count; idy++){ 
		var one = items[idy].split("$");
	}
	var idx = 1;
	var part1 = "<option value=";
	var part2 = ">";
	var part3 = "</option>";
	var part4 = "<option selected='selected' value =";
	var rv = ('<select class="form-control select2" style="width: 100%;"  id = "' + id + '">');
	var match = 0;
	for (idx = 0; idx < lstItems.length; idx++){
		if(lstItems[idx][0] == value){
			rv += part4 + lstItems[idx][0] + part2 + lstItems[idx][1] + part3;
			match = 1;
		}else{
			rv += part1 + lstItems[idx][0] + part2 + lstItems[idx][1] + part3;
		}
	}
	if(match == 0){
		rv += part4 + value + part2 + "未定义:" + value + part3;
	}
	rv += "</select>";
	return rv;
}

function GetMultipleArrayHTML2(lstItems, value, id){
	var data=new Array;
	var idx = 0;
	var idy = 0;
	var part1 = "<option value=";
	var part2 = ">";
	var part3 = "</option>";
	var part4 = "<option selected='selected' value =";
	var rv = ('<select  class="form-control select2" multiple="multiple"    id = "' + id + '">');
	var match = 0;
	for (idx = 0; idx < lstItems.length; idx++){
		data=value.split(",");
			for (idy = 0; idy < data.length; idy++){
				if(lstItems[idx][0] == data[idy]){
					rv += part4 + lstItems[idx][0]+part2 + lstItems[idx][1] + part3;
					match = 1;
				}
			}
			rv += part1 + lstItems[idx][0] + part2 + lstItems[idx][1] + part3;

	}
	if(match == 0){
		rv += part4 + value + part2 + "未定义:" + value + part3;
	}
	rv += "</select>";
	return rv;
}
