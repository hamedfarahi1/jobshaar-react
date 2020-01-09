package ir.khu.jaobshaar.config.jwt;

import ir.khu.jaobshaar.entity.model.User;
import ir.khu.jaobshaar.repository.UserRepository;
import ir.khu.jaobshaar.utils.SecurityUtils;
import ir.khu.jaobshaar.utils.validation.ErrorCodes;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userDao;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        ir.khu.jaobshaar.entity.model.User user = userDao.findByUsername(username);
        if (user == null) {
            onUserNotFound();
        }
        return user;
    }

    @NonNull
    public User getCurrentUser() {
        final Optional<String> currentUser = SecurityUtils.getCurrentUserLogin();

        if (currentUser.isEmpty()) {
            onUserNotFound();
        }

        final String currentUserName = currentUser.get();

        final User user = userDao.findByUsername(currentUserName);

        if (user == null) {
            onUserNotFound();
        }

        return user;
    }

    private void onUserNotFound() {
        throw ResponseException.newResponseException(
                ErrorCodes.ERROR_CODE_USER_NOT_FOUND, " User not Found"
        );
    }

    public ir.khu.jaobshaar.entity.model.User save(ir.khu.jaobshaar.entity.model.User user) {
        ir.khu.jaobshaar.entity.model.User newUser = new ir.khu.jaobshaar.entity.model.User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setEmail(user.getEmail());
        return userDao.save(newUser);
    }
}
