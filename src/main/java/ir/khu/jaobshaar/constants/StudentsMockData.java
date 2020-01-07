package ir.khu.jaobshaar.constants;

import java.util.HashMap;
import java.util.Map;

public class StudentsMockData {
    private static final Map<String, String> studentMap = new HashMap<>();

    static {
        studentMap.put(
                "973309300",
                "1234"
        );
        studentMap.put(
                "962023026",
                "1234"
        );
    }


    public static boolean isStudentExist(
            final String username,
            final String password
    ) {


        if (
                username == null ||
                        username.isEmpty() ||
                        !studentMap.containsKey(username)
        ) {
            return false;
        }
        final String existPassword = studentMap.get(username);

        return password.equalsIgnoreCase(existPassword);
    }

}
