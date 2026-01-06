package com.doctorappointmentbackend.doctorappointmentbackendlogic.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.doctorappointmentbackend.doctorappointmentbackendlogic.model.Appointment;

public interface AppointmentService {

    Appointment bookAppointment(
            Long userId,
            Long doctorId,
            LocalDate date,
            LocalTime time
    );

    List<Appointment> getAppointmentsByUser(Long userId);
    
    List<Appointment> getAppointmentsByDoctor(Long doctorId);

    List<Appointment> getAllAppointments();

    Appointment approve(Long appointmentId);

    Appointment reject(Long appointmentId);

    // ✅ ADD THIS
    void deleteAppointment(Long appointmentId);
}
