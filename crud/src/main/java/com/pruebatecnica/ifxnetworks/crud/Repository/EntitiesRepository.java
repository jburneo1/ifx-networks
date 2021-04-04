package com.pruebatecnica.ifxnetworks.crud.Repository;

import com.pruebatecnica.ifxnetworks.crud.Model.Entities;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EntitiesRepository extends MongoRepository<Entities, String> {
}
