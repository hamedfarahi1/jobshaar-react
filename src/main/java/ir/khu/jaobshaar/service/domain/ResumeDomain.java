package ir.khu.jaobshaar.service.domain;

public class ResumeDomain extends DomainBase {
    private String url;
    private EmployeeDomain employee;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public EmployeeDomain getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeDomain employee) {
        this.employee = employee;
    }
}
