package ir.khu.jaobshaar.service.domain;

import java.util.Date;

public class JobDomain extends DomainBase {

    private Integer categoryTypeIndex;

    private Integer cooperationTypeIndex;

    private Integer requiredGenderTypeIndex;

    private String description;

    private Date date;

    private CompanyDomain company;

    private String title;

    public JobDomain(Long id, Integer categoryType, Integer cooperationType, Integer requiredGender, String description, Date date, CompanyDomain company) {
        this.setId(id);
        this.categoryTypeIndex = categoryType;
        this.cooperationTypeIndex = cooperationType;
        this.requiredGenderTypeIndex = requiredGender;
        this.description = description;
        this.date = date;
        this.company = company;
    }

    public JobDomain() {
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getCategoryTypeIndex() {
        return categoryTypeIndex;
    }

    public void setCategoryTypeIndex(Integer categoryType) {
        this.categoryTypeIndex = categoryType;
    }

    public Integer getCooperationTypeIndex() {
        return cooperationTypeIndex;
    }

    public void setCooperationTypeIndex(Integer cooperationType) {
        this.cooperationTypeIndex = cooperationType;
    }

    public Integer getRequiredGenderTypeIndex() {
        return requiredGenderTypeIndex;
    }

    public void setRequiredGenderTypeIndex(Integer requiredGender) {
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
