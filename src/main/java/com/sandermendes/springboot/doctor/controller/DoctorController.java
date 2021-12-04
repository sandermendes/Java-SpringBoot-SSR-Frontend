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
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class DoctorController {

    @Autowired
    DoctorDao doctorDao;

    @GetMapping("api/doctors")
    public ResponseEntity<List<Doctor>> getAll() {
        return new ResponseEntity<>(doctorDao.findAll(), HttpStatus.OK);
    }

    @GetMapping("api/doctor/{id}")
    public ResponseEntity<Object> getById(@PathVariable final Long id) {
        Optional<Doctor> doctor = doctorDao.findById(id);

        if (doctor.isPresent()) {
            return new ResponseEntity<>(doctor.get(), HttpStatus.OK);
        } else {
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("message", "Erro ao incluir");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping(
            path = "api/doctor/add",
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
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception error) {
            Map<String, Object> map = new HashMap<>();
            map.put("success", true);
            map.put("message", "Erro ao incluir");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PutMapping("api/doctor/edit/{id}")
    public ResponseEntity<Object> update(@RequestBody final Doctor updatedUser) {
        try {
            Doctor doctor = doctorDao.save(updatedUser);
            Map<String, Object> map = new HashMap<>();
            map.put("success", true);
            map.put("message", "Atualizado com sucesso");
            map.put("newData", doctor);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception error) {
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("message", "Erro ao atualizar");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @DeleteMapping("api/doctor/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable final long id) {
        try {
            doctorDao.deleteById(id);
            Map<String, Object> map = new HashMap<>();
            map.put("success", true);
            map.put("message", "Excluido com sucesso");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        catch (Exception e) {
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("message", "Erro ao excluir");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

}
