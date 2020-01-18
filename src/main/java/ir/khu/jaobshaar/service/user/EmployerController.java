package ir.khu.jaobshaar.service.user;

import ir.khu.jaobshaar.component.authenticate.AuthenticationManager;
import ir.khu.jaobshaar.component.user.EmployerManager;
import ir.khu.jaobshaar.service.dto.user.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/employer")
public class EmployerController {

    private final AuthenticationManager authenticationManager;
    private final EmployerManager employerManager;

    public EmployerController(AuthenticationManager authenticationManager, EmployerManager employerManager) {
        this.authenticationManager = authenticationManager;
        this.employerManager = employerManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerEmployer(@RequestBody UserDTO userDTO) {
        employerManager.register(userDTO);
        return ResponseEntity.ok(authenticationManager.authenticate(userDTO.getUsername(), userDTO.getPassword()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginEmployer(@RequestBody UserDTO userDTO) {
        employerManager.login(userDTO);
        return ResponseEntity.ok(authenticationManager.authenticate(userDTO.getUsername(), userDTO.getPassword()));
    }
}
