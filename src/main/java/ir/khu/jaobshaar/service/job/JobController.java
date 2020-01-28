package ir.khu.jaobshaar.service.job;


import ir.khu.jaobshaar.component.job.JobManager;
import ir.khu.jaobshaar.service.criteria.JobCriteria;
import ir.khu.jaobshaar.service.domain.JobDomain;
import ir.khu.jaobshaar.service.dto.JobDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
        return ResponseEntity.ok(jobManager.addJob(jobDTO));
    }

    @GetMapping("/employee")
    public ResponseEntity<List<JobDomain>> getEmployeeJobs(JobCriteria jobCriteria, Pageable pageable) {
        List<JobDomain> jobDomains = jobManager.getEmployeeJobs(jobCriteria, pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.add("total-count", "" + jobManager.countAll());
        return new ResponseEntity<>(jobDomains, headers, HttpStatus.OK);
    }

    @GetMapping("/employer")
    public ResponseEntity<List<JobDomain>> getEmployerJobs(Pageable pageable) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("total-count", "" + jobManager.countEmployerJobs());
        return new ResponseEntity<>(jobManager.getEmployerJobs(pageable), httpHeaders, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<JobDomain> getJobById(@RequestParam long id) {
        return ResponseEntity.ok(jobManager.getJobById(id));
    }

}
