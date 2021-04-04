import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { EmployeeService } from 'src/app/services/employee.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { EmployeeComponent } from './employee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';


describe('EmployeeComponent', () => {

  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let service: EmployeeService;


  beforeEach(async () => {

    TestBed.resetTestEnvironment();

    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatToolbarModule,
        MatFormFieldModule,
        BrowserAnimationsModule

      ],
      declarations: [EmployeeComponent],
      providers: [EmployeeService]
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(EmployeeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('On init address should be loaded', fakeAsync(() => {

    const mockAddress =
      [
        {
          id: 'exampleQueue',
          names: 's',
          ti: '3',
          workArea: 'a',
          rol: 'x'
        }
      ]


    const mockAddressRes =
    {
      id: "exampleQueue",
      names: 's',
      ti: '3',
      workArea: 'a',
      rol: 'x'
    }


    spyOn(service, 'list').and.returnValue(of(mockAddress));

    component.getEmployee();

    fixture.detectChanges();

    expect(component.getEmployee).toEqual(mockAddressRes);
  }))

});
