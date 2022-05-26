package com.barunsw.springbootdemo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.barunsw.springbootdemo.vo.GroupMappingVo;
import com.barunsw.springbootdemo.vo.UserVo;

@Mapper
public interface UserDao {
	List<UserVo> selectAllUseList();

	List<UserVo> selectAuthUserList(int groupId);

	List<UserVo> selectDenyUserList(int groupId);

	int addUserToAuthGroup(GroupMappingVo groupMappingVo);

	int removeUserFromAuthGroup(GroupMappingVo groupMappingVo);

	int updateUser(UserVo userVo);

	int deleteUser(UserVo userVo);
}
