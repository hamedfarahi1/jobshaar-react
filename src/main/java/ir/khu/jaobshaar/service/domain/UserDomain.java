package ir.khu.jaobshaar.service.domain;

import ir.khu.jaobshaar.entity.enums.PersonRuleType;

public class UserDomain {
    private Long id;

    private String username;

    private String email;

    private PersonRuleType roleTypeIndex;


    public UserDomain(Long id, String username, String email, PersonRuleType roleTypeIndex) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roleTypeIndex = roleTypeIndex;
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

    public PersonRuleType getRoleTypeIndex() {
        return roleTypeIndex;
    }

    public void setRoleTypeIndex(PersonRuleType roleTypeIndex) {
        this.roleTypeIndex = roleTypeIndex;
    }
}
