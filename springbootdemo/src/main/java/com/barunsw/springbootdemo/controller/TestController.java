package com.barunsw.springbootdemo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.barunsw.springbootdemo.dao.TestDao;

@Controller
public class TestController {

	private static final Logger logger = LoggerFactory.getLogger(TestController.class);

	@Autowired
	public TestDao testDao;

	@GetMapping("/")
	public ResponseEntity nameList() {
		List<String> name = testDao.selectNameList();
		logger.debug("name ={}", name);
		return new ResponseEntity<>(name, HttpStatus.OK);
	}
	@GetMapping("/index")
	public String indesPage() {
		return "index";
	}
	
}
