package ir.khu.jaobshaar.entity.model;

import ir.khu.jaobshaar.entity.enums.PersonRuleType;

import javax.persistence.*;

@Entity
@Table(name = "EMPLOYEE")
public class Employee extends User {

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "resume_id")
    private Resume resume;

    public Employee() {
    }

    public Employee(String username, String password, String email, PersonRuleType role) {
        super(username, password, email, role);
    }

    @Override
    public String toString() {
        return "Employee{" +
                "\n resume=" + resume +
                '}';
    }

    public Resume getResume() {
        return resume;
    }

    public void setResume(Resume resume) {
        this.resume = resume;
    }
}
