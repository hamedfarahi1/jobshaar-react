package ir.khu.jaobshaar.service.mapper;

import ir.khu.jaobshaar.entity.enums.CompanyCategoryTypeConverter;
import ir.khu.jaobshaar.entity.model.Company;
import ir.khu.jaobshaar.service.domain.CompanyDomain;
import ir.khu.jaobshaar.service.dto.employer.CompanyDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN, uses = {CompanyCategoryTypeConverter.class})
public interface CompanyMapper extends EntityMapperBase<CompanyDTO, CompanyDomain, Company> {

    default Company createNew() {
        return new Company();
    }
}
