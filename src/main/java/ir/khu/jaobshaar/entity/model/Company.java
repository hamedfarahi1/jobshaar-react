package ir.khu.jaobshaar.entity.model;

import javax.persistence.*;


@Entity
@Table
public class Company {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(length = 50, unique = true, nullable = false)
	private String name;

	@Column
	private int categoryTypeIndex;

	@Column(length = 1024)
	private String bio;

	@Column(length = 255)
	private String address;


	@OneToOne(fetch = FetchType.LAZY, mappedBy = "company")
	private Employer employer;


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

	public Employer getEmployer() {
		return employer;
	}

	public void setEmployer(Employer employer) {
		this.employer = employer;
	}
}
