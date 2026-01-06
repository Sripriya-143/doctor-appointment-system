package com.doctorappointmentbackend.doctorappointmentbackendlogic.serviceimpl;

import com.doctorappointmentbackend.doctorappointmentbackendlogic.model.Doctor;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.repository.DoctorRepository;
import com.doctorappointmentbackend.doctorappointmentbackendlogic.service.DoctorService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository repository;

    public DoctorServiceImpl(DoctorRepository repository) {
        this.repository = repository;
    }

    @Override
    public Doctor addDoctor(Doctor doctor) {
        // Check if doctor with same email already exists
        if (repository.findByEmail(doctor.getEmail()).isPresent()) {
            throw new RuntimeException("Doctor with email " + doctor.getEmail() + " already exists");
        }
        
        // Handle null or empty phone
        if (doctor.getPhone() != null && doctor.getPhone().trim().isEmpty()) {
            doctor.setPhone(null);
        }
        
        return repository.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return repository.findAll();
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
    }

    @Override
    public Doctor updateDoctor(Long id, Doctor doctor) {

        Doctor existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));

        existing.setName(doctor.getName());
        existing.setSpecialization(doctor.getSpecialization());
        existing.setPhone(doctor.getPhone());
        existing.setEmail(doctor.getEmail());

        return repository.save(existing);
    }

    @Override
    public void deleteDoctor(Long id) {
        repository.deleteById(id);
    }
}
