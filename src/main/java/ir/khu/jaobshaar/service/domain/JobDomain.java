package ir.khu.jaobshaar.service.domain;

import java.util.Date;

public class JobDomain {
    private Long id;

    private int categoryType;

    private int cooperationType;

    private int requiredGender;

    private String description;

    private Date date;

    private CompanyDomain company;

    public JobDomain(Long id, int categoryType, int cooperationType, int requiredGender, String description, Date date, CompanyDomain company) {
        this.id = id;
        this.categoryType = categoryType;
        this.cooperationType = cooperationType;
        this.requiredGender = requiredGender;
        this.description = description;
        this.date = date;
        this.company = company;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public CompanyDomain getCompany() {
        return company;
    }

    public void setCompany(CompanyDomain company) {
        this.company = company;
    }

}
