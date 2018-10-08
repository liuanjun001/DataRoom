/*************************************************
 * 文件描述：
 *************************************************/
package com.DataRoom.Job;

import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InterruptedIOException;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.LinkedList;

import com.DataRoom.common.SpringUtil;
import com.DataRoom.common.WriteLog;
 


/**
 * @author liuanjun
 * Dec 3, 2016
 */
public class ManagerCenter extends Thread {
	private int          port=9999;//连接端口
	public static HashMap<String,HashMap<String,String>>	QueryStationSingnalMap=new HashMap<String,HashMap<String,String>>();
	public static HashMap<String,String[]>	SingnalRealMap=new HashMap<String,String[]>();

	private boolean     connvalid = false;//连接有效
	private ServerSocket serverConn = null;
	public static HashMap<Session,Integer> sessionmap=new HashMap();
public void run(){
 
	String warnport=SpringUtil.getProperty("", "interface.warn.port", "");
	if(warnport==null) {
		port=Integer.parseInt(warnport);	
	}


	while(true){
		try {
			if (connvalid) {
				listen();//监听
			}
			else {
				startListen();//启动监听
			}
			sleep(10000);
		} catch ( Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
public static void sendall(byte[] content){
	for (Session session:sessionmap.keySet()){
		session.waitsendlist.addLast(content);
	}
} 
/**开始侦听
 * @return  true/false
 */
public boolean startListen() {
	try {
		if (serverConn != null) {
			serverConn.close();
			serverConn = null;
		}
		serverConn = new ServerSocket(port);//启动端口监听
		connvalid = true;
		
	}
	catch (Exception e) {
		
		connvalid = false;
//		System.exit(0);
	}
	
	return connvalid;
}
/**
 * 侦听
 */
private void listen()
{
	try {
		Socket clientConn = null;
		serverConn.setSoTimeout(5000);//设置连接超时
		serverConn.setReuseAddress(true);//设置的是主服务监听的端口可以重用 
		clientConn = serverConn.accept();//开始接收请求

		if (clientConn != null) {
			Session session = new Session(clientConn);//收到socket请求后，开启一个会话
			
		   
			if (session.Start()) {
				sessionmap.put(session, 1);
				WriteLog.logerror("【侦听到来自地址:" + clientConn.getInetAddress().getHostAddress() + "端口:" +clientConn.getPort()+" =>"+ port + "的客户端连接】" );
			}
			else {
			 
				WriteLog.debug("Server启动客户端连接失败");
			}
		}
	} catch (InterruptedIOException e) {
		// thrown when the timeout expires => it's ok, we just didn't
		// receive anything
	} catch (IOException e) {
		e.printStackTrace();
		WriteLog.debug("接受客户端连接发生异常" + e.getMessage());
		connvalid = false;
	}
}
public class Session extends Thread{
	public Socket socket;
	private InputStream in;
	private OutputStream out;
	private DataInputStream instream;
	public LinkedList<byte[]> waitsendlist=new LinkedList<byte[]>();
	public Session(Socket socket) {
		this.socket = socket;
		 
	}
	/**
	 * 线程开始服务
	 * 
	 * @return
	 */
	public boolean Start() {
		try {
			int timeout=120000;
			socket.setSoTimeout(timeout);//收包超时
			socket.setReuseAddress(true);//端口复用
		
			out = socket.getOutputStream();//获得输出流
			in = socket.getInputStream();//获得输入流
			instream = new DataInputStream(in);//

			start();
		} catch (Exception e) {
			WriteLog.debug("启动客户端连接线程异常="
					+ e.getMessage()); 
			return false;
		}
		return true;
	}

	/**
	 * 
	 */
	
public void run(){
	try {
		long seq=0;
		while (true){
			int len=in.available();
			if(len>0){
				byte[] recv=new byte[len];
				in.read(recv);
				String cmd=new String(recv);
				//System.out.println("Recv:"+cmd);
				if(cmd.equalsIgnoreCase("H##HeartBeat##^^")){
					waitsendlist.add("H##HeartBeat##^^".getBytes());	
				}  
			}
			if(waitsendlist.size()>0){
				out.write(waitsendlist.removeFirst());
			}
			if(seq%300==0) {
				//30秒发个心跳包
				sleep(100);
				out.write("H##HeartBeat##^^".getBytes());
				seq=0;
			}
			seq++;
			sleep(100);
		}
	} catch (Exception e2) {
		WriteLog.debug("客户端连接线程异常结束="+ e2.getMessage()); 
	}
	sessionmap.remove(this);
	
}
}
}

