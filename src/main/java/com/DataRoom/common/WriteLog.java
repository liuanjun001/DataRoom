package com.DataRoom.common;


import java.util.LinkedList;

import org.apache.log4j.Logger;


 



/**
 * <p>Title: 写日志文件类</p>
 *
 * <p>Description:写日志文件类 </p>
 *
 * <p>Copyright: Copyright (c) 2004</p>
 *
 * <p>Company: </p>
 * @author Liuanjun
 * @version 1.0
 */
public class WriteLog { //写日志文件类
	private static Logger logger =  Logger.getLogger("ALL");
	private static Logger Plogger =  Logger.getLogger("PACK");
	private static Logger Dlogger =  Logger.getLogger("DATA");
	private static Logger Elogger =  Logger.getLogger("ERROR");
	private static Logger Alogger =  Logger.getLogger("APP");
    public static LinkedList<String[]> SLogList=new  LinkedList<String[]>();
	public WriteLog() {
	}

	public static void debug(String log) {

		logger.debug(log);
	}
	public static void debug(Exception e){
		Elogger.debug(e.getLocalizedMessage());
		StackTraceElement exm[] = e.getStackTrace();
		for (int ii = 0; ii < exm.length; ii++) {
			Elogger.debug(exm[ii].toString());
		}
	}
 
	public static void logdata(String log) {
		//debug( log);
		Dlogger.debug(log);
	}

	public static void logpack(String log) {
		//debug( log);
		Plogger.debug(log);
	}
	public static void logerror(String log) {
		//debug( log);
		Elogger.debug(log);
	}
	public static void logapp(String log) {
		//debug( log);
		Alogger.debug(log);
	}




}
