package ir.khu.jaobshaar.entity.enums;

import ir.khu.jaobshaar.utils.EnumProviderKey;
import ir.khu.jaobshaar.utils.EnumUtil;

public enum JobCategoryType implements EnumProviderKey<Integer> {
    BACKEND_DEVELOPER(0), FRONTEND_DEVELOPER(1), MOBILE_DEVELOPER(2), UI_UX(3), TEST_DEVELOPMENT(4), DEVOPS(5), SOFTWARE_DEVELOPER(6),
    PRODUCT_MANAGER(7), CTO(8), INDUSTRY(9), DESIGN(10), CONTENT(11), BUSINESS(12), FINANCIAL(13),
    INSTITUTION(14), ARCHITECTURE(15), MECHANIC(16), CONSTRUCTION(17), PSYCHOLOGY(18);

    private int key;

    JobCategoryType(int key) {
        this.key = key;
    }

    public static JobCategoryType fromKey(int key) {
        return EnumUtil.fromKey(JobCategoryType.class, key);
    }

    @Override
    public Integer toKey() {
        return key;
    }
}
