/**
 * 
 */
package com.DataRoom.common;

import static java.lang.annotation.ElementType.METHOD;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(METHOD)
/**
 * @author liuan
 *
 */
public @interface Permissions {
public boolean needLogin() default false;//是否需要登录
public String needRole() default "";//需要角色
}
