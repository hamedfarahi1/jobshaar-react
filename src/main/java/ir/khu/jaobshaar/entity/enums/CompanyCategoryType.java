package ir.khu.jaobshaar.entity.enums;


import ir.khu.jaobshaar.utils.EnumProviderKey;
import ir.khu.jaobshaar.utils.EnumUtil;

public enum CompanyCategoryType implements EnumProviderKey<Integer> {
	IT(0), WEB_SERVICE(1), ANDROID(3), BANKING_SOFTWARE(4), BUSINESS_SOFTWARE(5), COMPUTER_SECURITY(6), MAC_SOFTWARE(7);

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
