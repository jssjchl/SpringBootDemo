package com.barunsw.springbootdemo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.barunsw.springbootdemo.constants.Result;
import com.barunsw.springbootdemo.service.HistoryService;
import com.barunsw.springbootdemo.vo.HistoryVo;
import com.barunsw.springbootdemo.vo.ResponseVo;

@Controller
public class HistoryController {
	private static final Logger LOGGER = LoggerFactory.getLogger(HistoryController.class);
	@Autowired
	private HistoryService historyService;

	@GetMapping("/getHistory")
	public ResponseEntity<ResponseVo> getHistory() {
		ResponseVo responseVo = new ResponseVo();
		List<HistoryVo> historyList = historyService.getHistoryList();
		responseVo.setData(historyList);
		responseVo.setResult(Result.OK);
		return responseVo.build();
	}

	@GetMapping("/searchHistory/{coloumType}/{searchData}/{startDate}/{endDate}")
	public ResponseEntity<ResponseVo> searchHistory(@PathVariable String coloumType, @PathVariable String searchData,
															@PathVariable String startDate, @PathVariable String endDate) {
		ResponseVo responseVo = new ResponseVo();
		HistoryVo historyVo = new HistoryVo();
		historyVo.setSearchData(searchData);
		historyVo.setColoumType(coloumType);
		historyVo.setStartDate(startDate);
		historyVo.setEndDate(endDate);
		List<HistoryVo> historyList = historyService.searchHistoryData(historyVo);
		responseVo.setData(historyList);
		responseVo.setResult(Result.OK);
		return responseVo.build();
	}
}
