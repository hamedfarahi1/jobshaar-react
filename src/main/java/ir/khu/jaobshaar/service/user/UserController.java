package ir.khu.jaobshaar.service.user;

import ir.khu.jaobshaar.component.user.EmployeeManager;
import ir.khu.jaobshaar.component.user.EmployerManager;
import ir.khu.jaobshaar.component.user.UserManager;
import ir.khu.jaobshaar.config.jwt.JwtResponse;
import ir.khu.jaobshaar.config.jwt.JwtTokenUtil;
import ir.khu.jaobshaar.config.jwt.JwtUserDetailsService;
import ir.khu.jaobshaar.service.dto.user.UserDTO;
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

    @Autowired
    private EmployerManager employerManager;

    @Autowired
    private UserManager userManager;

    @PostMapping("/employee/register")
    public ResponseEntity<?> registerEmployee(@RequestBody UserDTO userDTO) {
        employeeManager.register(userDTO);
        return ResponseEntity.ok(authenticate(userDTO.getUsername(), userDTO.getPassword()));
    }

    @PostMapping(value = "/employee/login")
    public ResponseEntity<?> loginEmployee(@RequestBody UserDTO userDTO) {
        employeeManager.login(userDTO);
        return ResponseEntity.ok(authenticate(userDTO.getUsername(), userDTO.getPassword()));
    }

    @PostMapping("/employer/register")
    public ResponseEntity<?> registerEmployer(@RequestBody UserDTO userDTO) {
        employerManager.register(userDTO);
        return ResponseEntity.ok(authenticate(userDTO.getUsername(), userDTO.getPassword()));
    }

    @PostMapping(value = "/employer/login")
    public ResponseEntity<?> loginEmployer(@RequestBody UserDTO userDTO) {
        employerManager.login(userDTO);
        return ResponseEntity.ok(authenticate(userDTO.getUsername(), userDTO.getPassword()));
    }

    @GetMapping(value = "/who_am_i")
    public ResponseEntity<?> whoAmI() {
        return ResponseEntity.ok(userManager.whoAmI());
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
