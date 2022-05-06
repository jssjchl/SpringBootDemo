package com.barunsw.springbootdemo.controller;

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

	@GetMapping("/login")
	public String loginPage() {
		return "login/login";
	}
	
	@PostMapping("/loginCheck")
	public String loginCheck(UserVo userVo) {
		log.info(userVo.toString());
		UserVo userCheck = loginService.loginProcess(userVo);
		if ( userCheck != null) {
			return "redirect:/";
		}
		else {
			return "redirect:/login";
		}
	}
	
	@GetMapping("/signup")
	public String singupPage() {
		return "login/signup";
	}

	@PostMapping("/signupCheck")
	public String signUpUser(UserVo userVo) {
		int singupCheck = loginService.signupProccess(userVo);
		if (singupCheck == 0) {
			return "redirect:/index";
		}
		else {
			return "redirect:/login";
		}
	}

}
