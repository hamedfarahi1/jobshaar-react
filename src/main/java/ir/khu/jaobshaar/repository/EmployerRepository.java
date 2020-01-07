package ir.khu.jaobshaar.repository;

import ir.khu.jaobshaar.entity.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {
}
