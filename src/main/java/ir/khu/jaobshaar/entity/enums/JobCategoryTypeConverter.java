package ir.khu.jaobshaar.entity.enums;

import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Component
@Converter(autoApply = true)
public class JobCategoryTypeConverter implements AttributeConverter<JobCategoryType,Integer> {
	@Override
	public Integer convertToDatabaseColumn(JobCategoryType jobCategoryType) {
		return jobCategoryType.toKey();
	}

	@Override
	public JobCategoryType convertToEntityAttribute(Integer integer) {
		return JobCategoryType.fromKey(integer);
	}
}
