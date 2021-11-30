package com.sandermendes.springboot.doctor.controller;

import com.sandermendes.springboot.doctor.dao.DoctorDao;
import com.sandermendes.springboot.doctor.model.Doctor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class DoctorController {

    @Autowired
    DoctorDao doctorDao;

    @GetMapping("doctors")
    public ResponseEntity<List<Doctor>> getAll() {
        return new ResponseEntity<>(doctorDao.findAll(), HttpStatus.OK);
    }

    @PostMapping(
            path = "doctor",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Doctor> create(@RequestBody final Doctor newDoctor) {
        Doctor doctor = doctorDao.save( newDoctor );
        return new ResponseEntity<>(doctor, HttpStatus.CREATED);
    }

}
