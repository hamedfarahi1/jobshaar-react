package ir.khu.jaobshaar.entity.model;


import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "employer")
public class Employer extends User {

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id")
    private Company company;

    @OneToMany(mappedBy = "employer")
    private Set<Job> jobs;

    public Employer() {
    }

    public Employer(String username, String password, String email, int role, Company company, Set<Job> jobs) {
        super(username, password, email, role);
        this.company = company;
        this.jobs = jobs;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Set<Job> getJobs() {
        return jobs;
    }

    public void setJobs(Set<Job> jobs) {
        this.jobs = jobs;
    }

    @Override
    public String toString() {
        return "Employer{" +
                "\n company=" + company +
                '}';
    }
}
