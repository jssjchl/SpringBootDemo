package com.barunsw.springbootdemo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.barunsw.springbootdemo.dao.TestDao;

@Controller
public class ViewController {

	private static final Logger logger = LoggerFactory.getLogger(ViewController.class);

	@Autowired
	public TestDao testDao;

	@GetMapping("/")
	public String homePage(Model model) {
		model.addAttribute("callpage", "common/empty");
		return "index";
	}

	@GetMapping("/table")
	public String getUserList(Model model) {
		model.addAttribute("callpage", "user/table");
		return "index";
	}

	@GetMapping("/boardTable")
	public String getBoardList(Model model) {
		model.addAttribute("callpage", "board/boardTable");
		return "index";
	}

	@GetMapping("/regist")
	public String registPage(Model model) {
		model.addAttribute("callpage", "board/regist");
		return "index";
	}

	@GetMapping("/editMenu")
	public String editMenuPage(Model model) {
		model.addAttribute("callpage", "menu/editMenu");
		return "index";
	}

	@GetMapping("/groupPage")
	public String editGroupPage(Model model) {
		model.addAttribute("callpage", "group/groupPage");
		return "index";
	}

	@GetMapping("/auth")
	public String authPage(Model model) {
		model.addAttribute("callpage", "authorization/auth");
		return "index";
	}

	@GetMapping("/history")
	public String historyPage(Model model) {
		model.addAttribute("callpage", "history/history");
		return "index";
	}
}
