package ir.khu.jaobshaar.component.job;

import ir.khu.jaobshaar.config.jwt.JwtUserDetailsService;
import ir.khu.jaobshaar.entity.enums.PersonRuleType;
import ir.khu.jaobshaar.entity.model.Job;
import ir.khu.jaobshaar.entity.model.User;
import ir.khu.jaobshaar.repository.EmployerRepository;
import ir.khu.jaobshaar.repository.JobRepository;
import ir.khu.jaobshaar.service.criteria.JobCriteria;
import ir.khu.jaobshaar.service.domain.JobDomain;
import ir.khu.jaobshaar.service.dto.JobDTO;
import ir.khu.jaobshaar.service.mapper.JobMapper;
import ir.khu.jaobshaar.utils.validation.ErrorCodes;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JobManager {

    private final JobMapper jobMapper;
    private final JobFiltering jobFiltering;
    private EmployerRepository employerRepository;
    private JobRepository jobRepository;
    private JwtUserDetailsService userDetailsService;

    public JobManager(EmployerRepository employerRepository, JobRepository jobRepository,
                      JwtUserDetailsService userDetailsService, JobMapper jobMapper, JobFiltering jobFiltering) {
        this.employerRepository = employerRepository;
        this.jobRepository = jobRepository;
        this.userDetailsService = userDetailsService;
        this.jobMapper = jobMapper;
        this.jobFiltering = jobFiltering;
    }

    public void addJob(final JobDTO jobDTO) {
        if (jobDTO == null) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_INVALID_JOB_FIELD, " ERROR_CODE_INVALID_JOB_FIELD"
            );
        }

        final User user = userDetailsService.getCurrentUser();
        if (user.getRoleTypeIndex() != PersonRuleType.EMPLOYER) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_ACCESS_NOT_PERMITTED, "Employee can't add job"
            );
        }

        Job job = jobMapper.toEntity(jobDTO);
        job.setEmployer(employerRepository.findByUsername(user.getUsername()));
        jobRepository.save(job);
    }

    public List<JobDomain> getEmployeeJobs(JobCriteria jobCriteria, Pageable pageable) {
        return jobMapper.toDomainList(jobFiltering.filter(jobCriteria, pageable));
    }

    public List<JobDomain> getEmployerJobs(Pageable pageable) {
        return jobMapper.toDomainList(jobRepository.findAllByEmployerId(userDetailsService.getCurrentUser().getId(), pageable));
    }


    public List<JobDomain> getAllJobsEmployee() {
        List<Job> jobs = new ArrayList<>();
        jobRepository.findAll().forEach(job -> jobs.add(job));
        return jobMapper.toDomainList(jobs);
    }

    public long countAll() {
        return jobRepository.count();
    }

    public long countEmployerJobs(){
        return jobRepository.countAllByEmployerId(userDetailsService.getCurrentUser().getId());
    }
}
