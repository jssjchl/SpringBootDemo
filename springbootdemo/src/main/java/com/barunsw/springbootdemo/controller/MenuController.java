package com.barunsw.springbootdemo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.barunsw.springbootdemo.service.MenuService;
import com.barunsw.springbootdemo.vo.MenuVo;
import com.barunsw.springbootdemo.vo.ResponseVo;

@Controller
public class MenuController {
	private static final Logger logger = LoggerFactory.getLogger(MenuController.class);
	@Autowired
	private MenuService menuService;
	
	@GetMapping("/menuData/{menu}")
	public ResponseEntity<ResponseVo> MenuList(@PathVariable String menu) {
		ResponseVo responseVo = new ResponseVo();
		List<MenuVo> menuDataList = menuService.getMenuList(menu);
		responseVo.setResult("OK");
		responseVo.setData(menuDataList);
		return responseVo.build();
	}


	@PostMapping("/addMenu")
	public ResponseEntity addMenuData(MenuVo menuVo) {
		ResponseVo responseVo = new ResponseVo();
		int result = menuService.insertMenuData(menuVo);
		responseVo.setResult("OK");
		responseVo.setData(result);
		return responseVo.build();
	}
	@PostMapping("/updateMenu")
	public ResponseEntity updateMenuData(MenuVo menuVo) {
		int result = menuService.updateMenuData(menuVo);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteMenu")
	public ResponseEntity deleteMenuData(MenuVo menuVo) {
		int result = menuService.deleteMenuData(menuVo);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
