package ir.khu.jaobshaar.constants;

import java.util.*;

public class StudentsMockData {
    private static final Map<String, List<String>> studentMap = new HashMap<>();

    static {
        studentMap.put(
                "973309300",
                Arrays.asList("123456","0")
        );
        studentMap.put(
                "962023026",
                Arrays.asList("123456","0")
        );
        studentMap.put(
                "962023004",
                Arrays.asList("123456","1")
        );
        studentMap.put(
                "962023011",
                Arrays.asList("123456","1")
        );
    }

    public static boolean isStudentExist(
            final String username,
            final String password
    ) {
        if (!studentMap.containsKey(username)) {
            return false;
        }

        final String existPassword = studentMap.get(username).get(0);

        return password.equalsIgnoreCase(existPassword);
    }

    public static Integer getGenderTypeIndex(String username){
        return Integer.valueOf(studentMap.get(username).get(1));
    }
}
