package ir.khu.jaobshaar.service.mapper;

import ir.khu.jaobshaar.entity.enums.PersonRuleTypeConverter;
import ir.khu.jaobshaar.entity.model.Employee;
import ir.khu.jaobshaar.service.domain.EmployeeDomain;
import ir.khu.jaobshaar.service.dto.EmployeeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN, uses = {ResumeMapper.class, PersonRuleTypeConverter.class})
public interface EmployeeMapper extends EntityMapperBase<EmployeeDTO, EmployeeDomain, Employee> {

    @Override
    default Employee createNew() {
        return new Employee();
    }

}
