package ir.khu.jaobshaar.service.dto;

public class ResumeDTO extends DTOBase {

    private String url;

    private EmployeeDTO employee;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public EmployeeDTO getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeDTO employee) {
        this.employee = employee;
    }
}
