package ir.khu.jaobshaar.component.resume;

import ir.khu.jaobshaar.config.jwt.JwtUserDetailsService;
import ir.khu.jaobshaar.entity.enums.PersonRuleType;
import ir.khu.jaobshaar.entity.model.Employee;
import ir.khu.jaobshaar.entity.model.Resume;
import ir.khu.jaobshaar.entity.model.User;
import ir.khu.jaobshaar.repository.EmployeeRepository;
import ir.khu.jaobshaar.repository.EmployerRepository;
import ir.khu.jaobshaar.repository.ResumeRepository;
import ir.khu.jaobshaar.service.dto.ResumeDTO;
import ir.khu.jaobshaar.service.mapper.ResumeMapper;
import ir.khu.jaobshaar.utils.ValidationUtils;
import ir.khu.jaobshaar.utils.validation.ErrorCodes;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.springframework.stereotype.Service;

@Service
public class ResumeManager {
    private final JwtUserDetailsService userDetailsService;
    private final ResumeRepository resumeRepository;
    private final EmployeeRepository employeeRepository;
    private final EmployerRepository employerRepository;
    private final ResumeMapper resumeMapper;

    public ResumeManager(JwtUserDetailsService userDetailsService, ResumeRepository resumeRepository, EmployeeRepository employeeRepository, EmployerRepository employerRepository, ResumeMapper resumeMapper) {
        this.userDetailsService = userDetailsService;
        this.resumeRepository = resumeRepository;
        this.employeeRepository = employeeRepository;
        this.employerRepository = employerRepository;
        this.resumeMapper = resumeMapper;
    }

    public ResumeDTO addResume(ResumeDTO resumeDTO) {
        validateResume(resumeDTO);

        final Employee currentEmployee = employeeRepository.findByUsername(userDetailsService.getCurrentUser().getUsername());

        if (currentEmployee.getResume() != null) {
            throw ResponseException.newResponseException(ErrorCodes.ERROR_CODE_RESUME_ALREADY_EXIST, " This Employee Already has resume, if you want updating use PUT");
        }

        final Resume resume = resumeMapper.toEntity(resumeDTO);

        currentEmployee.setResume(resume);

        resume.setEmployee(currentEmployee);

        resumeRepository.save(resume);
        return resumeDTO;
    }

    private void validateResume(ResumeDTO resumeDTO) {
        if (
                resumeDTO == null ||
                        resumeDTO.getUrl() == null ||
                        resumeDTO.getUrl().isEmpty() ||
                        !ValidationUtils.isValidURL(resumeDTO.getUrl())
        ) {
            throw ResponseException.newResponseException(ErrorCodes.ERROR_CODE_INVALID_RESUME_URL, " ERROR_CODE_INVALID_RESUME_URL ");
        }

        final User currentUser = userDetailsService.getCurrentUser();

        if (currentUser.getRoleTypeIndex() == PersonRuleType.EMPLOYER) {
            throw ResponseException.newResponseException(ErrorCodes.ERROR_CODE_ACCESS_NOT_PERMITTED, " Employer can't add resume");
        }

        if (resumeRepository.findResumeByUrl(resumeDTO.getUrl()) != null) {
            throw ResponseException.newResponseException(ErrorCodes.ERROR_CODE_RESUME_URL_ALREADY_EXIST, " ERROR_CODE_RESUME_URL_ALREADY_EXIST");
        }
    }

    public ResumeDTO updateResume(ResumeDTO resumeDTO) {
        validateResume(resumeDTO);

        final Employee currentEmployee = employeeRepository.findByUsername(userDetailsService.getCurrentUser().getUsername());

        final Resume existResume = currentEmployee.getResume();

        if (existResume == null) {
            throw ResponseException.newResponseException(ErrorCodes.ERROR_CODE_RESUME_IS_NOT_EXIST, " This Employee doesn't has any resume, try using POST");
        }

        existResume.setUrl(resumeDTO.getUrl());
        resumeRepository.save(existResume);
        return resumeDTO;
    }

}