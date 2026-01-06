package com.doctorappointmentbackend.doctorappointmentbackendlogic.service;

import com.doctorappointmentbackend.doctorappointmentbackendlogic.dto.LoginResponseDTO;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.dto.UserRequestDTO;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.dto.UserResponseDTO;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.model.User;
import java.util.List;

public interface UserService {

    // REGISTER
    UserResponseDTO saveUser(UserRequestDTO dto);

    // LOGIN
    LoginResponseDTO login(String email, String password);

    // GET USER BY EMAIL (REQUIRED FOR LOGIN / APPOINTMENTS)
    User getUserByEmail(String email);
    
    // ADMIN: GET ALL USERS
    List<UserResponseDTO> getAllUsers();
    
    // ADMIN: DELETE USER
    void deleteUser(Long userId);
}
