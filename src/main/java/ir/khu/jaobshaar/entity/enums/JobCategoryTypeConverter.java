package ir.khu.jaobshaar.entity.enums;

import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Component
@Converter(autoApply = true)
public class JobCategoryTypeConverter implements AttributeConverter<JobCategoryType, Integer> {
    @Override
    public Integer convertToDatabaseColumn(JobCategoryType jobCategoryType) {
        if (jobCategoryType != null)
            return jobCategoryType.toKey();
        return null;
    }

    @Override
    public JobCategoryType convertToEntityAttribute(Integer integer) {
        if (integer != null)
            return JobCategoryType.fromKey(integer);
        return null;
    }
}
