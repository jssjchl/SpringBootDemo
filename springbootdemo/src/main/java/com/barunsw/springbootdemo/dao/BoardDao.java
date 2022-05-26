package com.barunsw.springbootdemo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.barunsw.springbootdemo.vo.BoardVo;

@Mapper
public interface BoardDao {

	List<BoardVo> getBoardList();

	BoardVo getBoardData(int boardId);

	int registBoard(BoardVo boardVo);

}
