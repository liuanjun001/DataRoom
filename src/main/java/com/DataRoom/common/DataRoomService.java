package com.DataRoom.common;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@WebServlet(urlPatterns="/DataRoomService", description="Servlet的说明") 
public class DataRoomService extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -420190355614727767L;
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
	        throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		//response.setHeader("contentType", "text/html;charset=utf-8");
		response.setHeader("contentType", "application/json;charset=utf-8");
		//指定该页面不缓存  
		response.setDateHeader("Expires",-1);//IE游览器支持的  
		//保证兼容性  
		response.setHeader("Cache-Control","no-cache");
		response.setHeader("Pragme","no-cache");
		response.setContentType("application/json;charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		com.DataRoom.common.RobotTools tools=new com.DataRoom.common.RobotTools();
		PrintWriter out=response.getWriter();
		
		out.print(tools.callservice(request));
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
	        throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		//response.setHeader("contentType", "text/html;charset=utf-8");
		response.setHeader("contentType", "application/json;charset=utf-8");
		//指定该页面不缓存  
		response.setDateHeader("Expires",-1);//IE游览器支持的  
		//保证兼容性  
		response.setHeader("Cache-Control","no-cache");
		response.setHeader("Pragme","no-cache");
		response.setContentType("application/json;charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		com.DataRoom.common.RobotTools tools=new com.DataRoom.common.RobotTools();
		PrintWriter out=response.getWriter();
		
//String ret=tools.callservice(request);
out.print(tools.callservice(request));
	}
}
