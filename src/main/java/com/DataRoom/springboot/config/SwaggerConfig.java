package com.DataRoom.springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * SwaggerConfig
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
	@Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com"))
                .paths(PathSelectors.any())
                .build();
    }
    @SuppressWarnings("deprecation")
	private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("云博监控平台API")
                .description("云博监控平台API")
                .termsOfServiceUrl("http://www.szrobot.net/")
                .contact("liuanjun")
                .version("1.0")
                .build();
    }

}
