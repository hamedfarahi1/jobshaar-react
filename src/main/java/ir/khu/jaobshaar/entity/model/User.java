package ir.khu.jaobshaar.entity.model;

import javax.persistence.*;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "users")
public class User {
    public static final int USER_ROLE_EMPLOYER = 0;
    public static final int USER_ROLE_EMPLOYEE = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private int role;

    public User(String username, String password, String email, int role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "\n id=" + id +
                "\n , username='" + username + '\'' +
                "\n , password='" + password + '\'' +
                "\n , email='" + email + '\'' +
                "\n , role =  " + role + " " +
                '}';
    }
}
