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
