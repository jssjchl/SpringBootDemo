package com.barunsw.springbootdemo.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class HttpMethodFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// get , post 외에 요청을 걸러주는 역할 httpmethodfilter
		if (!request.getMethod().equalsIgnoreCase("GET") && !request.getMethod().equalsIgnoreCase("POST")) {
			response.setStatus(405);
		}

		filterChain.doFilter(request, response);
	}

}
