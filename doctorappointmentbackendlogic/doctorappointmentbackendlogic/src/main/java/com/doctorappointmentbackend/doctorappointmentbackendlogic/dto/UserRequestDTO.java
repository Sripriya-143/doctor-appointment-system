package com.doctorappointmentbackend.doctorappointmentbackendlogic.dto;

import jakarta.validation.constraints.NotBlank;

public class UserRequestDTO {

    @NotBlank
    private String name;

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // USER, DOCTOR, or ADMIN
    @NotBlank
    private String role;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
