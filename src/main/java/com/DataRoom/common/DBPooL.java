package com.DataRoom.common;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import javax.sql.DataSource;

//import oracle.jdbc.OracleCallableStatement;
//import oracle.jdbc.Types;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.boot.bind.RelaxedPropertyResolver;

import com.alibaba.druid.pool.DruidDataSource;



public class DBPooL {
	public static String dbhead="robot";
	/**
	 * 数据库连接字符串
	 */
	private String connstr;
	private Connection staticconn = null;
	/**
	 * 用户名
	 */
	private String username;
	/**
	 * 密码
	 */
	private String password;
	public static Logger LOGGER = Logger.getLogger(DBPooL.class);
	private LinkedList<Connection> dataLink = new LinkedList<Connection>();
	public String InstanceName = "MISC";
	private static HashMap<String, DBPooL> InstanceMap = new HashMap<String, DBPooL>();
	private volatile static DBPooL Instance = null;
	public static long maxproc = 0;
	public static String maxprosql = "";
	public static DataSource dataSource;
	public static HashMap<String,DataSource> dataSourceMap=new HashMap<String,DataSource>();
	public static DBPooL getInstance() {
		if(InstanceMap==null){
			System.exit(0);
		}
		if (Instance == null) {
			synchronized (DBPooL.class) {

				Instance = new DBPooL();
//				Instance.dataLink.add(initconn());

			}
		}
		return Instance;
	}

	public static String SqlServerType = "SqlServer";
	public static String OracleType = "Oracle";
	public static String MySqlType = "MySql";
	public String DBType = "Oracle";// 数据库类型

	/**
	 * 
	 * 记录最大耗时SQL
	 * 
	 * @param proctime
	 * @param sql
	 */
	public static void recordproctime(long proctime, String sql) {
		if (proctime > maxproc) {
			maxproc = proctime;
			maxprosql = sql;
			System.out.println("MaxProcTime:" + proctime + "Sql:" + sql);
		}
		//System.out.println("ProcTime:" + proctime + "Sql:" + sql);
	}

	/**
	 * 根据实例名来获得实例
	 * 
	 * @param Instancename
	 * @return
	 */
	public static DBPooL getInstance(String Instancename) {
		if(InstanceMap==null){
			System.exit(0);
		}
		if(Instancename.equalsIgnoreCase("CSC")){
			return getInstance();
		}
		DBPooL AInstance = InstanceMap.get(Instancename);
		if (AInstance == null) {
			AInstance = new DBPooL();
			AInstance.InstanceName = Instancename;
			InstanceMap.put(Instancename, AInstance);
		}
		return AInstance;
	}

	public static String getUsername() {
		return getInstance().username;
	}

	public static String getUsername(String Instancename) {
		return getInstance(Instancename).username;
	}

	public static String getConnstr() {
		return getInstance().connstr;
	}

	public static String getConnstr(String Instancename) {
		return getInstance(Instancename).connstr;
	}

	public static void setPassword(String _password) {
		getInstance().password = _password;
	}

	public static void setPassword(String _password, String Instancename) {
		getInstance(Instancename).password = _password;
	}

	public static void setUsername(String _username) {
		getInstance().username = _username;
	}

	public static void setUsername(String _username, String Instancename) {
		getInstance(Instancename).username = _username;
	}

	public static void setConnstr(String _connstr) {
		getInstance().connstr = _connstr;
	}

	public static void setConnstr(String _connstr, String Instancename) {
		getInstance(Instancename).connstr = _connstr;
	}

	public static String getPassword() {
		return getInstance().password;
	}

	public static String getPassword(String Instancename) {
		return getInstance(Instancename).password;
	}

	private DBPooL() {
	}

	/**
	 * 获取数据库连接
	 * 
	 * @return
	 */
	public static Connection GetConnection() {
		Connection conn = null;

		synchronized (getInstance().dataLink) {
			if (getInstance().dataLink.size() > 5) {
				conn = getInstance().dataLink.removeFirst();
				CloseConnection(conn);
			}
			if (getInstance().dataLink.size() > 0) {
				conn = getInstance().dataLink.removeFirst();
				try {
					if (conn.isClosed()) {
						conn = initconn();
					} else {
						if (getInstance().DBType.equals(MySqlType)) {
							try {
								PreparedStatement psmt = conn
										.prepareStatement("select 1");
								ResultSet rs = psmt.executeQuery();
								rs.close();
								rs = null;
								psmt.close();
								psmt = null;
							} catch (Exception e) {
								try {
									conn.close();
									conn = null;
								} catch (Exception e2) {

								}

								conn = initconn();
							}

						}
					}
				} catch (SQLException e) {
					conn = initconn();
				}
			} else {
				conn = initconn();
			}
		}
		return conn;

	}

	/**
	 * 根据实例获取数据库，常用于连接多个数据库
	 * 
	 * @param Instancename
	 * @return
	 */
	public static Connection GetConnection(String Instancename) {
		if(Instancename.equalsIgnoreCase("CSC")){
			return GetConnection();
		}
		Connection conn = null;
		try {
			synchronized (getInstance(Instancename).dataLink) {
				if (getInstance(Instancename).dataLink.size() > 5) {
					conn = getInstance(Instancename).dataLink
							.removeFirst();
					CloseConnection(conn);
				}
				if (getInstance(Instancename).dataLink.size() > 0) {
					conn = getInstance(Instancename).dataLink
							.removeFirst();
					try {
						if (conn.isClosed()) {
							conn = initconn(Instancename);
						} else {
							if (getInstance(Instancename).DBType
									.equals(MySqlType)) {
								try {
									PreparedStatement psmt = conn
											.prepareStatement("select 1");
									ResultSet rs = psmt.executeQuery();
									rs.close();
									rs = null;
									psmt.close();
									psmt = null;
								} catch (Exception e) {
									try {
										conn.close();
										conn = null;
									} catch (Exception e2) {

									}

									conn = initconn(Instancename);
								}

							}
						}
					} catch (SQLException e) {
						conn = initconn(Instancename);
					}
				} else {
					conn = initconn(Instancename);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;

	}

	/**
	 * 全局静态数据连接
	 * 
	 * @return
	 */
	public static Connection GetStaticConnection() {
		if (getInstance().staticconn == null) {
			getInstance().staticconn = GetConnection();
		}
		return getInstance().staticconn;
	}

	public static Connection GetStaticConnection(String Instancename) {
		if (getInstance(Instancename).staticconn == null) {
			getInstance(Instancename).staticconn = GetConnection(Instancename);
		}
		return getInstance(Instancename).staticconn;
	}

	/**
	 * 归还数据库连接
	 * 
	 * @param conn
	 */
	public static void AddConnection(Connection conn) {
		if (conn != null) {
			synchronized (getInstance().dataLink) {
				getInstance().dataLink.addLast(conn);
			}
		}

	}

	/**
	 * 归还数据库连接，用于多数据库
	 * 
	 * @param conn
	 * @param Instancename
	 */
	public static void AddConnection(Connection conn, String Instancename) {
		if(Instancename.equalsIgnoreCase("CSC")){
			AddConnection(conn);
		}
		if (conn != null) {
			synchronized (getInstance(Instancename).dataLink) {
				getInstance(Instancename).dataLink.addLast(conn);
			}
		}

	}

	/**
	 * 初始化数据库连接
	 * 
	 * @return
	 */
	@SuppressWarnings("static-access")
	private static Connection initconn() {
		// if (1 == 1) {
		// return initconnfromspring();
		// }
		Connection conn = null;
		long starttime=System.currentTimeMillis();
		long retry = 0;
		while (conn == null) {
			 while(dataSource==null) {
				 dataSource=initDataSource(null);
			 }
			try {
				
				conn= dataSource.getConnection();
				LOGGER.debug("initconn=="+(System.currentTimeMillis()-starttime));
				return conn;
			}  catch (Exception e) {
				System.out
						.println("Connect DataBase has Error!Two Sec try Connect: "
								+ e.getMessage());
				conn = null;
			}
			retry++;
			if (retry > 600) {
				retry = 1;
			}
			try {
				Thread.sleep(retry * 100);
			} catch (InterruptedException e) {

				e.printStackTrace();
			}
		}
		return conn;
	}
/**
 * 从druid里获得数据源
 * @param Instancename
 * @return
 */
	private static DataSource initDataSource(String  Instancename) {
		RelaxedPropertyResolver propertyResolver =SpringUtil.getpropertyResolver("spring.datasource."+(Instancename!=null?Instancename+".":""));
		String url=propertyResolver.getProperty("url");
		if(url==null) {
			LOGGER.error("init "+(Instancename==null?"default":Instancename)+" DataSource Error,config not found,using default....");
			propertyResolver=SpringUtil.getpropertyResolver("spring.datasource.");
			url=propertyResolver.getProperty("url");
			if(url==null) {
				LOGGER.error("init "+(Instancename==null?"default":Instancename)+" DataSource Error,default config not found !");
				return null;
			}
		}
		DruidDataSource datasource = new DruidDataSource();
		
		datasource.setUrl(url);
	
	  if (url.indexOf("jdbc:oracle")>=0) {
			 if(Instancename==null) {
				 getInstance().DBType = OracleType;
			 }else {
			getInstance(Instancename).DBType = OracleType;
			}
		} else if (url.indexOf("jdbc:mysql")>=0) {
			 if(Instancename==null) {
				 getInstance().DBType = MySqlType;
			 }else {
			getInstance(Instancename).DBType = MySqlType;
			}
		} else {
			 if(Instancename==null) {
				 getInstance().DBType = SqlServerType;
			 }else {
			getInstance(Instancename).DBType = SqlServerType;
			} 
		}
		datasource.setUsername(propertyResolver.getProperty("username"));
		datasource.setPassword(propertyResolver.getProperty("password"));
		if(propertyResolver.getProperty("dbhead")!=null) {
		DBPooL.dbhead=propertyResolver.getProperty("dbhead");
		}
		datasource.setDriverClassName(propertyResolver.getProperty("driver-class-name"));
		datasource.setInitialSize(Integer.parseInt(propertyResolver.getProperty("initialSize","5")));
		datasource.setMinIdle(Integer.parseInt(propertyResolver.getProperty("minIdle","1")));
		datasource.setMaxActive(Integer.parseInt(propertyResolver.getProperty("maxActive","20")));
		datasource.setMaxWait(Integer.parseInt(propertyResolver.getProperty("maxWait","60000")));
		datasource.setTimeBetweenEvictionRunsMillis(Integer.parseInt(propertyResolver.getProperty("timeBetweenEvictionRunsMillis","60000")));
		datasource.setMinEvictableIdleTimeMillis(Integer.parseInt(propertyResolver.getProperty("minEvictableIdleTimeMillis","300000")));

		datasource.setValidationQuery(propertyResolver.getProperty("validationQuery"));
		datasource.setTestWhileIdle(Boolean.parseBoolean(propertyResolver.getProperty("testWhileIdle","false")));
		datasource.setTestOnBorrow(Boolean.parseBoolean(propertyResolver.getProperty("testOnBorrow","false")));
		datasource.setTestOnReturn(Boolean.parseBoolean(propertyResolver.getProperty("testOnReturn","false")));
		datasource.setPoolPreparedStatements(Boolean.parseBoolean(propertyResolver.getProperty("poolPreparedStatements","false")));
		try {
			datasource.setFilters(propertyResolver.getProperty("filters","wall,stat"));
		} catch (SQLException e) {
			LOGGER.error("druid configuration initialization filter", e);
		}
	
		return datasource;
	}

	/**
	 * 初始化数据库连接
	 * 
	 * @return
	 */
	@SuppressWarnings("static-access")
	private static Connection initconn(String Instancename) {
		Connection conn = null;
		long retry = 0;
		while (conn == null) {
			DataSource InstandataSource=dataSourceMap.get(Instancename);
			 while(InstandataSource==null) {
				 InstandataSource=initDataSource(Instancename);
				 dataSourceMap.put(Instancename, InstandataSource);
			 }
			try {
				long starttime=System.currentTimeMillis();
				conn= InstandataSource.getConnection();
				return conn;
			}  catch (Exception e) {
				System.out
						.println("Connect DataBase has Error!Two Sec try Connect: "
								+ e.getMessage());
				conn = null;
			}
			retry++;
			if (retry > 600) {
				retry = 1;
			}
			try {
				Thread.sleep(retry * 100);
			} catch (InterruptedException e) {

				e.printStackTrace();
			}
		}
		return conn;
	}

	/**
	 * 关闭数据库连接
	 * 
	 * @param conn
	 */
	public static void CloseConnection(Connection conn) {
		if (conn != null) {
			try {
				conn.close();
			} catch (Exception e) {

				e.printStackTrace();
			}
			conn = null;
		}
	}

	/**
	 * 执行SQL查询语句，并得到一个int型结果
	 * 
	 * @param sql
	 * @return
	 */
	public static int QueryToInt(String sql) {
		int ret = 0;
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
		
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			if (rs.next()) {
				ret = rs.getInt(1);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);

		} catch (Exception e) {
			System.out.println(sql);
			e.printStackTrace();
			DBPooL.CloseConnection(conn);

		}
		return ret;
	}

	/**
	 * 执行SQL查询语句，并得到一个int型结果
	 * 
	 * @param sql
	 * @return
	 */
	public static int QueryToInt(String sql, Connection conn) {
		int ret = 0;

		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			if (rs.next()) {
				ret = rs.getInt(1);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.CloseConnection(conn);

		} catch (Exception e) {
			System.out.println(sql);
			e.printStackTrace();
			DBPooL.CloseConnection(conn);

		}
		return ret;
	}

	/**
	 * 执行SQL查询语句，并得到一个int型结果
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static int QueryToInt(String sql, String... arg) {
		int ret = 0;
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			for (int i = 1; i <= arg.length; i++) {
				psmt.setString(i, arg[i - 1]);
			}
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			if (rs.next()) {
				ret = rs.getInt(1);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);

		} catch (Exception e) {
			System.out.println(sql);
			e.printStackTrace();
			DBPooL.CloseConnection(conn);

		}
		return ret;
	}

	/**
	 * 执行SQL查询语句，并得到一个String型结果
	 * 
	 * @param sql
	 * @return
	 */
	public static String QueryToStr(String sql) {
		String ret = null;
		 
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);

			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			if (rs.next()) {
				ret = rs.getString(1);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);

		} catch (Exception e) {
			System.out.println(sql);
			e.printStackTrace();
			DBPooL.CloseConnection(conn);

		}
		return ret;
	}

	/**
	 * 执行SQL查询语句，并得到一个String型结果
	 * 
	 * @param sql
	 * @return
	 */
	public static String QueryToStr(String sql, Connection conn) {
		String ret = null;
		

		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);

			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			if (rs.next()) {
				ret = rs.getString(1);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.CloseConnection(conn);

		} catch (Exception e) {
			System.out.println(sql);
			e.printStackTrace();
			DBPooL.CloseConnection(conn);

		}
		return ret;
	}

	/**
	 * 执行SQL查询语句，并得到一个String型结果
	 * 
	 * @param sql
	 * @return
	 */
	public static List<String> QueryToStrList(String sql) {
		List<String> retList = new ArrayList<String>();
		
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);

			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			String string;
			while (rs.next()) {
				string = rs.getString(1);
				retList.add(string);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);

		} catch (Exception e) {
			System.out.println(sql);
			e.printStackTrace();
			DBPooL.CloseConnection(conn);

		}
		return retList;
	}

	/**
	 * 执行SQL查询语句，并得到一个String型结果
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static String QueryToStr(String sql, String... arg) {
		String ret = null;
		
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			for (int i = 1; i <= arg.length; i++) {
				psmt.setString(i, arg[i - 1]);

			}
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			if (rs.next()) {
				ret = rs.getString(1);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);

		} catch (Exception e) {
			System.out.println(sql);
			e.printStackTrace();
			DBPooL.CloseConnection(conn);

		}
		return ret;
	}

	/**
	 * 执行SQL语句
	 * 
	 * @param sql
	 * @param arg
	 */
	public static boolean ExecSql(String sql, String... arg) {

		//System.out.print(sql);
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			for (int i = 1; i <= arg.length; i++) {
				psmt.setString(i, arg[i - 1]);
			//	System.out.print(arg[i - 1] + " \t");
			}
			//System.out.println();
			psmt.execute();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);

		} catch (Exception e) {
			System.out.print(sql);
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
			return false;

		}
		return true;
	}

	/**
	 * 执行SQL语句
	 * 
	 * @param sql
	 * @param arg
	 */
	public static boolean ExecOtherInstanceSql(String Instance, String sql,
			String... arg) {

		System.out.print(sql);
		Connection conn = DBPooL.GetConnection(Instance);
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			for (int i = 1; arg!=null&&i <= arg.length; i++) {
				psmt.setString(i, arg[i - 1]);
				System.out.print(arg[i - 1] + " \t");
			}
			System.out.println();
			psmt.execute();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn, Instance);

		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
			return false;

		}
		return true;
	}

	/**
	 * 执行SQL语句
	 * 
	 * @param sql
	 * @param arg
	 */
	@SuppressWarnings("rawtypes")
	public static boolean ExecSql(String sql, LinkedList arg) {

		System.out.print(sql);
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			for (int i = 1; i <= arg.size(); i++) {
				psmt.setString(i, arg.get(i - 1) != null ? arg.get(i - 1)
						.toString() : null);
				System.out.print(arg.get(i - 1) + " \t");
			}
			System.out.println();
			psmt.execute();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);

		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
			return false;

		}
		return true;
	}

	/**
	 * 查询结果到ListMap形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static List<HashMap<String, String>> QueryToListMap(String sql,
			String... arg) {
		System.out.println(sql);
		List<HashMap<String, String>> ret = new LinkedList<HashMap<String, String>>();
		if (arg == null)
			return ret;
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			while (rs.next()) {
				HashMap<String, String> data = new HashMap<String, String>();
				for (int i = 0; i < arg.length; i++) {
					data.put(arg[i], rs.getString(arg[i]));
				}

				ret.add(data);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);

		}
		return ret;

	}

	/**
	 * 查询结果到ListMap形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static List<HashMap<String, String>> QueryTableToListMap(String sql,
			String instancename) {
		System.out.println(sql);
		List<HashMap<String, String>> ret = new LinkedList<HashMap<String, String>>();

		Connection conn = DBPooL.GetConnection(instancename);
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			while (rs.next()) {
				HashMap<String, String> data = new HashMap<String, String>();
				ResultSetMetaData rm = rs.getMetaData();

				for (int i = 0; i < rm.getColumnCount(); i++) {
					data.put(rm.getColumnName(i + 1).toLowerCase(),
							rs.getString(rm.getColumnName(i + 1)));
				}

				ret.add(data);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn, instancename);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	/**
	 * 查询结果到ListMap形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static List<HashMap<String, String>> QueryTableToListMap(String sql) {
		
		List<HashMap<String, String>> ret = new LinkedList<HashMap<String, String>>();

		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			java.sql.ResultSet rs = psmt.executeQuery();
			if (rs != null) {
				recordproctime(System.currentTimeMillis() - starttime, sql);
				ResultSetMetaData rm = rs.getMetaData();
				HashMap<String, String> data = null;
				while (rs.next()) {
					data = new HashMap<String, String>();
					for (int i = 0; i < rm.getColumnCount(); i++) {
						data.put(rm.getColumnLabel(i + 1).toLowerCase(),
								rs.getString( (i + 1)));
					}

					ret.add(data);
				}
				rs.close();
				rs = null;
			}
			psmt.close();
			psmt = null;
			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			System.out.println(sql);
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	public static List<HashMap<String, String>> QueryTableToListMap(String sql,
			String... args) {
	
		List<HashMap<String, String>> ret = new LinkedList<HashMap<String, String>>();

		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			HashMap<String, String> data = null;
			ResultSetMetaData rm = rs.getMetaData();
			while (rs.next()) {
				data = new HashMap<String, String>();
				if (args != null) {
					for (int i = 0; i < args.length; i++) {
						data.put(args[i], rs.getString(args[i]));
					}
				} else {
					for (int i = 0; i < rm.getColumnCount(); i++) {
						data.put(rm.getColumnLabel(i + 1).toLowerCase(),
								rs.getString((i + 1)));
					}
				}
				ret.add(data);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			System.out.println(sql);
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	/**
	 * 查询结果到ListMap形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static List<Map<Object, Object>> QueryTableToListMapObject(String sql) {
		System.out.println(sql);
		List<Map<Object, Object>> ret = new LinkedList<Map<Object, Object>>();

		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			while (rs.next()) {
				HashMap<Object, Object> data = new HashMap<Object, Object>();
				ResultSetMetaData rm = rs.getMetaData();

				for (int i = 0; i < rm.getColumnCount(); i++) {
					data.put(rm.getColumnName(i + 1).toLowerCase(),
							rs.getString(rm.getColumnName(i + 1)));
				}

				ret.add(data);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	/**
	 * 查询结果到ListMap形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static List<Map<Object, Object>> QueryTableToListMapObject(
			String sql, String instancename) {
		System.out.println(instancename + " ==>" + sql);
		List<Map<Object, Object>> ret = new LinkedList<Map<Object, Object>>();

		Connection conn = DBPooL.GetConnection(instancename);
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			while (rs.next()) {
				HashMap<Object, Object> data = new HashMap<Object, Object>();
				ResultSetMetaData rm = rs.getMetaData();

				for (int i = 0; i < rm.getColumnCount(); i++) {
					data.put(rm.getColumnName(i + 1).toLowerCase(),
							rs.getString(rm.getColumnName(i + 1)));
				}

				ret.add(data);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn, instancename);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	/**
	 * 查询结果到ListMap形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static HashMap<String, String> QueryTableToMap(String sql,
			String instancename) {
		System.out.println(sql);
		HashMap<String, String> ret = new HashMap<String, String>();

		Connection conn = DBPooL.GetConnection(instancename);
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			while (rs.next()) {

				ret.put(rs.getString(1), rs.getString(2));

			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn, instancename);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	/**
	 * 查询结果到ListMap形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static HashMap<String, String> QueryTableToMap(String sql) {
		System.out.println(sql);
		HashMap<String, String> ret = new HashMap<String, String>();

		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			while (rs.next()) {

				ret.put(rs.getString(1), rs.getString(2));

			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	/**
	 * 查询结果到ListMap形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static HashMap<String, String> QueryClobTableToMap(String sql) {
		System.out.println(sql);
		HashMap<String, String> ret = new HashMap<String, String>();

		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			BufferedReader reader;
			String string = "";
			while (rs.next()) {
				string = "";
				if (rs.getClob(2) != null) {
					reader = new BufferedReader(rs.getClob(2)
							.getCharacterStream());
					string = reader.readLine();

					reader.close();
				}
				ret.put(rs.getString(1), string);

			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	/**
	 * 执行存储过程并将结果到Map形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static HashMap<String, String> ExecProcAndResultToMap(String sql,
			String... arg) {
		System.out.println(sql);
		HashMap<String, String> ret = new HashMap<String, String>();

		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.CallableStatement psmt = conn.prepareCall(sql);
			for (int i = 1; i <= arg.length; i++) {
				psmt.setString(i, arg[i - 1]);
				System.out.print(arg[i - 1] + " \t");
			}
			psmt.execute();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			ResultSet rs = psmt.getResultSet();

			while (rs.next()) {

				ret.put(rs.getString(1), rs.getString(2));

			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	/**
	 * 执行存储过程并将结果到Map形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static HashMap ExecProcAndResultToTableMap(String sql, String... arg) {
		System.out.println(sql);
		HashMap ret = new HashMap();

		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.CallableStatement psmt = conn.prepareCall(sql);
			for (int i = 1; i <= arg.length; i++) {
				psmt.setString(i, arg[i - 1]);
				System.out.print(arg[i - 1] + " \t");
			}
			psmt.registerOutParameter(arg.length + 1, java.sql.Types.INTEGER);
			psmt.execute();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			ResultSet rs = psmt.getResultSet();
			List<HashMap<String, String>> head = new LinkedList<HashMap<String, String>>();
			List<HashMap<String, String>> rslist = new LinkedList<HashMap<String, String>>();
			try {
				ResultSetMetaData rm = rs.getMetaData();
				for (int i = 0; i < rm.getColumnCount(); i++) {

					HashMap<String, String> obj = new HashMap<String, String>();
					obj.put("label", rm.getColumnName(i + 1).toLowerCase());
					obj.put("field", rm.getColumnName(i + 1).toLowerCase());
					head.add(obj);

				}
			} catch (Exception e) {

			}
			while (rs.next()) {

				ResultSetMetaData rm = rs.getMetaData();
				HashMap<String, String> data = new HashMap<String, String>();
				for (int i = 0; i < rm.getColumnCount(); i++) {
					// if(icount==0){
					// Map obj=new HashMap();
					// obj.put("label", rm.getColumnName(i + 1).toLowerCase());
					// obj.put("field", rm.getColumnName(i + 1).toLowerCase());
					// head.add(obj);
					// }

					data.put(rm.getColumnName(i + 1).toLowerCase(),
							rs.getString(rm.getColumnName(i + 1)));
					// System.out.println(rm.getColumnName(i +
					// 1).toLowerCase()+"==>"+ rs
					// .getString(rm.getColumnName(i + 1)));
				}
				rslist.add(data);
			}

			rs.close();
			rs = null;
			int count = psmt.getInt(arg.length + 1);
			psmt.close();
			psmt = null;

			ret.put("head", head);
			ret.put("rs", rslist);
			ret.put("count", "" + count);
			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	/**
	 * 执行存储过程并将结果到Map形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static HashMap<String, List> ExecProcAndResultToReportMap(
			String sql, LinkedList<String[]> arg, boolean hasoutput) {
		System.out.println(sql);
		HashMap<String, List> ret = new HashMap<String, List>();

		Connection conn = DBPooL.GetConnection();
		if (DBPooL.getInstance().DBType.equals(DBPooL.OracleType)) {
			long starttime = System.currentTimeMillis();
			int rsindex = -1;
			try {
				java.sql.CallableStatement psmt = conn.prepareCall(sql);
				for (int i = 1; i <= arg.size(); i++) {
					String args[] = arg.get(i - 1);
					// psmt.setString(i, arg.get(i-1) != null ?
					// arg.get(i-1).toString()
					// : null);
					if ("1".equals(args[3])) {
						// 如果是变量输出
						if ("NUMBER".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.NUMERIC);
						} else if ("VARCHAR2".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.VARCHAR);
						} else if ("VARCHAR".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.VARCHAR);
						} else if ("DATE".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]), Types.DATE);
						} else if ("REF CURSOR".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.REF_CURSOR);
							rsindex = Integer.parseInt(args[0]);
						}

						else {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.VARCHAR);
						}
					} else {
						psmt.setString(Integer.parseInt(args[0]),
								args[4] != null ? args[4] : null);
					}
					System.out.print(args[4] + " \t");
				}
				psmt.execute();
				recordproctime(System.currentTimeMillis() - starttime, sql);
				List head = new LinkedList();
				List rslist = new LinkedList();
				List paramlist = new LinkedList();
				if (rsindex > 0) {
					ResultSet rs = (ResultSet) psmt.getObject(rsindex);
					int icount = 0;

					while (rs.next()) {

						ResultSetMetaData rm = rs.getMetaData();
						Map data = new HashMap();
						for (int i = 0; i < rm.getColumnCount(); i++) {
							if (icount == 0) {
								Map obj = new HashMap();
								obj.put("label", rm.getColumnName(i + 1)
										.toLowerCase());
								obj.put("field", rm.getColumnName(i + 1)
										.toLowerCase());
								head.add(obj);
							}

							data.put(rm.getColumnName(i + 1).toLowerCase(),
									rs.getString(rm.getColumnName(i + 1)));
							// System.out.println(rm.getColumnName(i +
							// 1).toLowerCase()+"==>"+ rs
							// .getString(rm.getColumnName(i + 1)));
						}
						rslist.add(data);

						icount++;
					}
					rs.close();
					rs = null;
				}
				if (hasoutput) {
					psmt.getMoreResults();
					Map data = new HashMap();
					for (int i = 1; i <= arg.size(); i++) {
						String args[] = arg.get(i - 1);
						// psmt.setString(i, arg.get(i-1) != null ?
						// arg.get(i-1).toString()
						// : null);
						if ("1".equals(args[3])) {
							// 如果是变量输出
							if ("NUMBER".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));

							} else if ("bigint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getBigDecimal(Integer
														.parseInt(args[0])));
							} else if ("smallint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));
							} else if ("tinyint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));
							} else if ("REF CURSOR".equals(args[2])) {

							} else {
								data.put(
										args[1],
										""
												+ psmt.getString(Integer
														.parseInt(args[0])));
							}
						}
					}
					paramlist.add(data);
				}

				psmt.close();
				psmt = null;

				ret.put("head", head);
				ret.put("param", paramlist);
				ret.put("rs", rslist);
				DBPooL.AddConnection(conn);
			} catch (Exception e) {
				e.printStackTrace();
				DBPooL.CloseConnection(conn);
			}

		} else {
			long starttime = System.currentTimeMillis();
			try {
				java.sql.CallableStatement psmt = conn.prepareCall(sql);
				for (int i = 1; i <= arg.size(); i++) {
					String args[] = arg.get(i - 1);
					// psmt.setString(i, arg.get(i-1) != null ?
					// arg.get(i-1).toString()
					// : null);
					if ("1".equals(args[3])) {
						// 如果是变量输出
						if ("int".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.INTEGER);
						} else if ("bigint".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.BIGINT);
						} else if ("smallint".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.SMALLINT);
						} else if ("tinyint".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.TINYINT);
						} else {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.VARCHAR);
						}
					} else {
						psmt.setString(Integer.parseInt(args[0]),
								args[4] != null ? args[4] : null);
					}
					System.out.print(args[4] + " \t");
				}
				psmt.execute();
				recordproctime(System.currentTimeMillis() - starttime, sql);
				ResultSet rs = psmt.getResultSet();
				int icount = 0;
				List head = new LinkedList();
				List rslist = new LinkedList();
				List paramlist = new LinkedList();
				while (rs.next()) {

					ResultSetMetaData rm = rs.getMetaData();
					Map data = new HashMap();
					for (int i = 0; i < rm.getColumnCount(); i++) {
						if (icount == 0) {
							Map obj = new HashMap();
							obj.put("label", rm.getColumnName(i + 1)
									.toLowerCase());
							obj.put("field", rm.getColumnName(i + 1)
									.toLowerCase());
							head.add(obj);
						}

						data.put(rm.getColumnName(i + 1).toLowerCase(),
								rs.getString(rm.getColumnName(i + 1)));
						// System.out.println(rm.getColumnName(i +
						// 1).toLowerCase()+"==>"+ rs
						// .getString(rm.getColumnName(i + 1)));
					}
					rslist.add(data);

					icount++;
				}
				if (hasoutput) {
					psmt.getMoreResults();
					Map data = new HashMap();
					for (int i = 1; i <= arg.size(); i++) {
						String args[] = arg.get(i - 1);
						// psmt.setString(i, arg.get(i-1) != null ?
						// arg.get(i-1).toString()
						// : null);
						if ("1".equals(args[3])) {
							// 如果是变量输出
							if ("int".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));

							} else if ("bigint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getBigDecimal(Integer
														.parseInt(args[0])));
							} else if ("smallint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));
							} else if ("tinyint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));
							} else {
								data.put(
										args[1],
										""
												+ psmt.getString(Integer
														.parseInt(args[0])));
							}
						}
					}
					paramlist.add(data);
				}
				rs.close();
				rs = null;
				psmt.close();
				psmt = null;

				ret.put("head", head);
				ret.put("param", paramlist);
				ret.put("rs", rslist);
				DBPooL.AddConnection(conn);
			} catch (Exception e) {
				e.printStackTrace();
				DBPooL.CloseConnection(conn);
			}
		}
		return ret;

	}

	/**
	 * 执行存储过程并将结果到Map形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static HashMap<String, List> ExecProcAndResultToReportMap(
			String sql, String... arg) {
		System.out.println(sql);
		HashMap<String, List> ret = new HashMap<String, List>();

		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.CallableStatement psmt = conn.prepareCall(sql);
			for (int i = 1; i <= arg.length; i++) {
				psmt.setString(i, arg[i - 1]);
				System.out.print(arg[i - 1] + " \t");
			}
			psmt.execute();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			ResultSet rs = psmt.getResultSet();
			int icount = 0;
			List head = new LinkedList();
			List rslist = new LinkedList();
			while (rs.next()) {

				ResultSetMetaData rm = rs.getMetaData();
				Map data = new HashMap();
				for (int i = 0; i < rm.getColumnCount(); i++) {
					if (icount == 0) {
						Map obj = new HashMap();
						obj.put("label", rm.getColumnName(i + 1).toLowerCase());
						obj.put("field", rm.getColumnName(i + 1).toLowerCase());
						head.add(obj);
					}

					data.put(rm.getColumnName(i + 1).toLowerCase(),
							rs.getString(rm.getColumnName(i + 1)));
					// System.out.println(rm.getColumnName(i +
					// 1).toLowerCase()+"==>"+ rs
					// .getString(rm.getColumnName(i + 1)));
				}
				rslist.add(data);

				icount++;
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;
			ret.put("head", head);
			ret.put("rs", rslist);
			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	/**
	 * 执行存储过程并将结果到Column图表用的Map形式 第一个字段做为X轴，值做为Y，其它字段为ser
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static HashMap<String, List> ExecProcAndResultToColumnReportMap(
			String sql, LinkedList<String[]> arg, boolean hasoutput) {
		System.out.println(sql);
		HashMap<String, List> ret = new HashMap<String, List>();

		Connection conn = DBPooL.GetConnection();
		if (DBPooL.getInstance().DBType.equals(DBPooL.OracleType)) {
			long starttime = System.currentTimeMillis();
			int rsindex = -1;
			try {
				java.sql.CallableStatement psmt = conn.prepareCall(sql);
				for (int i = 1; i <= arg.size(); i++) {
					String args[] = arg.get(i - 1);
					// psmt.setString(i, arg.get(i-1) != null ?
					// arg.get(i-1).toString()
					// : null);
					if ("1".equals(args[3])) {
						// 如果是变量输出
						if ("NUMBER".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.NUMERIC);
						} else if ("VARCHAR2".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.VARCHAR);
						} else if ("VARCHAR".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.VARCHAR);
						} else if ("DATE".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]), Types.DATE);
						} else if ("REF CURSOR".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.REF_CURSOR);
							rsindex = Integer.parseInt(args[0]);
						}

						else {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.VARCHAR);
						}
					} else {
						psmt.setString(Integer.parseInt(args[0]),
								args[4] != null ? args[4] : null);
					}
					System.out.print(args[4] + " \t");
				}
				psmt.execute();
				recordproctime(System.currentTimeMillis() - starttime, sql);
				// List head = new LinkedList();
				// List rslist = new LinkedList();
				List paramlist = new LinkedList();
				if (rsindex > 0) {
					ResultSet rs = (ResultSet) psmt.getObject(rsindex);
					// int icount = 0;

					while (rs.next()) {

						ResultSetMetaData rm = rs.getMetaData();

						for (int i = 1; i < rm.getColumnCount(); i++) {
							List list = ret.get(rm.getColumnName(i + 1)
									.toLowerCase()) != null ? ret.get(rm
									.getColumnName(i + 1).toLowerCase())
									: new LinkedList();
							Map data = new HashMap();
							data.put("uptime", rs.getString(1));
							data.put("value", rs.getString(i + 1));
							list.add(data);
							ret.put(rm.getColumnName(i + 1).toLowerCase(), list);
							// System.out.println(rm.getColumnName(i +
							// 1).toLowerCase()+"==>"+ rs
							// .getString(rm.getColumnName(i + 1)));
						}

					}
					rs.close();
					rs = null;
				}
				if (hasoutput) {
					psmt.getMoreResults();
					Map data = new HashMap();
					for (int i = 1; i <= arg.size(); i++) {
						String args[] = arg.get(i - 1);
						// psmt.setString(i, arg.get(i-1) != null ?
						// arg.get(i-1).toString()
						// : null);
						if ("1".equals(args[3])) {
							// 如果是变量输出
							if ("NUMBER".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));

							} else if ("bigint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getBigDecimal(Integer
														.parseInt(args[0])));
							} else if ("smallint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));
							} else if ("tinyint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));
							} else if ("REF CURSOR".equals(args[2])) {

							} else {
								data.put(
										args[1],
										""
												+ psmt.getString(Integer
														.parseInt(args[0])));
							}
						}
					}
					paramlist.add(data);
				}

				psmt.close();
				psmt = null;

				// ret.put("head", head);
				// ret.put("param", paramlist);
				// ret.put("rs", rslist);
				DBPooL.AddConnection(conn);
			} catch (Exception e) {
				e.printStackTrace();
				DBPooL.CloseConnection(conn);
			}

		} else {
			long starttime = System.currentTimeMillis();
			try {
				java.sql.CallableStatement psmt = conn.prepareCall(sql);
				for (int i = 1; i <= arg.size(); i++) {
					String args[] = arg.get(i - 1);
					// psmt.setString(i, arg.get(i-1) != null ?
					// arg.get(i-1).toString()
					// : null);
					if ("1".equals(args[3])) {
						// 如果是变量输出
						if ("int".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.INTEGER);
						} else if ("bigint".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.BIGINT);
						} else if ("smallint".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.SMALLINT);
						} else if ("tinyint".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.TINYINT);
						} else {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.VARCHAR);
						}
					} else {
						psmt.setString(Integer.parseInt(args[0]),
								args[4] != null ? args[4] : null);
					}
					System.out.print(args[4] + " \t");
				}
				psmt.execute();
				recordproctime(System.currentTimeMillis() - starttime, sql);
				ResultSet rs = psmt.getResultSet();
				// int icount = 0;
				// List head = new LinkedList();
				// List rslist = new LinkedList();
				List paramlist = new LinkedList();

				while (rs.next()) {

					ResultSetMetaData rm = rs.getMetaData();

					for (int i = 1; i < rm.getColumnCount(); i++) {
						List list = ret.get(rm.getColumnName(i + 1)
								.toLowerCase()) != null ? ret.get(rm
								.getColumnName(i + 1).toLowerCase())
								: new LinkedList();
						Map data = new HashMap();
						data.put("uptime", rs.getString(1));
						data.put("value", rs.getString(i + 1));
						list.add(data);
						ret.put(rm.getColumnName(i + 1).toLowerCase(), list);
						// System.out.println(rm.getColumnName(i +
						// 1).toLowerCase()+"==>"+ rs
						// .getString(rm.getColumnName(i + 1)));
					}

				}
				if (hasoutput) {
					psmt.getMoreResults();
					Map data = new HashMap();
					for (int i = 1; i <= arg.size(); i++) {
						String args[] = arg.get(i - 1);
						// psmt.setString(i, arg.get(i-1) != null ?
						// arg.get(i-1).toString()
						// : null);
						if ("1".equals(args[3])) {
							// 如果是变量输出
							if ("int".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));

							} else if ("bigint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getBigDecimal(Integer
														.parseInt(args[0])));
							} else if ("smallint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));
							} else if ("tinyint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));
							} else {
								data.put(
										args[1],
										""
												+ psmt.getString(Integer
														.parseInt(args[0])));
							}
						}
					}
					paramlist.add(data);
				}
				rs.close();
				rs = null;
				psmt.close();
				psmt = null;

				// ret.put("head", head);
				// ret.put("param", paramlist);
				// ret.put("rs", rslist);
				DBPooL.AddConnection(conn);
			} catch (Exception e) {
				e.printStackTrace();
				DBPooL.CloseConnection(conn);
			}
		}
		return ret;
	}

	/**
	 * 执行存储过程并将结果到Column图表用的Map形式 第一个字段做为X轴，值做为Y，其它字段为ser
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static HashMap<String, List> ExecProcAndResultToColumnReportMap(
			String sql, String... arg) {
		System.out.println(sql);
		HashMap<String, List> ret = new HashMap<String, List>();

		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.CallableStatement psmt = conn.prepareCall(sql);
			for (int i = 1; i <= arg.length; i++) {
				psmt.setString(i, arg[i - 1]);
				System.out.print(arg[i - 1] + " \t");
			}
			psmt.execute();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			ResultSet rs = psmt.getResultSet();

			while (rs.next()) {

				ResultSetMetaData rm = rs.getMetaData();

				for (int i = 1; i < rm.getColumnCount(); i++) {
					List list = ret.get(rm.getColumnName(i + 1).toLowerCase()) != null ? ret
							.get(rm.getColumnName(i + 1).toLowerCase())
							: new LinkedList();
					Map data = new HashMap();
					data.put("uptime", rs.getString(1));
					data.put("value", rs.getString(i + 1));
					list.add(data);
					ret.put(rm.getColumnName(i + 1).toLowerCase(), list);
					// System.out.println(rm.getColumnName(i +
					// 1).toLowerCase()+"==>"+ rs
					// .getString(rm.getColumnName(i + 1)));
				}

			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	/**
	 * 执行存储过程并将结果到Map形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List<HashMap> ExecProcAndResultToListMap(String sql,
			LinkedList<String[]> arg, boolean hasoutput) {
		System.out.println(sql);
		List<HashMap> ret = new LinkedList<HashMap>();

		Connection conn = DBPooL.GetConnection();
		if (DBPooL.getInstance().DBType.equals(DBPooL.OracleType)) {
			long starttime = System.currentTimeMillis();
			int rsindex = -1;
			try {
				java.sql.CallableStatement psmt = conn.prepareCall(sql);
				for (int i = 1; i <= arg.size(); i++) {
					String args[] = arg.get(i - 1);
					// psmt.setString(i, arg.get(i-1) != null ?
					// arg.get(i-1).toString()
					// : null);
					if ("1".equals(args[3])) {
						// 如果是变量输出
						if ("NUMBER".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.NUMERIC);
						} else if ("VARCHAR2".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.VARCHAR);
						} else if ("VARCHAR".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.VARCHAR);
						} else if ("DATE".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]), Types.DATE);
						} else if ("REF CURSOR".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.REF_CURSOR);
							rsindex = Integer.parseInt(args[0]);
						}

						else {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.VARCHAR);
						}
					} else {
						psmt.setString(Integer.parseInt(args[0]),
								args[4] != null ? args[4] : null);
					}
					System.out.print(args[4] + " \t");
				}
				psmt.execute();
				recordproctime(System.currentTimeMillis() - starttime, sql);

				if (rsindex > 0) {
					ResultSet rs = (ResultSet) psmt.getObject(rsindex);
					// int icount = 0;

					if (rs != null) {
						while (rs.next()) {
							HashMap<String, String> data = new HashMap<String, String>();
							ResultSetMetaData rm = rs.getMetaData();

							for (int i = 0; i < rm.getColumnCount(); i++) {
								data.put(rm.getColumnName(i + 1).toLowerCase(),
										rs.getString(rm.getColumnName(i + 1)));
							}

							ret.add(data);
						}
						rs.close();
						rs = null;
					}

				}
				if (hasoutput) {
					psmt.getMoreResults();
					Map data = new HashMap();
					for (int i = 1; i <= arg.size(); i++) {
						String args[] = arg.get(i - 1);
						// psmt.setString(i, arg.get(i-1) != null ?
						// arg.get(i-1).toString()
						// : null);
						if ("1".equals(args[3])) {
							// 如果是变量输出
							if ("NUMBER".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));

							} else if ("bigint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getBigDecimal(Integer
														.parseInt(args[0])));
							} else if ("smallint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));
							} else if ("tinyint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));
							} else if ("REF CURSOR".equals(args[2])) {

							} else {
								data.put(
										args[1],
										""
												+ psmt.getString(Integer
														.parseInt(args[0])));
							}
						}
					}

				}

				psmt.close();
				psmt = null;

				DBPooL.AddConnection(conn);
			} catch (Exception e) {
				e.printStackTrace();
				DBPooL.CloseConnection(conn);
			}

		} else {
			long starttime = System.currentTimeMillis();
			try {
				java.sql.CallableStatement psmt = conn.prepareCall(sql);
				for (int i = 1; i <= arg.size(); i++) {
					String args[] = arg.get(i - 1);
					// psmt.setString(i, arg.get(i-1) != null ?
					// arg.get(i-1).toString()
					// : null);
					if ("1".equals(args[3])) {
						// 如果是变量输出
						if ("int".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.INTEGER);
						} else if ("bigint".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.BIGINT);
						} else if ("smallint".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.SMALLINT);
						} else if ("tinyint".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.TINYINT);
						} else {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.VARCHAR);
						}
					} else {
						psmt.setString(Integer.parseInt(args[0]),
								args[4] != null ? args[4] : null);
					}
					System.out.print(args[4] + " \t");
				}
				psmt.execute();
				recordproctime(System.currentTimeMillis() - starttime, sql);
				ResultSet rs = psmt.getResultSet();
				// int icount = 0;
				// List head = new LinkedList();
				// List rslist = new LinkedList();
				List paramlist = new LinkedList();
				if (rs != null) {
					while (rs.next()) {
						HashMap<String, String> data = new HashMap<String, String>();
						ResultSetMetaData rm = rs.getMetaData();

						for (int i = 0; i < rm.getColumnCount(); i++) {
							data.put(rm.getColumnName(i + 1).toLowerCase(),
									rs.getString(rm.getColumnName(i + 1)));
						}

						ret.add(data);
					}
					rs.close();
					rs = null;
				}
				if (hasoutput) {
					psmt.getMoreResults();
					Map data = new HashMap();
					for (int i = 1; i <= arg.size(); i++) {
						String args[] = arg.get(i - 1);
						// psmt.setString(i, arg.get(i-1) != null ?
						// arg.get(i-1).toString()
						// : null);
						if ("1".equals(args[3])) {
							// 如果是变量输出
							if ("int".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));

							} else if ("bigint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getBigDecimal(Integer
														.parseInt(args[0])));
							} else if ("smallint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));
							} else if ("tinyint".equals(args[2])) {
								data.put(
										args[1],
										""
												+ psmt.getInt(Integer
														.parseInt(args[0])));
							} else {
								data.put(
										args[1],
										""
												+ psmt.getString(Integer
														.parseInt(args[0])));
							}
						}
					}
					paramlist.add(data);
				}
				psmt.close();
				psmt = null;

				DBPooL.AddConnection(conn);
			} catch (Exception e) {
				e.printStackTrace();
				DBPooL.CloseConnection(conn);
			}
		}
		return ret;

	}

	/**
	 * 执行存储过程并将结果到Map形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static List<HashMap<String, String>> ExecProcAndResultToListMap(
			String sql, String... arg) {
		System.out.println(sql);
		List<HashMap<String, String>> ret = new LinkedList<HashMap<String, String>>();

		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.CallableStatement psmt = conn.prepareCall(sql);
			for (int i = 1; i <= arg.length; i++) {
				psmt.setString(i, arg[i - 1]);
				System.out.print(arg[i - 1] + " \t");
			}
			psmt.execute();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			ResultSet rs = psmt.getResultSet();
			if (rs != null) {
				while (rs.next()) {
					HashMap<String, String> data = new HashMap<String, String>();
					ResultSetMetaData rm = rs.getMetaData();

					for (int i = 0; i < rm.getColumnCount(); i++) {
						data.put(rm.getColumnName(i + 1).toLowerCase(),
								rs.getString(rm.getColumnName(i + 1)));
					}

					ret.add(data);
				}
				rs.close();
				rs = null;
			}
			psmt.close();
			psmt = null;
			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}

	/**
	 * 分页查找数据入库
	 * 
	 * @param tblName
	 * @param pageSize
	 * @param pageIndex
	 * @param ordby
	 * @param arg
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map QueryPageToMap(String instancename, String tblName,
			int pageSize, int pageIndex, String ordby, String... arg) {

		Map ret = new HashMap();
		pageIndex = pageIndex > 0 ? pageIndex : 1;
		pageSize = pageSize > 0 ? pageSize : 20;

		java.sql.Connection conn = DBPooL.GetConnection(instancename);
		long starttime = System.currentTimeMillis();
		int recordCount = 0;
		if ("Oracle".equals(getInstance(instancename).DBType)) {
			try {
				java.sql.CallableStatement call = conn
						.prepareCall("call p_common.P_ShowPage (?,?,?,?,?,?,?,?)");
				tblName = tblName.trim();
				if (tblName.endsWith(")")) {
					call.setString(1, tblName + " aa");
					call.setString(2, "aa.*");
				} else {
					call.setString(1, tblName);
					String tb = tblName.substring(tblName.lastIndexOf(")") + 1);
					call.setString(2, tb.trim() + ".*");
				}
				call.setString(3, "");
				call.setString(4, ordby);
				call.setInt(5, pageSize);
				call.setInt(6, pageIndex);
				call.registerOutParameter(7, java.sql.Types.INTEGER);
				call.registerOutParameter(8, Types.REF_CURSOR);

				System.out.println("select * from " + tblName + ordby);
				call.execute();
				recordproctime(System.currentTimeMillis() - starttime,
						"P_ShowPage:" + "select * from " + tblName + ordby);
				ResultSet rs = (ResultSet) call.getObject(8);
				ArrayList<HashMap<String, String>> rslist = new ArrayList<HashMap<String, String>>();
				HashMap<String, String> data = null;
				while (rs.next()) {
					data = new HashMap<String, String>();
					if (arg != null && arg.length > 0) {
						for (int i = 0; i < arg.length; i++) {
							data.put(arg[i], rs.getString(arg[i]));
						}
					} else {
						ResultSetMetaData rm = rs.getMetaData();

						for (int i = 0; i < rm.getColumnCount(); i++) {
							data.put(rm.getColumnName(i + 1).toLowerCase(),
									rs.getString(rm.getColumnName(i + 1)));
						}

					}
					rslist.add(data);

				}
				call.getMoreResults();
				recordCount = call.getInt(7);
				ret.put("RecordCount", recordCount);
				ret.put("pageSize", pageSize);
				ret.put("pageIndex", pageIndex);
				ret.put("rs", rslist);
				System.out.println("RecordCount:" + recordCount + " pageSize:"
						+ pageSize + " pageIndex:" + pageIndex);
				rs.close();
				rs = null;
				call.close();
				call = null;

			} catch (Exception e) {

				if (conn != null)
					try {
						conn.close();
						conn = null;
					} catch (SQLException e1) {

						conn = null;
					}
				e.printStackTrace();
			} finally {
				if (conn != null)
					DBPooL.AddConnection(conn, instancename);
			}
		} else {
			try {
				java.sql.CallableStatement call = conn
						.prepareCall("{call P_ShowPage (?,?,?,?,?,?,?)}");
				tblName = tblName.trim();
				if (tblName.endsWith(")")) {
					call.setString(1, tblName + " aa");
					call.setString(2, "aa.*");
				} else {
					call.setString(1, tblName);
					String tb = tblName.substring(tblName.lastIndexOf(")") + 1);
					call.setString(2, tb + ".*");
				}
				call.setString(3, "");
				call.setString(4, ordby);
				call.setInt(5, pageSize);
				call.setInt(6, pageIndex);
				call.registerOutParameter(7, Types.INTEGER);
				System.out.println("select * from " + tblName + ordby);
				call.execute();
				recordproctime(System.currentTimeMillis() - starttime,
						"P_ShowPage:select * from " + tblName + ordby);
				ResultSet rs = call.getResultSet();
				ArrayList<HashMap<String, String>> rslist = new ArrayList<HashMap<String, String>>();
				HashMap<String, String> data = null;
				while (rs.next()) {
					data = new HashMap<String, String>();
					if (arg != null && arg.length > 0) {
						for (int i = 0; i < arg.length; i++) {
							data.put(arg[i], rs.getString(arg[i]));
						}
					} else {
						ResultSetMetaData rm = rs.getMetaData();

						for (int i = 0; i < rm.getColumnCount(); i++) {
							data.put(rm.getColumnName(i + 1).toLowerCase(),
									rs.getString(rm.getColumnName(i + 1)));
						}

					}
					rslist.add(data);

				}
				call.getMoreResults();
				recordCount = call.getInt(7);
				ret.put("RecordCount", recordCount);
				ret.put("pageSize", pageSize);
				ret.put("pageIndex", pageIndex);
				ret.put("rs", rslist);
				System.out.println("RecordCount:" + recordCount + " pageSize:"
						+ pageSize + " pageIndex:" + pageIndex);
				rs.close();
				rs = null;
				call.close();
				call = null;
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (conn != null)
					DBPooL.AddConnection(conn, instancename);
			}
		}

		return ret;

	}

	/**
	 * 分页查找数据入库
	 * 
	 * @param tblName
	 * @param pageSize
	 * @param pageIndex
	 * @param ordby
	 * @param arg
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map QueryPageToMap(String tblName, int pageSize,
			int pageIndex, String ordby, String... arg) {

		Map ret = new HashMap();
		pageIndex = pageIndex > 0 ? pageIndex : 1;
		pageSize = pageSize > 0 ? pageSize : 20;

		java.sql.Connection conn = DBPooL.GetConnection();
		int recordCount = 0;
		long starttime = System.currentTimeMillis();
		if ("Oracle".equals(getInstance().DBType)) {
			try { } catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (conn != null)
					DBPooL.CloseConnection(conn);
			}
		} else {
			try {
				java.sql.CallableStatement call = conn
						.prepareCall("{call P_ShowPage (?,?,?,?,?,?,?)}");
				tblName = tblName.trim();
				if (tblName.endsWith(")")) {
					call.setString(1, tblName + " aa");
					call.setString(2, "aa.*");
				} else {
					call.setString(1, tblName);
					String tb = tblName.substring(tblName.lastIndexOf(")") + 1);
					call.setString(2, tb + ".*");
				}
				call.setString(3, "");
				call.setString(4, ordby);
				call.setInt(5, pageSize);
				call.setInt(6, pageIndex);
				call.registerOutParameter(7, Types.INTEGER);
				System.out.println("select * from " + tblName + ordby);
				call.execute();
				recordproctime(System.currentTimeMillis() - starttime,
						"P_ShowPage:" + "select * from " + tblName + ordby);
				ResultSet rs = call.getResultSet();
				recordCount = call.getInt(7);
				ArrayList<HashMap<String, String>> rslist = new ArrayList<HashMap<String, String>>();
				HashMap<String, String> data = null;
				while (rs.next()) {
					data = new HashMap<String, String>();
					if (arg != null && arg.length > 0) {
						for (int i = 0; i < arg.length; i++) {
							data.put(arg[i], rs.getString(arg[i]));
						}
					} else {
						ResultSetMetaData rm = rs.getMetaData();

						for (int i = 0; i < rm.getColumnCount(); i++) {
							data.put(rm.getColumnName(i + 1).toLowerCase(),
									rs.getString(rm.getColumnName(i + 1)));
							// System.out.println(rm.getColumnName(i +
							// 1)+" : "+rs.getString(rm.getColumnName(i + 1)));
						}

					}
					rslist.add(data);

				}
				ret.put("RecordCount", recordCount);
				ret.put("pageSize", pageSize);
				ret.put("pageIndex", pageIndex);
				ret.put("rs", rslist);
				System.out.println("RecordCount:" + recordCount + " pageSize:"
						+ pageSize + " pageIndex:" + pageIndex);
				rs.close();
				rs = null;
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (conn != null)
					DBPooL.CloseConnection(conn);
			}
		}
		return ret;

	}

	public static String ExportExcelFromSql(String sql, String... arg) {

		System.out.println(sql);
		DBPooL pool = new DBPooL();
		Connection conn = DBPooL.GetConnection();
		HSSFWorkbook workbook = new HSSFWorkbook();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			for (int i = 1; arg != null && i <= arg.length; i++) {
				psmt.setString(i, arg[i - 1]);
				System.out.print(arg[i - 1] + " \t");
			}

			ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			pool.createSheet(workbook, rs);
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		try {
			
			String path =Constant.WebRootDir; //System.getProperty("webapp.root");
			System.out.println("realPath=" + path);
			File file = new File(path + "/xls");
			if (!file.exists())
				file.mkdirs();
			String ct = "" + System.currentTimeMillis();
			String fileName = "/xls/tmp_export_" + ct + ".xls";
			String retfileName = "/xls/tmp_export_" + ct + ".xls";
			FileOutputStream fout = new FileOutputStream(path + fileName);
			workbook.write(fout);
			fout.close();
			System.out.println("文件保存到" + fileName);
			return retfileName;
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;

	}

	public static String ExportExcelFromSql(String instancename, String sql,
			String... arg) {

		System.out.println(sql);
		DBPooL pool = new DBPooL();
		Connection conn = DBPooL.GetConnection(instancename);
		HSSFWorkbook workbook = new HSSFWorkbook();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			for (int i = 1; arg != null && i <= arg.length; i++) {
				psmt.setString(i, arg[i - 1]);
				System.out.print(arg[i - 1] + " \t");
			}

			ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			pool.createSheet(workbook, rs);
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn, instancename);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		try {
			
			String path =Constant.WebRootDir;// System.getProperty("webapp.root");
			System.out.println("realPath=" + path);
			File file = new File(path + "/xls");
			if (!file.exists())
				file.mkdirs();
			String ct = "" + System.currentTimeMillis();
			String fileName = "/xls/tmp_export_" + ct + ".xls";
			String retfileName = "/xls/tmp_export_" + ct + ".xls";
			FileOutputStream fout = new FileOutputStream(path + fileName);
			workbook.write(fout);
			fout.close();
			System.out.println("文件保存到" + fileName);
			return retfileName;
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;

	}

	@SuppressWarnings("deprecation")
	private void createSheet(HSSFWorkbook book, ResultSet rs) {
		try {
			String sheetname = "所有记录";

			HSSFSheet sheet = book.createSheet(sheetname);
			HSSFRow row = sheet.createRow(sheet.getLastRowNum());
			ResultSetMetaData rm = rs.getMetaData();
			int ColumnCount = rm.getColumnCount();
			HSSFCell cell = null;
			for (int i = 0; i < ColumnCount; i++) {
				cell = row.createCell((short) i);
				cell.setCellValue(new HSSFRichTextString(rm
						.getColumnLabel(i + 1)));

			}

			while (rs.next()) {
				HSSFRow row2 = sheet.createRow(sheet.getLastRowNum() + 1);
				HSSFCell cell2 = null;
				for (int i = 0; i < ColumnCount; i++) {
					cell2 = row2.createCell((short) i);
					cell2.setCellValue(new HSSFRichTextString(rs
							.getString(i + 1)));

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 执行存存过程
	 * 
	 * @param procedurename
	 * @param arg
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static boolean ExecProedure(String procedurename, HashMap arg) {
		System.out.print("===>" + arg.toString());
		try {
			if (procedurename != null) {
				String sql = "exec " + procedurename + " ";
				String querysql = "";
				if (DBPooL.OracleType.equals(DBPooL.getInstance().DBType)) {
					querysql = "select argument_name from all_arguments where owner like '"+dbhead.toUpperCase()+"%' and lower(object_name) =lower('"
							+ procedurename + "') order by position";
				} else if (DBPooL.SqlServerType
						.equals(DBPooL.getInstance().DBType)) {
					querysql = "select a.name from sys.all_parameters a left outer join sys.all_objects b on a.object_id=b.object_id where b.type='P' and b.name='"
							+ procedurename + "' order by parameter_id";
				}
				Connection conn = DBPooL.GetConnection();
				LinkedList arglist = new LinkedList();
				long starttime = System.currentTimeMillis();
				try {
					java.sql.PreparedStatement psmt = conn
							.prepareStatement(querysql);
					java.sql.ResultSet rs = psmt.executeQuery();
					while (rs.next()) {
						sql += "?,";
						arglist.add(arg.get(rs.getString("name").toLowerCase()
								.substring(1)) != null ? arg
								.get(rs.getString("name").toLowerCase()
										.substring(1)).toString() : null);
					}
					if (sql.lastIndexOf(",") > -1) {
						sql = sql.substring(0, sql.length() - 1);
					}
					rs.close();
					rs = null;
					psmt.close();
					psmt = null;
					recordproctime(System.currentTimeMillis() - starttime, sql);
					DBPooL.AddConnection(conn);
				} catch (Exception e) {
					DBPooL.CloseConnection(conn);
				}
				return DBPooL.ExecSql(sql, arglist);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

	public static String QueryBlobToStr(String sql) {
		String ret = null;
		System.out.println("QueryBlobToStr:" + sql);
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);

			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			if (rs.next()) {
				byte[] b = rs.getBlob(1).getBytes(1,
						(int) rs.getBlob(1).length());

				ret = new String(b);
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);

		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);

		}
		return ret;
	}

	public static List<String> QueryClobToStrList(String sql) {
		System.out.println("QueryClobToStrList:" + sql);
		List<String> retList = new ArrayList<String>();
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);

			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			BufferedReader reader;
			String string;
			while (rs.next()) {
				if (rs.getClob(1) != null) {
					reader = new BufferedReader(rs.getClob(1)
							.getCharacterStream());
					string = reader.readLine();
					retList.add(string);
					reader.close();
				}
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);

		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);

		}
		return retList;
	}

	/*
	 * (非 Javadoc) Title: ExecProcAndOneIntegerResult Description: 执行存储过程返回是 int
	 * 型
	 * 
	 * @param parameters
	 * 
	 * @return int 型
	 * 
	 * @see
	 * com.weipos.common.db.BaseDataBaseDao#ExecProcAndOneIntegerResult(java
	 * .lang.String[])
	 */

	public static int ExecProcAndOneIntegerResult(String... parameters) {

		System.out.println("ExecProcAndOneIntegerResult(String) - start"); //$NON-NLS-1$

		Connection conn = null;
		CallableStatement psmt = null;
		// ResultSet rs = null;
		int ret = 0;
		if (parameters.length < 1) {

			System.out.println("ExecProcAndOneIntegerResult(String) - end"); //$NON-NLS-1$

			return ret;
		}
		try {
			conn = DBPooL.GetConnection();
			psmt = conn.prepareCall(parameters[0]);
			System.out.println("parameters[0]" + parameters[0]);
			for (int i = 1; i < parameters.length; i++) {
				psmt.setString(i, parameters[i]);
				System.out.println("parameters[" + i + "]:" + parameters[i]
						+ "---paramelen:" + parameters[i].length());
			}
			psmt.registerOutParameter(parameters.length, Types.INTEGER);
			psmt.execute();
			ret = psmt.getInt(parameters.length);
			psmt.close();
			psmt = null;
		} catch (Exception e) {

			e.printStackTrace();
		} finally {
			DBPooL.AddConnection(conn);
		}

		System.out.println("ExecProcAndOneIntegerResult(String) - end"); //$NON-NLS-1$

		return ret;
	}

	/*
	 * 执行存储过程返回两个字符串型结果 (非 Javadoc) Title: ExecProcAndTwoStringResult
	 * Description:
	 * 
	 * @param parameters
	 * 
	 * @return
	 * 
	 * @see
	 * com.weipos.common.db.BaseDataBaseDao#ExecProcAndTwoStringResult(java.
	 * lang.String[])
	 */

	public static String[] ExecProcAndTwoStringResult(String... parameters) {
		Connection conn = null;
		CallableStatement psmt = null;
		// ResultSet rs = null;
		String[] ret = new String[2];
		if (parameters.length < 1) {
			return ret;
		}
		try {
			conn = DBPooL.GetConnection();
			psmt = conn.prepareCall(parameters[0]);
			for (int i = 1; i < parameters.length; i++) {
				psmt.setString(i, parameters[i]);
				System.out.println("parameters[" + i + "]" + parameters[i]);
			}
			psmt.registerOutParameter(parameters.length,
					 Types.VARCHAR);
			psmt.registerOutParameter(parameters.length + 1,
					 Types.VARCHAR);
			psmt.execute();
			ret[0] = psmt.getString(parameters.length);
			ret[1] = psmt.getString(parameters.length + 1);
			psmt.close();
			psmt = null;
		} catch (Exception e) {

			e.printStackTrace();
			ret = null;
		} finally {
			DBPooL.AddConnection(conn);
		}
		return ret;
	}

	/**
	 * 执行存储过程并将结果到Map形式
	 * 
	 * @param sql
	 * @param arg
	 * @return
	 */
	public static boolean ExecProc(String sql, LinkedList<String[]> arg) {
		System.out.println(sql);
		boolean ret = true;

		Connection conn = DBPooL.GetConnection();
		if (DBPooL.getInstance().DBType.equals(DBPooL.OracleType)) {
			long starttime = System.currentTimeMillis();
			// int rsindex=-1;
			try {
				java.sql.CallableStatement psmt = conn.prepareCall(sql);
				for (int i = 1; i <= arg.size(); i++) {
					String args[] = arg.get(i - 1);
					// psmt.setString(i, arg.get(i-1) != null ?
					// arg.get(i-1).toString()
					// : null);
					if ("1".equals(args[3])) {
						// 如果是变量输出
						if ("NUMBER".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.NUMERIC);
						} else if ("VARCHAR2".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.VARCHAR);
						} else if ("VARCHAR".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.VARCHAR);
						} else if ("DATE".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]), Types.DATE);
						} else if ("REF CURSOR".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.REF_CURSOR);
							// rsindex=Integer.parseInt(args[0]);
						}

						else {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									Types.VARCHAR);
						}
					} else {
						psmt.setString(Integer.parseInt(args[0]),
								args[4] != null ? args[4] : null);
					}
					System.out.print(args[4] + " \t");
				}
				psmt.execute();
				recordproctime(System.currentTimeMillis() - starttime, sql);

				psmt.close();
				psmt = null;

				DBPooL.AddConnection(conn);
			} catch (Exception e) {
				e.printStackTrace();
				DBPooL.CloseConnection(conn);
				ret = false;
			}

		} else {
			long starttime = System.currentTimeMillis();
			try {
				java.sql.CallableStatement psmt = conn.prepareCall(sql);
				for (int i = 1; i <= arg.size(); i++) {
					String args[] = arg.get(i - 1);
					// psmt.setString(i, arg.get(i-1) != null ?
					// arg.get(i-1).toString()
					// : null);
					if ("1".equals(args[3])) {
						// 如果是变量输出
						if ("int".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.INTEGER);
						} else if ("bigint".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.BIGINT);
						} else if ("smallint".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.SMALLINT);
						} else if ("tinyint".equals(args[2])) {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.TINYINT);
						} else {
							psmt.registerOutParameter(
									Integer.parseInt(args[0]),
									java.sql.Types.VARCHAR);
						}
					} else {
						psmt.setString(Integer.parseInt(args[0]),
								args[4] != null ? args[4] : null);
					}
					System.out.print(args[4] + " \t");
				}
				psmt.execute();
				recordproctime(System.currentTimeMillis() - starttime, sql);

				psmt.close();
				psmt = null;

				DBPooL.AddConnection(conn);
			} catch (Exception e) {
				e.printStackTrace();
				DBPooL.CloseConnection(conn);
				ret = false;
			}
		}
		return ret;

	}

	/**
	 * function 直接执行多条SQL author: weilu date: 2012-10-22 params: @param sql
	 * params: @return return: int[]
	 */
	public static int[] executeBatch(String ... sql) {
		int[] result;
		Statement st = null;
		Connection conn = DBPooL.GetConnection();
		try {
			st = conn.createStatement();
			for (String s : sql) {
				if (s != null && s.trim().equals("") == false)
					st.addBatch(s);
			}
			result = st.executeBatch();
			//conn.commit();
		} catch (Exception e) {
			for (String str : sql) {
				System.out.println(str);
			}
			try {
				if (conn != null)
				conn.close();
			} catch (Exception e1) {
				System.out.println("rollback Exception:" + e1.getMessage());
			}
			throw new RuntimeException(e);
		} finally {
			try {
				if (st != null)
					st.close();
			} catch (Exception e) {
				System.out.println("close Statement Exception:"
						+ e.getMessage());
			}
			try {
				if (conn != null)
					conn.close();
			} catch (Exception e) {
				System.out.println("close Connection Exception:"
						+ e.getMessage());
			}
		}
		return result;
	}
/**
 * 执行批处理
 * <p>function description:</p>
 * <p>author: anjun</p>
 * <p>date: 2014年10月20日</p>
 * @param sql
 * @return
 * int[]
 */
	public static int[] executeBatch(List<String> sql) {
		return executeBatch(sql.toArray(new String[sql.size()]));
	}

	public static String ExportExcelFromSql(HSSFWorkbook workbook,
			String sheetname, String sql, String... arg) {

		System.out.println(sql);
		DBPooL pool = new DBPooL();
		Connection conn = DBPooL.GetConnection();

		// long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			for (int i = 1; arg != null && i <= arg.length; i++) {
				psmt.setString(i, arg[i - 1]);
				System.out.print(arg[i - 1] + " \t");
			}

			ResultSet rs = psmt.executeQuery();

			pool.createSheet(workbook, sheetname, rs);
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}

		return null;

	}

	@SuppressWarnings("deprecation")
	private void createSheet(HSSFWorkbook book, String sheetname, ResultSet rs) {
		try {

			HSSFSheet sheet = book.createSheet();
			HSSFRow row = sheet.createRow(0);
			HSSFCell cell = row.createCell((short) 0);
			cell.setCellValue(sheetname);
			row = sheet.createRow(1);
			ResultSetMetaData rm = rs.getMetaData();
			int ColumnCount = rm.getColumnCount();
			cell = null;
			for (int i = 0; i < ColumnCount; i++) {
				cell = row.createCell((short) i);
				cell.setCellValue(new HSSFRichTextString(rm
						.getColumnName(i + 1)));

			}
			int rowid = 1;
			while (rs.next()) {
				rowid++;
				HSSFRow row2 = sheet.createRow(rowid);
				HSSFCell cell2 = null;
				for (int i = 0; i < ColumnCount; i++) {
					cell2 = row2.createCell((short) i);
					cell2.setCellValue(new HSSFRichTextString(rs
							.getString(i + 1)));

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String ExportExcelProcedureSql(HSSFWorkbook workbook,
			String sheetname, String owner, String procedurename,
			String sourcetype) {
		String sql = "select text from all_source where type='" + sourcetype
				+ "'  and lower(owner) = lower('" + owner
				+ "') and lower(name)=lower('" + procedurename
				+ "') order by name,line";
		System.out.println(sql);
		DBPooL pool = new DBPooL();
		Connection conn = DBPooL.GetConnection();

		// long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			ResultSet rs = psmt.executeQuery();
			// int icount=0;
			String content = "create or replace " + sourcetype + " " + owner
					+ ".";
			while (rs.next()) {
				content += rs.getString(1);
			}
			// content+="/";
			pool.createProceSheet(workbook, sheetname, owner, procedurename,
					content);
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}

		return null;

	}

	@SuppressWarnings("deprecation")
	private void createProceSheet(HSSFWorkbook book, String sheetname,
			String owner, String procedurename, String content) {

		try {

			HSSFSheet sheet = book.getSheet(sheetname);
			if (sheet == null || sheet.getLastRowNum() == 0) {
				if (sheet == null) {
					sheet = book.createSheet(sheetname);
				}
				HSSFRow row = sheet.createRow(sheet.getLastRowNum());
				HSSFCell cell = null;
				cell = row.createCell((short) 0);
				cell.setCellValue(new HSSFRichTextString("owner"));
				cell = row.createCell((short) 1);
				cell.setCellValue(new HSSFRichTextString("procedurename"));
				cell = row.createCell((short) 2);
				cell.setCellValue(new HSSFRichTextString("content"));
			}
			HSSFRow row = sheet.createRow(sheet.getLastRowNum() + 1);
			HSSFCell cell = null;
			cell = row.createCell((short) 0);
			cell.setCellValue(new HSSFRichTextString(owner));
			cell = row.createCell((short) 1);
			cell.setCellValue(new HSSFRichTextString(procedurename));
			cell = row.createCell((short) 2);
			cell.setCellValue(new HSSFRichTextString(content.length()>32767?content.substring(0,32766):content));

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	/**
	 * 查询结果到ListMap形式
	 * 
	 * @param sql sql语句
	 * @param code 编码字段名
	 * @param upcode 级联字段名
	 * @return
	 */
	public static List<HashMap<String, Object>> QueryTableToListTreeMap(String sql,
			String code,String upcode) {
		System.out.println(sql);
		List<HashMap<String, Object>> ret = new LinkedList<HashMap<String, Object>>();
		HashMap<String, Object> datamap=new HashMap<String, Object>();
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			while (rs.next()) {
				HashMap<String, String> data = new HashMap<String, String>();
				ResultSetMetaData rm = rs.getMetaData();

				for (int i = 0; i < rm.getColumnCount(); i++) {
					data.put(rm.getColumnName(i + 1).toLowerCase(),
							rs.getString(rm.getColumnName(i + 1)));
				}
				if(rs.getString(upcode)!=null&&datamap.containsKey(rs.getString(upcode))) {
					HashMap<String, Object> 	father=(HashMap<String, Object>) datamap.get(rs.getString(upcode));
					LinkedList children=new LinkedList();
					if(father.containsKey("children")) {
						children=(LinkedList) father.get("children");
					}
					children.add(data);
					father.put("children", children );
					datamap.put(rs.getString(upcode), father);
				}else {
					datamap.put(rs.getString(code), data);
				}
				 
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);
			for(Entry<String, Object> item:datamap.entrySet()) {
				ret.add((HashMap<String, Object>) item.getValue());
			}
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret;

	}
	/**
	 * 查询结果到ListMap形式
	 * 
	 * @param sql sql语句
	 * @param code 编码字段名
	 * @param upcode 级联字段名
	 * @return
	 */
	public static String QueryTableToJoinString(String sql,
			String JoinString) {
		System.out.println(sql);
		StringBuffer ret = new StringBuffer();
	
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			java.sql.ResultSet rs = psmt.executeQuery();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			int icount=0;
			while (rs.next()) {
				if(icount>0) {
					ret.append(JoinString) ;	
				}
				ret.append(rs.getString(1)) ;
				icount++;
			}
			rs.close();
			rs = null;
			psmt.close();
			psmt = null;

			DBPooL.AddConnection(conn);
		 
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
		}
		return ret.toString();

	}
/**
 * 更新表格
 * @param tablename  表名
 * @param keyFields  关键字段
 * @param param  参数
 * @param canupdatefields 需要更新的字段
 * @return true成功;false失败
 */
	public static boolean updateTable(String tablename,String   keyFields,Map param,String  canupdatefields) {
		if(canupdatefields==null) {
			return false;
		}
		Connection conn = DBPooL.GetConnection();
		long starttime = System.currentTimeMillis();
		try {
			String sql="update "+tablename+" set ";
			String setstr="";
			LinkedList<String> arg=new LinkedList<String>();
			String canupdatefield[]=canupdatefields.split(",");
			for(int i=0;i<canupdatefield.length;i++) {
			if(param.containsKey(canupdatefield[i])) {
				setstr+=canupdatefield[i]+"=?,";
				arg.addLast(canupdatefield[i]);
			}	
			}
			if(setstr.length()>0) {
				setstr=setstr.substring(0, setstr.length()-1);
			}else {
				return false;
			}
			String wherestr="";
			String keyField[]=keyFields.split(",");
			for(int i=0;i<keyField.length;i++) {
			if(param.containsKey(keyField[i])) {
				wherestr+=keyField[i]+"=? and ";
				arg.addLast(keyField[i]);
			}	
			}
			if(wherestr.length()>0) {
				wherestr=wherestr.substring(0, wherestr.length()-4);
			}else {
				return false;
			}
			sql+=setstr+" where "+wherestr;
			java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
			System.out.println(sql);
			for (int i = 1; i <= arg.size(); i++) {
				psmt.setString(i, arg.get(i - 1) != null &&param.get(arg.get(i - 1)
						.toString())!=null&& param.get(arg.get(i - 1)
								.toString()).toString().length()>0? param.get(arg.get(i - 1)
						.toString()).toString() : null);
				System.out.print((arg.get(i - 1) != null &&param.get(arg.get(i - 1)
						.toString())!=null&& param.get(arg.get(i - 1)
								.toString()).toString().length()>0 ? param.get(arg.get(i - 1)
						.toString()).toString() : "null") + " \t");
			}
			System.out.println();
			psmt.execute();
			recordproctime(System.currentTimeMillis() - starttime, sql);
			psmt.close();
			psmt = null;
			DBPooL.AddConnection(conn);
		} catch (Exception e) {
			e.printStackTrace();
			DBPooL.CloseConnection(conn);
			return false;

		}
		return true;	
	}
	/**
	 * 更新表格
	 * @param tablename  表名
	 * @param keyFields  关键字段
	 * @param param  参数
	 * @param canupdatefields 需要更新的字段
	 * @return true成功;false失败
	 */
		public static boolean addTable(String tablename,Map param,String  caninsertfields) {
			if(caninsertfields==null) {
				return false;
			}
			Connection conn = DBPooL.GetConnection();
			long starttime = System.currentTimeMillis();
			try {
				String sql="insert into  "+tablename+"  ";
				String fieldstr="";
				String paramstr="";
				LinkedList<String> arg=new LinkedList<String>();
				String caninsertfield[]=caninsertfields.split(",");
				for(int i=0;i<caninsertfield.length;i++) {
				if(param.containsKey(caninsertfield[i])) {
					fieldstr+=caninsertfield[i]+",";
					paramstr+="?,";
					arg.addLast(caninsertfield[i]);
				}	
				}
				if(fieldstr.length()>0) {
					fieldstr=fieldstr.substring(0, fieldstr.length()-1);
					paramstr=paramstr.substring(0,paramstr.length()-1);
				}else {
					return false;
				}
			 
				sql+="("+fieldstr+")values("+paramstr+")";
				java.sql.PreparedStatement psmt = conn.prepareStatement(sql);
				for (int i = 1; i <= arg.size(); i++) {
					psmt.setString(i, arg.get(i - 1) != null&&param.get(arg.get(i - 1)
							.toString())!=null&& param.get(arg.get(i - 1)
									.toString()).toString().length()>0 ? param.get(arg.get(i - 1)
							.toString()).toString() : null);
					System.out.print(arg.get(i - 1) != null &&param.get(arg.get(i - 1)
							.toString())!=null&& param.get(arg.get(i - 1)
									.toString()).toString().length()>0 ? param.get(arg.get(i - 1)
							.toString()).toString() : "null" + " \t");
				}
				System.out.println();
				psmt.execute();
				recordproctime(System.currentTimeMillis() - starttime, sql);
				psmt.close();
				psmt = null;
				DBPooL.AddConnection(conn);
			} catch (Exception e) {
				e.printStackTrace();
				DBPooL.CloseConnection(conn);
				return false;

			}
			return true;	
		}	
}