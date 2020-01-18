package ir.khu.jaobshaar.service.dto;

public class JobDTO extends DTOBase {
    private Integer categoryType;

    private Integer cooperationType;

    private Integer requiredGender;

    private String description;

    public JobDTO(Integer categoryType, Integer cooperationType, Integer requiredGender, String description) {
        this.categoryType = categoryType;
        this.cooperationType = cooperationType;
        this.requiredGender = requiredGender;
        this.description = description;
    }

    public JobDTO() {
    }

    public Integer getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(Integer categoryType) {
        this.categoryType = categoryType;
    }

    public Integer getCooperationType() {
        return cooperationType;
    }

    public void setCooperationType(Integer cooperationType) {
        this.cooperationType = cooperationType;
    }

    public Integer getRequiredGender() {
        return requiredGender;
    }

    public void setRequiredGender(Integer requiredGender) {
        this.requiredGender = requiredGender;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
