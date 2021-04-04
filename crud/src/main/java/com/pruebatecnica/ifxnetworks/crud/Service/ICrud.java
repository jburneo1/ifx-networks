package com.pruebatecnica.ifxnetworks.crud.Service;

import java.util.List;

public interface ICrud <T>{
    T save(T obj);
    T update(T obj);
    List<T> list();
    T listById(String id);
    Boolean deleteById(String id);
}
