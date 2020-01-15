package ir.khu.jaobshaar.entity.enums;

import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Component
@Converter(autoApply = true)
public class RequiredGenderTypeConverter implements AttributeConverter<RequiredGenderType,Integer> {
	@Override
	public Integer convertToDatabaseColumn(RequiredGenderType requiredGenderType) {
		return requiredGenderType.toKey();
	}

	@Override
	public RequiredGenderType convertToEntityAttribute(Integer integer) {
		return RequiredGenderType.fromKey(integer);
	}
}
