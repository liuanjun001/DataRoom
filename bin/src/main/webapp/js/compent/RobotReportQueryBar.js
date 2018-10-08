
var RobotReportQueryBar={
	id:"",
	robotdata:{},
	defdata:{},
	viewObject:{},
		container:{},
		robotstation:null,
		robotarea:null,
		robotstationtype:null,
		robotdatetime:null,
		robotwarnlevel:null,
		robotwarninfo:null,
		robotdevicecompany:null,
		robotdeviceinfo:null,
			robotdevicetype:null,
			robotwarntype:null,
		getHtml:function (item){
			this.defdata=item;
			var s_td="";
			if(item.hasOwnProperty("showtime")&&item.showtime=="true"){
				//如果有时间范围选择
				this.robotdatetime=Object.create(RobotTimeRang);
				this.robotdatetime.id=this.id;
				s_td+="<td>"+this.robotdatetime.getHtml()+"</td>";
			}
	if(item.hasOwnProperty("showarea")&&item.showarea=="true"){
			//如果有区域选项
  this.robotarea=Object.create(RobotArea);
	   this.robotarea.id=this.id;
		s_td+="<td>&nbsp;区域:"+this.robotarea.getHtml()+"</td>";
		}
		if(item.hasOwnProperty("showstationtype")&&item.showstationtype=="true"){
			//如果有区域选项
  this.robotstationtype=Object.create(RobotStationType);
	   this.robotstationtype.id=this.id;
		s_td+="<td>&nbsp;局站类型:"+this.robotstationtype.getHtml()+"</td>";
		}
	if(item.hasOwnProperty("showstation")&&item.showstation=="true"){
		//如果有局站选项
		 this.robotstation=Object.create(RobotStation);
		  this.robotstation.id=this.id;
		this.robotstation.allowmuiltselected=true;
		s_td+="<td>&nbsp;局站:"+this.robotstation.getHtml()+"</td>";
	}
	if(item.showwarnlevel=="true"){
		this.robotwarnlevel=RobotWarnLevel;
		this.robotwarnlevel.id=this.id;
		s_td+="<td>&nbsp;告警级别:"+this.robotwarnlevel.getHtml()+"</td>"
	}
	if(item.showwarnlogictype=="true"){
		this.robotwarntype=Object.create(RobotWarnType);
		this.robotwarntype.id=this.id;
			s_td+="<td>&nbsp;告警逻辑分类:"+this.robotwarntype.getHtml()+"</td>";
	}
		if(item.showwarntype=="true"){
		this.robotwarninfo=Object.create(RobotWarnInfo);
		this.robotwarninfo.id=this.id;
		s_td+="<td>"+this.robotwarninfo.getHtml()+"</td>";
	}
	if(item.showdevicecompany=="true"){
		this.robotdevicecompany=Object.create(RobotDeviceCompany);
		this.robotdevicecompany.id=this.id;
		s_td+="<td>&nbsp;设备厂家:"+this.robotdevicecompany.getHtml()+"</td>";
	}
	if(item.showdevicetype=="true"){
		this.robotdevicetype=Object.create(RobotDeviceType);
		this.robotdevicetype.id=this.id;
		s_td+="<td>&nbsp;设备类型:"+this.robotdevicetype.getHtml()+"</td>";
	}
		if(item.showdeviceinfo=="true"){
		this.robotdeviceinfo=RobotDeviceInfo;
		this.robotdeviceinfo.id=this.id;
		s_td+="<td>&nbsp;设备:"+this.robotdeviceinfo.getHtml()+"</td>";
	}
		if(item.hasOwnProperty("showsearchbutton")&&item.showsearchbutton=="true"){
			//如果有统计按扭
			s_td+="<td>&nbsp;<button class='btn btn-primary btn-sm' onclick='FReportQuery();'><i class='glyphicon glyphicon-search'></i>统计</button></td>";
		}
		if(item.hasOwnProperty("showexportbutton")&&item.showsearchbutton=="true"){
			//如果有导出按扭
			s_td+="<td>&nbsp;<button class='btn btn-primary btn-sm' onclick='FReportExport();'><i class='glyphicon glyphicon-export'></i>导出</button></td>";
		}
				itemstr="<div style='position: absolute;margin-left:"+(item.hasOwnProperty("left")?item.left:item.x)+"px;margin-top:"+(item.hasOwnProperty("top")?item.top:item.y)+"px"+(item.hasOwnProperty("right")?";margin-right:"+item.right+"px":"")+(item.hasOwnProperty("bottom")?";margin-bottom:"+item.bottom+"px":"")+(item.hasOwnProperty("width")&&!item.hasOwnProperty("right")?";width:"+item.width+(item.width.indexOf("%")>0?"%":"px"):"")+(item.hasOwnProperty("height")&&!item.hasOwnProperty("bottom")?";height:"+item.height+(item.height.indexOf("%")>0?"%":"px"):"")+"'><table  border='0' cellpadding='8' cellspacing='10'>"+
                   " <tr>"+ 
                       s_td+
                     "</tr>"+  
                  "</table></div>";
                  return itemstr;
		},
		initWigetData:function(){
			//初始化组件
			var custom={};
			if(this.defdata.custom!=null){
			custom=JSON.parse(this.defdata.custom);
			}
			
			if(this.robotdatetime!=null){
				if(custom.starttime!=null&&custom.starttime.length>1){
					this.robotdatetime.starttime=custom.starttime;
				
				}
				if(custom.endtime!=null&&custom.endtime.length>1){
					this.robotdatetime.endtime=custom.endtime;
				}
				this.robotdatetime.refresh();
				if(custom.starttime!=null&&custom.starttime.length>1){
					//如果是自定义报表，则禁用选择
						var datetimerangpick=	$('#reporttimerange').daterangepicker();
						datetimerangpick.off('click.daterangepicker');
						
				}
			}
			if(this.robotstation!=null){
					if(custom!=null&&custom.stationid!=null&&custom.stationid!="-1"&&custom.stationid.length>1){
				this.robotstation._val={stationid:custom.stationid,stationname:custom.stationname};	
				}
				this.robotstation.refresh();
				var cb_area= $("input[id^='cb_area']");
				if(cb_area!=null&&cb_area.length==1){
					//区域联动局站
					cb_area.combotree({"onChange":function(newvalue,oldvalue){
					var selectareaid=$(this).combotree("getValues").toString();
					if(selectareaid==null||selectareaid==""){
						selectareaid="-1";
					}
		for (var i = 0; i < robotDesigner.querybarObjects.length; i++) {
							if( robotDesigner.querybarObjects[i].robotarea!=null){
		 robotDesigner.querybarObjects[i].robotarea.selectareaid=selectareaid;
							}
							if( robotDesigner.querybarObjects[i].robotstation!=null){
		  robotDesigner.querybarObjects[i].robotstation.areaid=selectareaid;
		  robotDesigner.querybarObjects[i].robotstation.refresh(selectareaid);
		                 }
	}
				}}); 
				}
//区域联动结束
				var cb_stationtype= $("input[id^='cb_stationtype']");
				if(cb_stationtype!=null&&cb_stationtype.length==1){
					//局站类型联动
					cb_stationtype.combotree({"onChange":function(newvalue,oldvalue){
					var selectstationtype=$(this).combotree("getValues").toString();
					if(selectstationtype==null||selectstationtype==""){
						selectstationtype="-1";
					}
		for (var i = 0; i < robotDesigner.querybarObjects.length; i++) {
							if( robotDesigner.querybarObjects[i].robotstationtype!=null){
		 robotDesigner.querybarObjects[i].robotstationtype.selectstationtype=selectstationtype;
							}
							if( robotDesigner.querybarObjects[i].robotstation!=null){
		  robotDesigner.querybarObjects[i].robotstation.stationtype=selectstationtype;
		  robotDesigner.querybarObjects[i].robotstation.refresh();
		                 }
	}
				}}); 
				}
				//局站类型联动结束
			 
			}
				if(this.robotstationtype!=null){
							if(custom!=null&&custom.stationtype!=null&&custom.stationtype!="-1"&&custom.stationtype.length>1){
				this.robotstationtype._val={stationtype:custom.stationtype };	
				}
				this.robotstationtype.refresh();
			}
			if(this.robotarea!=null){
				if(custom!=null&&custom.areaid!=null&&custom.areaid!="-1"&&custom.areaid.length>1){
				this.robotarea._val={areaids:custom.areaid,areanames:custom.areaname};	
				}
				this.robotarea.refresh();
				
			}
			if(this.robotwarnlevel!=null){

				var cb_warnlevel= $("input[id^='cb_warnlevel']");
				if(cb_warnlevel!=null&&cb_warnlevel.length==1){
					//局站类型联动
					cb_warnlevel.combotree({"onChange":function(newvalue,oldvalue){
					var selectwarnlevel=$(this).combotree("getValues").toString();
					if(selectwarnlevel==null||selectwarnlevel==""){
						selectwarnlevel="-1";
					}
		for (var i = 0; i < robotDesigner.querybarObjects.length; i++) {
							if( robotDesigner.querybarObjects[i].robotwarnlevel!=null){
		 robotDesigner.querybarObjects[i].robotwarnlevel.selectwarnlevel=selectwarnlevel;
							}
							if( robotDesigner.querybarObjects[i].robotwarninfo!=null){
		  robotDesigner.querybarObjects[i].robotwarninfo.selectwarnlevel=selectwarnlevel;
		  if(robotDesigner.querybarObjects[i].robotwarnlevel._val==null){
		  robotDesigner.querybarObjects[i].robotwarninfo.refresh();
		  }
		                 }
	}
				}}); 
				}
				if(custom!=null&&custom.warnlevel!=null&&custom.warnlevel!="-1"&&custom.warnlevel.length>=1){
				this.robotwarnlevel._val={warnlevel:custom.warnlevel };	
				}
				this.robotwarnlevel.refresh();
			}
			if(this.robotwarninfo!=null){
				if(custom!=null&&custom.warncode!=null&&custom.warncode!="-1"&&custom.warncode.length>=1){
				this.robotwarninfo._val={warncode:custom.warncode };	
				}
				this.robotwarninfo.refresh();
			}
			if(this.robotdevicecompany!=null){
				var cb_devicecompany= $("input[id^='cb_devicecompany']");
				if(cb_devicecompany!=null&&cb_devicecompany.length==1){
					//局站类型联动
					cb_devicecompany.combotree({"onChange":function(newvalue,oldvalue){
					var selectdevicecompany=$(this).combotree("getValues").toString();
					if(selectdevicecompany==null||selectdevicecompany==""){
						selectdevicecompany="-1";
					}
		for (var i = 0; i < robotDesigner.querybarObjects.length; i++) {
							if( robotDesigner.querybarObjects[i].robotdevicecompany!=null){
		 robotDesigner.querybarObjects[i].robotdevicecompany.selectdevicecompany=selectdevicecompany;
							}
							if( robotDesigner.querybarObjects[i].robotdeviceinfo!=null){
		  robotDesigner.querybarObjects[i].robotdeviceinfo.selectdevicecompany=selectdevicecompany;
		  if(robotDesigner.querybarObjects[i].robotdevicecompany._val==null){
		  robotDesigner.querybarObjects[i].robotdeviceinfo.refresh();
		  }
		                 }
	}
				}}); 
				}
				
					if(custom!=null&&custom.devicecompany!=null&&custom.devicecompany!="-1"&&custom.devicecompany.length>=1){
				this.robotdevicecompany._val={companyname:custom.devicecompany };	
				}
				this.robotdevicecompany.refresh();
			}
			if(this.robotdeviceinfo!=null){
		if(custom!=null&&custom.deviceinfo!=null&&custom.deviceinfo!="-1"&&custom.deviceinfo.length>=1){
				this.robotdeviceinfo._val={devicename:custom.deviceinfo };	
				}
				this.robotdeviceinfo.refresh();
			}
			if(this.robotdevicetype!=null){
								var cb_devicetype= $("input[id^='cb_devicetype']");
				if(cb_devicetype!=null&&cb_devicetype.length==1){
					//局站类型联动
					cb_devicetype.combotree({"onChange":function(newvalue,oldvalue){
					var selectdevicetype=$(this).combotree("getValues").toString();
					if(selectdevicetype==null||selectdevicetype==""){
						selectdevicetype="-1";
					}
		for (var i = 0; i < robotDesigner.querybarObjects.length; i++) {
							if( robotDesigner.querybarObjects[i].robotdevicetype!=null){
		 robotDesigner.querybarObjects[i].robotdevicetype.selectdevicetype=selectdevicetype;
							}
							if( robotDesigner.querybarObjects[i].robotdeviceinfo!=null){
		  robotDesigner.querybarObjects[i].robotdeviceinfo.selectdevicetype=selectdevicetype;
		    if(robotDesigner.querybarObjects[i].robotdevicetype!=null&& robotDesigner.querybarObjects[i].robotdevicetype._val==null){
		  robotDesigner.querybarObjects[i].robotdeviceinfo.refresh();
		    }
		                 }
				if( robotDesigner.querybarObjects[i].robotwarninfo!=null){
		  robotDesigner.querybarObjects[i].robotwarninfo.selectdevicetype=selectdevicetype;
		  if(  robotDesigner.querybarObjects[i].robotdevicetype!=null&&robotDesigner.querybarObjects[i].robotdevicetype._val==null){
		  robotDesigner.querybarObjects[i].robotwarninfo.refresh();
		  }
		                 }
	}
				}}); 
				}
				if(custom!=null&&custom.devicetype!=null&&custom.devicetype!="-1"&&custom.devicetype.length>=1){
				this.robotdevicetype._val={devicetypeid:custom.devicetype };	
				}
				this.robotdevicetype.refresh();
			}
			if(this.robotwarntype!=null){

				var cb_warntype= $("input[id^='cb_warntype']");
				if(cb_warntype!=null&&cb_warntype.length==1){
					//局站类型联动
					cb_warntype.combotree({"onChange":function(newvalue,oldvalue){
					var selectwarntype=$(this).combotree("getValues").toString();
					if(selectwarntype==null||selectwarntype==""){
						selectwarntype="-1";
					}
		for (var i = 0; i < robotDesigner.querybarObjects.length; i++) {
							if( robotDesigner.querybarObjects[i].robotwarntype!=null){
		 robotDesigner.querybarObjects[i].robotwarntype.selectwarntype=selectwarntype;
							}
							if( robotDesigner.querybarObjects[i].robotwarninfo!=null){
		  robotDesigner.querybarObjects[i].robotwarninfo.selectwarntype=selectwarntype;
		  if(robotDesigner.querybarObjects[i].robotwarntype._val==null){
		  robotDesigner.querybarObjects[i].robotwarninfo.refresh();
		  }
		                 }
	}
				}}); 
				}
							if(custom!=null&&custom.warnlogictype!=null&&custom.warnlogictype!="-1"&&custom.warnlogictype.length>=1){
				this.robotwarntype._val={warntype:custom.warnlogictype };	
				}
				this.robotwarntype.refresh();
			}
		},
		query:function(param){
		//查询函数
	},
	exportfile:function(param){
		//导出函数
	},
	getQueryParam:function(){
		//获得查询参数
		var ret={};
			if(this.robotdatetime!=null){
			var _val=this.robotdatetime.val();
			ret.starttime=_val.starttime;
			ret.endtime=_val.endtime;
		}
		if(this.robotarea!=null){
			var _val=this.robotarea.val();
			ret.areaid=_val.areaids;
			ret.areaname=RobotReportQueryBar.convertvalue(_val.areanames);
		}
		if(this.robotstationtype!=null){
			var _val=this.robotstationtype.val();
			ret.stationtype=_val.stationtype;
			ret.stationtypename=_val.stationtypename;
		}
		if(this.robotstation!=null){
			var _val=this.robotstation.val();
			ret.stationid=_val.stationids;
			ret.stationname=_val.stationnames;
		}
			if(this.robotwarnlevel!=null){
			var _val=this.robotwarnlevel.val();
			ret.warnlevel=_val.warnlevel;
			ret.warnlevelname=_val.warnlevelname;
		}
			if(this.robotwarninfo!=null){
			var _val=this.robotwarninfo.val();
			ret.warncode=_val.warncode;
			ret.warntype=_val.warntype;
		}	
		if(this.robotdevicecompany!=null){
				var _val=this.robotdevicecompany.val();
			ret.companyid=_val.companyid;
			ret.devicecompany=RobotReportQueryBar.convertvalue(_val.companyname);
		}
			if(this.robotdeviceinfo!=null){
				var _val=this.robotdeviceinfo.val();
			ret.deviceid=_val.deviceid;
			ret.deviceinfo=RobotReportQueryBar.convertvalue(_val.devicename);
		}
			if(this.robotdevicetype!=null){
				var _val=this.robotdevicetype.val();
			ret.devicetypeid=_val.devicetypeid;
			ret.devicetype=_val.devicetypeid;
		}
			if(this.robotwarntype!=null){
			var _val=this.robotwarntype.val();
			ret.warnlogictype=RobotReportQueryBar.convertvalue(_val.warntype);
			}
		return ret;
	},
	convertvalue:function(str){
		if(str==null){
			return "-1";
		}
		var ret="";
		var a_str=str.split(",");
		for (var i = 0; i < a_str.length; i++) {
		ret+=(i==0?"":",")+"'"+a_str[i]+"'";
		}
		return ret;
	}
}
