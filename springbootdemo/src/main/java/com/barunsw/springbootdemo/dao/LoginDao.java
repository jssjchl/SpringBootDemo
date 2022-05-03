package com.barunsw.springbootdemo.dao;

import org.apache.ibatis.annotations.Mapper;
import com.barunsw.springbootdemo.vo.UserVo;

@Mapper
public interface LoginDao {
	UserVo selectUser(UserVo userVo);
	UserVo insertUser(UserVo userVo);
}
