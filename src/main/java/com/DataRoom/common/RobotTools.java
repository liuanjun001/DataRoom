/*************************************************
 * 文件描述：
 *************************************************/
package com.DataRoom.common;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.objectweb.asm.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.MessageSource;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.LocaleResolver;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.math.BigInteger;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import redis.clients.jedis.Jedis;



/**
 * @author liuanjun Jul 2, 2016
 */
public class RobotTools {
	public static HashMap<String, Class<?>> ServiceToClsMap = new HashMap<String, Class<?>>();
	public static HashMap<String, List<Object[]>> ServiceInstantMap = new HashMap<String, List<Object[]>>();
	public static LinkedList<String[]> accesshistorylist = new LinkedList<String[]>();
	public static HashMap<String, ServiceFunctionCountInfo> ServiceFunctionCountDataMap = new HashMap<String, ServiceFunctionCountInfo>();
	private static Calendar lastsaveaccesshistorylist = Calendar.getInstance();
	 
	private static LinkedList<RobotTools> toolsPooL = new LinkedList<RobotTools>();
	/**
	 * 从工具池中取出一个可用的工具实例
	 * @return RobotTools
	 */
	public static RobotTools getTools() {
//		if (toolsPooL == null) {
//			toolsPooL	= new LinkedList<RobotTools>();
//		}
//
//		if(toolsPooL.size()>0){
//			return toolsPooL.removeFirst();
//		}else{
			return new RobotTools();
//		}
	 
	}
	/**
	 * 从Redis里查询数据并以hashmap形式返回
	 * @param keystr
	 * @param md5
	 * @return
	 */
	public  HashMap<String,String> QueryRedisData(String keystr,String md5){
		HashMap<String,String> ret=new HashMap<String,String>();
		
		Jedis jedis=RedisPooL.GetConnection();//从Redis连接池获得连接
		try {
			Set<String> keys=jedis.keys(keystr);
			for(String key:keys){
				String val=jedis.get(key);
				String[] a_key=key.split("#");
				ret.put(a_key[2], val);
			}
			RedisPooL.addConnection(jedis);//用完还回去
		} catch (Exception e) {
			RedisPooL.coloseConnection(jedis);//有错，关掉Redis连接
		}
		return RobotTools.getTools().returnHashMapContent(ret, md5);	
	}
	/**
	 * 从Redis里查询数据并以hashmap形式返回
	 * @param headerstr  key的头部
	 * @param fieldlist  要查的字段
	 * @param defaultvalue 默认值
	 * @param md5  md5码
	 * @return
	 */
	public  HashMap<String,String> QueryRedisData(String headerstr,String fieldlist,String defaultvalue,String md5){
		HashMap<String,String> ret=new HashMap<String,String>();
		
		Jedis jedis=RedisPooL.GetConnection();//从Redis连接池获得连接
		try {
			String fieldlists[]=fieldlist.split(",");
			
			for(String key:fieldlists){
				String val=jedis.get(headerstr+key);
				ret.put(key, val!=null?val:defaultvalue);
			}
			RedisPooL.addConnection(jedis);//用完还回去
		} catch (Exception e) {
			RedisPooL.coloseConnection(jedis);//有错，关掉Redis连接
		}
		return RobotTools.getTools().returnHashMapContent(ret, md5);	
	}
	/**
	 * 根据Md5值决定返回列表数据，
	 * @param data
	 * @param md5
	 * @return
	 */
	public HashMap returnListContent(List data,String md5){
		HashMap ret=new HashMap();
	    String md5str=Maths.getMd5Str(data.toString());
	    if(md5!=null&&md5str.equalsIgnoreCase(md5)){
	    	if(data.size()>0){
	    	ret.put("result","nochange");
	    	}else{
	    		ret.put("result","nodata");
	    	}
	    }else{
	    	ret.put("data",data);
	    	ret.put("result","ok");
	    }
	    ret.put("md5", md5str);
	    toolsPooL.add(this);
		return ret;
	}
	/**
	 * 
	 * @param data
	 * @param md5
	 * @return
	 */
	public HashMap returnHashMapContent(HashMap data,String md5){
		 
	    String md5str=Maths.getMd5Str(data.toString());
	    if(md5!=null&&md5str.equalsIgnoreCase(md5)){
	    	if(data.size()>0){
	    		data.clear();
	    		data.put("result","nochange");
	    	}else{
	    		data.put("result","nodata");
	    	}
	    }else{
	    	if(data.size()>0){
	    		data.put("result","ok");
	    	}else{
	         	data.put("result","nodata");
	    	}
	    	
	    }
	    data.put("md5", md5str);
	    toolsPooL.add(this);
		return data;
	}
	/**
	 * <p>
	 * function description:
	 * </p>
	 * <p>
	 * author: liuanjun
	 * </p>
	 * <p>
	 * date: Jul 2, 2016
	 * </p>
	 * 
	 * @param args
	 *            void
	 */
	public static void main(String[] args) {
	 	ScanServiceClass(null);

	}

	/**
	 * 扫描并注册服务类
	 * 
	 * @param request
	 */
	public static void ScanServiceClass(HttpServletRequest request) {

		File dir = new File(RobotTools.class.getResource("").getPath());
		try {
			String Servicedirurl = URLDecoder.decode(dir.getParent() + File.separator + "Service" + File.separator,
					"UTF-8");

			File Servicedir = new File(Servicedirurl);

			FilenameFilter filter = new FilenameFilter() {
				@Override
				public boolean accept(File dir, String name) {

					return name.endsWith(".class") && name.indexOf("$") < 0;
				}
			};
			File[] clsfiles = Servicedir.listFiles(filter);

			for (int i = 0; clsfiles != null && i < clsfiles.length; i++) {

				File clsfile = clsfiles[i];

				String servicename = clsfile.getName();
				servicename = servicename.substring(0, servicename.lastIndexOf("."));
				String robottoolsclassname = RobotTools.class.getName();
				String classnamehead = robottoolsclassname.substring(0, robottoolsclassname.lastIndexOf("."));
				classnamehead = classnamehead.substring(0, classnamehead.lastIndexOf(".")) + ".Service";
				String clsname = classnamehead + "." + servicename;
				try {
					ClassLoader loader = RobotTools.class.getClassLoader();

					Class<?> cls = loader.loadClass(clsname);
					if (cls != null) {
						ApiInfo apiInfo = cls.getAnnotation(ApiInfo.class);
						if (apiInfo != null && apiInfo.servicename().length() > 0) {
							servicename = apiInfo.servicename();
						}
						ServiceToClsMap.put(servicename.toLowerCase(), cls);
						WriteLog.debug(servicename + "=> " + clsname);
					} else {
						WriteLog.debug(servicename + " cannot find " + clsname);
					}
				} catch (Exception e) {
					WriteLog.debug("servicename:" + servicename + " cannot find " + clsname);
					// e.printStackTrace();
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 扫描并注册服务类
	 * 
	 * @param request
	 */
	public static void ScanJobClass(HttpServletRequest request) {

		File dir = new File(RobotTools.class.getResource("").getPath());
		try {
			String Servicedirurl = URLDecoder.decode(dir.getParent() + File.separator + "Job" + File.separator,
					"UTF-8");

			File Servicedir = new File(Servicedirurl);

			FilenameFilter filter = new FilenameFilter() {
				@Override
				public boolean accept(File dir, String name) {

					return name.endsWith(".class") && name.indexOf("$") < 0;
				}
			};
			File[] clsfiles = Servicedir.listFiles(filter);

			for (int i = 0; clsfiles != null && i < clsfiles.length; i++) {

				File clsfile = clsfiles[i];

				String servicename = clsfile.getName();
				servicename = servicename.substring(0, servicename.lastIndexOf("."));
				String robottoolsclassname = RobotTools.class.getName();
				String classnamehead = robottoolsclassname.substring(0, robottoolsclassname.lastIndexOf("."));
				classnamehead = classnamehead.substring(0, classnamehead.lastIndexOf(".")) + ".Job";
				String clsname = classnamehead + "." + servicename;
				try {
					ClassLoader loader = RobotTools.class.getClassLoader();

					Class<?> cls = loader.loadClass(clsname);
					if (cls != null ) {
					Object obj=	 cls.newInstance();
					if(obj instanceof java.lang.Thread ) {
						((java.lang.Thread)obj).start();
					}
						WriteLog.debug(servicename + "=> " + clsname+" job start");
					} else {
						WriteLog.debug(servicename + " cannot find " + clsname);
					}
				} catch (Exception e) {
					WriteLog.debug("servicename:" + servicename + " cannot find " + clsname);
					// e.printStackTrace();
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 
	 * <p>
	 * function description:
	 * </p>
	 * <p>
	 * author: liuanjun
	 * </p>
	 * <p>
	 * date: Jul 2, 2016
	 * </p>
	 * 
	 * @param servicename
	 * @param functionname
	 * @param request
	 * @return String 200 正常
*400 (Bad Request/错误请求)
*401 (Unauthorized/未授权)
*403 (Forbidden/禁止)
*404 (Not Found/未找到)
*405 (Method Not Allowed/方法未允许)
*408 (Request Timeout/请求超时)
*500 (Internal Server Error/内部服务器错误)
	 */
	public String callservice(HttpServletRequest request) {
		 if((BaseConstant.WebRootDir==null||BaseConstant.WebRootDir.length()<2)&&request!=null) {
			 BaseConstant.WebRootDir = request.getSession().getServletContext().getRealPath(""); 
				DBPooL.AddConnection(DBPooL.GetConnection());
		 }
		SessionTools sessionTools=new SessionTools(request);
	
	
		long starttime = System.currentTimeMillis();
		String ret = "";
		if (request == null) {
			return "";
		}
		String servicename = request.getParameter("servicename");
		String functionname = request.getParameter("functionname");
		String mobilerequest = request.getParameter("mobilerequest");
		JSONObject mobilerequestobj = null;
		// 因为手机不能post对像，只能把数据 打包成json放到mobilerequest
		if (mobilerequest != null) {
			try {
				mobilerequestobj = new JSONObject(mobilerequest);
				servicename = mobilerequestobj.getString("servicename");
				functionname = mobilerequestobj.getString("functionname");
			} catch (Exception e) {
				// TODO: handle exception
			}

		}

		if (servicename == null || functionname == null) {
			//如果从参数里取不到服务名和函数名则返回错误
			sessionTools.request=null;
			sessionTools=null;
			return "{\"code\":404,\"message\":\"function not foud\"}";
		}
		servicename = servicename.toLowerCase();
		String ip = getIpAddr(request);
		WriteLog.debug("servicename:" + servicename + "=>" + functionname);
		try {

			if (ServiceToClsMap.containsKey(servicename)) {
				//从内存中根据服务名取出类
				Class<?> cls = ServiceToClsMap.get(servicename);
				Object service = null;
				Method method = null;
				String[][] param = null;
				List<Object[]> list = null;
				if (ServiceInstantMap.containsKey(servicename + "#"
						+ functionname)) {
					//从内存池中取出服务名和函数的实例
					list = ServiceInstantMap.get(servicename + "#"
							+ functionname);
					if (list.size() > 0) {
						//如果池中有实例，则取一个
						Object[] item = list.remove(0);
						service = item[0];
						method = (Method) item[1];
						param = (String[][]) item[2];
					} else {
						//如果没有，则实例化一个
						service = cls.newInstance();
						
						method = getMethodAndParameterSet(cls, functionname);
						param = getMethodParameterNamesByAsm4(cls, method);
					}
				} else {
					//内存池中没有相应的实例队列，则建立池子，并实例化一个
					list = new LinkedList<Object[]>();
					service = cls.newInstance();
					method = getMethodAndParameterSet(cls, functionname);
					param = getMethodParameterNamesByAsm4(cls, method);
				}
				Object retobj = new Object();
				if (method != null) {
					//如果有函数实例
					Permissions permissions=method.getAnnotation(Permissions.class);
					if(permissions!=null) {
						if(permissions.needLogin()) {
							//如果需要登录
							if(!sessionTools.hasLogin()) {
								list.add(new Object[] { service, method, param });
								ServiceInstantMap.put(servicename, list);
								long dur = System.currentTimeMillis() - starttime;
								RecordCallService(ip, servicename, functionname, dur);
								sessionTools.request=null;
								sessionTools=null;
								return "{\"code\":401,\"message\":\"need Login\"}";	
							}
							if(!sessionTools.hasRole(permissions.needRole())) {
								list.add(new Object[] { service, method, param });
								ServiceInstantMap.put(servicename, list);
								long dur = System.currentTimeMillis() - starttime;
								RecordCallService(ip, servicename, functionname, dur);
								sessionTools.request=null;
								sessionTools=null;
								return "{\"code\":401,\"message\":\"need role\"}";	
							}
						}
					} 
					try {
						//注入sessionTools
						
						Field field=	cls.getField("sessionTools");
						field.set(service, sessionTools);
					} catch (Exception e) {
						//e.printStackTrace();
					}
					if (param != null) {
						Object[] paramobj = new Object[param.length];
						for (int ii = 0; ii < param.length; ii++) {
						
							if ("javax.servlet.http.HttpServletRequest"
									.equalsIgnoreCase(param[ii][1])) {
								paramobj[ii] = request;
							} else {
								String val = mobilerequestobj == null ? request
										.getParameter(param[ii][0])
										: (mobilerequestobj.has(param[ii][0]) ? mobilerequestobj
												.getString(param[ii][0]) : null);
								if (val != null) {
									System.out.println(param[ii][0] + "=>"
											+ param[ii][1]+" val:"+val);
									if ("int".equalsIgnoreCase(param[ii][1])) {
										paramobj[ii] = Integer.parseInt(val);
									} else if ("java.lang.Integer"
											.equalsIgnoreCase(param[ii][1])) {
										paramobj[ii] = new Integer(
												Integer.parseInt(val));
									} else if ("java.lang.Boolean"
											.equalsIgnoreCase(param[ii][1])) {
										paramobj[ii] = new Boolean(
												Boolean.parseBoolean(val));
									} else if ("boolean"
											.equalsIgnoreCase(param[ii][1])) {
										paramobj[ii] = Boolean
												.parseBoolean(val);
									} else if ("java.lang.Float"
											.equalsIgnoreCase(param[ii][1])) {
										paramobj[ii] = new Float(
												Float.parseFloat(val));
									} else if ("float"
											.equalsIgnoreCase(param[ii][1])) {
										paramobj[ii] = Float.parseFloat(val);
									} else if ("java.lang.Double"
											.equalsIgnoreCase(param[ii][1])) {
										paramobj[ii] = new Double(
												Double.parseDouble(val));
									} else if ("double"
											.equalsIgnoreCase(param[ii][1])) {
										paramobj[ii] = Double.parseDouble(val);
									} else if ("java.util.Map"
											.equalsIgnoreCase(param[ii][1])
											|| "java.util.HashMap"
													.equalsIgnoreCase(param[ii][1])) {
										paramobj[ii] = jsontoMap(val);
									} else if ("java.util.List"
											.equalsIgnoreCase(param[ii][1])
											 ) {
										paramobj[ii] = jsontoList(val);
									} else if ( "java.util.HashMap"
													.equalsIgnoreCase(param[ii][1])) {
										paramobj[ii] = jsontoMap(val);
									}else  {
										
										paramobj[ii] = val;
									}
								} else {
									paramobj[ii] = null;
								}
							}
						}
						retobj = method.invoke(service, paramobj);
					} else {
						// 如果是无参数
						retobj = method.invoke(service);
					}

					if (retobj instanceof List) {
						List datalist=(List) retobj;
						 
						JSONArray json = new JSONArray((List) retobj);
						//ret = json.toString();
						ret = "{\"code\":200,\"message\":\"ok\",\"data\":"+json.toString()+"}";
						 
					} else if (retobj instanceof Boolean) {
						ret = "{\"code\":200,\"message\":\"ok\",\"data\":{\"result\":" + retobj + "}}";
					} else if (retobj instanceof String) {
						ret = "{\"code\":200,\"message\":\"ok\",\"data\":{\"result\":\"" + retobj.toString().replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("\\\\", "\\\\\\\\").replaceAll("\n", "&#10;").replaceAll("\r", "&#0D;").replaceAll("\t", "&#09;") + "\"}}";
					} else if (retobj instanceof Map) {
						JSONObject json = new JSONObject((Map) retobj);
//						ret = json.toString();
						ret = "{\"code\":200,\"message\":\"ok\",\"data\":"+json.toString()+"}";
					} else if (retobj instanceof Integer
							|| retobj instanceof Float
							|| retobj instanceof Double) {
						ret = "\"code\":200,\"message\":\"ok\",\"data\":{\"result\":" + retobj + "}}";
					} else if (retobj instanceof BigInteger
							|| retobj instanceof Short
							|| retobj instanceof Byte) {
						ret = "{\"code\":200,\"message\":\"ok\",\"data\":{\"result\":" + retobj + "}}";
					} else if (retobj instanceof MyResponse) {
						MyResponse myresponse = (MyResponse)retobj;
						 Object[] languageparam=null;
						ApplicationContext cx=WebApplicationContextUtils.getWebApplicationContext(sessionTools.request.getServletContext());
						 MessageSource messageSource=(MessageSource) cx.getBean("messageSource");
						 LocaleResolver localeResolver=(LocaleResolver) cx.getBean("localeResolver");
						 String msg=myresponse.classname+"."+myresponse.message;
						String message=messageSource.getMessage(msg, languageparam,localeResolver.resolveLocale(sessionTools.request));
						if(message.equalsIgnoreCase(msg)) {
							message=myresponse.message;
						}
						String json="{\"code\":"+myresponse.state+",\"message\":\""+message+"\"}";
						ret = "{\"code\":200,\"message\":\"ok\",\"data\":"+json+"}";
					} else  if (retobj instanceof Object) {
						JSONObject json = new JSONObject(retobj);
						
						ret = "{\"code\":200,\"message\":\"ok\",\"data\":"+json.toString()+"}";
					} else {

						ret = "{\"code\":200,\"message\":\"ok\",\"data\":{\"result\":" + retobj + "}}";
					}

				}else {
					//如果没有相应的函数
					//如果从参数里取不到服务名和函数名则返回错误
					sessionTools.request=null;
					sessionTools=null;
					return "{\"code\":404,\"message\":\"function not foud\"}";
				}

				list.add(new Object[] { service, method, param });
				ServiceInstantMap.put(servicename, list);
			}else {
				if (servicename == null || functionname == null) {
					sessionTools.request=null;
					sessionTools=null;
					return "{\"code\":404,\"message\":\"function not foud\"}";
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		long dur = System.currentTimeMillis() - starttime;
		RecordCallService(ip, servicename, functionname, dur);
//		if(BaseConstant.debugmode){
//		System.out.println(ret);
//		}
		sessionTools.request=null;
		sessionTools=null;
		return ret;
	}

 

	private static SimpleDateFormat sdf = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	/**
	 * 记录调用详情
	 * <p>
	 * function description:
	 * </p>
	 * <p>
	 * author: liuanjun
	 * </p>
	 * <p>
	 * date: Jul 2, 2016
	 * </p>
	 * 
	 * @param servicename
	 * @param functionname
	 * @param dur
	 *            void
	 */

	private void RecordCallService(String ip, String servicename,
			String functionname, long dur) {
		System.out.println(ip + " " + servicename + "->" + functionname
				+ " dur:" + dur);
		if (BaseConstant.saveaccesshistory) {
			accesshistorylist.add(new String[] { ip, servicename, functionname,
					sdf.format(new Date()), "" + dur });
		}
	}

	/**
	 * 
	 * <p>
	 * function description:
	 * </p>
	 * <p>
	 * author: liuanjun
	 * </p>
	 * <p>
	 * date: Jul 2, 2016
	 * </p>
	 * 
	 * @param clazz
	 * @param methodname
	 * @return Method
	 */
	public static Method getMethodAndParameterSet(Class<?> clazz, String methodname) {
		Method[] methods = clazz.getMethods();
		for (int i = 0; i < methods.length; i++) {

			if (methodname.equalsIgnoreCase(methods[i].getName())) {
				return methods[i];
			}
		}
		return null;
	}

	/**
	 * 获取指定类指定方法的参数名
	 *
	 * @param clazz
	 *            要获取参数名的方法所属的类
	 * @param method
	 *            要获取参数名的方法
	 * @return 按参数顺序排列的参数名列表，如果没有参数，则返回null
	 */
	public static String[][] getMethodParameterNamesByAsm4(Class<?> clazz,
			final Method method) {
		if(method==null){
			return null;
		}
		final Class<?>[] parameterTypes = method.getParameterTypes();
		if (parameterTypes == null || parameterTypes.length == 0) {
			System.out.println("no parameterTypes");
			return null;
		}
		final Type[] types = new Type[parameterTypes.length];
		final String[][] parameterNames = new String[parameterTypes.length][2];
		for (int i = 0; i < parameterTypes.length; i++) {
			types[i] = Type.getType(parameterTypes[i]);
			parameterNames[i][1] = parameterTypes[i].getName();
		}

		String className = clazz.getName();
		int lastDotIndex = className.lastIndexOf(".");
		className = className.substring(lastDotIndex + 1) + ".class";
		InputStream is = clazz.getResourceAsStream(className);
		try {
			ClassReader classReader = new ClassReader(is);
			classReader.accept(new ClassVisitor(Opcodes.ASM5) {
				@Override
				public MethodVisitor visitMethod(int access, String name,
						String desc, String signature, String[] exceptions) {
					// 只处理指定的方法
					Type[] argumentTypes = Type.getArgumentTypes(desc);
					if (!method.getName().equals(name)
							|| !Arrays.equals(argumentTypes, types)) {
						return null;
					}
					// System.out.println(parameterNames.length+" "+
					// access+" "+name+" "+ desc+ " "+signature);
					return new MethodVisitor(Opcodes.ASM5) {
						@Override
						public void visitLocalVariable(String name,
								String desc, String signature, Label start,
								Label end, int index) {
							// 静态方法第一个参数就是方法的参数，如果是实例方法，第一个参数是this
							// System.out.println(parameterNames.length+" "+
							// index+" "+name+" "+ desc+ " "+signature);
							if (Modifier.isStatic(method.getModifiers())) {
								parameterNames[index][0] = name;
							} else if (index > 0
									&& index <= parameterNames.length) {
								parameterNames[index - 1][0] = name;
							}
						}
					};

				}
			}, 0);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return parameterNames;
	}

	/**
	 * 
	 * <p>
	 * function description:
	 * </p>
	 * <p>
	 * author: liuanjun
	 * </p>
	 * <p>
	 * date: Jul 3, 2016
	 * </p>
	 * 
	 * @param jsonString
	 * @return
	 * @throws JSONException
	 *             Map
	 */
	public Map jsontoMap(String jsonString) throws JSONException {
		JSONObject jsonObject = new JSONObject(jsonString);
		Map result = new HashMap();
		Iterator iterator = jsonObject.keys();
		Object key = null;
		Object value = null;

		while (iterator.hasNext()) {
			key = iterator.next();
			value = jsonObject.get(key.toString());
			result.put(key, value);
		}
		return result;

	}
public Map jsonObjectToMap(JSONObject jsonObject ) throws JSONException{
	Map result = new HashMap();
	Iterator iterator = jsonObject.keys();
	Object key = null;
	Object value = null;

	while (iterator.hasNext()) {
		key = iterator.next();
		value = jsonObject.get(key.toString());
		result.put(key, value);
	}
	return result;
}
	/**
	 * 
	 * <p>
	 * function description:
	 * </p>
	 * <p>
	 * author: liuanjun
	 * </p>
	 * <p>
	 * date: Jul 3, 2016
	 * </p>
	 * 
	 * @param jsonString
	 * @return
	 * @throws JSONException
	 *             List
	 */
	public List jsontoList(String jsonString) throws JSONException {
		JSONArray jsonObject = new JSONArray(jsonString);
		List result = new LinkedList();

		for (int i = 0; i < jsonObject.length(); i++) {

			result.add(jsonObject.get(i));

		}
		return result;

	}
//	public ArrayCollection jsontoArrayCollection(String jsonString) throws JSONException {
//		JSONArray jsonObject = new JSONArray(jsonString);
//		ArrayCollection result = new ArrayCollection();
//
//		for (int i = 0; i < jsonObject.length(); i++) {
//
//			result.add(jsonObjectToMap((JSONObject)jsonObject.get(i)));
//
//		}
//		return result;
//
//	}
	/**
	 * 
	 * <p>
	 * function description:
	 * </p>
	 * <p>
	 * author: liuanjun
	 * </p>
	 * <p>
	 * date: Jul 3, 2016
	 * </p>
	 * 
	 * @param request
	 * @return String
	 */
	public String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	/**
	 * 
	 */
	static {
		// System.out.println("Constant.saveaccesshistory="+Constant.saveaccesshistory);
		if (BaseConstant.saveaccesshistory) {
			try {
				File dir=new File(BaseConstant.saveaccesshistorydir);
					if(!dir.isDirectory()){
						dir.mkdirs();
					}
				 
				File datamapfile = new File(BaseConstant.saveaccesshistorydir
						+ BaseConstant.dir_spilt + "servicefunctioncountdata.json");
				if (datamapfile.exists()) {
					FileReader fr = new FileReader(datamapfile);
					BufferedReader br = new BufferedReader(fr);
					String jsonstr = "";
					String s;
					while ((s = br.readLine()) != null) {
						jsonstr += s;
					}
					fr.close();
					JSONArray json = new JSONArray(jsonstr);
					for (int i = 0; i < json.length(); i++) {
						JSONObject jsonobj = (JSONObject) json.get(i);
						ServiceFunctionCountInfo infoitem = new ServiceFunctionCountInfo(
								jsonobj.getString("servicename"),
								jsonobj.getString("functionname"));
						infoitem.setAvgtime(jsonobj.getLong("avgtime"));
						infoitem.setCount(jsonobj.getLong("count"));
						infoitem.setCounttime(jsonobj.getLong("counttime"));
						infoitem.setMintime(jsonobj.getLong("mintime"));
						infoitem.setMaxtime(jsonobj.getLong("maxtime"));
						infoitem.setTodayavgtime(jsonobj
								.getLong("todayavgtime"));
						infoitem.setTodaycount(jsonobj.getLong("todaycount"));
						infoitem.setTodaycounttime(jsonobj
								.getLong("todaycounttime"));
						infoitem.setTodaymintime(jsonobj
								.getLong("todaymintime"));
						infoitem.setTodaymaxtime(jsonobj
								.getLong("todaymaxtime"));
						infoitem.setWeekavgtime(jsonobj.getLong("weekavgtime"));
						infoitem.setWeekcount(jsonobj.getLong("weekcount"));
						infoitem.setWeekcounttime(jsonobj
								.getLong("weekcounttime"));
						infoitem.setWeekmintime(jsonobj.getLong("weekmintime"));
						infoitem.setWeekmaxtime(jsonobj.getLong("weekmaxtime"));
						infoitem.setMonthavgtime(jsonobj
								.getLong("monthavgtime"));
						infoitem.setMonthcount(jsonobj.getLong("monthcount"));
						infoitem.setMonthcounttime(jsonobj
								.getLong("monthcounttime"));
						infoitem.setMonthmintime(jsonobj
								.getLong("monthmintime"));
						infoitem.setMonthmaxtime(jsonobj
								.getLong("monthmaxtime"));
						JSONArray nearavgtime = jsonobj
								.getJSONArray("nearavgtime");
						infoitem.setNearavgtime(new long[] {
								nearavgtime.getLong(0), nearavgtime.getLong(1),
								nearavgtime.getLong(2), nearavgtime.getLong(3),
								nearavgtime.getLong(4), nearavgtime.getLong(5),
								nearavgtime.getLong(6), nearavgtime.getLong(7),
								nearavgtime.getLong(8), nearavgtime.getLong(9) });
						JSONArray nearcount = jsonobj.getJSONArray("nearcount");
						infoitem.setNearcount(new long[] {
								nearcount.getLong(0), nearcount.getLong(1),
								nearcount.getLong(2), nearcount.getLong(3),
								nearcount.getLong(4), nearcount.getLong(5),
								nearcount.getLong(6), nearcount.getLong(7),
								nearcount.getLong(8), nearcount.getLong(9) });
						JSONArray nearcounttime = jsonobj
								.getJSONArray("nearcounttime");
						infoitem.setNearcounttime(new long[] {
								nearcounttime.getLong(0),
								nearcounttime.getLong(1),
								nearcounttime.getLong(2),
								nearcounttime.getLong(3),
								nearcounttime.getLong(4),
								nearcounttime.getLong(5),
								nearcounttime.getLong(6),
								nearcounttime.getLong(7),
								nearcounttime.getLong(8),
								nearcounttime.getLong(9) });
						JSONArray nearmintime = jsonobj
								.getJSONArray("nearmintime");
						infoitem.setNearmintime(new long[] {
								nearmintime.getLong(0), nearmintime.getLong(1),
								nearmintime.getLong(2), nearmintime.getLong(3),
								nearmintime.getLong(4), nearmintime.getLong(5),
								nearmintime.getLong(6), nearmintime.getLong(7),
								nearmintime.getLong(8), nearmintime.getLong(9) });
						JSONArray nearmaxtime = jsonobj
								.getJSONArray("nearmaxtime");
						infoitem.setNearmaxtime(new long[] {
								nearmaxtime.getLong(0), nearmaxtime.getLong(1),
								nearmaxtime.getLong(2), nearmaxtime.getLong(3),
								nearmaxtime.getLong(4), nearmaxtime.getLong(5),
								nearmaxtime.getLong(6), nearmaxtime.getLong(7),
								nearmaxtime.getLong(8), nearmaxtime.getLong(9) });
						SimpleDateFormat cstFormater = new SimpleDateFormat(
								"EEE MMM dd HH:mm:ss zzz yyyy", Locale.US);
						if (jsonobj.has("lastcall")) {
							infoitem.setLastcall(cstFormater.parse(jsonobj
									.getString("lastcall")));
						}
						if (jsonobj.has("countneardate")) {
							infoitem.setCountneardate(cstFormater.parse(jsonobj
									.getString("countneardate")));
						}
						ServiceFunctionCountDataMap.put(
								infoitem.getServicename().toLowerCase() + "#"
										+ infoitem.getFunctionname().toLowerCase(), infoitem);

					}

				}
			} catch (Exception e) {
				e.printStackTrace();
			}

			Thread savethread = new Thread() {
				@Override
				public void run() {
					while (true) {
						try {
							long starttime = System.currentTimeMillis();
							boolean haschange = false;
							LinkedList<String[]> tmplist = new LinkedList<String[]>();
							synchronized (accesshistorylist) {
								// System.out.println("accesshistorylist= "+accesshistorylist.size());
								tmplist.addAll(accesshistorylist);
								accesshistorylist.clear();
							}
							if (tmplist.size() > 0) {
								String filename = "";
								FileWriter fw = null;
								String lastwritedt = "";
								for (String[] item : tmplist) {
									// ip,servicename,functionname,sdf.format(new
									// Date()),""+dur
									String dtstr = item[3].substring(0, 10);
									if (!dtstr.equals(lastwritedt)) {
										if (fw != null) {
											fw.close();
										}
										fw = new FileWriter(
												BaseConstant.saveaccesshistorydir
														+ BaseConstant.dir_spilt
														+ dtstr + ".log", true);
									}

									fw.write(item[0] + "," + item[1] + ","
											+ item[2] + "," + item[3] + ","
											+ item[4] + "\r\n");
									ServiceFunctionCountInfo countitem = ServiceFunctionCountDataMap
											.get(item[1].toLowerCase() + "#" + item[2].toLowerCase());
									if (countitem == null) {
										countitem = new ServiceFunctionCountInfo(
												item[1], item[2]);
									}
									countitem.addACall(item[3],
											Long.parseLong(item[4]));
									ServiceFunctionCountDataMap.put(item[1].toLowerCase()
											+ "#" + item[2].toLowerCase(), countitem);

								}
								if (fw != null) {
									fw.close();
								}
								tmplist.clear();
								haschange = true;
							}
							if (Calendar.getInstance()
									.get(Calendar.DAY_OF_YEAR) != lastsaveaccesshistorylist
									.get(Calendar.DAY_OF_YEAR)) {
								sleep(10000);
								for (String key : ServiceFunctionCountDataMap
										.keySet()) {
									ServiceFunctionCountDataMap.get(key)
											.countneardata();
								}
								haschange = true;
							}
							if (haschange) {

								FileWriter fw = new FileWriter(
										BaseConstant.saveaccesshistorydir
												+ BaseConstant.dir_spilt
												+ "servicefunctioncountdata.json",
										false);
								fw.write("[");
								int line = 0;
								for (String key : ServiceFunctionCountDataMap
										.keySet()) {
									JSONObject json = new JSONObject(
											ServiceFunctionCountDataMap
													.get(key));
									if (line > 0) {
										fw.write(",\r\n");
									}
									fw.write(json.toString());
									line++;
								}
								fw.write("\r\n]");
								fw.close();
								System.out
										.println("process accesshistory dur:"
												+ (System.currentTimeMillis() - starttime));
							}
							lastsaveaccesshistorylist = Calendar.getInstance();
							sleep(10000);
						} catch (Exception e) {
							e.printStackTrace();
							if (accesshistorylist == null) {
								System.exit(0);
							}else{
								try {
									accesshistorylist.clear();
									sleep(10000);
								} catch (InterruptedException e1) {
									// TODO Auto-generated catch block
									e1.printStackTrace();
								}
							}
						}
					}
				};
			};
			savethread.start();
		}
	}
}
