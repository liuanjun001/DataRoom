package com.DataRoom.common;

import org.springframework.beans.BeansException;
import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import org.springframework.stereotype.Component;
@Component
public class SpringUtil implements ApplicationContextAware {

    private static ApplicationContext applicationContext = null;
// 非@import显式注入，@Component是必须的，且该类必须与main同包或子包
    // 若非同包或子包，则需手动import 注入，有没有@Component都一样
    // 可复制到Test同包测试

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        if(SpringUtil.applicationContext == null){
            SpringUtil.applicationContext  = applicationContext;
        }
    }

    //获取applicationContext
    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    //通过name获取 Bean.
    public static Object getBean(String name){
        return getApplicationContext().getBean(name);

    }

    //通过class获取Bean.
    public static <T> T getBean(Class<T> clazz){
        return getApplicationContext().getBean(clazz);
    }

    //通过name,以及Clazz返回指定的Bean
    public static <T> T getBean(String name,Class<T> clazz){
        return getApplicationContext().getBean(name, clazz);
    }
    /**
     * 获取属性
     * @param headstr
     * @param key
     * @param defaultvalue
     * @return
     */
	public static String getProperty(String headstr, String key, String defaultvalue) {
		RelaxedPropertyResolver propertyResolver = new RelaxedPropertyResolver(applicationContext.getEnvironment(),
				headstr);
		String ret = propertyResolver.getProperty(key, defaultvalue);
		return ret;
	}
    /**
     * 获取属性
     * @param headstr
     * @param key
     * @param defaultvalue
     * @return
     */
	public static RelaxedPropertyResolver getpropertyResolver(String headstr) {
		RelaxedPropertyResolver propertyResolver = new RelaxedPropertyResolver(applicationContext.getEnvironment(),
				headstr);
		 
		return propertyResolver;
	}
}