package com.doctorappointmentbackend.doctorappointmentbackendlogic.serviceimpl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.doctorappointmentbackend.doctorappointmentbackendlogic.model.Appointment;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.repository.AppointmentRepository;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.repository.DoctorRepository;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.repository.UserRepository;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.service.AppointmentService;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepo;
    private final UserRepository userRepo;
    private final DoctorRepository doctorRepo;

    public AppointmentServiceImpl(
            AppointmentRepository appointmentRepo,
            UserRepository userRepo,
            DoctorRepository doctorRepo
    ) {
        this.appointmentRepo = appointmentRepo;
        this.userRepo = userRepo;
        this.doctorRepo = doctorRepo;
    }

    @Override
    public Appointment bookAppointment(
            Long userId,
            Long doctorId,
            LocalDate date,
            LocalTime time
    ) {
        Appointment appointment = new Appointment();
        appointment.setUser(userRepo.findById(userId).orElseThrow());
        appointment.setDoctor(doctorRepo.findById(doctorId).orElseThrow());
        appointment.setAppointmentDate(date);
        appointment.setAppointmentTime(time);
        appointment.setStatus("PENDING");

        return appointmentRepo.save(appointment);
    }

    @Override
    public List<Appointment> getAppointmentsByUser(Long userId) {
        return appointmentRepo.findByUser_Id(userId);
    }
    
    @Override
    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepo.findByDoctor_Id(doctorId);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    @Override
    public Appointment approve(Long appointmentId) {
        Appointment appointment =
                appointmentRepo.findById(appointmentId).orElseThrow();
        appointment.setStatus("APPROVED");
        return appointmentRepo.save(appointment);
    }

    @Override
    public Appointment reject(Long appointmentId) {
        Appointment appointment =
                appointmentRepo.findById(appointmentId).orElseThrow();
        appointment.setStatus("REJECTED");
        return appointmentRepo.save(appointment);
    }

    // ✅ DELETE IMPLEMENTATION
    @Override
    public void deleteAppointment(Long appointmentId) {
        appointmentRepo.deleteById(appointmentId);
    }
}
