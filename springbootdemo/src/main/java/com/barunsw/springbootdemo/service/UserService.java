package com.barunsw.springbootdemo.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barunsw.springbootdemo.dao.UserDao;
import com.barunsw.springbootdemo.vo.UserVo;

@Service
public class UserService {
	private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserDao userDao;

	public List<UserVo> getAllUserList() {
		List<UserVo> allUserList = userDao.selectAllUseList();
		LOGGER.info(allUserList.toString());
		return allUserList;
	}

	public int updateUser(UserVo userVo) {
		return userDao.updateUser(userVo);
	}
	
	public int deleteUser(UserVo userVo) {
		return userDao.deleteUser(userVo);
	}
}
