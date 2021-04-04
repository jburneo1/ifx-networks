package com.pruebatecnica.ifxnetworks.crud.Controller;

import com.pruebatecnica.ifxnetworks.crud.Exception.ModelNotFoundException;
import com.pruebatecnica.ifxnetworks.crud.Model.Employee;
import com.pruebatecnica.ifxnetworks.crud.Model.Entities;
import com.pruebatecnica.ifxnetworks.crud.Service.EntitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/entities")
public class EntitiesController {

    @Autowired
    private EntitiesService service;

    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public ResponseEntity<List<Entities>> listEmployes() {
        List<Entities> list = service.list();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping
    @RequestMapping(value = "/{id}")
    public ResponseEntity<Entities> listEmployesById(@PathVariable("id") String id) {
        Entities employee = service.listById(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Entities> save(@RequestBody Entities Entities) {
        Entities employesSave = service.save(Entities);
        return new ResponseEntity<>(employesSave, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<Entities> update(@RequestBody Entities query) {
        Entities obj = service.listById(query.getId()) ;
        if(obj.getId() == null) {
            throw new ModelNotFoundException("ID NO ENCONTRADO " + query.getId());
        }
        Entities objToUpdate = service.update(query);
        return new ResponseEntity<>(objToUpdate, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") String id){
        Entities obj = service.listById(id) ;
        if(obj.getId() == null) {
            throw new ModelNotFoundException("ID NO ENCONTRADO " + id);
        }
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
