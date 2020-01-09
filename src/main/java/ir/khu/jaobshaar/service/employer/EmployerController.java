package ir.khu.jaobshaar.service.employer;

import ir.khu.jaobshaar.component.user.EmployerManager;
import ir.khu.jaobshaar.config.jwt.JwtUserDetailsService;
import ir.khu.jaobshaar.service.dto.employer.CompanyDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class EmployerController {

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private EmployerManager employerManager;


    @PostMapping("/employer/add_company")
    public ResponseEntity<?> addCompany(@RequestBody CompanyDTO companyDTO) {
        employerManager.addCompany(companyDTO, userDetailsService.getCurrentUser().getUsername());
        return ResponseEntity.ok(companyDTO);
    }

}
