package com.barunsw.springbootdemo.vo;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HistoryVo {
	private static final Logger LOGGER = LoggerFactory.getLogger(HistoryVo.class);

	private int seq;
	private String url;
	private String eventTime;
	private String operatorId;
	private String operatorIp;
	private String param;
	private String result;
	private String reason;
	private String coloumType;
	private String searchData;
	private String startDate;
	private String endDate;

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getColoumType() {
		return coloumType;
	}

	public void setColoumType(String coloumType) {
		this.coloumType = coloumType;
	}

	public String getSearchData() {
		return searchData;
	}

	public void setSearchData(String searchData) {
		this.searchData = searchData;
	}

	public HistoryVo() {
	}

	public HistoryVo(HttpServletRequest request, String param) {
		super();
		UserVo userVo = (UserVo) request.getSession().getAttribute("user");
		this.url = request.getRequestURI();
		this.operatorId = userVo.toString();
		this.operatorIp = request.getRemoteAddr();
		this.param = param;
		this.result = "OK";
		this.reason = "reason";
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getEventTime() {
		return eventTime;
	}

	public void setEventTime(String eventTime) {
		this.eventTime = eventTime;
	}

	public String getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(String operatorId) {
		this.operatorId = operatorId;
	}

	public String getOperatorIp() {
		return operatorIp;
	}

	public void setOperatorIp(String operatorIp) {
		this.operatorIp = operatorIp;
	}

	public String getParam() {
		return param;
	}

	public void setParam(String param) {
		this.param = param;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
	}

}
