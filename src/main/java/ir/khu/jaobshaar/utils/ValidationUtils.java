package ir.khu.jaobshaar.utils;

import org.apache.commons.validator.routines.EmailValidator;

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

}
