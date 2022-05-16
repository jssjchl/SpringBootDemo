package com.barunsw.springbootdemo.vo;

import java.util.Date;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class BoardVo extends FileVo{
	private int boardId;
	private String title;
	private String register;
	private String content;
	private Integer fileId;
	private Date reg_Time;

	public int getBoardId() {
		return boardId;
	}

	public void setBoardId(int boardId) {
		this.boardId = boardId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getRegister() {
		return register;
	}

	public void setRegister(String register) {
		this.register = register;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getFileId() {
		return fileId;
	}

	public void setFileId(Integer fileId) {
		this.fileId = fileId;
	}

	public Date getReg_Time() {
		return reg_Time;
	}

	public void setReg_Time(Date reg_Time) {
		this.reg_Time = reg_Time;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}
