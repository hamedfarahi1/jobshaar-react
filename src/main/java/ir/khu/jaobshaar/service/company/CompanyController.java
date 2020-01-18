package ir.khu.jaobshaar.service.company;

import ir.khu.jaobshaar.component.company.CompanyManager;
import ir.khu.jaobshaar.service.dto.employer.CompanyDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CompanyController {

    private final CompanyManager companyManager;

    public CompanyController(CompanyManager companyManager) {
        this.companyManager = companyManager;
    }

    @PostMapping("/company")
    public ResponseEntity<?> addCompany(@RequestBody CompanyDTO companyDTO) {
        companyManager.addCompany(companyDTO);
        return ResponseEntity.ok(companyDTO);
    }

}
