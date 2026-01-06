package com.doctorappointmentbackend.doctorappointmentbackendlogic.dto;

public class LoginResponseDTO {

    private Long userId;
    private String role;

    public LoginResponseDTO(Long userId, String role) {
        this.userId = userId;
        this.role = role;
    }

    public Long getUserId() { return userId; }
    public String getRole() { return role; }
}
