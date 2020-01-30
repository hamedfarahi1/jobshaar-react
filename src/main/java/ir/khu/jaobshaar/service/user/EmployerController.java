package ir.khu.jaobshaar.service.user;

import ir.khu.jaobshaar.component.authenticate.AuthenticationManager;
import ir.khu.jaobshaar.component.job.JobManager;
import ir.khu.jaobshaar.component.user.EmployerManager;
import ir.khu.jaobshaar.service.domain.ResumeDomain;
import ir.khu.jaobshaar.service.dto.user.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/employer")
public class EmployerController {

    private final AuthenticationManager authenticationManager;
    private final EmployerManager employerManager;
    private final JobManager jobManager;

    public EmployerController(AuthenticationManager authenticationManager, EmployerManager employerManager, JobManager jobManager) {
        this.authenticationManager = authenticationManager;
        this.employerManager = employerManager;
        this.jobManager = jobManager;
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

    @GetMapping("/resume")
    public ResponseEntity<List<ResumeDomain>> getResumeOfJobs(@RequestParam Long jobId){
        return ResponseEntity.ok().body(jobManager.getJobResume(jobId));
    }
}
