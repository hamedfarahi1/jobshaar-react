package ir.khu.jaobshaar.repository;

import ir.khu.jaobshaar.entity.model.Resume;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeRepository extends CrudRepository<Resume, Long> {
    Resume findResumeByUrl(String url);
}
