package com.doctorappointmentbackend.doctorappointmentbackendlogic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doctorappointmentbackend.doctorappointmentbackendlogic.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Get appointments for a user
    List<Appointment> findByUser_Id(Long userId);
    
    // Get appointments for a doctor
    List<Appointment> findByDoctor_Id(Long doctorId);
}
