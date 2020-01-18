package ir.khu.jaobshaar.service.job;


import ir.khu.jaobshaar.component.job.JobManager;
import ir.khu.jaobshaar.service.domain.JobDomain;
import ir.khu.jaobshaar.service.dto.JobDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/jobs")
public class JobController {

    private final JobManager jobManager;

    public JobController(JobManager jobManager) {
        this.jobManager = jobManager;
    }

    @PostMapping
    public ResponseEntity<?> addJob(@RequestBody JobDTO jobDTO) {
        jobManager.addJob(jobDTO);
        return ResponseEntity.ok(jobDTO);
    }

    @GetMapping("/employee")
    public ResponseEntity<List<JobDomain>> getEmployeeJobs() {
        // TODO: 1/13/2020 Hoy Fateme ! - > Get Filter Request Param Using Predicate
        return ResponseEntity.ok(jobManager.getEmployeeJobs());
    }

    @GetMapping("/employer")
    public ResponseEntity<List<JobDomain>> getEmployerJobs() {
        return ResponseEntity.ok(jobManager.getEmployerJobs());
    }

}
