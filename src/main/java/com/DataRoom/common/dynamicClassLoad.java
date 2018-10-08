
package com.DataRoom.common;


import java.io.*;

import java.nio.channels.WritableByteChannel;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.ByteBuffer;



 
 



/**
 * <p>Title:动态加载Class </p>
 *
 * <p>Description: 动态加载Class</p>
 *
 * <p>Copyright: Copyright (c) 2003</p>
 *
 * <p>Company:yunbo </p>
 *
 * @author 刘安均
 * @version 1.0
 */
public class dynamicClassLoad
    extends ClassLoader {

  private String baseDir;

  /**
   * dynamicClassLoad
   *
   * @param parent ClassLoader(系统ClassLoader)
   * @param baseDir String 类文件的基本路径
   */
  public dynamicClassLoad(ClassLoader parent, String baseDir) {
    super(parent);
    this.baseDir = baseDir;
  }

  /**
   * findClass 根据类名查找类，如果以加载从classmap中取出
   * 如果没有加载则调用loadClassBytes加载类文件
   *
   * @param name String 类名
   * @throws ClassNotFoundException 类没有发现异常
   * @return Class 返回一个类 类型
   */
//public Class<?> findClass(String name) {
//    try {
//       System.out.println("findClass: "+baseDir + name);
//          byte[] bytes = loadClassBytes(name);
//
//          Class<?> theClass = defineClass(name, bytes, 0, bytes.length); //A
//
//          if (theClass == null) {
//            throw new ClassFormatError();
//          }
//          return theClass;
//        }
//
//
//
//    catch (Exception e) {
//      return null;
//    }
//  }
@Override
public Class findClass(String name)  {
    // 先试图自己加载类，找不到则请求parent来加载
    // 注意这点和java默认的双亲委托模式不同
    Class clazz = null;
    if(name.indexOf("parsing")>=0){
      byte[] bytes;
	try {
		bytes = loadClassBytes(name);
	      Class<?> theClass = defineClass(name, bytes, 0, bytes.length); //A
          return theClass;
	} catch ( Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return null;
    	    
    }else{
    	try {
			return Class.forName(name);
		} catch ( Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
    }
//    clazz = findClassInternal(name);
//    if ((clazz == null) && hasExternalRepositories) {
//        synchronized (this) {
//            clazz = super.findClass(name);
//        }
//    }
//    if (clazz == null) {
//        throw new ClassNotFoundException(name);
//    }
//
//    return (clazz);
}





  /**
   * loadClassBytes 从文件中读取二进制流
   *
   * @param className String 要加载的类名
   * @throws ClassNotFoundException 类没有发现异常
   * @return byte[] 返回字节数组
   */
  private byte[] loadClassBytes(String className) throws ClassNotFoundException {
    try {
      String classFile = getClassFile(className);
//      File f = new File(classFile);
      System.out.println(classFile);
      FileInputStream fis = new FileInputStream(classFile);
      FileChannel fileC = fis.getChannel();
      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      WritableByteChannel outC = Channels.newChannel(baos);
      ByteBuffer buffer = ByteBuffer.allocateDirect(1024);
      while (true) {
        int i = fileC.read(buffer);
        if (i == 0 || i == -1) {
          break;
        }
        buffer.flip();
        outC.write(buffer);
        buffer.clear();
      }
      fis.close();
      return baos.toByteArray();
    }
    catch (IOException fnfe) {
      throw new ClassNotFoundException(className);
    }
  }

  /**
   * getClassFile  根据类明得到Class文件路径
   *
   * @param name String 类名
   * @return String CLass文件路径
   */
  private String getClassFile(String name) {
    StringBuffer sb = new StringBuffer(baseDir);
    name = name.replace('.', File.separatorChar) + ".class";
    sb.append(File.separator + name);
    return sb.toString();
  }

//新增的一个findResource方法
  /**
   * findResource查找资源
   *
   * @param name String类名
   * @return URL返回路径
   */
//  protected URL findResource(String name) {
//	  System.out.println("findResource " + name);
//    try {
//      URL url = super.findResource(name);
//      if (url != null) {
//        return url;
//      }
//      url = new URL("file:///" + converName(name)); //简化处理，所有资源从文件系统中获取
//      return url;
//    }
//    catch (MalformedURLException mue) {
//      System.out.println("findResource" + mue.getMessage());
//      return null;
//    }
//  }

  /**
   * converName 转化类名
   *
   * @param name String 类名
   * @return String 返回值
   */
  private String converName(String name) {
    StringBuffer sb = new StringBuffer(baseDir);
    name = name.replace('.', File.separatorChar);
    sb.append(File.separator + name);
    return sb.toString();
  }

//  /**
//   * StartMointorClass开始监控Class文件的更新线程
//   */
//  public void StartMointorClass() {
//    ClassManagerThread1.baseDir = baseDir;
//    ClassManagerThread1.start();
//  }
//
//  /**
//   * StopMointorClass停止监控线程
//   */
//  public void StopMointorClass() {
//    ClassManagerThread1.stats = false;
//    ClassManagerThread1.stop();
//  }
}
