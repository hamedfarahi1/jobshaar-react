package ir.khu.jaobshaar.utils;

import java.io.Serializable;
import java.util.List;

public class Filter<Type> implements Serializable {

    private Type equals;
    private Boolean specified;
    private List<Type> in;

    public Type getEquals() {
        return equals;
    }

    public Filter<Type> setEquals(Type equals) {
        this.equals = equals;
        return this;
    }

    public Boolean getSpecified() {
        return specified;
    }

    public Filter<Type> setSpecified(Boolean specified) {
        this.specified = specified;
        return this;
    }

    public List<Type> getIn() {
        return in;
    }

    public Filter<Type> setIn(List<Type> in) {
        this.in = in;
        return this;
    }
}
