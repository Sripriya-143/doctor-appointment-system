package com.doctorappointmentbackend.doctorappointmentbackendlogic.serviceimpl;

import com.doctorappointmentbackend.doctorappointmentbackendlogic.dto.LoginResponseDTO;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.dto.UserRequestDTO;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.dto.UserResponseDTO;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.model.User;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.repository.UserRepository;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;

    public UserServiceImpl(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // ================= REGISTER =================
    @Override
    public UserResponseDTO saveUser(UserRequestDTO dto) {

        if (userRepo.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());

        // ROLE COMES FROM UI: USER / DOCTOR (ADMIN can only be created directly in database)
        // Prevent ADMIN registration through regular endpoint
        if ("ADMIN".equalsIgnoreCase(dto.getRole())) {
            throw new RuntimeException("Admin registration is not allowed through this endpoint");
        }
        user.setRole(dto.getRole());

        User saved = userRepo.save(user);

        return new UserResponseDTO(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getRole()
        );
    }

    // ================= LOGIN =================
    @Override
    public LoginResponseDTO login(String email, String password) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponseDTO(
                user.getId(),
                user.getRole()
        );
    }

    // ================= GET USER =================
    @Override
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    // ================= ADMIN: GET ALL USERS =================
    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepo.findAll().stream()
                .map(user -> new UserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole()
                ))
                .collect(Collectors.toList());
    }
    
    // ================= ADMIN: DELETE USER =================
    @Override
    public void deleteUser(Long userId) {
        if (!userRepo.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userRepo.deleteById(userId);
    }
}
