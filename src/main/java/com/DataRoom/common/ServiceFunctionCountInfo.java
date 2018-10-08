/*************************************************
 * 文件描述：
 *************************************************/
package com.DataRoom.common;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @author liuanjun
 * Jul 4, 2016
 */
public class ServiceFunctionCountInfo {
private String servicename;
private String functionname;
private long count;
private long counttime;
private long mintime;
private long maxtime;
private long avgtime;
private long todayavgtime;
private long weekavgtime;
private long monthavgtime;
private long todaycount;
private long todaycounttime;
private long todaymintime;
private long todaymaxtime;
private long weekcount;
private long weekcounttime;
private long weekmintime;
private long weekmaxtime;
private long monthcount;
private long  monthcounttime;
private long  monthmintime;
private long  monthmaxtime;
private long[] nearcount=new long[10];
private long[]  nearcounttime=new long[10];
private long[]  nearmintime=new long[10];
private long[]  nearmaxtime=new long[10];
private long[] nearavgtime=new long[10];
private Date lastcall;
private Date countneardate;
public Date getCountneardate() {
	return countneardate;
}
public void setCountneardate(Date countneardate) {
	this.countneardate = countneardate;
}
public void setNearmaxtime(long[] nearmaxtime) {
	this.nearmaxtime = nearmaxtime;
}
private SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
public ServiceFunctionCountInfo(String _servicename,String _functionname){
	servicename=_servicename;
	functionname=_functionname;
}
/**
 * 
 * <p>function description:</p>
 * <p>author: liuanjun</p>
 * <p>date: Jul 4, 2016</p>
 * @param dt
 * @param dur
 * void
 */
public void addACall(String dt,long dur){

	try {
		Date date=sdf.parse(dt);
		count++;
		counttime+=dur;
		if(dur<mintime||mintime==0){
			mintime=dur;
		}
		if(dur>maxtime ){
			maxtime=dur;
		}
		avgtime=counttime/count;
		Calendar ca1=Calendar.getInstance();
		ca1.setTime(date);
		Calendar ca2=Calendar.getInstance();
		if(lastcall!=null){
			ca2.setTime(lastcall);
		//	System.out.println("lastcall="+lastcall.toLocaleString());
		}else{
		//	System.out.println("lastcall is null");
			ca2=null;
		}
		
		if(sameMonth(ca1,ca2)){
		monthcount++;
		monthcounttime+=dur;
		if(dur<monthmintime||monthmintime==0){
			monthmintime=dur;
		}
		if(dur>monthmaxtime ){
			monthmaxtime=dur;
		}
		monthavgtime=monthcounttime/monthcount;
		}else{
			monthcount=1;
			monthcounttime=dur;
			monthmintime=dur;
			monthmaxtime=dur;
			monthavgtime=dur;
		}
		if(sameWeek(ca1,ca2)){
			weekcount++;
			weekcounttime+=dur;
			if(dur<weekmintime||weekmintime==0){
				weekmintime=dur;
			}
			if(dur>weekmaxtime ){
				weekmaxtime=dur;
			}
			weekavgtime=weekcounttime/weekcount;
			}else{
				weekcount=1;
				weekcounttime=dur;
				weekmintime=dur;
				weekmaxtime=dur;
				weekavgtime=dur;
			}
		if(sameday(ca1,ca2)){
			todaycount++;
			todaycounttime+=dur;
			if(dur<todaymintime||todaymintime==0){
				todaymintime=dur;
			}
			if(dur>todaymaxtime ){
				todaymaxtime=dur;
			}
			todayavgtime=todaycounttime/todaycount;
			}else{
			//	System.out.println("===not sameday");
				for (int i=9;i>0;i--){
					nearcount[i]=nearcount[i-1];
					nearcounttime[i]=nearcounttime[i-1];
					nearmintime[i]=nearmintime[i-1];
					nearmaxtime[i]=nearmaxtime[i-1];
					nearavgtime[i]=nearavgtime[i-1];
				} 
				nearcount[0]=todaycount;
				nearcounttime[0]=todaycounttime;
				nearmintime[0]=todaymintime;
				nearmaxtime[0]=todaymaxtime;
				nearavgtime[0]=todayavgtime;
				todaycount=1;
				todaycounttime=dur;
				todaymintime=dur;
				todaymaxtime=dur;
				todayavgtime=dur;
				countneardate=date;
			}
		lastcall=date;
	} catch ( Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	
}
/**
 * 
 * <p>function description:</p>
 * <p>author: liuanjun</p>
 * <p>date: Jul 4, 2016</p>
 * void
 */
public void countneardata(){
	Calendar ca1=Calendar.getInstance();
	ca1.setTime(countneardate);
	Calendar ca2=Calendar.getInstance();
	 Calendar ca3=Calendar.getInstance();
	 ca3.setTime(lastcall);
		if(!sameday(ca1,ca2)){
			for (int i=9;i>0;i--){
				nearcount[i]=nearcount[i-1];
				nearcounttime[i]=nearcounttime[i-1];
				nearmintime[i]=nearmintime[i-1];
				nearmaxtime[i]=nearmaxtime[i-1];
				nearavgtime[i]=nearavgtime[i-1];
			} 
			nearcount[0]=todaycount;
			nearcounttime[0]=todaycounttime;
			nearmintime[0]=todaymintime;
			nearmaxtime[0]=todaymaxtime;
			nearavgtime[0]=todayavgtime;
			countneardate=ca2.getTime();
			
		}
	 if(!sameday(ca3,ca2)){
		todayavgtime=0;
		todaycount=0;
		todaycounttime=0;
		todaymaxtime=0;
		todaymintime=0;
	 }

} 
/**
 * 
 * <p>function description:</p>
 * <p>author: liuanjun</p>
 * <p>date: Jul 4, 2016</p>
 * @param day1
 * @param day2
 * @return
 * boolean
 */
private boolean sameMonth(Calendar day1,Calendar day2){
	if(day1==null||day2==null){
		return false;
	}
	if(day1.get(Calendar.MONTH) ==day2.get(Calendar.MONTH)&&day1.get(Calendar.YEAR)==day2.get(Calendar.YEAR)){
		return true;
	}
	return false;
}
private boolean sameWeek(Calendar day1,Calendar day2){
	if(day1==null||day2==null){
		return false;
	}
	if(day1.get(Calendar.WEEK_OF_YEAR) ==day2.get(Calendar.WEEK_OF_YEAR)){
		return true;
	}
	return false;
}
private boolean sameday(Calendar day1,Calendar day2){
	if(day1==null||day2==null){
		return false;
	}
	if(day1.get(Calendar.DAY_OF_YEAR) ==day2.get(Calendar.DAY_OF_YEAR)){
		return true;
	}
	return false;
}
public String getServicename() {
	return servicename;
}
public long getAvgtime() {
	return avgtime;
}
public void setAvgtime(long avgtime) {
	this.avgtime = avgtime;
}
public long getTodayavgtime() {
	return todayavgtime;
}
public void setTodayavgtime(long todayavgtime) {
	this.todayavgtime = todayavgtime;
}
public long getWeekavgtime() {
	return weekavgtime;
}
public void setWeekavgtime(long weekavgtime) {
	this.weekavgtime = weekavgtime;
}
public long getMonthavgtime() {
	return monthavgtime;
}
public void setMonthavgtime(long monthavgtime) {
	this.monthavgtime = monthavgtime;
}
public long[] getNearavgtime() {
	return nearavgtime;
}
public void setNearavgtime(long[] nearavgtime) {
	this.nearavgtime = nearavgtime;
}
public Date getLastcall() {
	return lastcall;
}
public void setLastcall(Date lastcall) {
	this.lastcall = lastcall;
}

public void setServicename(String servicename) {
	this.servicename = servicename;
}
public String getFunctionname() {
	return functionname;
}
public void setFunctionname(String functionname) {
	this.functionname = functionname;
}
public long getCount() {
	return count;
}
public void setCount(long count) {
	this.count = count;
}
public long getCounttime() {
	return counttime;
}
public void setCounttime(long counttime) {
	this.counttime = counttime;
}
public long getMintime() {
	return mintime;
}
public void setMintime(long mintime) {
	this.mintime = mintime;
}
public long getMaxtime() {
	return maxtime;
}
public void setMaxtime(long maxtime) {
	this.maxtime = maxtime;
}
public long getTodaycount() {
	return todaycount;
}
public void setTodaycount(long todaycount) {
	this.todaycount = todaycount;
}
public long getTodaycounttime() {
	return todaycounttime;
}
public void setTodaycounttime(long todaycounttime) {
	this.todaycounttime = todaycounttime;
}
public long getTodaymintime() {
	return todaymintime;
}
public void setTodaymintime(long todaymintime) {
	this.todaymintime = todaymintime;
}
public long getTodaymaxtime() {
	return todaymaxtime;
}
public void setTodaymaxtime(long todaymaxtime) {
	this.todaymaxtime = todaymaxtime;
}
public long getWeekcount() {
	return weekcount;
}
public void setWeekcount(long weekcount) {
	this.weekcount = weekcount;
}
public long getWeekcounttime() {
	return weekcounttime;
}
public void setWeekcounttime(long weekcounttime) {
	this.weekcounttime = weekcounttime;
}
public long getWeekmintime() {
	return weekmintime;
}
public void setWeekmintime(long weekmintime) {
	this.weekmintime = weekmintime;
}
public long getWeekmaxtime() {
	return weekmaxtime;
}
public void setWeekmaxtime(long weekmaxtime) {
	this.weekmaxtime = weekmaxtime;
}
public long getMonthcount() {
	return monthcount;
}
public void setMonthcount(long monthcount) {
	this.monthcount = monthcount;
}
public long getMonthcounttime() {
	return monthcounttime;
}
public void setMonthcounttime(long monthcounttime) {
	this.monthcounttime = monthcounttime;
}
public long getMonthmintime() {
	return monthmintime;
}
public void setMonthmintime(long monthmintime) {
	this.monthmintime = monthmintime;
}
public long getMonthmaxtime() {
	return monthmaxtime;
}
public void setMonthmaxtime(long monthmaxtime) {
	this.monthmaxtime = monthmaxtime;
}
public long[] getNearcount() {
	return nearcount;
}
public void setNearcount(long[] nearcount) {
	this.nearcount = nearcount;
}
public long[] getNearcounttime() {
	return nearcounttime;
}
public void setNearcounttime(long[] nearcounttime) {
	this.nearcounttime = nearcounttime;
}
public long[] getNearmintime() {
	return nearmintime;
}
public void setNearmintime(long[] nearmintime) {
	this.nearmintime = nearmintime;
}
public long[] getNearmaxtime() {
	return nearmaxtime;
}
public void setNearhmaxtime(long[] nearhmaxtime) {
	this.nearmaxtime = nearhmaxtime;
}
}
