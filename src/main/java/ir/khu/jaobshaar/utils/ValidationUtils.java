package ir.khu.jaobshaar.utils;

import ir.khu.jaobshaar.entity.enums.RequiredGenderType;
import ir.khu.jaobshaar.entity.model.Employee;
import ir.khu.jaobshaar.entity.model.Employer;
import ir.khu.jaobshaar.entity.model.Job;
import ir.khu.jaobshaar.service.dto.user.UserDTO;
import ir.khu.jaobshaar.utils.validation.ErrorCodes;
import ir.khu.jaobshaar.utils.validation.ResponseException;
import org.apache.commons.validator.routines.EmailValidator;
import org.apache.commons.validator.routines.UrlValidator;
import org.springframework.http.HttpStatus;

public class ValidationUtils {
    private static final int MINIMUM_ACCEPTABLE_PASSWORD = 5;

    public static boolean isInvalidEmailAddress(final String email) {
        return !EmailValidator.getInstance().isValid(email);
    }

    public static boolean isInvalidPassword(final String password) {
        return password == null ||
                password.isEmpty() ||
                password.length() < MINIMUM_ACCEPTABLE_PASSWORD;
    }

    public static boolean isInvalidUserName(final String username) {
        return username == null ||
                username.isEmpty();
    }

    public static void validateUser(UserDTO userDTO) {
        if (userDTO == null) {
            throw ResponseException.newResponseException(
                    HttpStatus.BAD_REQUEST.value(), "employeeDTO is null"
            );
        }

        if (ValidationUtils.isInvalidUserName(userDTO.getUsername())) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_INVALID_USER_NAME, " Invalid Username"
            );
        }

        if (ValidationUtils.isInvalidPassword(userDTO.getPassword())) {
            throw ResponseException.newResponseException(
                    ErrorCodes.ERROR_CODE_INVALID_PASSWORD, " Invalid Password"
            );
        }
    }

    public static boolean isValidURL(final String urlStr) {
        return UrlValidator.getInstance().isValid(urlStr);
    }

    public static void checkRequiredGender(Job job, Employee employee){
        if (job.getRequiredGenderTypeIndex().toKey().equals(RequiredGenderType.DONT_CARE.toKey()))
            return;
        if (!job.getRequiredGenderTypeIndex().toKey().equals(employee.getGenderType().toKey()))
            throw new ResponseException(ErrorCodes.ERROR_CODE_REQUIRED_GENDER_NOT_ACCESS,"gender.type.not.equal");
    }

    public static void accessToGetResume(Employer employer,Job job){
        if (!employer.getJobs().contains(job))
            throw new ResponseException(ErrorCodes.ERROR_CODE_INVALID_JOB_FIELD,"this.id.isn't,in.user's.jobs");

    }
}
