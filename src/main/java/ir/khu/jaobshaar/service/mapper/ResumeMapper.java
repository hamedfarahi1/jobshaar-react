package ir.khu.jaobshaar.service.mapper;

import ir.khu.jaobshaar.entity.model.Resume;
import ir.khu.jaobshaar.service.domain.ResumeDomain;
import ir.khu.jaobshaar.service.dto.ResumeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN, uses = {EmployeeMapper.class})
public interface ResumeMapper extends EntityMapperBase<ResumeDTO, ResumeDomain, Resume> {
    @Override
    default Resume createNew() {
        return new Resume();
    }
}
