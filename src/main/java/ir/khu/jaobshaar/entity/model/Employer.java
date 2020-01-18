package ir.khu.jaobshaar.entity.model;


import ir.khu.jaobshaar.entity.enums.PersonRuleType;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "EMPLOYER")
public class Employer extends User {

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id")
    private Company company;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "employer")
    private Set<Job> jobs;

    public Employer() {
    }

    public Employer(String username, String password, String email, PersonRuleType role) {
        super(username, password, email, role);
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
}
