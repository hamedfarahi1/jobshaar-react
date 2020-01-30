package ir.khu.jaobshaar.entity.model;

import ir.khu.jaobshaar.entity.enums.PersonRuleType;
import ir.khu.jaobshaar.entity.enums.RequiredGenderType;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "EMPLOYEE")
public class Employee extends User {

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "resume_id")
    private Resume resume;

    @OneToMany(mappedBy = "id.employee", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<EmployeeJobs> employeeJobs;

    @Column(nullable = false)
    private RequiredGenderType genderType;

    public Employee() {
    }

    public Employee(String username, String password, String email, PersonRuleType role, RequiredGenderType genderType) {
        super(username, password, email, role);
        this.genderType = genderType;
    }

    public RequiredGenderType getGenderType() {
        return genderType;
    }

    public void setGenderType(RequiredGenderType genderType) {
        this.genderType = genderType;
    }

    public List<EmployeeJobs> getEmployeeJobs() {
        return employeeJobs;
    }

    public void setEmployeeJobs(List<EmployeeJobs> employeeJobs) {
        this.employeeJobs = employeeJobs;
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
