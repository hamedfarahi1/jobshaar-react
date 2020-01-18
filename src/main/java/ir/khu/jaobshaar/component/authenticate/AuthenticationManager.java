package ir.khu.jaobshaar.component.authenticate;

import ir.khu.jaobshaar.config.jwt.JwtResponse;
import ir.khu.jaobshaar.config.jwt.JwtTokenUtil;
import ir.khu.jaobshaar.config.jwt.JwtUserDetailsService;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationManager {

    private org.springframework.security.authentication.AuthenticationManager authenticationManager;

    private JwtUserDetailsService userDetailsService;

    private JwtTokenUtil jwtTokenUtil;

    public AuthenticationManager(org.springframework.security.authentication.AuthenticationManager authenticationManager, JwtUserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    public JwtResponse authenticate(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            final String token = jwtTokenUtil.generateToken(userDetailsService.loadUserByUsername(username));

            return new JwtResponse(token);
        } catch (DisabledException e) {
            throw ResponseException.newResponseException(
                    HttpStatus.UNAUTHORIZED.value(), "Unauthorized - DisabledException "
            );
        } catch (BadCredentialsException e) {
            throw ResponseException.newResponseException(
                    HttpStatus.UNAUTHORIZED.value(), "Unauthorized - BadCredentialsException"
            );
        }
    }
}
