package com.barunsw.springbootdemo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.barunsw.springbootdemo.vo.UserVo;

@Mapper
public interface UserDao {
	List<UserVo> selectAllUseList();

	int updateUser(UserVo userVo);

	int deleteUser(UserVo userVo);
}
