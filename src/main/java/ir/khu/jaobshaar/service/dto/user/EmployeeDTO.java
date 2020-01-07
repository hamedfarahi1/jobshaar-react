package ir.khu.jaobshaar.service.dto.user;

public class EmployeeDTO {

    private String username;
    private String password;
    private String email;


    public EmployeeDTO(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public EmployeeDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "EmployeeDTO{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
