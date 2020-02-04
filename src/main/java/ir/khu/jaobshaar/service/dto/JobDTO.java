package ir.khu.jaobshaar.service.dto;

public class JobDTO extends DTOBase {

    private Integer categoryTypeIndex;

    private Integer cooperationTypeIndex;

    private Integer requiredGenderTypeIndex;

    private String description;

    private String title;

    public JobDTO() {
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

    public void setCategoryTypeIndex(Integer categoryTypeIndex) {
        this.categoryTypeIndex = categoryTypeIndex;
    }

    public Integer getCooperationTypeIndex() {
        return cooperationTypeIndex;
    }

    public void setCooperationTypeIndex(Integer cooperationTypeIndex) {
        this.cooperationTypeIndex = cooperationTypeIndex;
    }

    public Integer getRequiredGenderTypeIndex() {
        return requiredGenderTypeIndex;
    }

    public void setRequiredGenderTypeIndex(Integer requiredGenderTypeIndex) {
        this.requiredGenderTypeIndex = requiredGenderTypeIndex;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
