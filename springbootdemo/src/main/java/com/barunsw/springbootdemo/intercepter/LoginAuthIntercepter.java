package com.barunsw.springbootdemo.intercepter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.barunsw.springbootdemo.vo.UserVo;

@Component
public class LoginAuthIntercepter implements HandlerInterceptor {
	private static final Logger LOGGER = LoggerFactory.getLogger(LoginAuthIntercepter.class);
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		HttpSession session = request.getSession();
		Object o = session.getAttribute("user");
		if (o != null && o instanceof UserVo) {
			LOGGER.debug("session = {}", session.getAttribute("user"));
			return true;
		}
		else {
			response.sendRedirect("/login/login");
			return false;
		}
	}
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
	}

}
