package ir.khu.jaobshaar.service.criteria;

import ir.khu.jaobshaar.utils.IdFilter;
import ir.khu.jaobshaar.utils.StringFilter;


public class JobCriteria {

    private IdFilter categoryTypeIndex;

    private IdFilter cooperationTypeIndex;

    private IdFilter requiredGenderTypeIndex;

    private StringFilter companyName;

    private IdFilter companyCategoryTypeIndex;

    private StringFilter address;


    public IdFilter getCategoryTypeIndex() {
        return categoryTypeIndex;
    }

    public void setCategoryTypeIndex(IdFilter categoryTypeIndex) {
        this.categoryTypeIndex = categoryTypeIndex;
    }

    public IdFilter getCooperationTypeIndex() {
        return cooperationTypeIndex;
    }

    public void setCooperationTypeIndex(IdFilter cooperationTypeIndex) {
        this.cooperationTypeIndex = cooperationTypeIndex;
    }

    public IdFilter getRequiredGenderTypeIndex() {
        return requiredGenderTypeIndex;
    }

    public void setRequiredGenderTypeIndex(IdFilter requiredGenderTypeIndex) {
        this.requiredGenderTypeIndex = requiredGenderTypeIndex;
    }

    public StringFilter getCompanyName() {
        return companyName;
    }

    public void setCompanyName(StringFilter companyName) {
        this.companyName = companyName;
    }

    public IdFilter getCompanyCategoryTypeIndex() {
        return companyCategoryTypeIndex;
    }

    public void setCompanyCategoryTypeIndex(IdFilter companyCategoryTypeIndex) {
        this.companyCategoryTypeIndex = companyCategoryTypeIndex;
    }

    public StringFilter getAddress() {
        return address;
    }

    public void setAddress(StringFilter address) {
        this.address = address;
    }
}
