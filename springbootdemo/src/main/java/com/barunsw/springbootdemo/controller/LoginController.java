package com.barunsw.springbootdemo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.barunsw.springbootdemo.service.LoginService;
import com.barunsw.springbootdemo.vo.UserVo;

@Controller
public class LoginController {
	private static final Logger log = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	private LoginService loginService;

	@GetMapping("/login/login")
	public String loginPage() {
		return "login/login";
	}

	@PostMapping("/login/loginCheck")
	public String loginCheck(UserVo userVo,HttpServletResponse response, HttpServletRequest request) { // request, response 파라미터로 받아라
		log.info(userVo.toString());
		UserVo userCheck = loginService.loginProcess(userVo);
		// 세션을받아서 활용해라 request에 있음
		if (userCheck != null) {
			HttpSession session = request.getSession();
			session.setAttribute("user", userCheck);
			return "redirect:/";
		}
		else {
			return "redirect:/login/login";
		}
	}
	
	@GetMapping("/login/signup")
	public String singupPage() {
		return "login/signup";
	}

	@PostMapping("/login/signupCheck")
	public String signUpUser(UserVo userVo) {
		int singupCheck = loginService.signupProccess(userVo);
		if (singupCheck == 0) {
			return "redirect:/index";
		}
		else {
			return "redirect:/login/login";
		}
	}

}
