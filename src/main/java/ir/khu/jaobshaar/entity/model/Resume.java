package ir.khu.jaobshaar.entity.model;

import javax.persistence.*;

@Entity
@Table
public class Resume {

	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private Long id;

	@Column(unique = true)
	private String url;

	@OneToOne(fetch = FetchType.LAZY, mappedBy = "resume")
	private Employee employee;
}
