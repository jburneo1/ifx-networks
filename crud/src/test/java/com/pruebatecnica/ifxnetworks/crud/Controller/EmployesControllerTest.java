package com.pruebatecnica.ifxnetworks.crud.Controller;

import com.pruebatecnica.ifxnetworks.crud.Model.Employee;
import com.pruebatecnica.ifxnetworks.crud.Service.EmployesService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class EmployesControllerTest {

    @InjectMocks
    EmployesController employesController;

    @Mock
    EmployesService service;

    @Test
    void save() {

        Employee employes = new Employee();

        employes.setId("1");

        when(service.save(any(Employee.class))).thenReturn(employes);

        Employee employeeToAdd = new Employee("1234", "Jesus", "cc", "sistemas", "developer");

        ResponseEntity<Employee> responseEntity = employesController.save(employeeToAdd);

        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(201);

    }

    @Test
    void listEmployes() {

        Employee employeeToAdd = new Employee("1234", "Jesus", "cc", "sistemas", "developer");
        Employee employeeToAdd1 = new Employee("123", "Enrique", "cc", "sistemas", "solution architect");

        List<Employee> list = new ArrayList<>();
        list.addAll(Arrays.asList(employeeToAdd, employeeToAdd1));

        when(service.list()).thenReturn(list);

        ResponseEntity<List<Employee>> responseEntity = employesController.listEmployes();

        assertThat(responseEntity.getBody().size()).isEqualTo(2);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    void listEmployesById() {

        Employee employeeToAdd = new Employee("1234", "Jesus", "cc", "sistemas", "developer");


        when(service.listById("1234")).thenReturn(employeeToAdd);

        ResponseEntity<Employee> responseEntity = employesController.listEmployesById("1234");

        assertThat(responseEntity.getBody().getId()).isEqualTo("1234");
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    void update() {

        Employee employeeToQuery = new Employee("1234", "Jesus", "cc", "sistemas", "developer");

        Employee employeeToUpdate = new Employee("1234", "Jesussss", "cc", "sistemas", "developer");

        when(service.listById("1234")).thenReturn(employeeToQuery);

        when(service.update(employeeToQuery)).thenReturn(employeeToUpdate);


        ResponseEntity<Employee> responseEntity = employesController.update(employeeToQuery);

        assertThat(responseEntity.getBody().getId()).isEqualTo("1234");
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    void delete() {

        Employee employeeToDelete = new Employee("1234", "Jesus", "cc", "sistemas", "developer");

        when(service.listById("1234")).thenReturn(employeeToDelete);

        when(service.deleteById("1234")).thenReturn(true);

        ResponseEntity<Employee> responseEntity = employesController.delete("1234");

        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(204);


    }
}