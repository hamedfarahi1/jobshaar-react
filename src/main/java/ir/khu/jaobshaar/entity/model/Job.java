package ir.khu.jaobshaar.entity.model;

import ir.khu.jaobshaar.entity.EntityBase;
import ir.khu.jaobshaar.entity.enums.CooperationType;
import ir.khu.jaobshaar.entity.enums.JobCategoryType;
import ir.khu.jaobshaar.entity.enums.RequiredGenderType;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "JOB")
public class Job extends EntityBase {

    @Column
    private JobCategoryType categoryTypeIndex;

    @Column
    private CooperationType cooperationTypeIndex;

    @Column
    private RequiredGenderType requiredGenderTypeIndex;

    @Column(length = 1024)
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @Column()
    @Temporal(TemporalType.TIMESTAMP)
    private Date date = new Date();

    public Job() {
    }

    public JobCategoryType getCategoryTypeIndex() {
        return categoryTypeIndex;
    }

    public void setCategoryTypeIndex(JobCategoryType categoryTypeIndex) {
        this.categoryTypeIndex = categoryTypeIndex;
    }

    public CooperationType getCooperationTypeIndex() {
        return cooperationTypeIndex;
    }

    public void setCooperationTypeIndex(CooperationType cooperationTypeIndex) {
        this.cooperationTypeIndex = cooperationTypeIndex;
    }

    public RequiredGenderType getRequiredGenderTypeIndex() {
        return requiredGenderTypeIndex;
    }

    public void setRequiredGenderTypeIndex(RequiredGenderType requiredGenderTypeIndex) {
        this.requiredGenderTypeIndex = requiredGenderTypeIndex;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Company getCompany() {
        if (employer != null)
            return employer.getCompany();
        return null;
    }
}
