package ir.khu.jaobshaar.repository;

import ir.khu.jaobshaar.entity.model.Employer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepository extends CrudRepository<Employer, Long> {
    Employer findByUsername(String username);

    Employer findByEmail(String email);
}
