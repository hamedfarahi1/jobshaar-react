package ir.khu.jaobshaar.service.domain;

public class UserDomain extends DomainBase {

    private String username;

    private String email;

    private Integer roleTypeIndex;


    public UserDomain(Long id, String username, String email, Integer roleTypeIndex) {
        this.setId(id);
        this.username = username;
        this.email = email;
        this.roleTypeIndex = roleTypeIndex;
    }

    public UserDomain() {
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

    public Integer getRoleTypeIndex() {
        return roleTypeIndex;
    }

    public void setRoleTypeIndex(Integer roleTypeIndex) {
        this.roleTypeIndex = roleTypeIndex;
    }
}
