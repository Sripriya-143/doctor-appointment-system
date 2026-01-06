package com.doctorappointmentbackend.doctorappointmentbackendlogic.controller;

import org.springframework.web.bind.annotation.*;

import com.doctorappointmentbackend.doctorappointmentbackendlogic.dto.LoginRequestDTO;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.dto.LoginResponseDTO;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.dto.UserRequestDTO;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.dto.UserResponseDTO;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public UserResponseDTO register(@RequestBody UserRequestDTO dto) {
        return service.saveUser(dto);
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO dto) {
        return service.login(dto.getEmail(), dto.getPassword());
    }
    
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return service.getAllUsers();
    }
    
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
    }
}
