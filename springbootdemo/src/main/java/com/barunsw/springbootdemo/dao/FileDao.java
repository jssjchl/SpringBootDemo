package com.barunsw.springbootdemo.dao;

import org.apache.ibatis.annotations.Mapper;

import com.barunsw.springbootdemo.vo.FileVo;

@Mapper
public interface FileDao {

	FileVo downloadFile(int fileId);
	
	int insertFile(FileVo fileVo);
	
}
