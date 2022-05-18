package com.barunsw.springbootdemo.vo;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class MenuVo {

	private int menu_Id;
	private String menu_Name;
	private int parent_Id;
	private String menu_Url;
	private String menu;

	public int getMenu_Id() {
		return menu_Id;
	}

	public void setMenu_Id(int menu_Id) {
		this.menu_Id = menu_Id;
	}

	public String getMenu_Name() {
		return menu_Name;
	}

	public void setMenu_Name(String menu_Name) {
		this.menu_Name = menu_Name;
	}

	public int getParent_Id() {
		return parent_Id;
	}

	public void setParent_Id(int parent_Id) {
		this.parent_Id = parent_Id;
	}

	public String getMenu_Url() {
		return menu_Url;
	}

	public void setMenu_Url(String menu_Url) {
		this.menu_Url = menu_Url;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
