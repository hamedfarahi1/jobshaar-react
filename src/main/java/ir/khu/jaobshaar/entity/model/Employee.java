package ir.khu.jaobshaar.entity.model;

import javax.persistence.*;

@Entity
@Table(name = "EMPLOYEE")
public class Employee extends User {

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "resume_id")
    private Resume resume;

    public Employee() {
    }

    public Employee(String username, String password, String email, int role) {
        super(username, password, email, role);
    }

    public Employee(String username, String password, String email, int role, Resume resume) {
        super(username, password, email, role);
        this.resume = resume;
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
