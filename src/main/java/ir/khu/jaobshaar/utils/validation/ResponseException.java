package ir.khu.jaobshaar.utils.validation;

import org.springframework.http.HttpStatus;

public class ResponseException extends RuntimeException {
    private int status = HttpStatus.BAD_REQUEST.value();
    private String message;

    public ResponseException(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public static ResponseException newResponseException(int stats, String message) {
        return new ResponseException(stats, message);
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

