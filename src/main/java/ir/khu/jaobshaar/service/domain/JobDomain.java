package ir.khu.jaobshaar.service.domain;

import java.util.Date;

public class JobDomain {
    private Long id;

    private int categoryTypeIndex;

    private int cooperationTypeIndex;

    private int requiredGenderTypeIndex;

    private String description;

    private Date date;

    private CompanyDomain company;

    public JobDomain(Long id, int categoryType, int cooperationType, int requiredGender, String description, Date date, CompanyDomain company) {
        this.id = id;
        this.categoryTypeIndex = categoryType;
        this.cooperationTypeIndex = cooperationType;
        this.requiredGenderTypeIndex = requiredGender;
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

    public int getCategoryTypeIndex() {
        return categoryTypeIndex;
    }

    public void setCategoryTypeIndex(int categoryType) {
        this.categoryTypeIndex = categoryType;
    }

    public int getCooperationTypeIndex() {
        return cooperationTypeIndex;
    }

    public void setCooperationTypeIndex(int cooperationType) {
        this.cooperationTypeIndex = cooperationType;
    }

    public int getRequiredGenderTypeIndex() {
        return requiredGenderTypeIndex;
    }

    public void setRequiredGenderTypeIndex(int requiredGender) {
        this.requiredGenderTypeIndex = requiredGender;
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
