package com.DataRoom;

import java.lang.reflect.Method;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import static org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME;
@Controller
public class MyTemplatesController {

   @Autowired
    LocaleResolver localeResolver;
	@Autowired
	public ApplicationContext Context;
/**
 * 获得模板，通过lang参数切换国际化
 * @param request
 * @param response
 * @return
 */
    public String getMyHtmlTemplate(HttpServletRequest request, HttpServletResponse response) {
       String url= request.getRequestURI();
//       System.out.println("url=="+url);
       String applicationname=Context.getApplicationName();
       if(applicationname!=null) {
    	   //如果上下文不为空，则去掉Url中的上下文
    	   if(url.startsWith(applicationname)) {
    		   url=url.substring(applicationname.length());
    	   }
       }
     
       if(request.getParameter("lang")!=null) {
    	   //从请求中得到要切换的语言
    	   String lang=request.getParameter("lang").toString();
    	   Locale locale=null;
    	   if(lang.indexOf("_")>0) {
    		  String a_lang[]= lang.split("_");
    		   locale=new Locale(a_lang[0].toLowerCase(),a_lang[1].toUpperCase()); 
    	   }else {
    		   locale=new Locale(lang);
    	   }
    	   localeResolver.setLocale(request,response,locale); 
       }else {
    	   if(LOCALE_SESSION_ATTRIBUTE_NAME==null) {
    		   localeResolver.setLocale(request,response,Locale.SIMPLIFIED_CHINESE); 
    	   }
       }
       if(url.startsWith("/")) {
    	   url=url.substring(1);
       }
       if(url.toLowerCase().endsWith(".html")) {
    	   url=url.substring(0,url.length()-".html".length());
       }
//       if(url.toLowerCase().endsWith(".js")) {
//    	   url=url.substring(0,url.length()-".js".length());
//       }
//       System.out.println("url=="+url);
        return url;
    }
  
}
