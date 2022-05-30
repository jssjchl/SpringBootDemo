package com.barunsw.springbootdemo.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barunsw.springbootdemo.dao.HistoryDao;
import com.barunsw.springbootdemo.vo.HistoryVo;
import com.barunsw.springbootdemo.vo.PagingVo;

@Service
public class HistoryService {
	private static final Logger LOGGER = LoggerFactory.getLogger(HistoryService.class);

	@Autowired
	private HistoryDao historyDao;

	public int totalCountHistory(HistoryVo historyVo) {
		return historyDao.countHistory(historyVo);
	}

	public List<HistoryVo> getHistoryList(PagingVo vo) {
		List<HistoryVo> list = historyDao.selectHistoryList(vo);
		return list;
	}

	public List<HistoryVo> searchHistoryData(HistoryVo vo) {
		return historyDao.searchHistoryDataList(vo);
	}
}
