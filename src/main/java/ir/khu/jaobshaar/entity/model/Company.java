package ir.khu.jaobshaar.entity.model;

import ir.khu.jaobshaar.entity.EntityBase;
import ir.khu.jaobshaar.entity.enums.CompanyCategoryType;

import javax.persistence.*;


@Entity
@Table(name = "COMPANY")
public class Company extends EntityBase {

    @Column(unique = true, nullable = false)
    private String name;

    @Column
    private CompanyCategoryType categoryTypeIndex;

    @Column(length = 1024)
    private String bio;

    @Column()
    private String address;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "company", cascade = CascadeType.ALL)
    private Employer employer;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CompanyCategoryType getCategoryTypeIndex() {
        return categoryTypeIndex;
    }

    public void setCategoryTypeIndex(CompanyCategoryType categoryTypeIndex) {
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

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }

    @Override
    public String toString() {
        return "Company{" +
                "\n id=" + getId() +
                "\n, name='" + name + '\'' +
                "\n, categoryTypeIndex=" + categoryTypeIndex +
                "\n, bio='" + bio + '\'' +
                "\n, address='" + address + '\'' +
                '}';
    }
}
