package ir.khu.jaobshaar.entity.enums;

import ir.khu.jaobshaar.utils.EnumProviderKey;
import ir.khu.jaobshaar.utils.EnumUtil;

public enum PersonRuleType implements EnumProviderKey<Integer> {
	EMPLOYER(0), EMPLOYEE(1);
	private int key;

	PersonRuleType(int key) {
		this.key = key;
	}

	public static PersonRuleType fromKey(int key) {
		return EnumUtil.fromKey(PersonRuleType.class, key);
	}

	@Override
	public Integer toKey() {
		return key;
	}
}
