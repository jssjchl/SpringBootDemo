package com.barunsw.springbootdemo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.barunsw.springbootdemo.vo.HistoryVo;

@Mapper
public interface HistoryDao {
	
	List<HistoryVo> selectHistoryList();

	int insertHistory(HistoryVo historyVo);
	
	List<HistoryVo> searchHistoryDataList(HistoryVo historyVo);
}
