package com.barunsw.springbootdemo.vo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseVo {
	private HttpStatus status = HttpStatus.OK;
	private String result;
	private String message;
	private Object data;

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
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
