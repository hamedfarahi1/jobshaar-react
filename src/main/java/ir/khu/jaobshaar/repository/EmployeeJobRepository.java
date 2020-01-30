package ir.khu.jaobshaar.repository;

import ir.khu.jaobshaar.entity.model.EmployeeJobs;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeJobRepository extends CrudRepository<EmployeeJobs, Long> {
}
