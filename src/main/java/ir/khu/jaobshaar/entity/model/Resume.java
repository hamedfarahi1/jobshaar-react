package ir.khu.jaobshaar.entity.model;

import ir.khu.jaobshaar.entity.EntityBase;

import javax.persistence.*;

@Entity
@Table(name = "RESUME")
public class Resume extends EntityBase {

    @Column(unique = true)
    private String url;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "resume")
    private Employee employee;

    public Resume() {
    }

    @Override
    public String toString() {
        return "Resume{" +
                "\n id=" + getId() +
                "\n , url='" + url + '\'' +
                '}';
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
