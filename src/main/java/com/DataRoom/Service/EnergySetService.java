package com.DataRoom.Service;

import java.lang.reflect.Array;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.DataRoom.Job.AnalyseTargetJob;
import com.DataRoom.common.ApiInfo;
import com.DataRoom.common.DBPooL;
import com.DataRoom.common.Maths;
import com.DataRoom.common.Permissions;
import com.DataRoom.common.SessionTools;

public class EnergySetService {
	public SessionTools sessionTools;// session工具
    @Permissions(needLogin=true)
	@ApiInfo(comment="查询位置指标定义")
	public List QueryAddressTargetSet(@ApiInfo(comment="位置ID")String addressid) {
		String sql="select * from energy_target_set where addressid='"+addressid+"' order by targetid";
		return DBPooL.QueryTableToListMap(sql);
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="查询位置参数定义")
	public List QueryAddressParamSet(@ApiInfo(comment="位置ID")String addressid) {
		String sql="select a.*,CONCAT(b1.controllername,'.',b1.devicename,'.',c1.`name`) as dynamicbind,CONCAT(b2.controllername,'.',b2.devicename,'.',c2.`name`) as staticbind from energy_parameter_set a left outer join \r\n" + 
				"energy_device b1 on a.dynamicbinddeviceid=concat(b1.controllerid,'.',b1.deviceid) " + 
				"left outer join \r\n" + 
				"energy_digitaldict c1 on a.dynamicbinddevicetargetcode=c1.id\r\n" + 
				"and b1.deviceid=c1.deviceid and b1.controllerid=c1.controllerid \r\n" + 
				"left outer join \r\n" + 
				"energy_device b2 on a.staticbinddeviceid= concat(b2.controllerid,'.',b2.deviceid)" + 
 				"left outer join \r\n" + 
				"energy_digitaldict c2 on a.staticbinddevicetargetcode=c2.id\r\n" + 
				"and b2.deviceid=c2.deviceid and b2.controllerid=c2.controllerid  \r\n" + 
				"where a.addressid='"+addressid+"' order by a.parameterid";
		return DBPooL.QueryTableToListMap(sql);
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="新增位置指标定义")
	public String AddAddressTargetSet(@ApiInfo(comment="位置ID")String addressid,
			@ApiInfo(comment="指标名称")String targetname,
			@ApiInfo(comment="描述")String note,
			@ApiInfo(comment="设计值")float designvalue,
			@ApiInfo(comment="目标值")float targetedvalue,
			@ApiInfo(comment="门限值")float threshold,
			@ApiInfo(comment="门限值类型")String thresholdtype,
			@ApiInfo(comment="计算公式")String formula,
			@ApiInfo(comment="静态刷新频率")int staticdatafreq,
			@ApiInfo(comment="动态刷新频率")int dynamicfreq
			) {
		//检查名称是否重复
		int cn=DBPooL.QueryToInt("select count(*) from energy_target_set where addressid=? and targetname=?",addressid,targetname);
		if(cn>0) {
			return "该位置存在相同的指标名称！";
		}
		//检查参数是否正确
		String checkresult=checkAddressParam(addressid,formula);
		if(checkresult!=null) {
			return "参数["+checkresult+"]不存在！";
		}
		//向数据库中增加记录  
		String sql="insert into energy_target_set(addressid,targetname,note,designvalue,targetedvalue,threshold,thresholdtype,formula,staticdatafreq,dynamicfreq)values(?,?,?,?,?,?,?,?,?,?)";
		boolean result=DBPooL.ExecSql(sql,addressid,targetname,note,""+designvalue,""+targetedvalue,""+threshold,thresholdtype,formula,""+staticdatafreq,""+dynamicfreq);
		if(result) {
			//记录日志
			sessionTools.logevent("能耗指标管理", "新增位置能耗指标:addressid:"+addressid+",targetname:"+targetname+",note:"+note+" ...");
			//告诉指标分析线程配置发生变化
			AnalyseTargetJob.configchange=true;
			return "ok";
		}else {
			return "系统错误！";
		}
		 
	}
	/**
	 * 检查参数是否有效
	 * @param addressid
	 * @param formula
	 * @return
	 */
	private String  checkAddressParam(String addressid,String formula) {
		List<String> param=Maths.getFormulaParamter(formula);
		//遍历参数，到energy_parameter_set表查询参数是否存在
		for(String parametername:param) {
			int cn=DBPooL.QueryToInt("select count(*) from energy_parameter_set where addressid=? and parametername=?",addressid,parametername);
			if(cn==0) {
				return parametername;
			}
		}
		return null;
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="修改位置能耗指标定义")
	public String EditAddressTargetSet(@ApiInfo(comment="位置ID")String addressid,
			@ApiInfo(comment="指标ID")int targetid,
			@ApiInfo(comment="指标名称")String targetname,
			@ApiInfo(comment="描述")String note,
			@ApiInfo(comment="设计值")float designvalue,
			@ApiInfo(comment="目标值")float targetedvalue,
			@ApiInfo(comment="门限值")float threshold,
			@ApiInfo(comment="门限值类型")String thresholdtype,
			@ApiInfo(comment="计算公式")String formula,
			@ApiInfo(comment="静态刷新频率")int staticdatafreq,
			@ApiInfo(comment="动态刷新频率")int dynamicfreq
			) {
		//检查名称是否重复
		int cn=DBPooL.QueryToInt("select count(*) from energy_target_set where addressid=? and targetname=? and targetid!=?",addressid,targetname,""+targetid);
		if(cn>0) {
			return "该位置存在相同的指标名称！";
		}
		//检查参数是否正确
		String checkresult=checkAddressParam(addressid,formula);
		if(checkresult!=null) {
			return "参数["+checkresult+"]不存在！";
		}
		//更新数据
		String sql="update energy_target_set  set  targetname=?,note=?,designvalue=?,targetedvalue=?,threshold=?,thresholdtype=?,formula=?,staticdatafreq=?,dynamicfreq=?  where targetid=?";
		boolean result=DBPooL.ExecSql(sql, targetname,note,""+designvalue,""+targetedvalue,""+threshold,thresholdtype,formula,""+staticdatafreq,""+dynamicfreq,""+targetid);
		if(result) {
			//记录日志
			sessionTools.logevent("能耗指标管理", "新增位置能耗指标:addressid:"+addressid+",targetname:"+targetname+",note:"+note+" ...");
			//告诉指标分析线程配置发生变化
			AnalyseTargetJob.configchange=true;
			return "ok";
		}else {
			return "系统错误！";
		}
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="删除位置能耗指标定义")
	public String DelAddressTargetSet(@ApiInfo(comment="位置ID")String addressid,
			@ApiInfo(comment="指标ID")String targetid) {
		//删除指标
		String sql="delete from energy_target_set where addressid=? and targetid=?";
		boolean result=DBPooL.ExecSql(sql, addressid,targetid);
		if(result) {
			//记录日志
			sessionTools.logevent("能耗指标管理", "删除位置能耗指标:addressid:"+addressid+",targetid:"+targetid);
			//告诉指标分析线程配置发生变化
			AnalyseTargetJob.configchange=true;
			return "ok";
		}else {
			return "系统错误！";
		}
		
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="新增位置能耗参数定义")
	public String AddAddressParamSet(@ApiInfo(comment="位置ID")String addressid,
			@ApiInfo(comment="参数名称")String parametername,
			@ApiInfo(comment="动态绑定数据设备ID")String dynamicbinddeviceid,
			@ApiInfo(comment="动态绑定数据设备数据编码")String dynamicbinddevicetargetcode,
			@ApiInfo(comment="动态绑定数据放大比率")float dynamicbindrate,
			@ApiInfo(comment="动态绑定数据偏移值")float dynamicbindoffset,
			@ApiInfo(comment="静态绑定设备ID")String staticbinddeviceid,
			@ApiInfo(comment="静态绑定数据设备数据编码")String staticbinddevicetargetcode,
			@ApiInfo(comment="静态绑定数据放大比率")float staticbindrate,
			@ApiInfo(comment="静态绑定数据偏移值")float staticbindoffset
			) {
		//判断是否重名
		int cn=DBPooL.QueryToInt("select count(*) from energy_parameter_set where addressid=? and parametername=?",addressid,parametername);
		if(cn>0) {
			return "该位置存在相同的参数名称！";
		}
		//插入数据
		String sql="insert into energy_parameter_set(addressid,parametername,dynamicbinddeviceid,dynamicbinddevicetargetcode,dynamicbindrate,dynamicbindoffset,staticbinddeviceid,staticbinddevicetargetcode,staticbindrate,staticbindoffset)values(?,?,?,?,?,?,?,?,?,?)";
		boolean result=DBPooL.ExecSql(sql,addressid,parametername,dynamicbinddeviceid,""+dynamicbinddevicetargetcode,""+dynamicbindrate,""+dynamicbindoffset,staticbinddeviceid,""+staticbinddevicetargetcode,""+staticbindrate,""+staticbindoffset);
		if(result) {
			//记录日志
			sessionTools.logevent("能耗指标管理", "新增位置能耗参数:addressid:"+addressid+",parametername:"+parametername+"  ...");
			//告诉指标分析线程配置发生变化
			AnalyseTargetJob.configchange=true;
			return "ok";
		}else {
			return "系统错误！";
		}
		 
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="修改位置能耗参数定义")
	public String EditAddressParamSet(@ApiInfo(comment="位置ID")String addressid,
			@ApiInfo(comment="指标ID")int parameterid,
			@ApiInfo(comment="指标名称")String parametername,
			@ApiInfo(comment="动态绑定数据设备ID")String dynamicbinddeviceid,
			@ApiInfo(comment="动态绑定数据设备数据编码")String dynamicbinddevicetargetcode,
			@ApiInfo(comment="动态绑定数据放大比率")float dynamicbindrate,
			@ApiInfo(comment="动态绑定数据偏移值")float dynamicbindoffset,
			@ApiInfo(comment="静态绑定设备ID")String staticbinddeviceid,
			@ApiInfo(comment="静态绑定数据设备数据编码")String staticbinddevicetargetcode,
			@ApiInfo(comment="静态绑定数据放大比率")float staticbindrate,
			@ApiInfo(comment="静态绑定数据偏移值")float staticbindoffset
			) {
		//判断参数是否重名
		int cn=DBPooL.QueryToInt("select count(*) from energy_parameter_set where addressid=? and parametername=? and parameterid!=?",addressid,parametername,""+parameterid);
		if(cn>0) {
			return "该位置存在相同的参数名称！";
		}
		String oldparametername=DBPooL.QueryToStr("select parametername from energy_parameter_set where addressid='"+addressid+"' and parameterid='"+parameterid+"'");
		//更新数据库
		String sql="update energy_parameter_set  set  parametername=?,dynamicbinddeviceid=?,dynamicbinddevicetargetcode=?,dynamicbindrate=?,dynamicbindoffset=?,staticbinddeviceid=?,staticbinddevicetargetcode=?,staticbindrate=?,staticbindoffset=?  where parameterid=?";
		boolean result=DBPooL.ExecSql(sql, parametername,dynamicbinddeviceid,""+dynamicbinddevicetargetcode,""+dynamicbindrate,""+dynamicbindoffset,staticbinddeviceid,staticbinddevicetargetcode,""+staticbindrate,""+staticbindoffset,""+parameterid);
		if(result) {
			//记录日志
			sessionTools.logevent("能耗指标管理", "修改位置能耗参数:addressid:"+addressid+",parametername:"+parametername+"  ...");
			if(!oldparametername.equals(parametername)) {
				//如果参数名变化，则更新指标中的参数引用
				DBPooL.ExecSql("update energy_target_set set formula=replace(formula,'"+oldparametername+"','"+parametername+"') where addressid='"+addressid+"'");
			}
			//告诉指标分析线程配置发生变化
			AnalyseTargetJob.configchange=true;
			return "ok";
		}else {
			return "系统错误！";
		}
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="删除位置能耗参数定义")
	public String DelAddressParamSet(@ApiInfo(comment="位置ID")String addressid,
			@ApiInfo(comment="指标ID")String parameterid) {
		//参数是否使用验证
		String parametername=DBPooL.QueryToStr("select parametername from energy_parameter_set where addressid='"+addressid+"' and parameterid='"+parameterid+"'");
		int cn=DBPooL.QueryToInt("select count(*) from energy_target_set where addressid='"+addressid+"' and formula like '%"+parametername+"%'");
		if(cn>0) {
			return "参数在指标中有定义,请先删除指标";
		}
		//删除参数
		String sql="delete from energy_parameter_set where addressid=? and parameterid=?";
		boolean result=DBPooL.ExecSql(sql, addressid,parameterid);
		if(result) {
			//记录日志
			sessionTools.logevent("能耗指标管理", "删除位置能耗参数:addressid:"+addressid+",parameterid:"+parameterid);
			//告诉指标分析线程配置发生变化
			AnalyseTargetJob.configchange=true;
			return "ok";
		}else {
			return "系统错误！";
		}
		
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="查询位置下的设备列表")
	public List QueryAddressDevice(@ApiInfo(comment="位置ID")String addressid) {
		String sql="select * from energy_device  order by controllerid,deviceid";
		return DBPooL.QueryTableToListMap(sql);
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="查询设备下的点位列表")
	public List QueryDeviceDigitaldict(@ApiInfo(comment="设备控制器ID")String deviceid ) {
		String sql="select * from energy_digitaldict where concat(controllerid,'.',deviceid)='"+deviceid+"'";
		return DBPooL.QueryTableToListMap(sql);
	}
	
  
 
}
