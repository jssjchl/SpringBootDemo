package com.barunsw.springbootdemo.vo;

import com.barunsw.springbootdemo.constants.RequestType;

public class GroupMappingVo {
	private RequestType requestType;
	private int groupId;
	private String userName;

	public RequestType getRequestType() {
		return requestType;
	}

	public void setRequestType(RequestType requestType) {
		this.requestType = requestType;
	}

	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

}
