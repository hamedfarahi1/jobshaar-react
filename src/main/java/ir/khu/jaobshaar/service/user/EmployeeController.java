package ir.khu.jaobshaar.service.user;

import ir.khu.jaobshaar.component.authenticate.AuthenticationManager;
import ir.khu.jaobshaar.component.user.EmployeeManager;
import ir.khu.jaobshaar.service.dto.user.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeManager employeeManager;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> registerEmployee(@RequestBody UserDTO userDTO) {
        employeeManager.register(userDTO);
        return ResponseEntity.ok(authenticationManager.authenticate(userDTO.getUsername(), userDTO.getPassword()));
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> loginEmployee(@RequestBody UserDTO userDTO) {
        employeeManager.login(userDTO);
        return ResponseEntity.ok(authenticationManager.authenticate(userDTO.getUsername(), userDTO.getPassword()));
    }

}