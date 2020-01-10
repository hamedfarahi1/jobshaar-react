package ir.khu.jaobshaar.component.job;

import ir.khu.jaobshaar.config.jwt.JwtUserDetailsService;
import ir.khu.jaobshaar.entity.model.Employer;
import ir.khu.jaobshaar.entity.model.Job;
import ir.khu.jaobshaar.entity.model.User;
import ir.khu.jaobshaar.repository.EmployerRepository;
import ir.khu.jaobshaar.repository.JobRepository;
import ir.khu.jaobshaar.service.dto.JobDTO;
import ir.khu.jaobshaar.utils.validation.ErrorCodes;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobManager {

    private EmployerRepository employerRepository;
    private JobRepository jobRepository;
    private JwtUserDetailsService userDetailsService;

    public JobManager(EmployerRepository employerRepository, JobRepository jobRepository, JwtUserDetailsService userDetailsService) {
        this.employerRepository = employerRepository;
        this.jobRepository = jobRepository;
        this.userDetailsService = userDetailsService;
    }

    public void addJob(final JobDTO jobDTO) {
        if (jobDTO == null) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_INVALID_JOB_FIELD, " ERROR_CODE_INVALID_JOB_FIELD"
            );
        }

        final User user = userDetailsService.getCurrentUser();

        if (user.getRole() != User.USER_ROLE_EMPLOYER) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_ACCESS_NOT_PERMITTED, "Employee can't add job"
            );
        }

        final Employer employer = employerRepository.findByUsername(user.getUsername());

        jobRepository.save(
                new Job(
                        jobDTO.getCategoryType(),
                        jobDTO.getCooperationType(),
                        jobDTO.getRequiredGender(),
                        jobDTO.getDescription(),
                        employer
                )
        );
    }

    public List<Job> getJobs() {
        // TODO: 1/10/2020 Implement get Jobs List
        return null;
    }

}
