package com.barunsw.springbootdemo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.barunsw.springbootdemo.service.GroupService;
import com.barunsw.springbootdemo.vo.GroupVo;
import com.barunsw.springbootdemo.vo.ResponseVo;

@Controller
public class GroupController {
	private static final Logger log = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	private GroupService groupService;

	@GetMapping("/groupData")
	public ResponseEntity<ResponseVo> GroupData() {
		ResponseVo responseVo = new ResponseVo();
		List<GroupVo> groupDataList = groupService.getGroupData();
		log.debug(groupDataList + "");
		responseVo.setData(groupDataList);
		responseVo.setResult("OK");
		return responseVo.build();
	}

	@PostMapping("/addGroup")
	public ResponseEntity<ResponseVo> addGroup(GroupVo groupVo) {
		ResponseVo responseVo = new ResponseVo();
		int result = groupService.addGroupData(groupVo);
		responseVo.setResult("OK");
		responseVo.setData(result);
		return responseVo.build();
	}
	@PostMapping("/updateGroup")
	public ResponseEntity<ResponseVo> updateGroup(GroupVo groupVo) {
		ResponseVo responseVo = new ResponseVo();
		int result = groupService.editGroupData(groupVo);
		responseVo.setResult("OK");
		responseVo.setData(result);
		return responseVo.build();
	}
	@DeleteMapping("/deleteGroup")
	public ResponseEntity<ResponseVo> deleteGroup(GroupVo groupVo){
		ResponseVo responseVo = new ResponseVo();
		int result = groupService.removeGroupData(groupVo);
		responseVo.setResult("OK");
		responseVo.setData(result);
		return responseVo.build();
	}
}
