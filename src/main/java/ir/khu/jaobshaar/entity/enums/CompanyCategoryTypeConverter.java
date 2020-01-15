package ir.khu.jaobshaar.entity.enums;

import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Component
@Converter(autoApply = true)
public class CompanyCategoryTypeConverter implements AttributeConverter<CompanyCategoryType, Integer> {
	@Override
	public Integer convertToDatabaseColumn(CompanyCategoryType attribute) {
		return attribute.toKey();
	}

	@Override
	public CompanyCategoryType convertToEntityAttribute(Integer dbData) {
		return CompanyCategoryType.fromKey(dbData);
	}
}
