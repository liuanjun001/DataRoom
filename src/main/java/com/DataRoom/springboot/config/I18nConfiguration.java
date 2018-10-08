package com.DataRoom.springboot.config;

import java.io.File;
import java.io.FilenameFilter;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.servlet.LocaleResolver;

import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver;

import com.DataRoom.MyTemplatesController;
import com.DataRoom.common.WriteLog;

@Configuration
public class I18nConfiguration {
	public static boolean scanTemplatesdired = false;
	@Autowired
	public ApplicationContext Context;

	@Bean(name = "localeResolver")
	public LocaleResolver localeResolverBean() {
		return new SessionLocaleResolver();
	}

	@Value("${spring.thymeleaf.prefix}")
	private String prefix;
	@Value("${spring.thymeleaf.suffix}")
	private String suffix;
	@Value("${spring.thymeleaf.mode}")
	private String mode;
	@Value("${spring.thymeleaf.cache}")
	private String cache;
	// @Value("${spring.messages.basename}")
	private String basename = "I18n/msg";
	@Value("${spring.messages.basedir}")
	private String basedir;

	@Bean(name = "htmlTemplateResolver")
	public SpringResourceTemplateResolver htmlTemplateResolver() {

		System.out.println("开启html thymeleaf,prefix:" + prefix + ",suffix:" + suffix + "mode:" + mode + ",basename:" + basename);
		SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
		templateResolver.setApplicationContext(Context);
		templateResolver.setPrefix(prefix);
		templateResolver.setSuffix(suffix);
		templateResolver.setTemplateMode(mode);
		templateResolver.setCacheable(cache.equals("false") ? false : true);
		templateResolver.setCharacterEncoding("UTF-8");

		System.out.println("=====" + basedir + "======");
		return templateResolver;
	}
//	@Bean(name = "jsTemplateResolver")
//	public SpringResourceTemplateResolver jsTemplateResolver() {
//
//		System.out.println("开启js thymeleaf,prefix:" + prefix + ",suffix:" + suffix + "mode:" + mode + ",basename:" + basename);
//		SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
//		templateResolver.setApplicationContext(Context);
//		templateResolver.setPrefix(prefix);
//		templateResolver.setSuffix("*.js");
//		templateResolver.setTemplateMode(mode);
//		templateResolver.setCacheable(cache.equals("false") ? false : true);
//		templateResolver.setCharacterEncoding("UTF-8");
//		return templateResolver;
//	}
	@Bean(name = "messageSource")
	public ResourceBundleMessageSource messageSource() {

		ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
		messageSource.setUseCodeAsDefaultMessage(true);
		messageSource.setFallbackToSystemLocale(false);

		if (basedir != null) {
			// 如果配置了国际化语言配置文件的路径
			String dirurl;
			try {
				dirurl = URLDecoder.decode(Thread.currentThread().getContextClassLoader().getResource("") + basedir,
						"UTF-8");
//				if (dirurl.startsWith("file:/")) {
//					dirurl = dirurl.substring("file:/".length());
//				}
				File dir = ResourceUtils.getFile(dirurl);
//				File dir = new File(dirurl);

				FilenameFilter filter = new FilenameFilter() {
					@Override
					public boolean accept(File dir, String name) {
						// 多语言文件名必须是.properties结尾，同时不能含下划线

						if (name.endsWith(".properties") && name.indexOf("_") < 0) {
							return true;
						}
						return false;
					}
				};
				File files[] = dir.listFiles(filter);
				if (files != null) {
					String a_basename[] = new String[files.length];
					for (int i = 0; i < a_basename.length; i++) {
						String filename = files[i].getName();
						a_basename[i] = basedir + "/"
								+ filename.substring(0, filename.length() - ".properties".length());
						System.out.println("==" + a_basename[i]);
					}
					// 设置国际化语言配置文件
					messageSource.setBasenames(a_basename);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

		} else {
			// 根据配置设置国际化语言配置文件
			messageSource.setBasenames(basename.split(","));
		}
		messageSource.setDefaultEncoding("UTF-8");
		messageSource.setCacheSeconds(2);
		if (!scanTemplatesdired) {
			// 如果没有扫描模板目录，则延时2秒扫描模板目录，并注册ServerLet
			// 如果不延时，用springboot,会报错，需等待springboot加载某些依赖再执行
			Thread th = new Thread() {
				public void run() {
					try {
						sleep(2000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					scandir();
				};
			};
			th.start();
			scanTemplatesdired = true;
		}
		return messageSource;

	}

	/**
	 * 扫描模板目录，并注册相应的url
	 */
	private void scandir() {
		try {

			RequestMappingHandlerMapping requestMappingHandlerMapping = Context
					.getBean(RequestMappingHandlerMapping.class);

			String templatespath = prefix;
			String dirurl = "";
			if (prefix.startsWith("classpath:/")) {
				// 如果模板目录含有classpath:/的配置是在/WEB-INF/classes
				dirurl = URLDecoder.decode(Thread.currentThread().getContextClassLoader().getResource("")
						+ templatespath.substring("classpath:/".length()), "UTF-8");
			} else {
				dirurl = URLDecoder.decode(Context.getResource("/").getURL() + templatespath, "UTF-8");
			}

			MyTemplatesController controll = Context.getBean(MyTemplatesController.class);
			Method getMappingForMethod = ReflectionUtils.findMethod(MyTemplatesController.class, "getMyHtmlTemplate",
					HttpServletRequest.class, HttpServletResponse.class);
			if (dirurl.startsWith("file:/")) {
				dirurl = dirurl.substring("file:/".length());
			}
			scandir(prefix, "/", requestMappingHandlerMapping, controll, getMappingForMethod);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 递归扫描目录并注册
	 * 
	 * @param dirurl
	 *            目录路径的URL
	 * @param path
	 *            目录路径
	 * @param requestMappingHandlerMapping
	 * @param controll
	 *            要注入的control
	 * @param getMappingForMethod
	 *            要注入的方法
	 */
	private void scandir(String dirurl, String path, RequestMappingHandlerMapping requestMappingHandlerMapping,
			MyTemplatesController controll, Method getMappingForMethod) {
		try {
//			File dir = new File(dirurl);
			File dir = ResourceUtils.getFile(dirurl);
			// System.out.println(dirurl+" =>"+path);
			if (dir.exists()) {
				File files[] = dir.listFiles();
				for (int i = 0; files != null && i < files.length; i++) {
					File file = files[i];
					if (file.isDirectory()) {
						scandir(file.getPath(), path + file.getName() + "/", requestMappingHandlerMapping, controll,
								getMappingForMethod);
					} else if (file.getName().toLowerCase().endsWith("html")&&!file.getName().toLowerCase().endsWith(".js.html")) {
						String url = path + file.getName();

						RequestMappingInfo map_info = RequestMappingInfo.paths(url).build();
						requestMappingHandlerMapping.setApplicationContext(Context);
						requestMappingHandlerMapping.registerMapping(map_info, controll, getMappingForMethod);
					}else if (file.getName().toLowerCase().endsWith(".js.html")) {
						String filename= file.getName();
						String url = path + filename.substring(0, filename.length()-".html".length());

						RequestMappingInfo map_info = RequestMappingInfo.paths(url).build();
						requestMappingHandlerMapping.setApplicationContext(Context);
						requestMappingHandlerMapping.registerMapping(map_info, controll, getMappingForMethod);
					}
				}
			}
			
		} catch (Exception e) {

			e.printStackTrace();
		}
	}

}
