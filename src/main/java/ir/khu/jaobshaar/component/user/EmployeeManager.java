package ir.khu.jaobshaar.component.user;

import ir.khu.jaobshaar.entity.model.Employee;
import ir.khu.jaobshaar.entity.model.User;
import ir.khu.jaobshaar.repository.EmployeeRepository;
import ir.khu.jaobshaar.service.dto.user.EmployeeDTO;
import ir.khu.jaobshaar.utils.ValidationUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class EmployeeManager {

    private EmployeeRepository employeeRepository;

    private PasswordEncoder bcryptEncoder;

    public EmployeeManager(EmployeeRepository employeeRepository, PasswordEncoder bcryptEncoder) {
        this.employeeRepository = employeeRepository;
        this.bcryptEncoder = bcryptEncoder;
    }

    public Employee login(final EmployeeDTO employeeDTO) throws IllegalArgumentException {
        checkInvalidation(employeeDTO);

        final Employee employee = employeeRepository.findByUsername(employeeDTO.getUsername());

        if (employee == null) {
            throwIllegalArgumentException("Employee not found");
        }

        return employee;
    }

    private void checkInvalidation(EmployeeDTO employeeDTO) {
        if (employeeDTO == null) {
            throwIllegalArgumentException("employeeDTO is null");
        }

        if (!ValidationUtils.isValidUserName(employeeDTO.getUsername())) {
            throwIllegalArgumentException("Invalid Username");
        }

        if (!ValidationUtils.isValidPassword(employeeDTO.getPassword())) {
            throwIllegalArgumentException("Invalid Password");
        }
    }

    public Employee register(final EmployeeDTO employeeDTO) throws IllegalArgumentException {
        checkInvalidation(employeeDTO);

        if (!ValidationUtils.isValidEmailAddress(employeeDTO.getEmail())) {
            throwIllegalArgumentException("Invalid Email");
        }

        final Employee employee = new Employee();

        employee.setUsername(employeeDTO.getUsername());
        employee.setPassword(bcryptEncoder.encode(employeeDTO.getPassword()));
        employee.setEmail(employeeDTO.getEmail());
        employee.setRole(User.USER_ROLE_EMPLOYEE);

        employeeRepository.save(employee);

        return employee;
    }

    private void throwIllegalArgumentException(final String message) {
        throw new IllegalArgumentException(message);
    }


}
