package ir.khu.jaobshaar.entity.model;

import javax.persistence.*;

@Entity
@Table(name = "employee_job")
@AssociationOverrides({
        @AssociationOverride(name = "id.employee",
                joinColumns = @JoinColumn(name = "employee_id")),
        @AssociationOverride(name = "id.job",
                joinColumns = @JoinColumn(name = "job_id"))})
public class EmployeeJobs {

    @EmbeddedId
    private EmployeeJobsId id = new EmployeeJobsId();

    public EmployeeJobsId getId() {
        return id;
    }

    public EmployeeJobs setId(EmployeeJobsId id) {
        this.id = id;
        return this;
    }
}
