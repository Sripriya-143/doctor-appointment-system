package com.doctorappointmentbackend.doctorappointmentbackendlogic.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.doctorappointmentbackend.doctorappointmentbackendlogic.dto.AppointmentRequestDTO;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.model.Appointment;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.service.AppointmentService;

@RestController
@RequestMapping("/appointment")
@CrossOrigin(origins = "*")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @PostMapping("/book")
    public Appointment book(@RequestBody AppointmentRequestDTO dto) {
        return service.bookAppointment(
                dto.getUserId(),
                dto.getDoctorId(),
                LocalDate.parse(dto.getDate()),
                LocalTime.parse(dto.getTime())
        );
    }

    @GetMapping("/user/{userId}")
    public List<Appointment> byUser(@PathVariable Long userId) {
        return service.getAppointmentsByUser(userId);
    }
    
    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> byDoctor(@PathVariable Long doctorId) {
        return service.getAppointmentsByDoctor(doctorId);
    }

    @GetMapping
    public List<Appointment> all() {
        return service.getAllAppointments();
    }

    @PutMapping("/approve/{id}")
    public Appointment approve(@PathVariable Long id) {
        return service.approve(id);
    }

    @PutMapping("/reject/{id}")
    public Appointment reject(@PathVariable Long id) {
        return service.reject(id);
    }

    // ✅ DELETE APPOINTMENT
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteAppointment(id);
    }
}
