package com.barunsw.springbootdemo.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.barunsw.springbootdemo.vo.GroupVo;

@Mapper
public interface GroupDao {

	List<GroupVo> selectGroupList();

	int insertGroupData(GroupVo groupVo);

	int updateGroupData(GroupVo groupVo);

	int deleteGroupData(GroupVo groupVo);
}
