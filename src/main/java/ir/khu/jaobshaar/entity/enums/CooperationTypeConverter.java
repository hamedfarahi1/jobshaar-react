package ir.khu.jaobshaar.entity.enums;

import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Component
@Converter(autoApply = true)
public class CooperationTypeConverter implements AttributeConverter<CooperationType,Integer> {
	@Override
	public Integer convertToDatabaseColumn(CooperationType cooperationType) {
		return cooperationType.toKey();
	}

	@Override
	public CooperationType convertToEntityAttribute(Integer integer) {
		return CooperationType.fromKey(integer);
	}
}
