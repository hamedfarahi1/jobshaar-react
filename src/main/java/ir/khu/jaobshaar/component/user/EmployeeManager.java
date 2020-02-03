package ir.khu.jaobshaar.component.user;

import ir.khu.jaobshaar.component.job.JobManager;
import ir.khu.jaobshaar.constants.StudentsMockData;
import ir.khu.jaobshaar.entity.enums.PersonRuleType;
import ir.khu.jaobshaar.entity.enums.RequiredGenderType;
import ir.khu.jaobshaar.entity.model.*;
import ir.khu.jaobshaar.repository.EmployeeJobRepository;
import ir.khu.jaobshaar.repository.EmployeeRepository;
import ir.khu.jaobshaar.repository.JobRepository;
import ir.khu.jaobshaar.service.domain.JobDomain;
import ir.khu.jaobshaar.service.domain.ResumeDomain;
import ir.khu.jaobshaar.service.domain.UserDomain;
import ir.khu.jaobshaar.service.dto.user.UserDTO;
import ir.khu.jaobshaar.service.mapper.JobMapper;
import ir.khu.jaobshaar.service.mapper.ResumeMapper;
import ir.khu.jaobshaar.utils.EmailService;
import ir.khu.jaobshaar.utils.ThreadUtil;
import ir.khu.jaobshaar.utils.ValidationUtils;
import ir.khu.jaobshaar.utils.validation.ErrorCodes;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
public class EmployeeManager {

    private EmployeeRepository employeeRepository;

    private PasswordEncoder bcryptEncoder;
    private final JobManager jobManager;
    private final JobMapper jobMapper;
    private final UserManager userManager;
    private final EmployeeJobRepository employeeJobRepository;
    private final EmailService emailService;
    private final ResumeMapper resumeMapper;
    private final JobRepository jobRepository;

    public EmployeeManager(EmployeeRepository employeeRepository, PasswordEncoder bcryptEncoder, JobManager jobManager,
                           JobMapper jobMapper, UserManager userManager, EmployeeJobRepository employeeJobRepository, EmailService emailService,
                           ResumeMapper resumeMapper, JobRepository jobRepository) {
        this.employeeRepository = employeeRepository;
        this.bcryptEncoder = bcryptEncoder;
        this.jobManager = jobManager;
        this.jobMapper = jobMapper;
        this.userManager = userManager;
        this.employeeJobRepository = employeeJobRepository;
        this.emailService = emailService;
        this.resumeMapper = resumeMapper;
        this.jobRepository = jobRepository;
    }

    @Transactional
    public void login(final UserDTO userDTO) {
        ValidationUtils.validateUser(userDTO);

        final Employee employee = employeeRepository.findByUsername(userDTO.getUsername());

        if (employee == null) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_USER_NOT_FOUND, " ERROR_CODE_USER_NOT_FOUND "
            );
        }
    }

    @Transactional
    public void register(final UserDTO userDTO) {
        ValidationUtils.validateUser(userDTO);

        if (ValidationUtils.isInvalidEmailAddress(userDTO.getEmail())) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_INVALID_EMAIL, " Invalid Email"
            );
        }


        if (employeeRepository.findByUsername(userDTO.getUsername()) != null) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_USER_ALREADY_EXIST, " ERROR_CODE_USER_ALREADY_EXIST "
            );
        }

        if (employeeRepository.findByEmail(userDTO.getEmail()) != null) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_EMAIL_ALREADY_EXIST, " ERROR_CODE_EMAIL_ALREADY_EXIST "
            );
        }
        if (
                !StudentsMockData.isStudentExist(
                        userDTO.getUsername(),
                        userDTO.getPassword()
                )
        ) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_STUDENT_NOT_FOUND, " Current Student is not exist in university"
            );
        }

        employeeRepository.save(
                new Employee(
                        userDTO.getUsername(),
                        bcryptEncoder.encode(userDTO.getPassword()),
                        userDTO.getEmail(),
                        PersonRuleType.EMPLOYEE,
                        RequiredGenderType.fromKey(StudentsMockData.getGenderTypeIndex(userDTO.getUsername()))
                )
        );
    }

    @Transactional
    public void applyJob(Long jobId) {
        Job job = jobManager.findJobById(jobId);
        Optional<Employee> optionalEmployee = employeeRepository.findById(userManager.getCurrentUser().getId());
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            if (employee.getResume() != null) {
                ValidationUtils.checkRequiredGender(job, employee);
                employeeJobRepository.save(new EmployeeJobs().setId(new EmployeeJobsId(employee, job)));
            } else
                throw new ResponseException(ErrorCodes.ERROR_CODE_RESUME_IS_NOT_EXIST, "first.upload.resume.url");

            ThreadUtil.createThreadAndStart(()->{
                try {
                    emailService.sendEmailWithLink(job.getEmployer().getEmail(), job.getTitle(),
                            "hi " + job.getEmployer().getUsername() + "\n someone send resume for your job please check the blew url resume", employee.getResume().getUrl());
                    System.out.println("send");
                } catch (MessagingException e) {
                    e.printStackTrace();
                }
            });

        } else
            throw ResponseException.newResponseException(ErrorCodes.ERROR_CODE_ACCESS_NOT_PERMITTED,
                    " ERROR_CODE_ACCESS_NOT_PERMITTED this is only for employee ");

    }

    public List<JobDomain> getAppliedJobs() {
        return jobMapper.toDomainList(employeeRepository.findByUsername(userManager.getCurrentUser().getUsername())
                .getEmployeeJobs().stream().map(EmployeeJobs::getId).map(EmployeeJobsId::getJob).collect(Collectors.toList()));
    }

    public ResumeDomain getEmployeeResume() {
        return resumeMapper.toDomain(employeeRepository.findByUsername(userManager.getCurrentUser().getUsername()).getResume());
    }

    public Boolean isApplied(long jobId){
        List<EmployeeJobs> employeeJobs=employeeJobRepository.findAllById_Job(jobRepository.getOne(jobId));
        UserDomain user=userManager.getCurrentUser();
        Boolean isApplied =false;
        for (EmployeeJobs em:employeeJobs) {
            if (em.getId().getEmployee().getId().equals(user.getId())) {
                isApplied = true;
                break;
            }
        }
        return isApplied;
    }
}
