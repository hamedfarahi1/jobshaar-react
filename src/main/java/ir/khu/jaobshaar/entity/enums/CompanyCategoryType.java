package ir.khu.jaobshaar.entity.enums;


import ir.khu.jaobshaar.utils.EnumProviderKey;
import ir.khu.jaobshaar.utils.EnumUtil;

public enum CompanyCategoryType implements EnumProviderKey<Integer> {
    IT(0), INDUSTRY(1), DESIGN(2), CONTENT(3), BUSINESS(4), FINANCIAL(5),
    INSTITUTION(6), ARCHITECTURE(7), MECHANIC(8), CONSTRUCTION(9), PSYCHOLOGY(10);

    private int key;

    CompanyCategoryType(int key) {
        this.key = key;
    }

    public static CompanyCategoryType fromKey(int key) {
        return EnumUtil.fromKey(CompanyCategoryType.class, key);
    }

    @Override
    public Integer toKey() {
        return key;
    }
}
