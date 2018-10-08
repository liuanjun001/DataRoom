package com.DataRoom.Job;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import com.DataRoom.common.DBPooL;
import com.DataRoom.common.HttpUtil;
import com.DataRoom.common.Maths;
import com.DataRoom.common.SpringUtil;
import com.DataRoom.common.WriteLog;
import com.alibaba.fastjson.JSONObject;

import parsii.eval.Expression;
import parsii.eval.Parser;
import parsii.eval.Scope;
import parsii.eval.Variable;
import parsii.tokenizer.ParseException;

public class AnalyseTargetJob extends Thread{
	public static boolean configchange=false;
	//指标设置
	public List<HashMap> TargetSet=new LinkedList<HashMap>();
	public HashMap DBTargetMap=new HashMap();
	public HashMap DBParamterMap=new HashMap();
	public HashMap DBWarnMap=new HashMap();
	public HashMap DBParameterDayMap=new HashMap();
	public HashMap DBParameterMonthMap=new HashMap();
	public HashMap DBParameterYearMap=new HashMap();
	public HashMap DBParameterQuarterMap=new HashMap();
	public HashMap DBTargetDayMap=new HashMap();
	public HashMap DBTargetMonthMap=new HashMap();
	public HashMap DBTargetYearMap=new HashMap();
	public HashMap DBTargetQuarterMap=new HashMap();
public void run() {
	
	try {
		sleep(1000*30);
	} catch (InterruptedException e) {
		e.printStackTrace();
	}
	loadDBMap();
	configchange=true;
	while (true) {
	if(configchange) {
		LoadTargetConfig();
		configchange=false;
	}
	scanTargetSet();
	try {
		sleep(1000*10);
	} catch (InterruptedException e) {
		e.printStackTrace();
	}
}

}
/**
 * 从数据库里取数据到内存
 */
public void loadDBMap() {
	DBTargetMap=DBPooL.QueryTableToMap("select CONCAT(addressid,'#',targetid),targetvalue from energy_target_realvalue");
	DBParamterMap=DBPooL.QueryTableToMap("select CONCAT(addressid,'#',targetid,'#',parameterid),parametervalue from energy_parameter_realvalue");
	DBWarnMap=DBPooL.QueryTableToMap("select CONCAT(addressid,'#',targetid),starttime from energy_warn where endtime is null");
}
/**
 * 从数据库里取参数数据到内存
 */
public void loadParameterDBMap() {
	DBParameterDayMap=DBPooL.QueryTableToMap("select CONCAT(addressid,'#',targetid,'#',parameterid),parameterbeginvalue from energy_parameter_day where uptime=DATE_FORMAT(NOW(),'%Y-%m-%d')");
	DBParameterMonthMap=DBPooL.QueryTableToMap("select CONCAT(addressid,'#',targetid,'#',parameterid),parameterbeginvalue from energy_parameter_month where uptime=DATE_FORMAT(NOW(),'%Y-%m')");
	DBParameterQuarterMap=DBPooL.QueryTableToMap("select CONCAT(addressid,'#',targetid,'#',parameterid),parameterbeginvalue from energy_parameter_quarter where uptime=CONCAT(year(now()),'/',quarter(NOW()))");
	DBParameterYearMap=DBPooL.QueryTableToMap("select CONCAT(addressid,'#',targetid,'#',parameterid),parameterbeginvalue from energy_parameter_year where uptime=DATE_FORMAT(NOW(),'%Y')");
	DBTargetDayMap=DBPooL.QueryTableToMap("select CONCAT(addressid,'#',targetid),targetvalue from energy_target_day where uptime=DATE_FORMAT(NOW(),'%Y-%m-%d')");
	DBTargetMonthMap=DBPooL.QueryTableToMap("select CONCAT(addressid,'#',targetid ),targetvalue from energy_target_month where uptime=DATE_FORMAT(NOW(),'%Y-%m')");
	DBTargetQuarterMap=DBPooL.QueryTableToMap("select CONCAT(addressid,'#',targetid ),targetvalue from energy_target_quarter where uptime=CONCAT(year(now()),'/',quarter(NOW()))");
	DBTargetYearMap=DBPooL.QueryTableToMap("select CONCAT(addressid,'#',targetid ),targetvalue from energy_target_year where uptime=DATE_FORMAT(NOW(),'%Y')");

}
public void scanTargetSet() {
	boolean isloadparameter=false;
	for(int i=0;i<TargetSet.size();i++) {
		try {
		HashMap target=TargetSet.get(i);
		int dynamicfreq=Integer.parseInt(target.get("dynamicfreq").toString());
		if(target.get("lastdynamic")==null||
			System.currentTimeMillis()-Long.parseLong(target.get("lastdynamic").toString())>dynamicfreq*60*1000 ) {
			//如果没有动态扫描过，或者上次扫描时间大于设置时间
			dynamicanalyse(target);
			target.put("lastdynamic", System.currentTimeMillis());
			TargetSet.set(i, target);
		}
		int staticdatafreq=Integer.parseInt(target.get("staticdatafreq").toString());
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat sdf2=new SimpleDateFormat("yyyy-MM-dd");
		String curdate=sdf2.format(new Date());//当天
		long timemillis0=sdf.parse(curdate+" 00:30:00").getTime();//0点30分的时间戳
		long timemillis23=sdf.parse(curdate+" 23:30:00").getTime();//23点30分的时间戳 
		long laststatic=target.get("laststatic")!=null?Long.parseLong(target.get("laststatic").toString()):0;
		if(laststatic==0||
			System.currentTimeMillis()-laststatic>staticdatafreq*60*60*1000 
			||(System.currentTimeMillis()-timemillis0<0&&timemillis0-laststatic>30*60*1000)
			||(System.currentTimeMillis()-timemillis23>0&&laststatic-timemillis23<0)) {
			//如果没有动态扫描过，或者上次扫描时间大于设置时间,或者在0:30之前和23:30后固定扫描一次
			if(!isloadparameter) {
				loadParameterDBMap();
				isloadparameter=true;
			}
			staticanalyse(target);
			target.put("laststatic", System.currentTimeMillis());
			TargetSet.set(i, target);
		}
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
		
}
/**
 * 静态分析数据
 * @param target
 */
private void staticanalyse(HashMap target) {
	String formula=target.get("formula").toString();
	
	try {
		LinkedList<String> sqllist=new LinkedList<String>();
		Scope scopeday=new Scope();
		Expression parsiiExprday=Parser.parse(formula,scopeday);
		Scope scopemonth=new Scope();
		Expression parsiiExprmonth=Parser.parse(formula,scopemonth);
		Scope scopequarter=new Scope();
		Expression parsiiExprquarter=Parser.parse(formula,scopequarter);
		Scope scopeyear=new Scope();
		Expression parsiiExpryear=Parser.parse(formula,scopeyear);
	List<HashMap<String,String>> paramlist=(List<HashMap<String, String>>) target.get("parameter");
	boolean haszeroday=false;//是否有0
	boolean haszeromonth=false;//是否有0
	boolean haszeroyear=false;//是否有0
	boolean haszeroquarter=false;//是否有0
	String _addressid=target.get("addressid").toString();
	String _targetid=target.get("targetid").toString();
	for(HashMap<String,String> param:paramlist) {
		Float val=getDigitalvalue(param.get("staticbinddeviceid"),param.get("staticbinddevicetargetcode"));
		if(val==null) {
			return;
		}
		//parsii设置参数
		val=val*Float.parseFloat(param.get("staticbindrate"))+Float.parseFloat(param.get("staticbindoffset"));
		String _parameterid=param.get("parameterid");
		String key=_addressid+"#"+_targetid+"#"+_parameterid;
		Float dayval=(float) 0;
		if(DBParameterDayMap.containsKey(key)) {
			if(DBParameterDayMap.get(key)==null) {
				//如果起始值为空
				haszeroday=true;
				DBPooL.ExecSql("update energy_parameter_day set begintime=now(),parametervalue=0,parameterbeginvalue=? where addressid=? and targetid=? and parameterid=? and uptime=DATE_FORMAT(NOW(),'%Y-%m-%d')", ""+getTwoDecimal(val),_addressid,_targetid,_parameterid);
				
			}else {
				//如果起始值不为空
			dayval=Math.abs(val-Float.parseFloat(DBParameterDayMap.get(key).toString()));
			DBPooL.ExecSql("update energy_parameter_day set endtime=now(),parametervalue=?,parameterendvalue=? where addressid=? and targetid=? and parameterid=? and uptime=DATE_FORMAT(NOW(),'%Y-%m-%d')",""+getTwoDecimal(dayval),""+getTwoDecimal(val),_addressid,_targetid,_parameterid);
			}
		}else {
			haszeroday=true;
			DBPooL.ExecSql("insert into  energy_parameter_day (addressid,targetid,parameterid,begintime,parametervalue ,parameterbeginvalue,uptime)values(?,?,?,now(),0 ,?,DATE_FORMAT(NOW(),'%Y-%m-%d')) ",_addressid,_targetid,_parameterid, ""+getTwoDecimal(val));
			DBParameterDayMap.put(key, val);
		}
		Variable var = scopeday.getVariable(param.get("parametername")); 
		var.setValue(dayval);
		/////month
		Float monthval=(float) 0;
		if(DBParameterMonthMap.containsKey(key)) {
			if(DBParameterMonthMap.get(key)==null) {
				//如果起始值为空
				haszeromonth=true;
				DBPooL.ExecSql("update energy_parameter_month set begintime=now(),parametervalue=0,parameterbeginvalue=? where addressid=? and targetid=? and parameterid=? and uptime=DATE_FORMAT(NOW(),'%Y-%m')", ""+getTwoDecimal(val),_addressid,_targetid,_parameterid);
				
			}else {
				//如果起始值不为空
			monthval=Math.abs(val-Float.parseFloat(DBParameterMonthMap.get(key).toString()));
			DBPooL.ExecSql("update energy_parameter_month set endtime=now(),parametervalue=?,parameterendvalue=? where addressid=? and targetid=? and parameterid=? and uptime=DATE_FORMAT(NOW(),'%Y-%m')",""+getTwoDecimal(monthval),""+getTwoDecimal(val),_addressid,_targetid,_parameterid);
			}
		}else {
			haszeroday=true;
			DBPooL.ExecSql("insert into  energy_parameter_month (addressid,targetid,parameterid,begintime,parametervalue ,parameterbeginvalue,uptime)values(?,?,?,now(),0 ,?,DATE_FORMAT(NOW(),'%Y-%m')) ",_addressid,_targetid,_parameterid, ""+getTwoDecimal(val));
			DBParameterMonthMap.put(key, val);
		}
		Variable monthvar = scopemonth.getVariable(param.get("parametername")); 
		monthvar.setValue(monthval);
		///////month end
	/////year
			Float yearval=(float) 0;
			if(DBParameterYearMap.containsKey(key)) {
				if(DBParameterYearMap.get(key)==null) {
					//如果起始值为空
					haszeroyear=true;
					DBPooL.ExecSql("update energy_parameter_year set begintime=now(),parametervalue=0,parameterbeginvalue=? where addressid=? and targetid=? and parameterid=? and uptime=DATE_FORMAT(NOW(),'%Y')", ""+getTwoDecimal(val),_addressid,_targetid,_parameterid);
					
				}else {
					//如果起始值不为空
				yearval=Math.abs(val-Float.parseFloat(DBParameterMonthMap.get(key).toString()));
				DBPooL.ExecSql("update energy_parameter_year set endtime=now(),parametervalue=?,parameterendvalue=? where addressid=? and targetid=? and parameterid=? and uptime=DATE_FORMAT(NOW(),'%Y')",""+getTwoDecimal(yearval),""+getTwoDecimal(val),_addressid,_targetid,_parameterid);
				}
			}else {
				haszeroyear=true;
				DBPooL.ExecSql("insert into  energy_parameter_year (addressid,targetid,parameterid,begintime,parametervalue ,parameterbeginvalue,uptime)values(?,?,?,now(),0 ,?,DATE_FORMAT(NOW(),'%Y')) ",_addressid,_targetid,_parameterid, ""+getTwoDecimal(val));
				DBParameterYearMap.put(key, val);
			}
			Variable yearvar = scopeyear.getVariable(param.get("parametername")); 
			yearvar.setValue(yearval);
			///////year end
		/////quarter
					Float quarterval=(float) 0;
					if(DBParameterQuarterMap.containsKey(key)) {
						if(DBParameterQuarterMap.get(key)==null) {
							//如果起始值为空
							haszeroquarter=true;
							DBPooL.ExecSql("update energy_parameter_quarter set begintime=now(),parametervalue=0,parameterbeginvalue=? where addressid=? and targetid=? and parameterid=? and uptime=concat(DATE_FORMAT(NOW(),'%Y'),'/',quarter(now()))", ""+val,_addressid,_targetid,_parameterid);
							
						}else {
							//如果起始值不为空
							quarterval=val-Float.parseFloat(DBParameterQuarterMap.get(key).toString());
						DBPooL.ExecSql("update energy_parameter_quarter set endtime=now(),parametervalue=?,parameterendvalue=? where addressid=? and targetid=? and parameterid=? and uptime=concat(DATE_FORMAT(NOW(),'%Y'),'/',quarter(now()))",""+getTwoDecimal(quarterval),""+getTwoDecimal(val),_addressid,_targetid,_parameterid);
						}
					}else {
						haszeroquarter=true;
						DBPooL.ExecSql("insert into  energy_parameter_quarter (addressid,targetid,parameterid,begintime,parametervalue ,parameterbeginvalue,uptime)values(?,?,?,now(),0 ,?,concat(DATE_FORMAT(NOW(),'%Y'),'/',quarter(now()))) ",_addressid,_targetid,_parameterid, ""+getTwoDecimal(val));
						DBParameterQuarterMap.put(key, val);
					}
					Variable quartervar = scopeyear.getVariable(param.get("parametername")); 
					quartervar.setValue(quarterval);
					///////year end
	
	}
 double targetvalueday=haszeroday?0:Math.abs(parsiiExprday.evaluate());
 double targetvaluemonth=haszeromonth?0:Math.abs(parsiiExprmonth.evaluate()); 
 double targetvalueyear=haszeroyear?0:Math.abs(parsiiExpryear.evaluate());
 double targetvaluequarter=haszeroquarter?0:Math.abs(parsiiExprquarter.evaluate());
 String key=_addressid+"#"+_targetid;
	if(DBTargetDayMap.containsKey(key)) {
		sqllist.add("update energy_target_day set endtime=now(),targetvalue="+getTwoDecimal(targetvalueday)+" where addressid='"+_addressid+"' and targetid='"+_targetid+"' and uptime=DATE_FORMAT(NOW(),'%Y-%m-%d')");
	 
	}else {
		sqllist.add("insert into  energy_target_day (addressid,targetid, begintime,targetvalue ,uptime)values('"+_addressid+"','"+_targetid+"' ,now(),'"+getTwoDecimal(targetvalueday)+"',DATE_FORMAT(NOW(),'%Y-%m-%d')) ");
		DBTargetDayMap.put(key, targetvalueday);
	}
	if(DBTargetMonthMap.containsKey(key)) {
		sqllist.add("update energy_target_month set endtime=now(),targetvalue="+getTwoDecimal(targetvaluemonth)+" where addressid='"+_addressid+"' and targetid='"+_targetid+"' and uptime=DATE_FORMAT(NOW(),'%Y-%m')");
	 
	}else {
		sqllist.add("insert into  energy_target_month (addressid,targetid, begintime,targetvalue ,uptime)values('"+_addressid+"','"+_targetid+"' ,now(),'"+getTwoDecimal(targetvaluemonth)+"',DATE_FORMAT(NOW(),'%Y-%m')) ");
		DBTargetMonthMap.put(key, targetvaluemonth);
	}
	if(DBTargetYearMap.containsKey(key)) {
		sqllist.add("update energy_target_year set endtime=now(),targetvalue="+getTwoDecimal(targetvalueyear)+" where addressid='"+_addressid+"' and targetid='"+_targetid+"' and uptime=DATE_FORMAT(NOW(),'%Y')");
	 
	}else {
		sqllist.add("insert into  energy_target_year (addressid,targetid, begintime,targetvalue ,uptime)values('"+_addressid+"','"+_targetid+"' ,now(),'"+getTwoDecimal(targetvalueyear)+"',DATE_FORMAT(NOW(),'%Y')) ");
		DBTargetYearMap.put(key, targetvalueyear);
	}
	if(DBTargetQuarterMap.containsKey(key)) {
		sqllist.add("update energy_target_quarter set endtime=now(),targetvalue="+getTwoDecimal(targetvaluequarter)+" where addressid='"+_addressid+"' and targetid='"+_targetid+"' and uptime=concat(DATE_FORMAT(NOW(),'%Y'),'/',quarter(now()))");
	 
	}else {
		sqllist.add("insert into  energy_target_quarter (addressid,targetid, begintime,targetvalue ,uptime)values('"+_addressid+"','"+_targetid+"' ,now(),'"+getTwoDecimal(targetvaluequarter)+"',concat(DATE_FORMAT(NOW(),'%Y'),'/',quarter(now()))) ");
		DBTargetQuarterMap.put(key, targetvaluequarter);
	}
 DBPooL.executeBatch(sqllist);
  
	} catch (ParseException e) {
		// TODO 自动生成的 catch 块
		e.printStackTrace();
	}	
}
/**
 * 动态分析数据
 * @param target
 */
private void dynamicanalyse(HashMap target) {
	String formula=target.get("formula").toString();
	Scope scope=new Scope();
	try {
		LinkedList<String> sqllist=new LinkedList<String>();
		Expression parsiiExpr=Parser.parse(formula,scope);
	List<HashMap<String,String>> paramlist=(List<HashMap<String, String>>) target.get("parameter");
	for(HashMap<String,String> param:paramlist) {
		Float val=getDigitalvalue(param.get("dynamicbinddeviceid"),param.get("dynamicbinddevicetargetcode"));
		if(val==null) {
			return;
		}
		//parsii设置参数
		val=val*Float.parseFloat(param.get("dynamicbindrate"))+Float.parseFloat(param.get("dynamicbindoffset"));
		Variable var = scope.getVariable(param.get("parametername")); 
		var.setValue(val);
		 if(DBParamterMap.containsKey(target.get("addressid")+"#"+target.get("targetid")+"#"+param.get("parameterid"))) {
			 sqllist.add("update energy_parameter_realvalue set uptime=now(),parametervalue="+getTwoDecimal(val)+" where addressid='"+target.get("addressid")+"' and targetid="+target.get("targetid")+" and parameterid="+param.get("parameterid"));
		 }else {
			 sqllist.add("insert into energy_parameter_realvalue(addressid,targetid,uptime,parametervalue,parameterid)values('"+target.get("addressid")+"','"+target.get("targetid")+"',now(),'"+getTwoDecimal(val)+"','"+param.get("parameterid")+"')");
			 DBParamterMap.put(target.get("addressid")+"#"+target.get("targetid")+"#"+param.get("parameterid"), val) ;
		 }
	}
 double targetvalue=parsiiExpr.evaluate(); 
 if(DBTargetMap.containsKey(target.get("addressid")+"#"+target.get("targetid"))) {
	 sqllist.add("update energy_target_realvalue set uptime=now(),targetvalue="+getTwoDecimal(targetvalue)+" where addressid='"+target.get("addressid")+"' and targetid="+target.get("targetid"));
 }else {
	 sqllist.add("insert into energy_target_realvalue(addressid,targetid,uptime,targetvalue)values('"+target.get("addressid")+"','"+target.get("targetid")+"',now(),'"+getTwoDecimal(targetvalue)+"')");
	 DBTargetMap.put(target.get("addressid")+"#"+target.get("targetid"), targetvalue) ;
 }
 DBPooL.executeBatch(sqllist);
 Float threshold=Float.parseFloat(target.get("threshold").toString());
 int thresholdtype=Integer.parseInt(target.get("thresholdtype").toString());
 boolean iswarn=false;
 if(thresholdtype==1&&targetvalue>=threshold) {
	 iswarn=true;
 }else if(thresholdtype==2&&targetvalue>threshold) {
	 iswarn=true;
 }else if(thresholdtype==3&&targetvalue<=threshold) {
	 iswarn=true;
 }else if(thresholdtype==4&&targetvalue<threshold) {
	 iswarn=true;
 }
  if(iswarn&&!DBWarnMap.containsKey(target.get("addressid")+"#"+target.get("targetid"))) {
	  newwarn(target.get("addressid").toString(),target.get("targetid").toString(),target.get("targetname").toString(),targetvalue);
  }else if(!iswarn&&DBWarnMap.containsKey(target.get("addressid")+"#"+target.get("targetid"))) {
	  endwarn(target.get("addressid").toString(),target.get("targetid").toString(),target.get("targetname").toString(),targetvalue);
  }
	} catch (ParseException e) {
		// TODO 自动生成的 catch 块
		e.printStackTrace();
	}
}
/**
 * 结束告警
 * @param addressid
 * @param targetid
 * @param targetvalue
 */
private void endwarn(String addressid, String targetid,String targetname, double targetvalue) {
	DBPooL.ExecSql("update energy_warn set endtime=now() where endtime is null and addressid=? and targetid=?", addressid,targetid);
	DBWarnMap.remove(addressid+"#"+targetid);
	String Agent=SpringUtil.getProperty("", "interface.warn.Agent", "1");
	String DeviceName=SpringUtil.getProperty("", "interface.warn.DeviceName", "能效分析");
	String warncodehead=SpringUtil.getProperty("", "interface.warn.warncodehead", "9900");
	String warnlevel=SpringUtil.getProperty("", "interface.warn.level", "4");
	SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss");
	String warncontent="B##Agent="+Agent+"##D="+DeviceName+"##MOID="+addressid+"##ID="+targetid+"##C="+targetname+"##V="+warncodehead+targetid+"##ACT=0##T=0##Z="+targetvalue+"##U=##M="+targetname+"值异常##EV=0##Class="+warnlevel+"##Alarm=1##TM="+sdf.format(new Date())+"^^";
	ManagerCenter.sendall(warncontent.getBytes());
}
/**
 * 开始告警
 * @param addressid
 * @param targetid
 * @param targetvalue
 */
private void newwarn(String addressid, String targetid,String targetname, double targetvalue) {
	DBPooL.ExecSql("insert into energy_warn(addressid,targetid,starttime,warnvalue)values(?,?,now(),?)", addressid,targetid,targetvalue+"");
	DBWarnMap.put(addressid+"#"+targetid,"1");
	String Agent=SpringUtil.getProperty("", "interface.warn.Agent", "1");
	String DeviceName=SpringUtil.getProperty("", "interface.warn.DeviceName", "能效分析");
	String warncodehead=SpringUtil.getProperty("", "interface.warn.warncodehead", "9900");
	String warnlevel=SpringUtil.getProperty("", "interface.warn.level", "4");
	SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss");
	String warncontent="B##Agent="+Agent+"##D="+DeviceName+"##MOID="+addressid+"##ID="+targetid+"##C="+targetname+"##V="+warncodehead+targetid+"##ACT=0##T=0##Z="+targetvalue+"##U=##M="+targetname+"值异常##EV=1##Class="+warnlevel+"##Alarm=1##TM="+sdf.format(new Date())+"^^";
	ManagerCenter.sendall(warncontent.getBytes());

}
//public static void main(String[] args) {
//	Scope scope=new Scope();
//	try {
//		Expression parsiiExpr=Parser.parse("IT能耗+B",scope);
//		Variable a = scope.getVariable("IT能耗"); 
//		a.setValue(3.2);
//		Variable b = scope.getVariable("B"); 
//		b.setValue(3);
//		 double targetvalue=parsiiExpr.evaluate(); 
//		 System.out.println(targetvalue);
//	} catch (ParseException e) {
//		// TODO 自动生成的 catch 块
//		e.printStackTrace();
//	}
//}
/**
 * 获取点位值
 * @param objectid
 * @param propertyId
 * @return
 */
private Float getDigitalvalue(String objectid,String propertyId) {
	String	addressUrl= SpringUtil.getProperty("", "interface.realtimedata.url", "");
	if(addressUrl==null) {
		return null;
	}
	addressUrl=addressUrl+"&objectId="+objectid+"&propertyId="+propertyId;
	//通过http请求调用Api接口
	String resp=HttpUtil.getInstance().doGet(addressUrl);
	//System.out.println(resp);
	if(resp==null) {
		System.out.println("获取实时数据失败！"+addressUrl+"返回空数据");
		return null;
	}
		JSONObject json=JSONObject.parseObject(resp);
		if(json==null) {
			System.out.println("获取实时数据失败！"+addressUrl+"返回数据无法解析:"+resp);
			return null;
		}
		if(!json.getBooleanValue("success")) {
			System.out.println("获取实时数据失败！"+addressUrl+"返回数据提示失败:"+resp);
			return null;
		}
		Float ret=json.getJSONObject("data").getFloat("value");
		System.out.println("getDigitalvalue:"+objectid+" propertyId:"+propertyId+"="+ret);
		return ret;
}
/**
 * 加载指标定义
 */
public void LoadTargetConfig() {
	//获得所有的指标定义
	long starttime=System.currentTimeMillis();
	TargetSet.clear();
	List<HashMap<String,String>> targetdatalist=DBPooL.QueryTableToListMap("select a.* from energy_target_set a left outer join energy_address b on a.addressid=b.addressid where b.addressid is not null ");
	for(int i=0;i<targetdatalist.size();i++) {
		HashMap<String,String> data=targetdatalist.get(i);
		String addressid=data.get("addressid");
		String targetid=data.get("targetid");
		String formula=data.get("formula");
		List<String> param=Maths.getFormulaParamter(formula);
		boolean formulaisok=true;
		List<HashMap<String,String>> paramlist=new LinkedList<HashMap<String,String>>();
		for(String parametername:param) {
			List<HashMap<String,String>> list=DBPooL.QueryTableToListMap("select * from energy_parameter_set where addressid='"+addressid+"' and parametername='"+parametername+"'");
			if(list.size()==0) {
				formulaisok=false;
				break;
			}
			paramlist.addAll(list);
		}
		if(!formulaisok) {
			//如果公式有误
			WriteLog.debug("addressid:"+addressid+",targetid:"+targetid+",formula:"+formula+"计算公式有误");
			targetdatalist.remove(i);
			i--;
			continue;
		}
		HashMap targetitem=new HashMap();
		targetitem.putAll(data);
		targetitem.put("parameter", paramlist);
		TargetSet.add(targetitem);
	}
	System.out.println("LoadTargetConfig dur:"+(System.currentTimeMillis()-starttime)+" TargetSet Size:"+TargetSet.size());
}
/**
 * 只取两位小数，空为0
 * @param num
 * @return
 */
private String getTwoDecimal(double num) {
	if( Double.isNaN(num)) {
		return "0";
	}
    DecimalFormat dFormat=new DecimalFormat("#.00");
    String str=dFormat.format(num);
    return str;
}
/**
 * 只取两位小数，空为0
 * @param num
 * @return
 */
private String getTwoDecimal(float num) {
	if( Float.isNaN(num)) {
		return "0";
	}
    DecimalFormat dFormat=new DecimalFormat("#.00");
    String str=dFormat.format(num);
    return str;
}

}
