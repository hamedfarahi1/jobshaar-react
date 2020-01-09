package ir.khu.jaobshaar.component.user;

import ir.khu.jaobshaar.entity.model.Company;
import ir.khu.jaobshaar.entity.model.Employer;
import ir.khu.jaobshaar.entity.model.User;
import ir.khu.jaobshaar.repository.CompanyRepository;
import ir.khu.jaobshaar.repository.EmployerRepository;
import ir.khu.jaobshaar.service.dto.employer.CompanyDTO;
import ir.khu.jaobshaar.service.dto.user.UserDTO;
import ir.khu.jaobshaar.utils.ValidationUtils;
import ir.khu.jaobshaar.utils.validation.ErrorCodes;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmployerManager {

    private EmployerRepository employerRepository;

    private CompanyRepository companyRepository;

    private PasswordEncoder bcryptEncoder;

    public EmployerManager(EmployerRepository employerRepository, CompanyRepository companyRepository, PasswordEncoder bcryptEncoder) {
        this.employerRepository = employerRepository;
        this.companyRepository = companyRepository;
        this.bcryptEncoder = bcryptEncoder;
    }

    public void login(final UserDTO userDTO) {
        ValidationUtils.validateUser(userDTO);

        final Employer employer = employerRepository.findByUsername(userDTO.getUsername());

        if (employer == null) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_USER_NOT_FOUND, " ERROR_CODE_USER_NOT_FOUND "
            );
        }
    }

    public void register(final UserDTO userDTO) {
        ValidationUtils.validateUser(userDTO);

        if (ValidationUtils.isInvalidEmailAddress(userDTO.getEmail())) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_INVALID_EMAIL, " Invalid Email"
            );
        }

        final Employer existEmployer = employerRepository.findByUsername(userDTO.getUsername());

        if (existEmployer != null) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_USER_ALREADY_EXIST, " ERROR_CODE_USER_ALREADY_EXIST "
            );
        }

        employerRepository.save(
                new Employer(
                        userDTO.getUsername(),
                        bcryptEncoder.encode(userDTO.getPassword()),
                        userDTO.getEmail(),
                        User.USER_ROLE_EMPLOYER
                )
        );
    }

    public void addCompany(final CompanyDTO companyDTO, final String userName) {
        if (companyDTO == null) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_INVALID_COMPANY_FIELD, " CompanyDTO is null "
            );
        }

        final String companyName = companyDTO.getName();

        if (
                companyName == null ||
                        companyName.isEmpty()
        ) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_INVALID_COMPANY_FIELD, " Company Name  is empty "
            );
        }

        final Company existCompany = companyRepository.findByName(companyName);

        if (existCompany != null) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_COMPANY_ALREADY_EXIST, " ERROR_CODE_COMPANY_ALREADY_EXIST "
            );
        }

        final Employer currentEmployer = employerRepository.findByUsername(userName);

        if (currentEmployer.getCompany() != null) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_EMPLOYER_ALREADY_HAS_COMPANY, "ERROR_CODE_EMPLOYER_ALREADY_HAS_COMPANY"
            );
        }

        final Company company = new Company(
                companyDTO.getName(),
                companyDTO.getCategoryTypeIndex(),
                companyDTO.getBio(),
                companyDTO.getAddress()
        );

        currentEmployer.setCompany(company);

        company.setEmployer(currentEmployer);

        companyRepository.save(company);
    }

}
