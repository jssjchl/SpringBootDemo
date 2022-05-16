package com.barunsw.springbootdemo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.barunsw.springbootdemo.vo.MenuVo;

@Mapper
public interface MenuDao {
	
	List<MenuVo> selectMenuList();
}
