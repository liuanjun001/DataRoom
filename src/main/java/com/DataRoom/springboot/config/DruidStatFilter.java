package com.DataRoom.springboot.config;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebInitParam;

import com.alibaba.druid.support.http.WebStatFilter;

@WebFilter(filterName="druidWebStatFilter",urlPatterns="/*",
initParams={
    @WebInitParam(name="exclusions",value="*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico,/druid/*")// 忽略资源
})
/**
 * Druid拦截器，用于查看Druid监控
 * @author Liuanjun
 * @since 2017年9月13日14:13:39
 */
public class DruidStatFilter extends WebStatFilter {

}
