package ir.khu.jaobshaar.entity.model;

import ir.khu.jaobshaar.entity.enums.PersonRuleType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "USERS")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private PersonRuleType roleTypeIndex;

    public User(String username, String password, String email, PersonRuleType roleTypeIndex) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.roleTypeIndex = roleTypeIndex;
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

    public PersonRuleType getRoleTypeIndex() {
        return roleTypeIndex;
    }

    public void setRoleTypeIndex(PersonRuleType roleTypeIndex) {
        this.roleTypeIndex = roleTypeIndex;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
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
        return "User{" +
                "\n id=" + id +
                "\n , username='" + username + '\'' +
                "\n , password='" + password + '\'' +
                "\n , email='" + email + '\'' +
                "\n , role =  " + roleTypeIndex + " " +
                '}';
    }
}
