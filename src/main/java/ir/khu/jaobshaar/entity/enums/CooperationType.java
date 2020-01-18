package ir.khu.jaobshaar.entity.enums;

import ir.khu.jaobshaar.utils.EnumProviderKey;
import ir.khu.jaobshaar.utils.EnumUtil;

public enum CooperationType implements EnumProviderKey<Integer> {
    PART_TIME(0), FULL_TIME(1), INTERNSHIP(2),FREE_LANCE(3);

    private int key;

    CooperationType(int key) {
        this.key = key;
    }

    public static CooperationType fromKey(int key) {
        return EnumUtil.fromKey(CooperationType.class, key);
    }


    @Override
    public Integer toKey() {
        return key;
    }
}
