package ir.khu.jaobshaar.service.user;

import ir.khu.jaobshaar.component.authenticate.AuthenticationManager;
import ir.khu.jaobshaar.component.user.EmployeeManager;
import ir.khu.jaobshaar.component.user.UserManager;
import ir.khu.jaobshaar.service.domain.UserDomain;
import ir.khu.jaobshaar.service.dto.user.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/employee")
public class EmployeeController {

    private final AuthenticationManager authenticationManager;
    private final EmployeeManager employeeManager;
    private final UserManager userManager;

    public EmployeeController(AuthenticationManager authenticationManager, EmployeeManager employeeManager, UserManager userManager) {
        this.authenticationManager = authenticationManager;
        this.employeeManager = employeeManager;
        this.userManager = userManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerEmployee(@RequestBody UserDTO userDTO) {
        employeeManager.register(userDTO);
        return ResponseEntity.ok(authenticationManager.authenticate(userDTO.getUsername(), userDTO.getPassword()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginEmployee(@RequestBody UserDTO userDTO) {
        employeeManager.login(userDTO);
        return ResponseEntity.ok(authenticationManager.authenticate(userDTO.getUsername(), userDTO.getPassword()));
    }

    @GetMapping
    public ResponseEntity<UserDomain> getEmployee() {
        return ResponseEntity.ok().body(userManager.getCurrentUser());
    }

}
