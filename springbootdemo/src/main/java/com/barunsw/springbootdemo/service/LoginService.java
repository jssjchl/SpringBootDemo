package com.barunsw.springbootdemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barunsw.springbootdemo.dao.LoginDao;
import com.barunsw.springbootdemo.vo.UserVo;

@Service
public class LoginService {
	
	@Autowired
	private LoginDao loginDao;
	
	public UserVo loginProcess(UserVo userVo) {
		UserVo uservo = loginDao.selectUser(userVo);
		return uservo;
	}
	
	
	public UserVo signupProccess(UserVo userVo) {
		UserVo uservo = loginDao.insertUser(userVo);
		return uservo;
	}
}
