package ir.khu.jaobshaar.utils.validation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
class ControllerExceptionHandler {

    @ExceptionHandler(ResponseException.class)
    public ResponseEntity<?> handleResponseException(ResponseException ex) {
        return ResponseEntity.status(ex.getStatus()).body(ex.getMessage());
    }
}
