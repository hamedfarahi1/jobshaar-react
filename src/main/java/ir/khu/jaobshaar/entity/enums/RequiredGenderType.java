package ir.khu.jaobshaar.entity.enums;

import ir.khu.jaobshaar.utils.EnumProviderKey;
import ir.khu.jaobshaar.utils.EnumUtil;

public enum RequiredGenderType implements EnumProviderKey<Integer> {
    MALE(0), FEMALE(1),DONT_CARE(2);

    private int key;

    RequiredGenderType(int key) {
        this.key = key;
    }

    public static RequiredGenderType fromKey(int key) {
        return EnumUtil.fromKey(RequiredGenderType.class, key);
    }

    @Override
    public Integer toKey() {
        return key;
    }
}
