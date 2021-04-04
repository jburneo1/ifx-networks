package com.pruebatecnica.ifxnetworks.crud.Controller;

import com.pruebatecnica.ifxnetworks.crud.Exception.ModelNotFoundException;
import com.pruebatecnica.ifxnetworks.crud.Model.Employee;
import com.pruebatecnica.ifxnetworks.crud.Service.EmployesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/employes")
public class EmployesController {

    @Autowired
    private EmployesService service;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Employee>> listEmployes() {
        List<Employee> list = service.list();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/{id}")
    public ResponseEntity<Employee> listEmployesById(@PathVariable("id") String id) {
        Employee employee = service.listById(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping()
    public ResponseEntity<Employee> save(@RequestBody Employee employes) {
        Employee employesSave = service.save(employes);
        return new ResponseEntity<>(employesSave, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PutMapping()
    public ResponseEntity<Employee> update(@RequestBody Employee query) {
        Employee obj = service.listById(query.getId());
        if (obj.getId() == null) {
            throw new ModelNotFoundException("ID NO ENCONTRADO " + query.getId());
        }
        Employee objUpdate = service.update(query);
        return new ResponseEntity<>(objUpdate, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Employee> delete(@PathVariable("id") String id) {
        Employee obj = service.listById(id);
        if (obj.getId() == null) {
            throw new ModelNotFoundException("ID NO ENCONTRADO " + id);
        }
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
