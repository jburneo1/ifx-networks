import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Employee } from '../model/employee';

import { EmployeeService } from './employee.service';

fdescribe('EmployeeService', () => {
  let service: EmployeeService;

  let httpClient: HttpClient;

  let httpTestingController: HttpTestingController;

  const testUrl = '/employes';
  const testUrlById = '/employes/123';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);

    service = TestBed.inject(EmployeeService);

    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data', () => {

    const testData: Employee = { id: '1', names: 'Test Data', ti: '1234', workArea: 'aaa', rol: 'ss' };

    httpClient.get<Employee>(testUrl)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne('/employes');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();

  });

  it('should get data by id', () => {

    const testData: Employee = { id: '123', names: 'Test Data by id', ti: '1234', workArea: 'aaa', rol: 'ss' };

    httpClient.get<Employee>(testUrlById)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne('/employes/123');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();

  });
});
