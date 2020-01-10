package ir.khu.jaobshaar.service.dto;

public class JobDTO {
    private int categoryType;

    private int cooperationType;

    private int requiredGender;

    private String description;

    public JobDTO(int categoryType, int cooperationType, int requiredGender, String description) {
        this.categoryType = categoryType;
        this.cooperationType = cooperationType;
        this.requiredGender = requiredGender;
        this.description = description;
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
}
