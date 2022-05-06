package com.barunsw.springbootdemo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.barunsw.springbootdemo.service.UserService;
import com.barunsw.springbootdemo.vo.UserVo;

@Controller
public class UserController {
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@GetMapping("/getAllUserList")
	public ResponseEntity getAllUserList() {
		List<UserVo> userList = userService.getAllUserList();
		LOGGER.info("uservo ={}", userList);
		return new ResponseEntity<>(userList, HttpStatus.OK);
	}

	@PostMapping("/updateUser")
	public ResponseEntity updateUser(UserVo userVo) {
		int result = userService.updateUser(userVo);
		LOGGER.info("uservo ={}", userVo);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@DeleteMapping("/deleteUser")
	public ResponseEntity deleteUser(UserVo userVo) {
		int result = userService.deleteUser(userVo);
		LOGGER.info("uservo ={}", userVo);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
