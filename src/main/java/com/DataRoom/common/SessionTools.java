package com.DataRoom.common;



import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSONObject;

import redis.clients.jedis.Jedis;

public class SessionTools {
	public SessionTools(HttpServletRequest _request) {
		request=_request;
	}

	public   HttpServletRequest request;
/**
 * 检查是否登录
 * @return
 */
	public boolean hasLogin() {
		return  getUserId()!=null;
	}
	/**
	 * 检查权限是否相符合
	 * @param needRole
	 * @return
	 */
public boolean hasRole(String needRole) {
	if(needRole==null||needRole.length()<1) {
		return true;
	}
	HttpSession session=request.getSession(); 
	String roles=(String) session.getAttribute("roles");
	return roles!=null&&needRole.indexOf(roles)>=0;
}
/**
 * 记录登录日志
 * @param userid
 */
 public void logloginevent(int userid ) {
	String ip= request.getLocalAddr();
	String sql="insert into "+DBPooL.dbhead+"comm.tb_user_log( id,logtype,logcontent,logtime,ip,userid)values("+DBPooL.dbhead+"comm.tb_log_seq.nextval,'登录','登录',sysdate,?,?)";
	if(DBPooL.getInstance().DBType.equals(DBPooL.MySqlType)) {
		sql="insert into "+DBPooL.dbhead+"comm.tb_user_log(logtype,logcontent,logtime,ip,userid)values('登录','登录',now(),?,?)";
	}else 	if(DBPooL.getInstance().DBType.equals(DBPooL.SqlServerType)) {
		sql="insert into "+DBPooL.dbhead+"comm.dbo.tb_user_log(logtype,logcontent,logtime,ip,userid)values('登录','登录',getdate(),?,?)";
	}
	DBPooL.ExecSql(sql, ip,""+userid);
	System.out.println(DBPooL.getInstance().DBType);
 }
 /**
  * 记录日志
  * @param userid
  * @param logtype
  * @param content
  */
public void logevent(int userid,String logtype,String content) {
	String ip= request.getLocalAddr();
	String sql="insert into "+DBPooL.dbhead+"comm.tb_user_log( id,logtype,logcontent,logtime,ip,userid)values("+DBPooL.dbhead+"comm.tb_log_seq.nextval,?,?,sysdate,?,?)";
	if(DBPooL.getInstance().DBType.equals(DBPooL.MySqlType)) {
		sql="insert into "+DBPooL.dbhead+"comm.tb_user_log(logtype,logcontent,logtime,ip,userid)values(?,?,now(),?,?)";
	}else if(DBPooL.getInstance().DBType.equals(DBPooL.SqlServerType)) {
		sql="insert into "+DBPooL.dbhead+"comm.dbo.tb_user_log(logtype,logcontent,logtime,ip,userid)values(?,?,getdate(),?,?)";
	}
	DBPooL.ExecSql(sql,logtype,content, ip,""+userid);
 }
/**
 * 记录日志
 * @param userid
 * @param logtype
 * @param content
 */
public void logevent(String logtype,String content) {
	String userid=getUserId() ;
	String ip= request.getLocalAddr();
	String sql="insert into "+DBPooL.dbhead+"comm.tb_user_log( id,logtype,logcontent,logtime,ip,userid)values("+DBPooL.dbhead+"comm.tb_log_seq.nextval,?,?,sysdate,?,?)";
	if(DBPooL.getInstance().DBType.equals(DBPooL.MySqlType)) {
		sql="insert into "+DBPooL.dbhead+"comm.tb_user_log(logtype,logcontent,logtime,ip,userid)values(?,?,now(),?,?)";
	}else if(DBPooL.getInstance().DBType.equals(DBPooL.SqlServerType)) {
		sql="insert into "+DBPooL.dbhead+"comm.dbo.tb_user_log(logtype,logcontent,logtime,ip,userid)values(?,?,getdate(),?,?)";
	}
	DBPooL.ExecSql(sql,logtype,content, ip, userid);
}
/**
 * 获得用户ID
 * @return
 */
public String getUserId() {
	HttpSession session=request.getSession();
	String token = request.getParameter("token");
	String sessiontoken=session.getAttribute("token")!=null?(String) session.getAttribute("token"):null;
	String userid=session.getAttribute("userid")!=null?(String) session.getAttribute("userid"):null;
	if(userid==null||(userid!=null&&sessiontoken!=null&&token!=null&&!sessiontoken.equals(token))) {
		//无session有可能是手机客户端
		String mobilerequest = request.getParameter("mobilerequest");
		JSONObject mobilerequestobj = null;
		// 因为手机不能post对像，只能把数据 打包成json放到mobilerequest
		if (mobilerequest != null) {
			try {
				mobilerequestobj = JSONObject.parseObject(mobilerequest);
				token = mobilerequestobj.getString("token");
			} catch (Exception e) {
				// TODO: handle exception
			}

		}
		  userid=getUserId(token);
		  if(userid!=null) {
			  session.setAttribute("userid",userid);
			  session.setAttribute("token",token);
		  }else {
			  session.removeAttribute("userid");
			  session.removeAttribute("token");
		  }
		 
	}
	return userid;
}
/**
 * 根据令牌获得用户ID
 * @return
 */
public String getUserId(String token) {
String url=SpringUtil.getProperty("", "interface.userinfo.url", "");
if(url==null) {
	return null;
}
//通过http请求调用Api接口
String resp=HttpUtil.getInstance().doGet(url+token);
if(resp==null) {
	WriteLog.debug("同步userinfo失败！"+url+"返回空数据");
	return null;
}
	JSONObject json=JSONObject.parseObject(resp);
	if(json==null) {
		WriteLog.debug("同步userinfo失败！"+url+"返回数据无法解析:"+resp);
		return null;
	}
	if(!json.getBooleanValue("success")) {
		WriteLog.debug("同步userinfo失败！"+url+"返回数据提示失败:"+resp);
		return null;
	}
	return json.getJSONObject("data").getString("user_id");
}

/**
 * 获得用户名
 * @return
 */
public String getUserName() {
	HttpSession session=request.getSession();
	String username=(String) session.getAttribute("username");
	if(username==null) {
		//如果session里无数据，可能是手机
		String userid=getUserId();
		if(userid!=null) {
			username=DBPooL.QueryToStr("select username from "+DBPooL.dbhead+"comm.tb_user where  user_id=?",""+userid);
			  if(username!=null) {
				  session.setAttribute("username",username); //放入session中，可以让最近的查询不用去查数据库
			  }
		}
	}
	return username;
}
/**
 * 获得用户的角色
 * @return
 */
public String getUserRoles() {
	HttpSession session=request.getSession();
	String roles=session.getAttribute("roles")!=null?(String) session.getAttribute("roles"):null;
	if(roles==null) {
		//如果session里无数据，可能是手机
		String userid=getUserId();
		if(userid!=null) {
			  roles=DBPooL.QueryToStr("select b.role_name from "+DBPooL.dbhead+"comm.tb_user_role a left outer join "+DBPooL.dbhead+"comm.tb_role b on a.role_id=b.role_id where a.user_id=?",""+userid);
			  if(roles!=null) {
				  session.setAttribute("roles",roles);  //放入session中，可以让最近的查询不用去查数据库
			  }
		}
	}
	return roles;
}
}
