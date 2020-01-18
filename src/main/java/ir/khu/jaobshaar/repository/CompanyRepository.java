package ir.khu.jaobshaar.repository;

import ir.khu.jaobshaar.entity.model.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {
    Company findByName(String name);
}
