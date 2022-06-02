package com.barunsw.springbootdemo.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barunsw.springbootdemo.dao.UserDao;
import com.barunsw.springbootdemo.vo.GroupMappingVo;
import com.barunsw.springbootdemo.vo.UserVo;

@Service
public class UserService {
	private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserDao userDao;

	public List<UserVo> getAllUserList() {
		List<UserVo> allUserList = userDao.selectAllUseList();
		return allUserList;
	}
	
	public int selectDev1andAdmin(GroupMappingVo user) {
		int cnt = userDao.selectDev1andAdmin(user);
		LOGGER.debug("selectDev1andAdmin = {}", cnt);
		return cnt;
	}

	public List<UserVo> getDenyUser(int groupId) {
		List<UserVo> denyUserList = userDao.selectDenyUserList(groupId);
		return denyUserList;
	}

	public List<UserVo> getAuthUser(int groupId) {
		List<UserVo> authUserList = userDao.selectAuthUserList(groupId);
		return authUserList;
	}

	public int addAuthUser(GroupMappingVo groupMappingVo) {
		return userDao.addUserToAuthGroup(groupMappingVo);
	}

	public int removeAuthUser(GroupMappingVo groupMappingVo) {
		return userDao.removeUserFromAuthGroup(groupMappingVo);
	}

	public int updateUser(UserVo userVo) {
		return userDao.updateUser(userVo);
	}

	public int deleteUser(UserVo userVo) {
		return userDao.deleteUser(userVo);
	}
}
