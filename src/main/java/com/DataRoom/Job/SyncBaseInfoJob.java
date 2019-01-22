package com.DataRoom.Job;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import com.DataRoom.common.DBPooL;
import com.DataRoom.common.HttpUtil;
import com.DataRoom.common.Maths;
import com.DataRoom.common.SpringUtil;
import com.DataRoom.common.WriteLog;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * 
 * 同步基础信息
 *
 */

public class SyncBaseInfoJob extends Thread{


 
public static boolean syncnow=false;
private  int sync_address_freq;
@Override
public void run() {
	try {
		sleep(1000*30);
	} catch (InterruptedException e) {
		e.printStackTrace();
	}
	String s_sync_address_freq=SpringUtil.getProperty("", "interface.address.freq", "");
	if(s_sync_address_freq==null) {
		sync_address_freq=60;
	}else {
		sync_address_freq=Integer.parseInt(s_sync_address_freq)*12;
		if(sync_address_freq<0) {
			sync_address_freq=60;
		}
	}
	long icount=0;
	while (true) {
		if(syncnow||icount%sync_address_freq==0) {
			long starttime=System.currentTimeMillis();
			syncAddress();
			syncDevice();
			syncnow=false;
			WriteLog.debug("Sync BaseInfo dur:"+(System.currentTimeMillis()-starttime));
		}
		icount++;
		if(icount>8223372036854775807l) {
			icount=0;
		}
		try {
			sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}

/**
 * 同步Address信息
 */
public void syncAddress() {
//接口地址
String	addressUrl= SpringUtil.getProperty("", "interface.address.url", "");
//过虑类型
String  filtertype=SpringUtil.getProperty("", "filter.energy.addresstype", "DC,FOOL,ROOM,BUILD");
if(filtertype==null||filtertype.length()<1) {
	//如果过滤类型为空，则不同步
	return;
}
HashMap<String,Integer> addresstypemap=new HashMap<String,Integer>();
String a_filtertype[]=filtertype.split(",");
for(int i=0;i<a_filtertype.length;i++) {
	addresstypemap.put(a_filtertype[i], i+1);
}
	if(addressUrl==null) {
		return;
	}
	//通过http请求调用Api接口
	String resp=HttpUtil.getInstance().doGet(addressUrl);
	//System.out.println(resp);
	if(resp==null) {
		WriteLog.debug("同步Address失败！"+addressUrl+"返回空数据");
		return ;
	}
		JSONObject json=JSONObject.parseObject(resp);
		if(json==null) {
			WriteLog.debug("同步Address失败！"+addressUrl+"返回数据无法解析:"+resp);
			return ;
		}
		if(!json.getBooleanValue("success")) {
			WriteLog.debug("同步Address失败！"+addressUrl+"返回数据提示失败:"+resp);
			return ;
		}
		boolean haschange=false;
		JSONArray dataarray=json.getJSONArray("data") ;
		List<HashMap<String,String>> dblist=DBPooL.QueryTableToListMap("select * from energy_address");
		for(HashMap<String,String> item:dblist) {
			boolean isfound=false;
			 for(int i=0;i<dataarray.size();i++) {
				 JSONObject dataitem=dataarray.getJSONObject(i);
				 if(!addresstypemap.containsKey(dataitem.get("rs_type"))) {
					continue; 
				 }
				 String addresstype =""+addresstypemap.get(dataitem.get("rs_type"));
				 if(item.get("addressid").equals(dataitem.getString("id"))) {
					 if(!item.get("addressname").equals(dataitem.getString("rs_name"))||!item.get("type").equals(addresstype)
							 ||!item.get("seq").equals(dataitem.getString("idx"))||
							 (item.get("parentid")==null&&dataitem.getString("parent_rs_id")!=null)
							 ||	(item.get("parentid")!=null&&dataitem.getString("parent_rs_id")==null)
							 ||(item.get("parentid")!=null&&dataitem.getString("parent_rs_id")!=null&&!item.get("parentid").equals(dataitem.getString("parent_rs_id")))
							 ) {
						 haschange=true;
						 //如果addressid相同，addressname,type,parentid不同，则做数据更新
						 DBPooL.ExecSql("update energy_address set addressname=?,type=?,parentid=?,seq=? where addressid=?", dataitem.getString("rs_name"),addresstype,dataitem.getString("parent_rs_id"),dataitem.getString("idx"),dataitem.getString("id"));
					 }
					 dataarray.remove(i);
					 isfound=true;
					 break;
				 }
			 }
			 if(!isfound) {
				 haschange=true;
				 //如果在数据库中存在，在接口数据不存在，则做删除操作
				 DBPooL.ExecSql("delete from energy_address where addressid=?", item.get("addressid"));
			 }
		}
		 for(int i=0;i<dataarray.size();i++) {
			 JSONObject dataitem=dataarray.getJSONObject(i);
			 if(!addresstypemap.containsKey(dataitem.get("rs_type"))) {
					continue; 
				 }
				 String addresstype =""+addresstypemap.get(dataitem.get("rs_type"));
			
			 haschange=true;
			 //如果在数据库中不存在，在接口中存在，则做新增
			 DBPooL.ExecSql("insert into energy_address(addressid,addressname,type,parentid,seq )values(?,?,?,?,?)",dataitem.getString("id"),dataitem.getString("rs_name"),addresstype,dataitem.getString("parent_rs_id"),dataitem.getString("idx"));
		 } 
		 if(haschange) {
			 //更新目录级别，最多４级
			 DBPooL.ExecSql("update energy_address set lvl=1 where parentid is null or parentid not in (select addressid from (select addressid from energy_address ) t)"); 
			 DBPooL.ExecSql("update energy_address set lvl=2 where parentid is not null and  parentid   in (select addressid from (select addressid from energy_address where lvl=1) t)");
			 DBPooL.ExecSql("update energy_address set lvl=3 where parentid is not null and parentid   in (select addressid from (select addressid from energy_address where lvl=2) t)");
			 DBPooL.ExecSql("update energy_address set lvl=4 where parentid is not null and parentid   in (select addressid from (select addressid from energy_address where lvl=3) t)");
			 DBPooL.ExecSql("delete from  energy_address  where lvl=1 and type!=1 ");
		 }else {
			 System.out.println("Address not Change");
		 }
}
/**
 * 同步设备ID
 * @param addressid
 */
public void syncDevice( ) {
	String url= SpringUtil.getProperty("", "interface.device.url", "");
	String version= SpringUtil.getProperty("", "interface.version", "");
	if(url==null) {
		return;
	}
	//通过http请求调用Api接口
	String resp=HttpUtil.getInstance().doGet(url);
	//System.out.println(resp);
	if(resp==null) {
		WriteLog.debug("同步Device失败！"+url+"返回空数据");
		return ;
	}
		JSONObject json=JSONObject.parseObject(resp);
		if(json==null) {
			WriteLog.debug("同步Device失败！"+url+"返回数据无法解析:"+resp);
			return ;
		}
		if(!json.getBooleanValue("success")) {
			WriteLog.debug("同步Device失败！"+url+"返回数据提示失败:"+resp);
			return ;
		}
		if(version.equalsIgnoreCase("2")) {
			//新版接口
			boolean haschange=false;
			JSONArray dataarray=json.getJSONArray("data") ;
			List<HashMap<String,String>> dblist=DBPooL.QueryTableToListMap("select * from energy_device");
			for(HashMap<String,String> item:dblist) {
				boolean isfound=false;
				 for(int i=0;i<dataarray.size();i++) {
					 JSONObject dataitem=dataarray.getJSONObject(i);
					 if(item.get("deviceid").equals(dataitem.getString("ObjectId")) ) {
						 if(!item.get("devicename").equals(dataitem.getString("ObjectName"))   ) {
							 haschange=true;
							 //如果addressid相同，addressname,type,parentid不同，则做数据更新
							 DBPooL.ExecSql("update energy_device set devicename=? where deviceid=?  ", dataitem.getString("ObjectName"),dataitem.getString("ObjectId") );
						 }
						 dataarray.remove(i);
						 isfound=true;
						 syncPoints(dataitem.getString("ControllerId"),item.get("deviceid"));
						 break;
					 }
				 }
				 if(!isfound) {
					 haschange=true;
					 //如果在数据库中存在，在接口数据不存在，则做删除操作
					 DBPooL.ExecSql("delete from energy_device where   deviceid=?",  item.get("deviceid"));
				 }
			}
			 for(int i=0;i<dataarray.size();i++) {
				 JSONObject dataitem=dataarray.getJSONObject(i);
				 haschange=true;
				 //如果在数据库中不存在，在接口中存在，则做新增
				 DBPooL.ExecSql("insert into energy_device(addressid,deviceid,devicename,controllerid,controllername )values(?,?,?,?,?)","",dataitem.getString("ObjectId"),dataitem.getString("ObjectName"),"","");
				 syncPoints(dataitem.getString("ControllerId"),dataitem.getString("Id"));
			 } 
			 if(!haschange) {
				 System.out.println("Device not Change");
			 }
		}else {
			//如果是老版本
		boolean haschange=false;
		JSONArray dataarray=json.getJSONObject("data").getJSONArray("Rows");
		List<HashMap<String,String>> dblist=DBPooL.QueryTableToListMap("select * from energy_device");
		for(HashMap<String,String> item:dblist) {
			boolean isfound=false;
			 for(int i=0;i<dataarray.size();i++) {
				 JSONObject dataitem=dataarray.getJSONObject(i);
				 if(item.get("deviceid").equals(dataitem.getString("Id"))&&item.get("addressid").equals(dataitem.getString("AddressId"))) {
					 if(!item.get("devicename").equals(dataitem.getString("Name"))||!item.get("controllerid").equals(dataitem.getString("ControllerId"))
							 ||!item.get("controllername").equals(dataitem.getString("ControllerName"))  ) {
						 haschange=true;
						 //如果addressid相同，addressname,type,parentid不同，则做数据更新
						 DBPooL.ExecSql("update energy_device set devicename=?,controllerid=?,controllername=? where deviceid=? and addressid=?", dataitem.getString("Name"),dataitem.getString("ControllerId"),dataitem.getString("ControllerName"),dataitem.getString("Id"),dataitem.getString("AddressId"));
					 }
					 dataarray.remove(i);
					 isfound=true;
					 syncPoints(dataitem.getString("ControllerId"),item.get("deviceid"));
					 break;
				 }
			 }
			 if(!isfound) {
				 haschange=true;
				 //如果在数据库中存在，在接口数据不存在，则做删除操作
				 DBPooL.ExecSql("delete from energy_device where addressid=? and deviceid=?", item.get("addressid"),item.get("deviceid"));
			 }
		}
		 for(int i=0;i<dataarray.size();i++) {
			 JSONObject dataitem=dataarray.getJSONObject(i);
			 haschange=true;
			 //如果在数据库中不存在，在接口中存在，则做新增
			 DBPooL.ExecSql("insert into energy_device(addressid,deviceid,devicename,controllerid,controllername )values(?,?,?,?,?)",dataitem.getString("AddressId"),dataitem.getString("Id"),dataitem.getString("Name"),dataitem.getString("ControllerId"),dataitem.getString("ControllerName"));
			 syncPoints(dataitem.getString("ControllerId"),dataitem.getString("Id"));
		 } 
		 if(!haschange) {
			 System.out.println("Device not Change");
		 }
		 }
}
/**
 * 同步点位表
 * @param controllerid 控制器ID
 * @param deviceid 设备ID
 */
public void syncPoints(String controllerid,String deviceid) {
	String url= SpringUtil.getProperty("", "interface.points.url", "");
	String version= SpringUtil.getProperty("", "interface.version", "");
	if(url==null) {
		return;
	}
	url=url+"&Id="+controllerid+"."+deviceid;
	//通过http请求调用Api接口
	String resp=HttpUtil.getInstance().doGet(url);
	//System.out.println(resp);
	if(resp==null) {
		WriteLog.debug("同步Points失败！"+url+"返回空数据");
		return ;
	}
		JSONObject json=JSONObject.parseObject(resp);
		if(json==null) {
			WriteLog.debug("同步Points失败！"+url+"返回数据无法解析:"+resp);
			return ;
		}
		if(!json.getBooleanValue("success")) {
			WriteLog.debug("同步Points失败！"+url+"返回数据提示失败:"+resp);
			return ;
		}
		if(version.equalsIgnoreCase("2")) {
			//如果是新版接口
			boolean haschange=false;
			JSONArray dataarray=json.getJSONArray("data");
			List<HashMap<String,String>> dblist=DBPooL.QueryTableToListMap("select * from energy_digitaldict where   deviceid='"+deviceid+"'");
			for(HashMap<String,String> item:dblist) {
				boolean isfound=false;
				 for(int i=0;i<dataarray.size();i++) {
					 JSONObject dataitem=dataarray.getJSONObject(i);
					 if(item.get("id").equals(dataitem.getString("PropertyId")) &&item.get("deviceid").equals(dataitem.getString("ObjectId"))&&dataitem.getString("Provider").equalsIgnoreCase("Plugin.Env.Providers.Data.Device.Property_Point")) {
						 if(!item.get("name").equals(dataitem.getString("PropertyName"))  ) {
							 haschange=true;
							 //如果addressid相同，addressname,type,parentid不同，则做数据更新
							 DBPooL.ExecSql("update energy_digitaldict set `name`=? where id=?  and deviceid=?", dataitem.getString("PropertyName"), dataitem.getString("PropertyId"),dataitem.getString("ObjectId"));
						 }
						 dataarray.remove(i);
						 isfound=true;
						 break;
					 }
				 }
				 if(!isfound) {
					 haschange=true;
					 //如果在数据库中存在，在接口数据不存在，则做删除操作
					 DBPooL.ExecSql("delete from energy_digitaldict where id=? and   deviceid=?", item.get("PropertyId") ,item.get("ObjectId"));
				 }
			}
			 for(int i=0;i<dataarray.size();i++) {
				 JSONObject dataitem=dataarray.getJSONObject(i);
				 if(dataitem.getString("Provider").equalsIgnoreCase("Plugin.Env.Providers.Data.Device.Property_Point")) {
				 haschange=true;
				 //如果在数据库中不存在，在接口中存在，则做新增
				 DBPooL.ExecSql("insert into energy_digitaldict(id,controllerid,deviceid,`name`  )values(?,?,?,?)",dataitem.getString("PropertyId"),"",dataitem.getString("ObjectId"),dataitem.getString("PropertyName") );
			 } 
				 }
			 if(!haschange) {
				 System.out.println("digitaldict not Change");
			 }	
		}else {
		boolean haschange=false;
		JSONArray dataarray=json.getJSONObject("data").getJSONArray("Rows");
		List<HashMap<String,String>> dblist=DBPooL.QueryTableToListMap("select * from energy_digitaldict where controllerid='"+controllerid+"' and deviceid='"+deviceid+"'");
		for(HashMap<String,String> item:dblist) {
			boolean isfound=false;
			 for(int i=0;i<dataarray.size();i++) {
				 JSONObject dataitem=dataarray.getJSONObject(i);
				 if(item.get("id").equals(dataitem.getString("Id"))&&item.get("controllerid").equals(dataitem.getString("ControllerId"))&&item.get("deviceid").equals(dataitem.getString("DeviceId"))) {
					 if(!item.get("name").equals(dataitem.getString("Name"))  ) {
						 haschange=true;
						 //如果addressid相同，addressname,type,parentid不同，则做数据更新
						 DBPooL.ExecSql("update energy_digitaldict set `name`=? where id=? and controllerid=? and deviceid=?", dataitem.getString("Name"),dataitem.getString("ControllerId"),dataitem.getString("DeviceId"));
					 }
					 dataarray.remove(i);
					 isfound=true;
					 break;
				 }
			 }
			 if(!isfound) {
				 haschange=true;
				 //如果在数据库中存在，在接口数据不存在，则做删除操作
				 DBPooL.ExecSql("delete from energy_digitaldict where id=? and controllerid=? and deviceid=?", item.get("id"),item.get("controllerid"),item.get("deviceid"));
			 }
		}
		 for(int i=0;i<dataarray.size();i++) {
			 JSONObject dataitem=dataarray.getJSONObject(i);
			 haschange=true;
			 //如果在数据库中不存在，在接口中存在，则做新增
			 DBPooL.ExecSql("insert into energy_digitaldict(id,controllerid,deviceid,`name`  )values(?,?,?,?)",dataitem.getString("Id"),dataitem.getString("ControllerId"),dataitem.getString("DeviceId"),dataitem.getString("Name") );
		 } 
		 if(!haschange) {
			 System.out.println("digitaldict not Change");
		 }
		 }
}
}
