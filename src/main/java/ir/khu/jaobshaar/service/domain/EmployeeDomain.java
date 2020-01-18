package ir.khu.jaobshaar.service.domain;


public class EmployeeDomain extends UserDomain {
    private ResumeDomain resume;

    public ResumeDomain getResume() {
        return resume;
    }

    public void setResume(ResumeDomain resume) {
        this.resume = resume;
    }
}
