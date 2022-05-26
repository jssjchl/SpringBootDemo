package com.barunsw.springbootdemo.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.file.Paths;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.barunsw.springbootdemo.dao.FileDao;
import com.barunsw.springbootdemo.vo.FileVo;

@Service
public class FileService {
	private static final Logger logger = LoggerFactory.getLogger(FileService.class);

	@Autowired
	private FileDao fileDao;

	@Value("${uploadPath}")
	private String uploadPath;

	public void getFile(int fileId, HttpServletResponse response) {
		logger.debug("response = {}", response);
		FileVo fileVo = fileDao.downloadFile(fileId);
		try {
			String filePath = fileVo.getFilePath();
			String fileName = fileVo.getFileName();
			String downloadFilePath = filePath + File.separator + fileName;
			
			logger.debug(downloadFilePath);
			fileName = URLEncoder.encode(fileName, "UTF-8");
			response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
			//Content-Disposition에 attachment 속성을 주면 fileName을 가진 값을 다운로드하라는 뜻이 됨
			try (FileInputStream fileInputStream = new FileInputStream(downloadFilePath);
					OutputStream out = response.getOutputStream();) {

				int read = 0;
				byte[] buffer = new byte[1024];
				while ((read = fileInputStream.read(buffer)) != -1) {
					out.write(buffer, 0, read);
				}
			}
		}
		catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		logger.info("response 64: {}", response.getStatus());
	}

	public ResponseEntity saveFile(MultipartFile file) throws Exception {

		if (file.isEmpty()) {
			return new ResponseEntity<>(0, HttpStatus.OK);
		}
		String fileName = file.getOriginalFilename();
		String uuid = UUID.randomUUID().toString();
		String filePath = uploadPath + File.separator + uuid;
		logger.info("filePath ={}", filePath);
		File dest = new File(filePath);
		if (!dest.exists()) {
			dest.mkdir();
		}
		file.transferTo(Paths.get(filePath + File.separator + fileName));

		FileVo fileVo = new FileVo();

		fileVo.setFileName(fileName);
		fileVo.setFilePath(filePath);

		int result = fileDao.insertFile(fileVo);

		logger.info("result: {}", result);
		logger.info("FieldId: {}", fileVo.getFileId());

		return new ResponseEntity<>(fileVo.getFileId(), HttpStatus.OK);
	}
}
