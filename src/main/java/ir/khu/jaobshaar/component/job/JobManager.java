package ir.khu.jaobshaar.component.job;

import ir.khu.jaobshaar.config.jwt.JwtUserDetailsService;
import ir.khu.jaobshaar.entity.enums.PersonRuleType;
import ir.khu.jaobshaar.entity.model.Job;
import ir.khu.jaobshaar.entity.model.User;
import ir.khu.jaobshaar.repository.EmployerRepository;
import ir.khu.jaobshaar.repository.JobRepository;
import ir.khu.jaobshaar.service.domain.JobDomain;
import ir.khu.jaobshaar.service.dto.JobDTO;
import ir.khu.jaobshaar.service.mapper.JobMapper;
import ir.khu.jaobshaar.utils.validation.ErrorCodes;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobManager {

    private final JobMapper jobMapper;
    private EmployerRepository employerRepository;
    private JobRepository jobRepository;
    private JwtUserDetailsService userDetailsService;

    public JobManager(EmployerRepository employerRepository, JobRepository jobRepository, JwtUserDetailsService userDetailsService, JobMapper jobMapper) {
        this.employerRepository = employerRepository;
        this.jobRepository = jobRepository;
        this.userDetailsService = userDetailsService;
        this.jobMapper = jobMapper;
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

    public List<JobDomain> getEmployeeJobs() {
        // TODO: 1/13/2020 Hoy Fateme ! - > Get Filter Request Param Using Predicate
        userDetailsService.getCurrentUser();
        return jobMapper.toDomainList(jobRepository.findAll());
    }

    public List<JobDomain> getEmployerJobs() {
        return jobMapper.toDomainList(jobRepository.findAllByEmployerId(userDetailsService.getCurrentUser().getId()));
    }
}
