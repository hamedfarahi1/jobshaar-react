package ir.khu.jaobshaar.service.user;

import ir.khu.jaobshaar.component.user.EmployeeManager;
import ir.khu.jaobshaar.config.jwt.JwtResponse;
import ir.khu.jaobshaar.config.jwt.JwtTokenUtil;
import ir.khu.jaobshaar.config.jwt.JwtUserDetailsService;
import ir.khu.jaobshaar.service.dto.user.EmployeeDTO;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private EmployeeManager employeeManager;

    @PostMapping("/employee/register")
    public ResponseEntity<?> registerEmployee(@RequestBody EmployeeDTO employeeDTO) {
        employeeManager.register(employeeDTO);
        return ResponseEntity.ok(authenticate(employeeDTO.getUsername(), employeeDTO.getPassword()));
    }

    @PostMapping(value = "/employee/login")
    public ResponseEntity<?> loginEmployee(@RequestBody EmployeeDTO employeeDTO) {
        employeeManager.login(employeeDTO);
        return ResponseEntity.ok(authenticate(employeeDTO.getUsername(), employeeDTO.getPassword()));
    }

    private JwtResponse authenticate(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            final UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            final String token = jwtTokenUtil.generateToken(userDetails);

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
