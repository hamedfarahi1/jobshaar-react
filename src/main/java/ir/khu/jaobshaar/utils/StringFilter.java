package ir.khu.jaobshaar.utils;

public class StringFilter extends Filter<String> {
    private String contains;

    private String startWith;

    public String getContains() {
        return contains;
    }

    public StringFilter setContains(String contains) {
        this.contains = contains;
        return this;
    }

    public String getStartWith() {
        return startWith;
    }

    public void setStartWith(String startWith) {
        this.startWith = startWith;
    }
}
