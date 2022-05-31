package com.barunsw.springbootdemo.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.barunsw.springbootdemo.dao.LoginDao;
import com.barunsw.springbootdemo.vo.UserVo;

@Service
public class LoginDetailService implements UserDetailsService {
	private final Logger LOGGER = LoggerFactory.getLogger(LoginDetailService.class);
	
	@Autowired
	private LoginDao dao;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { //userDetails 안에 구현되어있는 것으로 username, password, Authorities
		LOGGER.debug("loadUserBuUsername : {} ", username);
		UserVo userVo = new UserVo();
		userVo.setUsername(username);
		UserVo user = dao.selectUser(userVo);

		if (user == null) {
			return null;
		}
		
		LOGGER.debug(username);
		return User.builder()
				.username(user.getUsername())
				.password("{noop}" + user.getPassword())
				.roles("USER")
				.build();
	}
}
