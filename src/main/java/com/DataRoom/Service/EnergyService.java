package com.DataRoom.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import com.DataRoom.common.ApiInfo;
import com.DataRoom.common.DBPooL;
import com.DataRoom.common.Permissions;
import com.DataRoom.common.SessionTools;

/**
 * 能耗管平台相关后台服务
 * 
 * @author liuan
 *
 */
public class EnergyService {
	public SessionTools sessionTools;// session工具
    @Permissions(needLogin=true)
	@ApiInfo(comment = "查询多个位置实时指标值")
	public List QueryAddressRealTargets(@ApiInfo(comment = "地址集") String addressids) {
		//addressids格式为 addressid1,addressid2
		addressids = addressids.replaceAll(",", "','");
		//查询时实数据
		String sql = "select b.addressid,b.addressname,a.targetid,a.targetname,a.designvalue,a.targetedvalue,ifnull(c.targetvalue,0) as targetvalue,c.uptime,a.threshold,a.thresholdtype from energy_target_set a\r\n"
				+ "left outer join energy_address b on a.addressid=b.addressid\r\n"
				+ "left outer join energy_target_realvalue c on a.addressid=c.addressid and a.targetid=c.targetid\r\n"
				+ "where a.addressid in('" + addressids + "')\r\n" + "order by a.addressid,a.targetid";
		List<HashMap<String, String>> list = DBPooL.QueryTableToListMap(sql);
		HashMap tempmap = new HashMap();
		for (HashMap<String, String> data : list) {
			HashMap addressmap = tempmap.containsKey(data.get("addressid"))
					? (HashMap) tempmap.get(data.get("addressid"))
					: new HashMap();
			addressmap.put("addressid", data.get("addressid"));
			addressmap.put("addressname", data.get("addressname"));
			addressmap.put("uptime", data.get("uptime"));
			List targetdatalist = addressmap.containsKey("data") ? (LinkedList) addressmap.get("data")
					: new LinkedList();
			HashMap targetitem = new HashMap();
			targetitem.put("targetid", data.get("targetid"));
			targetitem.put("targetname", data.get("targetname"));
			targetitem.put("targetvalue", data.get("targetvalue"));
			targetitem.put("designvalue", data.get("designvalue"));
			targetitem.put("targetedvalue", data.get("targetedvalue"));
			targetitem.put("threshold", data.get("threshold"));
			targetitem.put("thresholdtype", data.get("thresholdtype"));
			targetdatalist.add(targetitem);
			addressmap.put("data", targetdatalist);
			tempmap.put(data.get("addressid"), addressmap);
		}
		List ret = new LinkedList();
		for (Object key : tempmap.keySet()) {
			ret.add(tempmap.get(key));
		}
		return ret;
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="查询指标的详情，包括实时指标、最近30天指标、实时参数、最近30天参数")
	public HashMap QueryAddressTargetDetail(@ApiInfo(comment="位置ID")String addressid,
			@ApiInfo(comment="指标ID")String targetid) {
		HashMap ret=new HashMap();
		//取指标实时数据
		String sql="select a.addressid,c.addressname,a.targetid,a.targetname,b.uptime,IFNULL(b.targetvalue,0) as targetvalue\r\n" + 
				",a.designvalue,a.targetedvalue,a.threshold,a.thresholdtype from energy_target_set a left outer join energy_target_realvalue b\r\n" + 
				"on a.addressid=b.addressid and a.targetid=b.targetid\r\n" + 
				"left outer join energy_address c on a.addressid=c.addressid\r\n" + 
				"where a.addressid='"+addressid+"' \r\n" + 
				"and a.targetid='"+targetid+"'";
		HashMap targetset=DBPooL.QueryTableToListMap(sql).get(0);
		ret.put("realtarget",targetset );
		//参数实时数据
		sql="select a.parametername, IFNULL(b.parametervalue,0) as parametervalue\r\n" + 
				" from energy_parameter_set a \r\n" + 
				"left outer join energy_parameter_realvalue b\r\n" + 
				"on a.addressid=b.addressid and  a.parameterid=b.parameterid\r\n" + 
				"where a.addressid='"+addressid+"' \r\n" + 
				"and b.targetid='"+targetid+"'";
		ret.put("realparameter",DBPooL.QueryTableToMap(sql));
		//指标最近30天的数据
		sql="select uptime,targetvalue as `"+targetset.get("targetname")+"`" + 
				" from energy_target_day  a \r\n" + 
				" where a.addressid='"+addressid+"' \r\n" + 
				"and a.targetid='"+targetid+"' and begintime>DATE_ADD(NOW(),INTERVAL -30 day) order by uptime";
		HashMap targethistory=new HashMap();
		targethistory.put("rs", DBPooL.QueryTableToListMap(sql));
		LinkedList targethistoryfield=new LinkedList();
		HashMap targethistoryfielditem=new HashMap();
		targethistoryfielditem.put("targetname", targetset.get("targetname").toString() );
		targethistoryfielditem.put("targetcode", targetset.get("targetname").toString().toLowerCase());
		targethistoryfielditem.put("min", 0);
		targethistoryfielditem.put("max", targetset.get("designvalue"));
		targethistoryfielditem.put("targetedvalue", targetset.get("targetedvalue"));
		targethistoryfielditem.put("threshold", targetset.get("threshold"));
		targethistoryfield.add(targethistoryfielditem);
		targethistory.put("field",targethistoryfield);
		ret.put("targethistory",targethistory);
		//参数最近30天的数据
		sql="select a.uptime,a.parameterid,b.parametername,parametervalue\r\n" + 
				" from energy_parameter_day  a left outer join energy_parameter_set b\r\n" + 
				"on a.addressid=b.addressid and a.parameterid=b.parameterid\r\n" + 
				" where a.addressid='"+addressid+"' \r\n" + 
				"and a.targetid='"+targetid+"' and b.parametername is not null and begintime>DATE_ADD(NOW(),INTERVAL -30 day) ";
		Connection conn=DBPooL.GetConnection();
		try {
			PreparedStatement psmt=conn.prepareStatement(sql);
			ResultSet rs=psmt.executeQuery();
			HashMap tempmap=new HashMap();
			HashMap fieldmap=new HashMap();
			while(rs.next()) {
				HashMap data=tempmap.containsKey(rs.getString("uptime"))?(HashMap) tempmap.get(rs.getString("uptime")):new HashMap();
				data.put(rs.getString("parametername"), rs.getFloat("parametervalue"));
				data.put("uptime", rs.getString("uptime"));
				tempmap.put(rs.getString("uptime"), data);
				fieldmap.put(rs.getString("parameterid"), rs.getString("parametername").toLowerCase());
			}
			rs.close();
			rs=null;
			psmt.close();
			psmt=null;
			LinkedList rs2=new LinkedList();
			for(Object key:tempmap.keySet()) {
				rs2.add(tempmap.get(key));
			}
			LinkedList field=new LinkedList();
			for(Object key:fieldmap.keySet()) {
				HashMap fielddata=new HashMap();
				fielddata.put("targetcode", fieldmap.get(key).toString().toLowerCase());
				fielddata.put("targetname", fieldmap.get(key));
				field.add(fielddata);
			}
			HashMap parameterhistory=new HashMap();
			parameterhistory.put("field", field);
			parameterhistory.put("rs",rs2);
			ret.put ("parameterhistory",parameterhistory);
		} catch (Exception e) {
			e.printStackTrace();
		}
		DBPooL.AddConnection(conn);
		
		return ret;
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="查询位置指标的大概信息")
	public List QueryAddressTargetInfo(@ApiInfo(comment="位置ID")String addressid) {
		String sql="select a.addressid,a.targetid,targetname,designvalue,targetedvalue,threshold,thresholdtype,b.starttime,b.endtime from energy_target_set a\r\n" + 
				"left outer join \r\n" + 
				"(select addressid,targetid,min(uptime) as starttime,max(uptime) as endtime from energy_target_day group by addressid,targetid)b\r\n" + 
				"on a.addressid=b.addressid and a.targetid=b.targetid\r\n" + 
				"where a.addressid='"+addressid+"'  order by a.targetid";
		return DBPooL.QueryTableToListMap(sql);
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="查询位置指标的历史记录")
	public HashMap QueryAddressTargetHistory(@ApiInfo(comment="位置ID")String addressid,
			@ApiInfo(comment="指标ID")String targetid,
			@ApiInfo(comment="开始时间")String starttime,
			@ApiInfo(comment="结束时间")String endtime,
			@ApiInfo(comment="数据类型")String type) {
		String sql="select b.targetname,a.uptime,a.targetid,a.targetvalue from energy_target_"+type+" a \r\n" + 
				"left outer join energy_target_set b on a.addressid=b.addressid and a.targetid=b.targetid\r\n" + 
				"where "+(type.equals("day")?"begintime":"endtime")+">=STR_TO_DATE('"+starttime+"','%Y-%m-%d')\r\n" + 
				"and "+(type.equals( "day ")? "endtime":"begintime")+"<=STR_TO_DATE('"+endtime+"','%Y-%m-%d') and a.addressid='"+addressid+"' " + 
				"and a.targetid in("+targetid+")";
		HashMap ret=new HashMap();
		Connection conn=DBPooL.GetConnection();
		try {
			PreparedStatement psmt=conn.prepareStatement(sql);
			ResultSet rs=psmt.executeQuery();
			HashMap tempmap=new HashMap();
			HashMap fieldmap=new HashMap();
			boolean hasrecord=false;
			while(rs.next()) {
				hasrecord=true;
				HashMap data=tempmap.containsKey(rs.getString("uptime"))?(HashMap) tempmap.get(rs.getString("uptime")):new HashMap();
				data.put(rs.getString("targetid"), rs.getFloat("targetvalue"));
				data.put("uptime", rs.getString("uptime"));
				tempmap.put(rs.getString("uptime"), data);
				fieldmap.put(rs.getString("targetid"), rs.getString("targetname"));
			}
			rs.close();
			rs=null;
			psmt.close();
			psmt=null;
			if(hasrecord) {
			LinkedList rs2=new LinkedList();
			for(Object key:tempmap.keySet()) {
				rs2.add(tempmap.get(key));
			}
			LinkedList field=new LinkedList();
			for(Object key:fieldmap.keySet()) {
				HashMap fielddata=new HashMap();
				fielddata.put("targetid", key.toString().toLowerCase());
				fielddata.put("targetname", fieldmap.get(key));
				field.add(fielddata);
			}
			 
			ret.put("field", field);
			ret.put("rs",rs2);
			}else {
				sql="select * from energy_target_set where addressid='"+addressid+"' and targetid in("+targetid+")";
				psmt=conn.prepareStatement(sql);
				 rs=psmt.executeQuery();
				 LinkedList field=new LinkedList();
				 while(rs.next()) {
						HashMap fielddata=new HashMap();
					 fielddata.put("targetid", rs.getString("targetid"));
						fielddata.put("targetname",rs.getString("targetname"));
						field.add(fielddata);
				 }
				 rs.close();
				 rs=null;
				 psmt.close();
				 ret.put("field", field);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		DBPooL.AddConnection(conn);
		return ret;
	}
    @Permissions(needLogin=true)
	@ApiInfo(comment="分析地址的指标数据")
public List analyseAddressTarget(@ApiInfo(comment="分析地址的指标集合,addressid,targetid;addressid,targetid形式")String targetids,
		@ApiInfo(comment="分析时间集合,time1,time2")String  timeset,
		@ApiInfo(comment="分析时间类型")String datatype) {
		List ret=new LinkedList();
	String a_targetids[]=targetids.split(";");
	String strwhere="";
	for(String s_targetid:a_targetids) {
		String a_targetid[]=s_targetid.split(",");
		strwhere+="or (a.addressid='"+a_targetid[0]+"' and a.targetid='"+a_targetid[1]+"' )";
	}
	strwhere=strwhere.substring(3);
	strwhere="("+strwhere+")";
	timeset=timeset.replaceAll(",", "','");
	strwhere+=" and a.uptime in ('"+timeset+"') ";
	String sql="select addressid,targetid,uptime,targetvalue as val from energy_target_"+datatype+" a where "+strwhere ;
	List data=DBPooL.QueryTableToListMap(sql);
	HashMap targetmap=new HashMap();
	targetmap.put("title", "指标");
	targetmap.put("data",data);
	ret.add(targetmap);
	sql="select a.addressid,a.targetid,a.uptime,a.parametervalue,b.parametername from energy_parameter_day a\r\n" + 
			"left outer join energy_parameter_set b on a.addressid=b.addressid and a.parameterid=b.parameterid where "+strwhere ;
	HashMap tempmap=new HashMap();
	Connection conn=DBPooL.GetConnection();
	try {
		PreparedStatement psmt=conn.prepareStatement(sql);
		ResultSet rs=psmt.executeQuery();
		while(rs.next()) {
			HashMap item=tempmap.containsKey(rs.getString("parametername"))?(HashMap) tempmap.get(rs.getString("parametername")):new HashMap();
			item.put("title", rs.getString("parametername"));
			LinkedList datalist=item.containsKey("data")?(LinkedList) item.get("data"):new LinkedList();
			HashMap dataitem=new HashMap();
			dataitem.put("addressid", rs.getString("addressid"));
			dataitem.put("targetid", rs.getString("targetid"));
			dataitem.put("uptime", rs.getString("uptime"));
			dataitem.put("val", rs.getString("parametervalue"));
			datalist.add(dataitem);
			item.put("data",datalist);
			tempmap.put(rs.getString("parametername"), item);
		}
		rs.close();
		rs=null;
		psmt.close();
		psmt=null;
		for(Object key:tempmap.keySet()) {
			ret.add(tempmap.get(key));
		}
	} catch (Exception e) {
		e.printStackTrace();
	}

	DBPooL.AddConnection(conn);
	return ret;
}
}
