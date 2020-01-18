package ir.khu.jaobshaar.service.dto;

import ir.khu.jaobshaar.service.dto.employer.CompanyDTO;
import ir.khu.jaobshaar.service.dto.user.UserDTO;

import java.util.Set;

public class EmployerDTO extends UserDTO {
    private CompanyDTO company;

    private Set<JobDTO> jobs;

    public CompanyDTO getCompany() {
        return company;
    }

    public void setCompany(CompanyDTO company) {
        this.company = company;
    }

    public Set<JobDTO> getJobs() {
        return jobs;
    }

    public void setJobs(Set<JobDTO> jobs) {
        this.jobs = jobs;
    }
}
