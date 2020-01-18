package ir.khu.jaobshaar.entity.enums;

import ir.khu.jaobshaar.utils.EnumProviderKey;
import ir.khu.jaobshaar.utils.EnumUtil;

public enum JobCategoryType implements EnumProviderKey<Integer> {
    BACKEND_DEVELOPER(0), FRONTEND_DEVELOPER(1), ANDROID(2), UI_UX(3), TEST(4);

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
