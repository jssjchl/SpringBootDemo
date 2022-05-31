package com.barunsw.springbootdemo.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.barunsw.springbootdemo.security.LoginDetailService;
import com.barunsw.springbootdemo.security.MyLoginSuccessHandler;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private final Logger LOGGER = LoggerFactory.getLogger(SecurityConfig.class);

	@Autowired
	private LoginDetailService detailService;
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		 web.ignoring()
         .antMatchers("/static/**", "favicon.ico");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		LOGGER.debug("configure Http!");
		  http
		  .csrf().disable()
		  .authorizeRequests() //Authorization API
		  .antMatchers("/login/**").permitAll()
		  .anyRequest().authenticated()
		  .and()
		  .formLogin() //Authentication API
		  .loginPage("/login/login")
		  .loginProcessingUrl("/login/loginCheck")
		  .successHandler(new MyLoginSuccessHandler());
	}
	
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
		LOGGER.debug("auth userDetailsService!");
        auth.userDetailsService(detailService);
    }
}
