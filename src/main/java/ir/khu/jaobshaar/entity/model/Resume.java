package ir.khu.jaobshaar.entity.model;

import javax.persistence.*;

@Entity
@Table(name = "RESUME")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String url;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "resume")
    private Employee employee;

    public Resume(String url, Employee employee) {
        this.url = url;
        this.employee = employee;
    }

    public Resume() {
    }

    @Override
    public String toString() {
        return "Resume{" +
                "\n id=" + id +
                "\n , url='" + url + '\'' +
                "\n , employee=" + employee +
                '}';
    }
}
