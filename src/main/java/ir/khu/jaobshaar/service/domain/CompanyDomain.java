package ir.khu.jaobshaar.service.domain;

public class CompanyDomain extends DomainBase {

    private String name;

    private Integer categoryTypeIndex;

    private String bio;

    private String address;

    public CompanyDomain(Long id, String name, Integer categoryTypeIndex, String bio, String address) {
        this.setId(id);
        this.name = name;
        this.categoryTypeIndex = categoryTypeIndex;
        this.bio = bio;
        this.address = address;
    }

    public CompanyDomain() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCategoryTypeIndex() {
        return categoryTypeIndex;
    }

    public void setCategoryTypeIndex(Integer categoryTypeIndex) {
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
