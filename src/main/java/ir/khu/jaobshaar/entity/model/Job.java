package ir.khu.jaobshaar.entity.model;

import ir.khu.jaobshaar.entity.enums.CooperationType;
import ir.khu.jaobshaar.entity.enums.JobCategoryType;
import ir.khu.jaobshaar.entity.enums.RequiredGenderType;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "JOB")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private JobCategoryType categoryTypeIndex;

    @Column
    private CooperationType cooperationTypeIndex;

    @Column
    private RequiredGenderType requiredGenderTypeIndex;

    @Column(length = 1024)
    private String description;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @Column()
    @Temporal(TemporalType.TIMESTAMP)
    private Date date = new Date();

    public Job() {
    }

    public Job(JobCategoryType categoryTypeIndex, CooperationType cooperationTypeIndex, RequiredGenderType requiredGenderTypeIndex, String description, Employer employer) {
        this.categoryTypeIndex = categoryTypeIndex;
        this.cooperationTypeIndex = cooperationTypeIndex;
        this.requiredGenderTypeIndex = requiredGenderTypeIndex;
        this.description = description;
        this.employer = employer;
    }

    public Job(JobCategoryType categoryTypeIndex, CooperationType cooperationTypeIndex, RequiredGenderType requiredGenderTypeIndex, String description) {
        this.categoryTypeIndex = categoryTypeIndex;
        this.cooperationTypeIndex = cooperationTypeIndex;
        this.requiredGenderTypeIndex = requiredGenderTypeIndex;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
