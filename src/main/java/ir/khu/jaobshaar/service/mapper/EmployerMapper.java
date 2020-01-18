package ir.khu.jaobshaar.service.mapper;

import ir.khu.jaobshaar.entity.enums.PersonRuleTypeConverter;
import ir.khu.jaobshaar.entity.model.Employer;
import ir.khu.jaobshaar.service.domain.EmployerDomain;
import ir.khu.jaobshaar.service.dto.EmployerDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN, uses = {CompanyMapper.class, JobMapper.class, PersonRuleTypeConverter.class})
public interface EmployerMapper extends EntityMapperBase<EmployerDTO, EmployerDomain, Employer> {
    @Override
    default Employer createNew() {
        return new Employer();
    }
}
