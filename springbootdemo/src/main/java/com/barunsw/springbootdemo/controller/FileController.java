package com.barunsw.springbootdemo.controller;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import com.barunsw.springbootdemo.service.FileService;

@Controller
public class FileController {
	private static final Logger logger = LoggerFactory.getLogger(FileController.class);

	@Autowired
	private FileService fileService;

	@PostMapping("/fileUpload")
	public ResponseEntity insertFile(MultipartFile file) throws Exception {
		logger.info(file + "");
		ResponseEntity result = fileService.saveFile(file);
		if (result != null) {
			logger.debug("result.getBody() : {}", result.getBody());
			return new ResponseEntity<>(result.getBody(), HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(result.getBody(), HttpStatus.OK);
		}
	}

	@GetMapping("/fileDownload/{fileId}")
	public void downloadFile(@PathVariable("fileId") int fileId, HttpServletResponse response) throws Exception {
		// @PathVariable은 Url을 통해서 받은 값을 파라미터로 받을 수 있다.
		fileService.getFile(fileId, response);
	}
}
