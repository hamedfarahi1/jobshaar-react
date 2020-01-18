package ir.khu.jaobshaar.service.resume;

import ir.khu.jaobshaar.component.resume.ResumeManager;
import ir.khu.jaobshaar.service.dto.ResumeDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeManager resumeManager;

    public ResumeController(ResumeManager resumeManager) {
        this.resumeManager = resumeManager;
    }

    @PostMapping("/employee")
    public ResponseEntity<?> addResume(@RequestBody ResumeDTO resumeDTO) {
        return ResponseEntity.ok(resumeManager.addResume(resumeDTO));
    }

    @PutMapping("/employee")
    public ResponseEntity<?> updateResume(@RequestBody ResumeDTO resumeDTO) {
        return ResponseEntity.ok(resumeManager.updateResume(resumeDTO));
    }

}
