package ir.khu.jaobshaar.service.company;

import ir.khu.jaobshaar.component.company.CompanyManager;
import ir.khu.jaobshaar.service.dto.employer.CompanyDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CompanyController {

    @Autowired
    private CompanyManager companyManager;

    @PostMapping("/company")
    public ResponseEntity<?> addCompany(@RequestBody CompanyDTO companyDTO) {
        companyManager.addCompany(companyDTO);
        return ResponseEntity.ok(companyDTO);
    }

}
