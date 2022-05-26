package com.barunsw.springbootdemo.vo;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class GroupVo {

	private int group_Id;
	private int parent_Group_Id;
	private String group_Name;

	public int getGroup_Id() {
		return group_Id;
	}

	public void setGroup_Id(int group_Id) {
		this.group_Id = group_Id;
	}

	public int getParent_Group_Id() {
		return parent_Group_Id;
	}

	public void setParent_Group_Id(int parent_Group_Id) {
		this.parent_Group_Id = parent_Group_Id;
	}

	public String getGroup_Name() {
		return group_Name;
	}

	public void setGroup_Name(String group_Name) {
		this.group_Name = group_Name;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}

}
