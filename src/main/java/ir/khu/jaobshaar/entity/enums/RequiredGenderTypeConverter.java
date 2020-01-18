package ir.khu.jaobshaar.entity.enums;

import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Component
@Converter(autoApply = true)
public class RequiredGenderTypeConverter implements AttributeConverter<RequiredGenderType, Integer> {
    @Override
    public Integer convertToDatabaseColumn(RequiredGenderType requiredGenderType) {
        if (requiredGenderType != null)
            return requiredGenderType.toKey();
        return null;
    }

    @Override
    public RequiredGenderType convertToEntityAttribute(Integer integer) {
        if (integer != null)
            return RequiredGenderType.fromKey(integer);
        return null;
    }
}
