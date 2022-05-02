package com.barunsw.springbootdemo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TestDao {
	List<String> selectNameList();
}
