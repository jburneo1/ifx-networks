import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/model/employee';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-edition-employee',
  templateUrl: './edition-employee.component.html',
  styleUrls: ['./edition-employee.component.css']
})
export class EditionEmployeeComponent implements OnInit {

  id: string;
  employee: Employee;
  form: FormGroup;
  edition = false;
  roles: string[] = [];
  botton = false;

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.employee = new Employee();
    this.getForm();
    this.msgChange();
    this.getRoute();
  }

  getRoute() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edition = params['id'] != null;
      this.initForm();
    });
  }

  getForm() {
    this.form = new FormGroup({
      'id': new FormControl(''),
      'names': new FormControl(''),
      'ti': new FormControl(''),
      'workArea': new FormControl(''),
      'rol': new FormControl(''),
    });
  }

  initForm() {
    if (this.edition) {
      this.employeeService.listEmploeeById(this.id).subscribe(
        data => {
          let id = data.id;
          let names = data.names;
          let ti = data.ti;
          let workArea = data.workArea;
          let rol = data.rol;
          this.form = new FormGroup({
            'id': new FormControl(id),
            'names': new FormControl(names),
            'ti': new FormControl(ti),
            'workArea': new FormControl(workArea),
            'rol': new FormControl(rol),
          });
        }
      );
    }
  }

  updateOrCreate() {
    this.employee.id = this.form.value['id'];
    this.employee.names = this.form.value['names'];
    this.employee.rol = this.form.value['rol'];
    this.employee.ti = this.form.value['ti'];
    this.employee.workArea = this.form.value['workArea'];

    if (this.edition) {
      this.employeeService.modify(this.employee).pipe(switchMap(() => {
        return this.employeeService.list();
      })).subscribe(data => {
        this.employeeService.changeEmployee.next(data);
        this.employeeService.changeMessage.next('Se actualizó');
      });
    } else {
      this.botton = true;
      this.employeeService.save(this.employee).pipe(switchMap(() => {
        return this.employeeService.list();
      })).subscribe(data => {
        this.employeeService.changeEmployee.next(data);
        this.employeeService.changeMessage.next('Se registró');
      })


    }
    this.router.navigate(['employee']);
  }


  msgChange() {
    this.employeeService.changeMessage.subscribe(
      data => {
        this.snackBar.open(data, 'Aviso', {
          duration: 2000,
        });
      }
    );
  }


}
