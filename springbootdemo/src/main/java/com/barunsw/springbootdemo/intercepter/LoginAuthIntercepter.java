package com.barunsw.springbootdemo.intercepter;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.barunsw.springbootdemo.service.UserService;
import com.barunsw.springbootdemo.vo.GroupMappingVo;

@Component
public class LoginAuthIntercepter implements HandlerInterceptor {
	private static final Logger LOGGER = LoggerFactory.getLogger(LoginAuthIntercepter.class);

	@Autowired
	private UserService service;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		if (request.getRequestURI().equals("/auth")) {

			LOGGER.debug("LoginAuthIntercepter = {} ", request.getRequestURI());
			User userInfo = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			GroupMappingVo uservo = new GroupMappingVo();
			uservo.setUserName(userInfo.getUsername());
			int cnt = service.selectDev1andAdmin(uservo);
			LOGGER.debug("authList.size = {} ", cnt);
			if (cnt > 0) {
				return true;
			}
			else {
				response.setContentType("text/html; charset=UTF-8");
				PrintWriter out = response.getWriter();
				out.println("<script>alert('접근할 권한이 없습니다.'); location.href='/';</script>");
				out.flush();
				return false;
			}
		}
		else {
			return true;
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
