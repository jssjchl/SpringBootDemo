package com.barunsw.springbootdemo.vo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.barunsw.springbootdemo.constants.Result;

public class ResponseVo {
	private HttpStatus status = HttpStatus.OK;
	private Result result;
	private int totalCount;
	private String message = "성공";
	private Object data;

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public Result getResult() {
		return result;
	}

	public void setResult(Result result) {
		this.result = result;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public ResponseEntity<ResponseVo> build() {
		return new ResponseEntity<ResponseVo>(this, status);
	}
}
