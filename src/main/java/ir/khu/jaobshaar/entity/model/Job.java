package ir.khu.jaobshaar.entity.model;

import javax.persistence.*;

@Entity
@Table(name = "JOB")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private int categoryType;

    @Column
    private int cooperationType;

    @Column
    private int requiredGender;

    @Column(length = 1024)
    private String description;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;

    public Job() {
    }

    public Job(int categoryType, int cooperationType, int requiredGender, String description, Employer employer) {
        this.categoryType = categoryType;
        this.cooperationType = cooperationType;
        this.requiredGender = requiredGender;
        this.description = description;
        this.employer = employer;
    }

    public Job(int categoryType, int cooperationType, int requiredGender, String description) {
        this.categoryType = categoryType;
        this.cooperationType = cooperationType;
        this.requiredGender = requiredGender;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(int categoryType) {
        this.categoryType = categoryType;
    }

    public int getCooperationType() {
        return cooperationType;
    }

    public void setCooperationType(int cooperationType) {
        this.cooperationType = cooperationType;
    }

    public int getRequiredGender() {
        return requiredGender;
    }

    public void setRequiredGender(int requiredGender) {
        this.requiredGender = requiredGender;
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
}
