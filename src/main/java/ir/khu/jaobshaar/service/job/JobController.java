package ir.khu.jaobshaar.service.job;


import ir.khu.jaobshaar.component.job.JobManager;
import ir.khu.jaobshaar.service.domain.JobDomain;
import ir.khu.jaobshaar.service.dto.JobDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class JobController {

    @Autowired
    private JobManager jobManager;

    @PostMapping("/jobs")
    public ResponseEntity<?> addJob(@RequestBody JobDTO jobDTO) {
        jobManager.addJob(jobDTO);
        return ResponseEntity.ok(jobDTO);
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<JobDomain>> getJobs() {
        return ResponseEntity.ok(jobManager.getJobs());
    }

}
