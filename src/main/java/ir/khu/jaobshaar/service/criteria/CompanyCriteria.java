package ir.khu.jaobshaar.service.criteria;

import ir.khu.jaobshaar.utils.IdFilter;
import ir.khu.jaobshaar.utils.StringFilter;

public class CompanyCriteria {
    private StringFilter name;

    private IdFilter categoryTypeIndex;

    private StringFilter bio;

    private StringFilter address;

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public IdFilter getCategoryTypeIndex() {
        return categoryTypeIndex;
    }

    public void setCategoryTypeIndex(IdFilter categoryTypeIndex) {
        this.categoryTypeIndex = categoryTypeIndex;
    }

    public StringFilter getBio() {
        return bio;
    }

    public void setBio(StringFilter bio) {
        this.bio = bio;
    }

    public StringFilter getAddress() {
        return address;
    }

    public void setAddress(StringFilter address) {
        this.address = address;
    }
}
