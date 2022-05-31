package com.barunsw.springbootdemo.aop;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.barunsw.springbootdemo.dao.HistoryDao;
import com.barunsw.springbootdemo.vo.HistoryVo;

@Component
@Aspect
public class HistoryManager {
	private static final Logger LOGGER = LoggerFactory.getLogger(HistoryManager.class);

	@Autowired
	private HistoryDao historyDao;

	@Around("execution(* com.barunsw.springbootdemo.service.*.*(..)) && ( !@annotation(com.barunsw.springbootdemo.annotation.ExcludeHistory))")
	public Object doSomethingAround(ProceedingJoinPoint joinPoint) {
		LOGGER.debug("JOINPOINT ARGS = {}", joinPoint.getArgs());

		StringBuffer sb = new StringBuffer();
		for (Object arg : joinPoint.getArgs()) {
			sb.append(arg.toString()).append("\n");
		}

		LOGGER.debug("AOP 전");
		Object result = null;
		try {
			result = joinPoint.proceed();
		}
		catch (Throwable e) {
			LOGGER.error(e.getMessage(), e);
		}
		LOGGER.debug("AOP 후");
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		
		LOGGER.debug("session result ={}", request.getSession().getAttribute("user"));
		if (request.getSession().getAttribute("user") != null) {
			HistoryVo historyVo = new HistoryVo(request, sb.toString());
			historyDao.insertHistory(historyVo);
		}
		return result;
	}
}
