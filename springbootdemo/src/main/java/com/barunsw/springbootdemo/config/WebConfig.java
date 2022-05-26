package com.barunsw.springbootdemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.barunsw.springbootdemo.intercepter.LoginAuthIntercepter;

@Configuration //스프링의 설정을 해주는 부분임 == xml의ㅣ 역할
public class WebConfig implements WebMvcConfigurer{

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new LoginAuthIntercepter())
				.excludePathPatterns("/static/**", "/login/**"); //static이하의 파일들은 인터셉터를 타지 않는다
	}
}
