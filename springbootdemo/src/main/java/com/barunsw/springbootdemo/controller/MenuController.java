package com.barunsw.springbootdemo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.barunsw.springbootdemo.service.MenuService;
import com.barunsw.springbootdemo.vo.MenuVo;

@Controller
public class MenuController {
	private static final Logger logger = LoggerFactory.getLogger(MenuController.class);
	@Autowired
	private MenuService menuService;
	
	@GetMapping("/menuData")
	public ResponseEntity MenuList() {
		List<MenuVo> menuDataList = menuService.getMenuList();
		logger.info(menuDataList +"");
		return new ResponseEntity<>(menuDataList, HttpStatus.OK);
	}
}
