package ir.khu.jaobshaar.entity.model;


import javax.persistence.*;

@Entity
@Table(name = "employer")
public class Employer extends User {

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id")
    private Company company;

    public Employer() {
    }

    public Employer(Company company) {
        this.company = company;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    @Override
    public String toString() {
        return "Employer{" +
                "\n company=" + company +
                '}';
    }
}
