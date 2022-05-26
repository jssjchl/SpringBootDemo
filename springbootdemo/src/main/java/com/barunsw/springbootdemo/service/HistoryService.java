package com.barunsw.springbootdemo.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barunsw.springbootdemo.dao.HistoryDao;
import com.barunsw.springbootdemo.vo.HistoryVo;

@Service
public class HistoryService {
	private static final Logger LOGGER = LoggerFactory.getLogger(HistoryService.class);

	@Autowired
	private HistoryDao historyDao;
	
	public List<HistoryVo> getHistoryList() {
		List<HistoryVo> list = historyDao.selectHistoryList();
		return list;
	}
	
	public List<HistoryVo> searchHistoryData(HistoryVo historyVo) {
		return historyDao.searchHistoryDataList(historyVo);
	}
}
