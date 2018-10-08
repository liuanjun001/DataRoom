package com.DataRoom.common;


import java.nio.ByteBuffer;
import java.nio.FloatBuffer;
import java.security.MessageDigest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


 


/**
 * @author Administrator
 * Maths
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: </p>
 * @version 1.0
 */
public class Maths {              

	/********add end**************/
	/**
	 * 
	 */
	public Maths() {
		super();

	}

	public static byte BCDToUINT8(byte bcd)
	{
		byte rv;
        return (byte) ((bcd & 0x0F) + ((bcd >> 4 & 0x0F) * 10));
	}
/**
 * byte数据对比
 * @param srcbyte
 * @param destbyte
 * @return
 */
public static boolean byteequal(byte[] srcbyte,byte[] destbyte){
	boolean ret=true;
	if(srcbyte==null||destbyte==null) return false;
	if(srcbyte.length!=destbyte.length) return false;
	for (int i=0;i<srcbyte.length;i++){
		if(srcbyte[i]!=destbyte[i]) return false;
	}
	return ret;
	
}
/**
 * 把2个字节数据转换成Int形
 * 注：高低换位
 * @param data
 * @return
 */
public static int twobytestoInt(byte[] data){
	if (data==null||data.length!=2) return -1;
	String hexstr=byteToHex(data[1])+byteToHex(data[0]);
	return Integer.parseInt(hexstr, 16);
}
/**
 * 把4个字节数据转换成Int形
 * 注：高低换位
 * @param data
 * @return
 */
public static long fourbytestoInt(byte[] data){
	if (data==null||data.length!=4) return -1;
	String hexstr=byteToHex(data[3])+byteToHex(data[2])+byteToHex(data[1])+byteToHex(data[0]);

	return Long.parseLong(hexstr, 16);
}

/**
 * 把int转换成2个byte
 * 注：高低换位
 * @param data
 * @return
 */
public static byte[] Inttotwobytes(int data){
	byte [] temp=intToBytes(data);
	byte []ret=new byte[2];
	ret[0]=temp[3];
	ret[1]=temp[2];
	return ret;
}
/**
 * 把int转换成2个byte
 * 注：高低换位
 * @param data
 * @return
 */
public static byte[] Inttofourbytes(long data){

	byte [] temp=longToBytes(data);
//	System.out.println(data+" Inttofourbytes=>"+bytesToHexString(temp));
	byte []ret=new byte[4];
	ret[0]=temp[7];
	ret[1]=temp[6];
	ret[2]=temp[5];
	ret[3]=temp[4];
	return ret;
}
	/**
	 * 六十二进制字符串转十进制字符串
	 * @param str
	 * @return
	 */
	public static String to10(String s){
		String ret="";
		
		byte[] sb=s.getBytes();
		String zStr="";
		String ss="";
		for (int i=0;i<sb.length;i++){
			if (sb[i]=='0'){
				zStr+="0";
			}
			else{
				ss=s.substring(i);
				break;
			}
		}
		
		int l=ss.length();
		long ll=0;
		long i=1;
		l--;
		while (l>=0){
			char ch=ss.charAt(l);
			
			if (ch<='9')
				ch-=48;
			else if (ch<='Z')
				ch-=55;
			else 
				ch-=61;
			ll+=ch*i;
			i*=62;
			l--;
		}
		ret=zStr+Long.toString(ll);
		return ret;
	}
	/**
	 * 十进制字符串转六十二进制字符串
	 * @param str
	 * @return
	 */
	public static String to62(String s){
		String ret="";
		long l=0;
		try{
		l=Long.parseLong(s);
		}catch (Exception e) {
			e.printStackTrace();
			return ret;
		}
		byte[] sb=s.getBytes();
		String zStr="";
		for (int i=0;i<sb.length;i++){
			if (sb[i]=='0'){
				zStr+="0";
			}
			else{
				break;
			}
		}
		while(l>0){
			long m=l%62;
			l=l/62;
			if (m>35)
				m+=61;
			else if (m>9)
				m+=55;
			else 
				m+=48;
			char ch=(char)m;
			ret=ch+ret;
		}
		if (s.length()<18)
			ret=zStr+ret;
		if (ret.equals(""))
			ret="0";
		return ret;
	}
	/********add end**************/
	/**
	 * 十六进制的值变成字节
	 * @param str
	 * @param spacestr
	 * @return
	 */
	public static byte[] hexStringToBytes(String str, String spacestr) {
		str = str.replaceAll(spacestr, "");
		int ilen = str.length() / 2;
		String tmp;
		byte b[] = new byte[ilen];
		for (int i = 0; i < ilen; i++) {
			tmp = str.substring(i * 2, i * 2 + 2);
			b[i] = (byte) Integer.parseInt(tmp, 16);
		}
		return b;

	}
	/**
	 * 十六进制的值变成字节
	 * @param str
	 * @return
	 */
	public static byte[] hexStringToBytes(String str) {
		int ilen = str.length() / 2;
		String tmp;
		byte b[] = new byte[ilen];
		for (int i = 0; i < ilen; i++) {
			tmp = str.substring(i * 2, i * 2 + 2);
			b[i] = (byte) Integer.parseInt(tmp, 16);
		}
		return b;

	}

	/**
	 * 把获得字节的十六进制数据
	 * @param b
	 * @return
	 */
	public static String stringToHexString(String str) {
		String ret = "";
		byte b[] = str.getBytes();
		try {
			for (int i = 0; i < b.length; i++) {
				ret += " " + byteToHex(b[i]);
			}
		} catch (Exception e) {
		}
		return ret.trim();
	}

	/**
	 * 把获得字节的十六进制数据
	 * @param b
	 * @return
	 */
	public static String bytesToHexString(byte[] b) {
		StringBuffer  ret=new StringBuffer();
		try {
			for (int i = 0; i < b.length; i++) {
				//ret += " " + byteToHex(b[i]);
				ret.append(" ").append(  byteToHex(b[i]));
			}
		} catch (Exception e) {
		}
		
		return ret.toString().trim();
	}
	/**
	*得到一个十六进制数据
	* @param b
	* @return
	*/
	public static String byteToHex(byte b) {
		String ret;
		int i, n1, n2;
		String hex[] = new String[16];
		n1 = b >> 4 & 0x0f;
		n2 = b & 0x0f;
		for (i = 0; i <= 9; i++)
			hex[i] = Integer.toString(i);
		hex[10] = "A";
		hex[11] = "B";
		hex[12] = "C";
		hex[13] = "D";
		hex[14] = "E";
		hex[15] = "F";
		ret = hex[n1] + hex[n2];
		return ret;
	}
	/**
	 * 把一个Int数据转化成一个4个字节的字节数组
	 * @param value
	 * @return
	 */
	public static byte[] intToBytes(int value) {
		byte ret[] = new byte[4];
		byte tmp;
		tmp = (byte) value;
		ret[3] = tmp;
		value = value >> 8;
		tmp = (byte) value;
		ret[2] = tmp;
		value = value >> 8;
		tmp = (byte) value;
		ret[1] = tmp;
		value = value >> 8;
		tmp = (byte) value;
		ret[0] = tmp;
		return ret;

	}
	/**
	 *  把一个short数据转化成一个2个字节的字节数组
	 *  注：高低换位
	 */
	public static byte[] shortToBytes(short value){
		byte tmp[]=intToBytes(value);
		byte ret[]=new byte[2];
		ret[0]=tmp[3];
		ret[1]=tmp[2];
		return ret;
	}
	/**
	 *  把一个short数据转化成一个2个字节的字节数组
	 *  注：高低换位
	 */
	public static byte[] shortToNotChangeBytes(short value){
		byte tmp[]=intToBytes(value);
		byte ret[]=new byte[2];
		ret[0]=tmp[2];
		ret[1]=tmp[3];
		return ret;
	}
	/**
	 * 把一个long型数据转化成一个4个字节的字节数组
	 * @param value
	 * @return
	 */
	public static byte[] longToBytes(long value) {
		byte ret[] = new byte[8];
		byte tmp;
		tmp = (byte) value;
		ret[7] = tmp;
		value = value >> 8;
		tmp = (byte) value;
		ret[6] = tmp;
		value = value >> 8;
		tmp = (byte) value;
		ret[5] = tmp;
		value = value >> 8;
		tmp = (byte) value;
		ret[4] = tmp;
		value = value >> 8;
		tmp = (byte) value;
		ret[3] = tmp;
		value = value >> 8;
		tmp = (byte) value;
		ret[2] = tmp;
		value = value >> 8;
		tmp = (byte) value;
		ret[1] = tmp;
		value = value >> 8;
		tmp = (byte) value;
		ret[0] = tmp;
		return ret;

	}
	/**
	 * bytesTOInt
	 * @param headbyte
	 * @return
	 */
	public static int bytesToInt(byte[] headbyte) {
		int i=0;
		int tmp;
		tmp=headbyte[3];
		if (tmp<0){tmp=256+tmp;}
		i=i+tmp;
		tmp=headbyte[2];
		if (tmp<0){tmp=256+tmp;}
		i=i+tmp*256;
		tmp=headbyte[1];
		if (tmp<0){tmp=256+tmp;}
		i=i+tmp*256*256;
		tmp=headbyte[0];
		if (tmp<0){tmp=256+tmp;}
		i=i+tmp*256*256*256;						
		return i;
	}
	
	public static void main(String[] args) {
		System.out.println(fourbyteToFloat(new byte[]{(byte)0x00, (byte)0x00 ,(byte)0x32 ,(byte)0x33  }));
		System.out.println(byteToFloat(new byte[]{(byte)0x00, (byte)0x00 ,(byte)0x32 ,(byte)0x33  }));
		System.out.println(fourbyteToFloat(new byte[]{ (byte)0xF5,(byte)0xC2,(byte)0x4E, (byte)0x7F  }));

	}
	//float转byte[]
	public static byte[] floatToByte(float v) {
	        ByteBuffer bb = ByteBuffer.allocate(4);
	        byte[] ret = new byte [4];
	        FloatBuffer fb = bb.asFloatBuffer();
	        fb.put(v);
	        bb.get(ret);
	        return ret;
	}

	//byte[]转float
	public static float byteToFloat(byte[] v){
		float f=Float.intBitsToFloat(bytesToInt(v));
	         
	        return  f;
	}
	//byte[]转float
	public static float fourbyteToFloat(byte[] v){
		if (v==null||v.length!=4) return 0;
		float f=Float.intBitsToFloat(bytesToInt(new byte[]{v[3],v[2],v[1],v[0]}));
	         
	        return  f;
	}
	public   static   byte[]   doubleToBytes(double   db)   
    {   
//            Double   d=new   Double(db);   
            long   l=Double.doubleToRawLongBits(db);   
            byte[]   b=new   byte[8];   

            for(int   i=0;i<8;i++)   
            {   
                    b[i]   =   (byte)(l&0xff);   
                    l   =   l>>>8;   
            }   
    return   b;   
    }   
    public   static   double   byteToDouble(byte[]   b)throws   NumberFormatException   
    {   
            if   (b   ==   null   ||   b.length   <   8)   
                    throw   new   NumberFormatException();   
            long   lval   =   0;   
            for   (int   i   =   0;   i   <   8;   i++)   
            {   
                    lval   =   lval   <<   8;   
                    lval   +=   (b[   (7   -   i)]) & 0xff;   
            }   
            return   Double.longBitsToDouble(lval);   
    }
	public static int byteToInt(byte b) {
		 
		return Integer.parseInt(byteToHex(b), 16);
	}
	
	public static String bytesToBin(byte[] data){
		String ret="";
		String hexs=bytesToHexString(data).replaceAll(" ", "");
		for(int i=0;i<hexs.length();i++){
			ret+=hexToBin(hexs.substring(i,i+1));
		}
		return ret;
	}
	public static String hexToBin(String hex){
		if(hex.equals("0")){
			return "0000";
		}else if(hex.equals("1")){
			return "0001";
		}else if(hex.equals("2")){
			return "0010";
		}else if(hex.equals("3")){
			return "0011";
		}else if(hex.equals("4")){
			return "0100";
		}else if(hex.equals("5")){
			return "0101";
		}else if(hex.equals("6")){
			return "0110";
		}else if(hex.equals("7")){
			return "0111";
		}else if(hex.equals("8")){
			return "1000";
		}else if(hex.equals("9")){
			return "1001";
		}else if(hex.equals("A")){
			return "1010";
		}else if(hex.equals("B")){
			return "1011";
		}else if(hex.equals("C")){
			return "1100";
		}else if(hex.equals("D")){
			return "1101";
		}else if(hex.equals("E")){
			return "1110";
		}else if(hex.equals("F")){
			return "1111";
		} 
		return "0000";
		
	}
	  /**
	   * 字符串Md5加密
	   * @param str
	   * @return
	   */
public static String getMd5Str(String str){
	try {
		MessageDigest md5digest = MessageDigest.getInstance("md5");
		byte[] md5val = md5digest.digest(str.getBytes("UTF-8"));
		String md5Str =  bytesToHexString(md5val).replaceAll(" ", "");
		return md5Str;	
	} catch (Exception e) {
	return null;
	}

}
/**
 * 计算与当前时间差
 * @param time
 * @return
 */
public static long nowtimediff(String time) {
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	Date dt;
	try {
		dt = sdf.parse(time);
	} catch (ParseException e) {
		// TODO 自动生成的 catch 块
		return 0;
	}
	return System.currentTimeMillis()-dt.getTime();
}
public static int gethours(String time) {
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	Date dt;
	try {
		dt = sdf.parse(time);
	} catch (ParseException e) {
		// TODO 自动生成的 catch 块
		return 0;
	}
	return dt.getHours();
}
/**
 * 从公式中取出参数
 * @param formula
 * @return
 */
public static List<String> getFormulaParamter(String formula) {
    String spiltRules = "\\+|-|\\*|/|=|\\(|\\)";
    String[] array = formula.split(spiltRules);
    List<String> ret=new LinkedList<String>();
    for (String s : array) {
 	   if(s!=null&&s.trim().length()>0&&!isDecimal(s)) {
 		   ret.add(s);
 	 
 	   }
  
    } 
     return ret;
}
public static boolean isDecimal(String orginal){  
     return isMatch("[-+]{0,1}\\d+\\.\\d*|[-+]{0,1}\\d*\\.\\d+|[-+]{0,1}\\d*", orginal);  
 }
public static boolean isMatch(String regex, String orginal){  
 if (orginal == null || orginal.trim().equals("")) {  
     return false;  
 }  
 Pattern pattern = Pattern.compile(regex);  
 Matcher isNum = pattern.matcher(orginal);  
 return isNum.matches();  
}  
}