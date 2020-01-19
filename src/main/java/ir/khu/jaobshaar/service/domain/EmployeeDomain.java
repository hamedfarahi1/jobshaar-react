package ir.khu.jaobshaar.service.domain;


import java.util.List;

public class EmployeeDomain extends UserDomain {
    private ResumeDomain resume;

    private List<JobDomain> job;

    public List<JobDomain> getJob() {
        return job;
    }

    public void setJob(List<JobDomain> job) {
        this.job = job;
    }

    public ResumeDomain getResume() {
        return resume;
    }

    public void setResume(ResumeDomain resume) {
        this.resume = resume;
    }
}
