package com.barunsw.springbootdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barunsw.springbootdemo.dao.GroupDao;
import com.barunsw.springbootdemo.vo.GroupVo;

@Service
public class GroupService {

	@Autowired
	private GroupDao groupDao;

	public List<GroupVo> getGroupData() {
		List<GroupVo> groupDataList = groupDao.selectGroupList();
		return groupDataList;
	}

	public int addGroupData(GroupVo groupVo) {
		int result = groupDao.insertGroupData(groupVo);
		return result;
	}

	public int editGroupData(GroupVo groupVo) {
		int result = groupDao.updateGroupData(groupVo);
		return result;
	}

	public int removeGroupData(GroupVo groupVo) {
		int result = groupDao.deleteGroupData(groupVo);
		return result;
	}
}
