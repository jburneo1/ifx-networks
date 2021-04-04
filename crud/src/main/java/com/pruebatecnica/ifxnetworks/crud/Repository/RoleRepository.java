package com.pruebatecnica.ifxnetworks.crud.Repository;

import com.pruebatecnica.ifxnetworks.crud.Model.ERole;
import com.pruebatecnica.ifxnetworks.crud.Model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
