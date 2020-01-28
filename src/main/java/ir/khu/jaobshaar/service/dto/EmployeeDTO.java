package ir.khu.jaobshaar.service.dto;

import ir.khu.jaobshaar.service.dto.user.UserDTO;

import java.util.List;

public class EmployeeDTO extends UserDTO {
    private ResumeDTO resume;

    private List<JobDTO> job;

    public List<JobDTO> getJob() {
        return job;
    }

    public void setJob(List<JobDTO> job) {
        this.job = job;
    }

    public ResumeDTO getResume() {
        return resume;
    }

    public void setResume(ResumeDTO resume) {
        this.resume = resume;
    }
}
