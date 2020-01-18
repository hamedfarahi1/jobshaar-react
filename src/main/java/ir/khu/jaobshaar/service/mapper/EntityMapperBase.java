package ir.khu.jaobshaar.service.mapper;

import ir.khu.jaobshaar.entity.EntityBase;
import ir.khu.jaobshaar.service.domain.DomainBase;
import ir.khu.jaobshaar.service.dto.DTOBase;

import java.util.List;

public interface EntityMapperBase<TDTO extends DTOBase, TDomain extends DomainBase, TEntity extends EntityBase> {

    TDTO toDto(TEntity entity);

    TEntity toEntity(TDTO tdto);

    List<TDTO> toDtoList(List<TEntity> entity);

    List<TEntity> toEntityList(List<TDTO> entity);

    TDomain toDomain(TEntity entity);

    TEntity domainToTEntity(TDomain domain);

    List<TDomain> toDomainList(List<TEntity> entities);

    List<TEntity> domainListToEntityList(List<TDomain> domains);

    TEntity createNew();

}
