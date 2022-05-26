package com.barunsw.springbootdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barunsw.springbootdemo.annotation.ExcludeHistory;
import com.barunsw.springbootdemo.dao.MenuDao;
import com.barunsw.springbootdemo.vo.MenuVo;

@Service
public class MenuService {

	@Autowired
	private MenuDao menuDao;

	@ExcludeHistory
	public List<MenuVo> getMenuList(String menu) {
		List<MenuVo> menuList = menuDao.selectMenuList(menu);
		return menuList;
	}
	public int insertMenuData(MenuVo menuVo) {
		int result = menuDao.insertMenuData(menuVo);
		return result;
	}
	public int updateMenuData(MenuVo menuVo) {
		int result = menuDao.updateMenuData(menuVo);
		return result;
	}
	public int deleteMenuData(MenuVo menuVO) {
		int result = menuDao.deleteMenuData(menuVO);
		return result;
	}
}
