import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  validationAdmin = false;
  roles: string[] = [];

  constructor(private employeeService: EmployeeService,
              public route: ActivatedRoute,
              private tokenStorage: TokenStorageService) { }

  displayedColumns = ['id', 'names', 'ti', 'workArea', 'actions'];
  dataSource: MatTableDataSource<Employee>;

  ngOnInit(): void {
    this.getEmployee();
    this.getEmploeeChange();
    this.roles = this.tokenStorage.getUser().roles;
  }

  getEmployee() {
    this.employeeService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      if (this.roles.includes('ROLE_ADMIN')) {
        this.validationAdmin = true;
      }

    })

  }

  getEmploeeChange() {
    this.employeeService.changeEmployee.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  delete(employee: string) {
    this.employeeService.delete(employee).pipe(switchMap(() => {
      console.log(this.employeeService.list())
      return this.employeeService.list();
    })).subscribe(data => {
      this.employeeService.changeEmployee.next(data);
      this.employeeService.changeMessage.next('Se eliminó');
    })


  }

}
