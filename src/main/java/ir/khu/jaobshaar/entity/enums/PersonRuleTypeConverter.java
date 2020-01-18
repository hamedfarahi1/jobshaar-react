package ir.khu.jaobshaar.entity.enums;

import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Component
@Converter(autoApply = true)
public class PersonRuleTypeConverter implements AttributeConverter<PersonRuleType, Integer> {
    @Override
    public Integer convertToDatabaseColumn(PersonRuleType personRuleType) {
        if (personRuleType != null)
            return personRuleType.toKey();
        return null;
    }

    @Override
    public PersonRuleType convertToEntityAttribute(Integer integer) {
        if (integer != null)
            return PersonRuleType.fromKey(integer);
        return null;
    }
}
