package ir.khu.jaobshaar.component.job;

import ir.khu.jaobshaar.config.jwt.JwtUserDetailsService;
import ir.khu.jaobshaar.entity.enums.PersonRuleType;
import ir.khu.jaobshaar.entity.model.*;
import ir.khu.jaobshaar.repository.EmployeeJobRepository;
import ir.khu.jaobshaar.repository.EmployerRepository;
import ir.khu.jaobshaar.repository.JobRepository;
import ir.khu.jaobshaar.service.criteria.JobCriteria;
import ir.khu.jaobshaar.service.domain.JobDomain;
import ir.khu.jaobshaar.service.domain.ResumeDomain;
import ir.khu.jaobshaar.service.dto.JobDTO;
import ir.khu.jaobshaar.service.mapper.JobMapper;
import ir.khu.jaobshaar.service.mapper.ResumeMapper;
import ir.khu.jaobshaar.utils.ValidationUtils;
import ir.khu.jaobshaar.utils.validation.ErrorCodes;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobManager {

    private final JobMapper jobMapper;
    private final JobFiltering jobFiltering;
    private final EmployeeJobRepository employeeJobRepository;
    private final ResumeMapper resumeMapper;
    private EmployerRepository employerRepository;
    private JobRepository jobRepository;
    private JwtUserDetailsService userDetailsService;

    public JobManager(EmployerRepository employerRepository, JobRepository jobRepository,
                      JwtUserDetailsService userDetailsService, JobMapper jobMapper, JobFiltering jobFiltering,
                      EmployeeJobRepository employeeJobRepository, ResumeMapper resumeMapper) {
        this.employerRepository = employerRepository;
        this.jobRepository = jobRepository;
        this.userDetailsService = userDetailsService;
        this.jobMapper = jobMapper;
        this.jobFiltering = jobFiltering;
        this.employeeJobRepository = employeeJobRepository;
        this.resumeMapper = resumeMapper;
    }

    public JobDomain addJob(final JobDTO jobDTO) {
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

        return jobMapper.toDomain(jobRepository.save(job));
    }

    public List<JobDomain> getEmployeeJobs(JobCriteria jobCriteria, Pageable pageable) {
        return jobMapper.toDomainList(jobFiltering.filter(jobCriteria, pageable));
    }

    public List<JobDomain> getEmployerJobs(Pageable pageable) {
        return jobMapper.toDomainList(jobRepository.findAllByEmployerId(userDetailsService.getCurrentUser().getId(), pageable));
    }

    public JobDomain getJobById(long id) {
        final User currentUser = userDetailsService.getCurrentUser();

        if (currentUser.getRoleTypeIndex() == PersonRuleType.EMPLOYER) {
            throw ResponseException.newResponseException(ErrorCodes.ERROR_CODE_ACCESS_NOT_PERMITTED, " ERROR_CODE_ACCESS_NOT_PERMITTED this is only for employee ");
        }

        final Optional<Job> job = jobRepository.findById(id);

        if (job.isEmpty()) {
            throw ResponseException.newResponseException(ErrorCodes.ERROR_CODE_JOB_NOT_FOUND, " Your specific job id not found");
        }

        return jobMapper.toDomain(job.get());
    }

    public List<JobDomain> getAllJobsEmployee() {
        return jobMapper.toDomainList(jobRepository.findAll());
    }

    public long countAll() {
        return jobRepository.count();
    }

    public long countEmployerJobs() {
        return jobRepository.countAllByEmployerId(userDetailsService.getCurrentUser().getId());
    }

    public List<ResumeDomain> getJobResume(Long jobId) {
        Optional<Job> job = jobRepository.findById(jobId);
        if (job.isPresent()) {
            ValidationUtils.accessToGetResume(employerRepository.findByUsername(userDetailsService.getCurrentUser().getUsername()), job.get());
            return resumeMapper.toDomainList(employeeJobRepository.findAllById_Job(job.get()).stream().map(EmployeeJobs::getId)
                    .map(EmployeeJobsId::getEmployee).map(Employee::getResume).collect(Collectors.toList()));
        }
        throw new ResponseException(ErrorCodes.ERROR_CODE_INVALID_JOB_FIELD,"can't.find.job");
    }

    public Job findJobById(Long id){
        return jobRepository.findJobById(id);
    }
}
