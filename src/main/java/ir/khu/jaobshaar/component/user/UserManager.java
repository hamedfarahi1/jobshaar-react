package ir.khu.jaobshaar.component.user;

import ir.khu.jaobshaar.config.jwt.JwtUserDetailsService;
import ir.khu.jaobshaar.service.domain.UserDomain;
import ir.khu.jaobshaar.service.mapper.UserMapper;
import org.springframework.stereotype.Service;

@Service
public class UserManager {

    private final UserMapper userMapper;
    private JwtUserDetailsService jwtUserDetailsService;

    public UserManager(JwtUserDetailsService jwtUserDetailsService, UserMapper userMapper) {
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.userMapper = userMapper;
    }

    public UserDomain getCurrentUser() {
        return userMapper.toDomain(jwtUserDetailsService.getCurrentUser());
    }
}
