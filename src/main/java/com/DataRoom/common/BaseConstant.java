package com.DataRoom.common;

import java.io.File;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;

import java.util.Enumeration;
import java.util.HashMap;

import java.util.Properties;

import org.apache.log4j.Logger;



/**
 * <p>
 * 系统中将用的全局变量在此类中定义。
 * <p>
 * 默认读取的classpath下constant.config文件，配置文件以行为单位，有效数据格式为“参数＝参数值”，“#”为配置文件注释行。
 * 

 */
public class BaseConstant {
	/**
	 * 参数值列表
	 */
	public static Properties p = new Properties();
	@SuppressWarnings("rawtypes")
	public static HashMap hmp = new HashMap();
	
	public static boolean saveaccesshistory=getProperty("saveaccesshistory", "false").equals("true")?true:false;
    public static String saveaccesshistorydir=getProperty("saveaccesshistorydir",System.getProperty("os.name").equals("Linux")?"/data/logs":"d:\\");

	public static String WebRootDir="";
	public static String dir_spilt="";

	/**
	 * Log4j日志输出
	 */
	public static Logger LOGGER = Logger.getLogger(BaseConstant.class);
	public static boolean debugmode=false;

	/**
	 * 初始化读取配置文件。
	 * 
	 * @param propertyFileName
	 *            配置文件名，默认路径为classpath下。
	 */
	public static void init(String propertyFileName) {
if(p==null){p=new Properties();}
		dir_spilt=File.separator;
		InputStreamReader in = null;
		try {
			in = new InputStreamReader(BaseConstant.class.getClassLoader().getResourceAsStream(
					propertyFileName), "UTF-8");
			if (in != null) {
				
				p.load(in);
			}
			for(Object key:p.keySet()){
				if(p.get(key)!=null){
					System.out.println(key.toString()+"==>"+ p.get(key).toString());
				hmp.put(key.toString(), p.get(key).toString());
				}
			}
			debugmode=getProperty("debugmode", "false").equals("true")?true:false;
			
		} catch (Exception e) {
			LOGGER.error("加载" + propertyFileName + "配置文件时错误!忽略此文件");
		} finally {
			if (in != null) {
				try {
					in.close();
					in = null;
				} catch (Exception e) {
					LOGGER.error("关闭 " + propertyFileName + "配置文件时错误!");
				}
			}
		}
	}

	/**
	 * 获取文件中定义的参数值，当无此参数时或无值时返回默认值。
	 * 
	 * @param key
	 *            参数名
	 * @param defaultValue
	 *            默认值
	 * @return 参数值
	 */
	public static String getProperty(String key, String defaultValue) {
		if(p==null){
			init("constant.config");
		}
		String val=p.getProperty(key, defaultValue);
		return val!=null?val.trim():null;
	}

	static {
		init("constant.config");
	
	}
	

	public static String getAllLocalHostIP() {
		String res = "";
		Enumeration<NetworkInterface> netInterfaces;
		try {
			netInterfaces = NetworkInterface.getNetworkInterfaces();
			InetAddress ip = null;
			while (netInterfaces.hasMoreElements()) {
				NetworkInterface ni = netInterfaces
						.nextElement();
				// System.out.println("---Name---:" + ni.getName());
				Enumeration<InetAddress> nii = ni.getInetAddresses();
				while (nii.hasMoreElements()) {
					ip = nii.nextElement();
					if (ip.getHostAddress().indexOf(":") == -1) {
						if (!ip.getHostAddress().equals("127.0.0.1")) {
							res += ";" + ip.getHostAddress();

						}
					}
				}
			}
		} catch (SocketException e) {
			e.printStackTrace();
		}
		System.out.println("本机的ip=" + res.substring(1));
		return res.substring(1);
	}


}
