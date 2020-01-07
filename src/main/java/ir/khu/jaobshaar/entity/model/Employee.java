package ir.khu.jaobshaar.entity.model;

import javax.persistence.*;

@Entity
@Table
public class Employee extends User {

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "resume_id")
    private Resume resume;

    public Employee(Resume resume) {
        this.resume = resume;
    }

    public Employee() {
    }

    @Override
    public String toString() {
        return "Employee{" +
                "\n resume=" + resume +
                '}';
    }
}
