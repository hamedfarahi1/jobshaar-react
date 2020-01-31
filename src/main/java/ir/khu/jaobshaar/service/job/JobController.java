package ir.khu.jaobshaar.service.job;


import ir.khu.jaobshaar.component.job.JobManager;
import ir.khu.jaobshaar.service.criteria.JobCriteria;
import ir.khu.jaobshaar.service.domain.JobDomain;
import ir.khu.jaobshaar.service.dto.JobDTO;
import ir.khu.jaobshaar.utils.EmailService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/jobs")
public class JobController {

    private final JobManager jobManager;
    private final EmailService emailService;

    public JobController(JobManager jobManager, EmailService emailService) {
        this.jobManager = jobManager;
        this.emailService = emailService;
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

    @DeleteMapping
    public ResponseEntity<?> sendEmail(){

        try {
            emailService.sendEmailWithLink("fatemetorkzaban@gmail.com","کاریابی","سلام فاظمه\n برای شغلی ک قرار دادید رزومه ارسال شده لینک زیر را بزنید تا رزومه را مشاهده کنید ","https://www.javatpoint.com/example-of-sending-html-content-with-email-using-java-mail-api");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok("");
    }


}
