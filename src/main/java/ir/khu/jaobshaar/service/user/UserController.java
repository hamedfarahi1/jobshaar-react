package ir.khu.jaobshaar.service.user;

import ir.khu.jaobshaar.component.user.EmployeeManager;
import ir.khu.jaobshaar.config.jwt.JwtResponse;
import ir.khu.jaobshaar.config.jwt.JwtTokenUtil;
import ir.khu.jaobshaar.config.jwt.JwtUserDetailsService;
import ir.khu.jaobshaar.entity.model.Employee;
import ir.khu.jaobshaar.entity.model.User;
import ir.khu.jaobshaar.service.dto.user.EmployeeDTO;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<?> registerEmployee(@RequestBody EmployeeDTO employeeDTO) throws Exception {
        try {
            final Employee employee = employeeManager.register(employeeDTO);
            return ResponseEntity.ok().body(employee);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @RequestMapping(value = "/employee/login", method = RequestMethod.POST)
    public ResponseEntity<?> loginEmployee(@RequestBody EmployeeDTO employeeDTO) throws Exception {
        try {
            final Employee employee = employeeManager.login(employeeDTO);
            authenticate(employee.getUsername(), employee.getPassword());
            return ResponseEntity.ok().body(employee);
        } catch (DisabledException | BadCredentialsException dx) {
            return ResponseEntity.badRequest().body("Can't authenticate");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody User user) throws Exception {
        return ResponseEntity.ok(userDetailsService.save(user));
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String getName() {
        return userDetailsService.getCurrentUser().toString();
    }

    private ResponseEntity<?> authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            final UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            final String token = jwtTokenUtil.generateToken(userDetails);

            return ResponseEntity.ok(new JwtResponse(token));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
