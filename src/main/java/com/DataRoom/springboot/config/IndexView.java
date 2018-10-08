package com.DataRoom.springboot.config;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.DataRoom.common.SpringUtil;

@Configuration
public class IndexView extends WebMvcConfigurerAdapter {
	@Autowired
	private MessageSource messageSource;
	 @Override
	    public void addViewControllers( ViewControllerRegistry registry ) {
		 
		String LoginPage= this.messageSource.getMessage("system.loginpage", null, Locale.CHINA) ;
		 System.out.println(LoginPage);
	        registry.addViewController( "/" ).setViewName( "redirect:"+LoginPage );
	        registry.setOrder( Ordered.HIGHEST_PRECEDENCE );
	        super.addViewControllers( registry );
	    } 
}
