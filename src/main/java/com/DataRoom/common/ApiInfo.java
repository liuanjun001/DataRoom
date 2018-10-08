/**
 * 
 */
package com.DataRoom.common;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.CONSTRUCTOR;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.LOCAL_VARIABLE;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.ElementType.TYPE_PARAMETER;
import static java.lang.annotation.ElementType.TYPE_USE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

@Documented
@Retention(RUNTIME)
@Target({ TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE, ANNOTATION_TYPE, TYPE_PARAMETER, TYPE_USE })
/**
 * @author liuan
 *
 */
public @interface ApiInfo {
	public String name() default "";//名称
	public String servicename() default "";// 对外服务名

	public String auth() default "";// 作者

	public String comment() default "";// 注释

	public String date() default "";// 创建日期

	public String group() default "";// 分组 标签

	public String returncomment() default "";

	public boolean isPublicApi() default true;// 是否对外公开Api文档
}