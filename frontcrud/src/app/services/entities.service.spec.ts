import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports

import { EntitiesService } from './entities.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entities } from '../model/entities';


fdescribe('EntitiesService', () => {
  let service: EntitiesService;

  let httpClient: HttpClient;

  let httpTestingController: HttpTestingController;

  const testUrl = '/entities';
  const testUrlById = '/entities/123';


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);

    service = TestBed.inject(EntitiesService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data', () => {

    const testData: Entities = { id: '1', name: 'Test Data' };

    httpClient.get<Entities>(testUrl)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne('/entities');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

  });

  it('should get data by id', () => {

    const testData: Entities = { id: '1', name: 'Test Data' };

    httpClient.get<Entities>(testUrlById)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne('/entities/123');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

  });


});
