package com.sandermendes.springboot.doctor.dao;

import com.sandermendes.springboot.doctor.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorDao extends JpaRepository<Doctor, Long> {

}
