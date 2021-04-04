package com.pruebatecnica.ifxnetworks.crud.Repository;

import com.pruebatecnica.ifxnetworks.crud.Model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployesRepository extends MongoRepository<Employee, String> {
}
