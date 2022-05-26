package com.barunsw.springbootdemo.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barunsw.springbootdemo.dao.BoardDao;
import com.barunsw.springbootdemo.vo.BoardVo;

@Service
public class BoardService {
	private static final Logger logger = LoggerFactory.getLogger(BoardService.class);

	@Autowired
	private BoardDao boardDao;

	public List<BoardVo> getBoardList() {
		List<BoardVo> boardList = boardDao.getBoardList();
		return boardList;
	}

	public BoardVo getBoardData(int boardId) {
		BoardVo boardData = boardDao.getBoardData(boardId);
		return boardData;
	}

	public int registBoard(BoardVo boardVo) {
		int result = boardDao.registBoard(boardVo);
		return result;
	}

}
