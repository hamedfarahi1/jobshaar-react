package ir.khu.jaobshaar.repository;

import ir.khu.jaobshaar.entity.model.EmployeeJobs;
import ir.khu.jaobshaar.entity.model.Job;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeJobRepository extends CrudRepository<EmployeeJobs, Long> {
    List<EmployeeJobs> findAllById_Job(Job job);
}
