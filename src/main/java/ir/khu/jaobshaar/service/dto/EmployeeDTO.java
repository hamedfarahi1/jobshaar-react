package ir.khu.jaobshaar.service.dto;

import ir.khu.jaobshaar.service.dto.user.UserDTO;

public class EmployeeDTO extends UserDTO {
    private ResumeDTO resume;

    public ResumeDTO getResume() {
        return resume;
    }

    public void setResume(ResumeDTO resume) {
        this.resume = resume;
    }
}
