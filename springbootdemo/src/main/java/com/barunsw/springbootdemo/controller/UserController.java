package com.barunsw.springbootdemo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.barunsw.springbootdemo.constants.RequestType;
import com.barunsw.springbootdemo.constants.Result;
import com.barunsw.springbootdemo.security.UserPasswordEncode;
import com.barunsw.springbootdemo.service.UserService;
import com.barunsw.springbootdemo.vo.GroupMappingVo;
import com.barunsw.springbootdemo.vo.ResponseVo;
import com.barunsw.springbootdemo.vo.UserVo;

@Controller
public class UserController {
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserPasswordEncode getPasswordEncoder; 
	
	@Autowired
	private UserService userService;

	@GetMapping("/getAllUserList")
	public ResponseEntity<ResponseVo> getAllUserList() {
		ResponseVo responseVo = new ResponseVo();
		List<UserVo> userList = userService.getAllUserList();
		responseVo.setData(userList);
		responseVo.setResult(Result.OK);
		return responseVo.build();
	}

	@GetMapping("/getAuthUser/{groupId}")
	public ResponseEntity<ResponseVo> getDenyUser(@PathVariable int groupId) {
		ResponseVo responseVo = new ResponseVo();
		List<UserVo> authUserList = userService.getAuthUser(groupId);
		responseVo.setData(authUserList);
		responseVo.setResult(Result.OK);
		return responseVo.build();
	}

	@GetMapping("/getDenyUser/{groupId}")
	public ResponseEntity<ResponseVo> getAuthUser(@PathVariable int groupId) {
		ResponseVo responseVo = new ResponseVo();
		List<UserVo> denyUserList = userService.getDenyUser(groupId);
		responseVo.setData(denyUserList);
		responseVo.setResult(Result.OK);
		return responseVo.build();
	}

	@PostMapping("/addAuth")
	public ResponseEntity<ResponseVo> addUserAuthGroup(GroupMappingVo groupMappingVo) {
		ResponseVo responseVo = new ResponseVo();
		int result = userService.addAuthUser(groupMappingVo);
		responseVo.setData(result);
		responseVo.setResult(Result.OK);
		return responseVo.build();
	}

	@DeleteMapping("/removeAuth")
	public ResponseEntity<ResponseVo> removeUserAuthGroup(GroupMappingVo groupMappingVo) {
		ResponseVo responseVo = new ResponseVo();
		int result = userService.removeAuthUser(groupMappingVo);
		responseVo.setData(result);
		responseVo.setResult(Result.OK);
		return responseVo.build();
	}

	@PostMapping("/updateUser")
	public ResponseEntity<ResponseVo> updateUser(UserVo userVo) {
		ResponseVo responseVo = new ResponseVo();
		LOGGER.debug("UserContorller = {}", userVo.toString());
		userVo.setPassword(getPasswordEncoder.encode(userVo.getPassword()));
		int result = userService.updateUser(userVo);
		responseVo.setData(result);
		responseVo.setResult(Result.OK);
		return responseVo.build();
	}

	@DeleteMapping("/deleteUser")
	public ResponseEntity<ResponseVo> deleteUser(UserVo userVo) {
		ResponseVo responseVo = new ResponseVo();
		int result = userService.deleteUser(userVo);
		responseVo.setData(result);
		responseVo.setResult(Result.OK);
		return responseVo.build();
	}

	@PostMapping("/setAuth")
	public ResponseEntity<ResponseVo> setAuth(GroupMappingVo groupMappingVo) {
		ResponseVo response = new ResponseVo();
		int result = 0;
		if (groupMappingVo.getRequestType() == RequestType.I) {
			result = userService.addAuthUser(groupMappingVo);
		}
		else {
			result = userService.removeAuthUser(groupMappingVo);
		}
		response.setData(result);
		response.setResult(Result.OK);
		return response.build();
	}
}
