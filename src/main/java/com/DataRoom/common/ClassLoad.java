
package com.DataRoom.common;

import java.util.Date;
import java.util.HashMap;

import com.DataRoom.common.BaseConstant;






/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: </p>
 * @author not attributable
 * @version 1.0
 */

public class ClassLoad {
	static java.util.HashMap<String, Class<?>> classmap = new HashMap<String, Class<?>>(); //用来缓存类
	  static java.util.HashMap<String, String> classModify = new HashMap<String, String>(); //用来缓存类
	  static java.util.HashMap<String, Date> classModifyDatemap = new HashMap<String, Date>(); //类文件修改时间记录表
	  private String baseDir;
 
	  public ClassLoad() {
	  }

	  public ClassLoad(String basedir) {
	    this.baseDir = basedir;
	  }

	  public Class<?> findClass(String name) {
		  baseDir=  BaseConstant.getProperty("ClassPath", "");
		  Class<?> c = classmap.get(name);
	 
	    if (c == null) {
	      dynamicClassLoad dynamicClassLoad1 = new dynamicClassLoad(ClassLoader.getSystemClassLoader(), baseDir);
	      try {
			c = dynamicClassLoad1.findClass(name);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//	      WebappClassLoader loader=new WebappClassLoader();
//	      
//	      try {
////			c=loader.loadClass(name,true);
//			c=this.getClass().getClassLoader().loadClass(name);
//			
//		} catch (ClassNotFoundException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	      System.out.println("getName:"+c.getName());
//	      classmap.put(name, c);
	      return c;
	    }else{
	    	return classmap.get(name);	
	    }
	   
	  }
 

}
