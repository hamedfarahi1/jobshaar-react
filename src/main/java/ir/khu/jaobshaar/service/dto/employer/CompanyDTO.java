package ir.khu.jaobshaar.service.dto.employer;

public class CompanyDTO {

    private String name;

    private int categoryTypeIndex;

    private String bio;

    private String address;


    public CompanyDTO(String name, int categoryTypeIndex, String bio, String address) {
        this.name = name;
        this.categoryTypeIndex = categoryTypeIndex;
        this.bio = bio;
        this.address = address;
    }

    public CompanyDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCategoryTypeIndex() {
        return categoryTypeIndex;
    }

    public void setCategoryTypeIndex(int categoryTypeIndex) {
        this.categoryTypeIndex = categoryTypeIndex;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
