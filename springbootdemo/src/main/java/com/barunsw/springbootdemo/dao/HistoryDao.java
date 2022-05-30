package com.barunsw.springbootdemo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.barunsw.springbootdemo.vo.HistoryVo;
import com.barunsw.springbootdemo.vo.PagingVo;

@Mapper
public interface HistoryDao {

	List<HistoryVo> selectHistoryList(PagingVo vo);

	int insertHistory(HistoryVo historyVo);

	int countHistory(HistoryVo historyVo);

	List<HistoryVo> searchHistoryDataList(HistoryVo vo);

}
