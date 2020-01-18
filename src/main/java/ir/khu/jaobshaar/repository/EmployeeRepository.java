package ir.khu.jaobshaar.repository;

import ir.khu.jaobshaar.entity.model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {
    Employee findByUsername(String username);

    Employee findByEmail(String email);
}
