package ir.khu.jaobshaar.service.user;

import ir.khu.jaobshaar.component.user.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/account")
public class AccountController {
    @Autowired
    private UserManager userManager;

    @GetMapping
    public ResponseEntity<?> getCurrentAccount() {
        return ResponseEntity.ok(userManager.getCurrentUser());
    }
}
