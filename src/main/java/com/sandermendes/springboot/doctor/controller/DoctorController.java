package com.sandermendes.springboot.doctor.controller;

import com.sandermendes.springboot.doctor.dao.DoctorDao;
import com.sandermendes.springboot.doctor.model.Doctor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Object> create(@RequestBody final Doctor newDoctor) {
        try {
            Doctor doctor = doctorDao.save(newDoctor);
            Map<String, Object> map = new HashMap<>();
            map.put("success", true);
            map.put("message", "Incluido com sucesso");
            map.put("newData", doctor);
            return new ResponseEntity<>(map, HttpStatus.CREATED);
        } catch (Exception error) {

            Map<String, Object> map = new HashMap<>();
            map.put("success", true);
            map.put("message", "Error ao incluir");
            return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

}
