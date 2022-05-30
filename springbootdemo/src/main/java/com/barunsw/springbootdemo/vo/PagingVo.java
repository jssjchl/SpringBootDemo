package com.barunsw.springbootdemo.vo;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class PagingVo {

	private int pagenum;
	private int pagesize;
	private int offset;

	public int getPagenum() {
		return pagenum;
	}

	public void setPagenum(int pagenum) {
		this.pagenum = pagenum;
	}

	public int getPagesize() {
		return pagesize;
	}

	public void setPagesize(int pagesize) {
		this.pagesize = pagesize;
	}

	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
