package ir.khu.jaobshaar.service.mapper;

import ir.khu.jaobshaar.entity.enums.PersonRuleTypeConverter;
import ir.khu.jaobshaar.entity.model.Employee;
import ir.khu.jaobshaar.entity.model.EmployeeJobs;
import ir.khu.jaobshaar.entity.model.EmployeeJobsId;
import ir.khu.jaobshaar.service.domain.EmployeeDomain;
import ir.khu.jaobshaar.service.dto.EmployeeDTO;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN, uses = {ResumeMapper.class, PersonRuleTypeConverter.class})
public abstract class EmployeeMapper implements EntityMapperBase<EmployeeDTO, EmployeeDomain, Employee> {

    @Autowired
    JobMapper jobMapper;

    public Employee createNew() {
        return new Employee();
    }

    // from dto to entity
    @AfterMapping
    void setJobToEmployee(@MappingTarget Employee entity, EmployeeDTO dto) {
        List<EmployeeJobs> employeeJobsList = new ArrayList<>();
        if (dto.getJob() != null)
            dto.getJob().stream().forEach(jobs -> {
                EmployeeJobs employeeJobs = new EmployeeJobs();
                employeeJobs.getId().setJob(jobMapper.toEntity(jobs));
                employeeJobs.getId().setEmployee(entity);
                employeeJobsList.add(employeeJobs);
            });
        entity.setEmployeeJobs(employeeJobsList);
    }

    // from entity to domain
    @AfterMapping
    void setJobDomainToEmployeeDomain(@MappingTarget EmployeeDomain domain, Employee entity) {
        domain.setJob(jobMapper.toDomainList(entity.getEmployeeJobs().stream().map(EmployeeJobs::getId)
                .map(EmployeeJobsId::getJob).collect(Collectors.toList())));
    }
}
