package ir.khu.jaobshaar.component.user;

import ir.khu.jaobshaar.constants.StudentsMockData;
import ir.khu.jaobshaar.entity.enums.PersonRuleType;
import ir.khu.jaobshaar.entity.model.Employee;
import ir.khu.jaobshaar.repository.EmployeeRepository;
import ir.khu.jaobshaar.service.dto.user.UserDTO;
import ir.khu.jaobshaar.utils.ValidationUtils;
import ir.khu.jaobshaar.utils.validation.ErrorCodes;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmployeeManager {

    private EmployeeRepository employeeRepository;

    private PasswordEncoder bcryptEncoder;

    public EmployeeManager(EmployeeRepository employeeRepository, PasswordEncoder bcryptEncoder) {
        this.employeeRepository = employeeRepository;
        this.bcryptEncoder = bcryptEncoder;
    }

    public void login(final UserDTO userDTO) {
        ValidationUtils.validateUser(userDTO);

        final Employee employee = employeeRepository.findByUsername(userDTO.getUsername());

        if (employee == null) {
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
                        PersonRuleType.EMPLOYEE
                )
        );
    }

}
