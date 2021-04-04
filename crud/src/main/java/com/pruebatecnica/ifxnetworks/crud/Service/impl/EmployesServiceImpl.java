package com.pruebatecnica.ifxnetworks.crud.Service.impl;

import com.pruebatecnica.ifxnetworks.crud.Model.Employee;
import com.pruebatecnica.ifxnetworks.crud.Repository.EmployesRepository;
import com.pruebatecnica.ifxnetworks.crud.Service.EmployesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployesServiceImpl implements EmployesService {

    @Autowired
    EmployesRepository repository;

    @Override
    public Employee save(Employee obj) {
        return repository.save(obj);
    }

    @Override
    public Employee update(Employee obj) {
        return repository.save(obj);
    }

    @Override
    public List<Employee> list() {
        return repository.findAll();
    }

    @Override
    public Employee listById(String id) {
        Optional<Employee> op = repository.findById(id);
        return op.isPresent() ? op.get() : new Employee();
    }

    @Override
    public Boolean deleteById(String id) {
        repository.deleteById(id);
        return true;
    }
}
