package com.barunsw.springbootdemo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import com.barunsw.springbootdemo.service.BoardService;
import com.barunsw.springbootdemo.vo.BoardVo;

@Controller
public class BoardController {
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

	@Autowired
	private BoardService boardService;

	@GetMapping("/boardList")
	public ResponseEntity getBoardList(BoardVo boardVo) {
		List<BoardVo> boardList = boardService.getBoardList();
		return new ResponseEntity<>(boardList, HttpStatus.OK);
	}

	@PostMapping("/registBoard")
	public ResponseEntity registBoard(BoardVo boardVo) {
		int result = boardService.registBoard(boardVo);
		if (result > 0) {
			logger.debug("boardTable");
			return new ResponseEntity<>("/boardTable", HttpStatus.OK);
		}
		else {
			logger.debug("regist");
			return new ResponseEntity<>("/regist", HttpStatus.OK);
		}
	}

	@GetMapping("/detail/{boardId}")
	public ModelAndView detailPage(@PathVariable("boardId") int boardId) {
		BoardVo boardVo = boardService.getBoardData(boardId);
		ModelAndView mav = new ModelAndView("detail/" + boardId);
		mav.addObject("content", boardVo.getContent());
		mav.addObject("title", boardVo.getTitle());
		mav.addObject("register", boardVo.getRegister());
		return mav;
	}
}
