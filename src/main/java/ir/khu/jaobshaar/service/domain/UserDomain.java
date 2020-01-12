package ir.khu.jaobshaar.service.domain;

import ir.khu.jaobshaar.entity.model.User;

public class UserDomain {
    private Long id;

    private String username;

    private String email;

    private User.PersonRule role;


    public UserDomain(Long id, String username, String email, User.PersonRule role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User.PersonRule getRole() {
        return role;
    }

    public void setRole(User.PersonRule role) {
        this.role = role;
    }
}
