package ir.khu.jaobshaar.entity.model;

import ir.khu.jaobshaar.entity.enums.CompanyCategoryType;

import javax.persistence.*;


@Entity
@Table(name = "COMPANY")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column
    private CompanyCategoryType categoryTypeIndex;

    @Column(length = 1024)
    private String bio;

    @Column()
    private String address;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "company")
    private Employer employer;

    public Company() {
    }

    public Company(String name, CompanyCategoryType categoryTypeIndex, String bio, String address, Employer employer) {
        this.name = name;
        this.categoryTypeIndex = categoryTypeIndex;
        this.bio = bio;
        this.address = address;
        this.employer = employer;
    }

    public Company(String name, CompanyCategoryType categoryTypeIndex, String bio, String address) {
        this.name = name;
        this.categoryTypeIndex = categoryTypeIndex;
        this.bio = bio;
        this.address = address;
    }

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Company{" +
                "\n id=" + id +
                "\n, name='" + name + '\'' +
                "\n, categoryTypeIndex=" + categoryTypeIndex +
                "\n, bio='" + bio + '\'' +
                "\n, address='" + address + '\'' +
                '}';
    }
}
