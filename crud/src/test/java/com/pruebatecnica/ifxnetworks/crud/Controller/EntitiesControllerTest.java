package com.pruebatecnica.ifxnetworks.crud.Controller;

import com.pruebatecnica.ifxnetworks.crud.Model.Employee;
import com.pruebatecnica.ifxnetworks.crud.Model.Entities;
import com.pruebatecnica.ifxnetworks.crud.Service.EmployesService;
import com.pruebatecnica.ifxnetworks.crud.Service.EntitiesService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EntitiesControllerTest {

    @InjectMocks
    EntitiesController controller;

    @Mock
    EntitiesService service;

    @Test
    void listEmployes() {

        Entities entities = new Entities("1234", "xxx");
        Entities entities1 = new Entities("1234", "xxx");

        List<Entities> list = new ArrayList<>();
        list.addAll(Arrays.asList(entities, entities1));

        when(service.list()).thenReturn(list);

        ResponseEntity<List<Entities>> responseEntity = controller.listEmployes();

        assertThat(responseEntity.getBody().size()).isEqualTo(2);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    void save() {

        MockHttpServletRequest request = new MockHttpServletRequest();

        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Entities entities1 = new Entities();

        entities1.setId("1");

        when(service.save(any(Entities.class))).thenReturn(entities1);

        Entities entities = new Entities("1234", "xxx");

        ResponseEntity<Entities> responseEntity = controller.save(entities);

        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(201);

    }

//    @Test
//    void update() {
//    }
//
//    @Test
//    void delete() {
//    }
}