package ir.khu.jaobshaar.component.user;

import ir.khu.jaobshaar.config.jwt.JwtUserDetailsService;
import ir.khu.jaobshaar.entity.model.User;
import ir.khu.jaobshaar.service.domain.UserDomain;
import org.springframework.stereotype.Service;

@Service
public class UserManager {

    private JwtUserDetailsService jwtUserDetailsService;

    public UserManager(JwtUserDetailsService jwtUserDetailsService) {
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    public UserDomain whoAmI() {
        final User currentUser = jwtUserDetailsService.getCurrentUser();
        return new UserDomain(
                currentUser.getId(),
                currentUser.getUsername(),
                currentUser.getEmail(),
                currentUser.getRole()
        );
    }
}
