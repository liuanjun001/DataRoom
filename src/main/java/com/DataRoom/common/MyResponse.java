package com.DataRoom.common;
/**
 * 自定义返回类
 * @author liuan
 *
 */
public class MyResponse {
	public int state=0;//0失败;1成功;
	public String classname="";
	public String message="";
	/**
	 * 
	 * @param _state
	 * @param _classname
	 * @param msg
	 */
public MyResponse(int _state,String _classname,String msg) {
	state=_state;
	classname=_classname;
	message=msg;
}
/**
 * 
 * @return
 */
public static MyResponse success() {
	return new MyResponse(1,"Response","成功");
}
/**
 * 成功返回
 * @return
 */
public static MyResponse success(String _classname,String msg) {
	return new MyResponse(1,_classname,msg);
}
/**
 * 成功返回
 * @return
 */
public static MyResponse success(String msg) {
	return new MyResponse(1,"Response",msg);
}
/**
 * 失败返回
 * @param _classname
 * @param msg
 * @return
 */
public static MyResponse Faild(String _classname,String msg) {
	return new MyResponse(0,_classname,msg);
}
/**
 * 失败返回
 * @param _classname
 * @param msg
 * @return
 */
public static MyResponse Faild(String msg) {
	return new MyResponse(0,"Response",msg);
}
}
