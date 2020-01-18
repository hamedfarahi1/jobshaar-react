package ir.khu.jaobshaar.entity.enums;

import ir.khu.jaobshaar.utils.EnumProviderKey;
import ir.khu.jaobshaar.utils.EnumUtil;

public enum CooperationType implements EnumProviderKey<Integer> {
    PAVE_VAQT(0), TAMAM_VAQT(1), KARAMOZ_DOR_KARI(2);

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
