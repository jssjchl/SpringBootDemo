package com.barunsw.springbootdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barunsw.springbootdemo.dao.MenuDao;
import com.barunsw.springbootdemo.vo.MenuVo;

@Service
public class MenuService {

	@Autowired
	private MenuDao menuDao;

	public List<MenuVo> getMenuList() {
		List<MenuVo> menuList = menuDao.selectMenuList();
		return menuList;
	}
}
