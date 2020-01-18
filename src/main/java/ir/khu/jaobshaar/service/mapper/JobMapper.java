package ir.khu.jaobshaar.service.mapper;

import ir.khu.jaobshaar.entity.enums.CooperationTypeConverter;
import ir.khu.jaobshaar.entity.enums.JobCategoryTypeConverter;
import ir.khu.jaobshaar.entity.enums.RequiredGenderTypeConverter;
import ir.khu.jaobshaar.entity.model.Job;
import ir.khu.jaobshaar.service.domain.JobDomain;
import ir.khu.jaobshaar.service.dto.JobDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN, uses = {JobCategoryTypeConverter.class,
        CooperationTypeConverter.class, RequiredGenderTypeConverter.class, CompanyMapper.class, EmployerMapper.class})
public interface JobMapper extends EntityMapperBase<JobDTO, JobDomain, Job> {
    @Override
    default Job createNew() {
        return new Job();
    }
}
