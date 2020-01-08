package ir.khu.jaobshaar.component.user;

import ir.khu.jaobshaar.entity.model.Employee;
import ir.khu.jaobshaar.entity.model.User;
import ir.khu.jaobshaar.repository.EmployeeRepository;
import ir.khu.jaobshaar.service.dto.user.EmployeeDTO;
import ir.khu.jaobshaar.utils.ValidationUtils;
import ir.khu.jaobshaar.utils.validation.ErrorCodes;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.springframework.http.HttpStatus;
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

    public void login(final EmployeeDTO employeeDTO) {
        validateEmployee(employeeDTO);

        final Employee employee = employeeRepository.findByUsername(employeeDTO.getUsername());

        if (employee == null) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_USER_NOT_FOUND, " ERROR_CODE_USER_NOT_FOUND "
            );
        }
    }

    private void validateEmployee(EmployeeDTO employeeDTO) {
        if (employeeDTO == null) {
            throw ResponseException.newResponseException(
                    HttpStatus.BAD_REQUEST.value(), "employeeDTO is null"
            );
        }

        if (ValidationUtils.isInvalidUserName(employeeDTO.getUsername())) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_INVALID_USER_NAME, " Invalid Username"
            );
        }

        if (ValidationUtils.isInvalidPassword(employeeDTO.getPassword())) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_INVALID_PASSWORD, " Invalid Password"
            );
        }
    }

    public void register(final EmployeeDTO employeeDTO) {
        validateEmployee(employeeDTO);

        if (ValidationUtils.isInvalidEmailAddress(employeeDTO.getEmail())) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_INVALID_EMAIL, " Invalid Email"
            );
        }

        final Employee existEmployee = employeeRepository.findByUsername(employeeDTO.getUsername());

        if (existEmployee != null) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_USER_ALREADY_EXIST, " ERROR_CODE_USER_ALREADY_EXIST "
            );
        }

        final Employee employee = new Employee();
        employee.setUsername(employeeDTO.getUsername());
        employee.setPassword(bcryptEncoder.encode(employeeDTO.getPassword()));
        employee.setEmail(employeeDTO.getEmail());
        employee.setRole(User.USER_ROLE_EMPLOYEE);

        employeeRepository.save(employee);
    }

}
