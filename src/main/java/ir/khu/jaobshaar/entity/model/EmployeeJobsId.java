package ir.khu.jaobshaar.entity.model;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class EmployeeJobsId implements Serializable {

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Job job;

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmployeeJobsId that = (EmployeeJobsId) o;
        return employee.equals(that.employee) &&
                job.equals(that.job);
    }
}
