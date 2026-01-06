package com.doctorappointmentbackend.doctorappointmentbackendlogic.service;

import com.doctorappointmentbackend.doctorappointmentbackendlogic.model.Doctor;

import java.util.List;

public interface DoctorService {

    Doctor addDoctor(Doctor doctor);

    List<Doctor> getAllDoctors();

    Doctor getDoctorById(Long id);

    Doctor updateDoctor(Long id, Doctor doctor);

    void deleteDoctor(Long id);
}
