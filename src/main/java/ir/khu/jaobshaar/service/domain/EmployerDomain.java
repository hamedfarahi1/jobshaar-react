package ir.khu.jaobshaar.service.domain;

import java.util.Set;

public class EmployerDomain extends UserDomain {

    private CompanyDomain company;

    private Set<JobDomain> jobs;

    public CompanyDomain getCompany() {
        return company;
    }

    public void setCompany(CompanyDomain company) {
        this.company = company;
    }

    public Set<JobDomain> getJobs() {
        return jobs;
    }

    public void setJobs(Set<JobDomain> jobs) {
        this.jobs = jobs;
    }
}
