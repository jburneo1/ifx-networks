package com.pruebatecnica.ifxnetworks.crud.Service.impl;

import com.pruebatecnica.ifxnetworks.crud.Model.Entities;
import com.pruebatecnica.ifxnetworks.crud.Repository.EntitiesRepository;
import com.pruebatecnica.ifxnetworks.crud.Service.EntitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntitiesServiceImpl implements EntitiesService {

    @Autowired
    EntitiesRepository repository;

    @Override
    public Entities save(Entities obj) {
        return repository.save(obj);
    }

    //TODO: Validar si existe para q pueda actualizar
    @Override
    public Entities update(Entities obj) {
        return repository.save(obj);
    }

    @Override
    public List<Entities> list() {
        return repository.findAll();
    }

    @Override
    public Entities listById(String id) {
        Optional<Entities> op = repository.findById(id);
        return op.isPresent() ? op.get() : new Entities();
    }

    @Override
    public Boolean deleteById(String id) {
        repository.deleteById(id);
        return true;
    }
}
