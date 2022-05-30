package com.barunsw.springbootdemo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.barunsw.springbootdemo.constants.Result;
import com.barunsw.springbootdemo.service.HistoryService;
import com.barunsw.springbootdemo.vo.HistoryVo;
import com.barunsw.springbootdemo.vo.ResponseVo;

@Controller
public class HistoryController {
	private static final Logger LOGGER = LoggerFactory.getLogger(HistoryController.class);
	@Autowired
	private HistoryService historyService;

	@GetMapping("/getHistoryList")
	public ResponseEntity<ResponseVo> getHistoryList(HistoryVo historyVo) {
		LOGGER.debug("/getHistoryList : {}", historyVo);
		
		ResponseVo responseVo = new ResponseVo();
		
		int totalHistory = historyService.totalCountHistory(historyVo);
		List<HistoryVo> historyList = historyService.searchHistoryData(historyVo);
		responseVo.setTotalCount(totalHistory);
		responseVo.setData(historyList);
		responseVo.setResult(Result.OK);
			
		return responseVo.build();
	}
}
