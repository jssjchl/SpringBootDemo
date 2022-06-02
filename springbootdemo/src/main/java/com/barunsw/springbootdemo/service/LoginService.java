package com.barunsw.springbootdemo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barunsw.springbootdemo.controller.LoginController;
import com.barunsw.springbootdemo.dao.LoginDao;
import com.barunsw.springbootdemo.vo.UserVo;

@Service
public class LoginService {
	private static final Logger log = LoggerFactory.getLogger(LoginService.class);

	@Autowired
	private LoginDao loginDao;
	
	public UserVo loginProcess(UserVo userVo) {
		UserVo uservo = loginDao.selectUser(userVo);
		return uservo;
	}

	public int signupProccess(UserVo userVo) {
		if (loginProcess(userVo) != null) {
			return 0;
		}
		else {
			int updateData= loginDao.insertUser(userVo);
			return updateData;
		}
	}
}
