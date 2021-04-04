import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Employee } from '../model/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  changeEmployee = new Subject<Employee[]>();
  changeMessage = new Subject<string>();

  private url: string = `${environment.HOST}/employes`;

  constructor(private http: HttpClient) { } 

  save(employee: Employee) {
    return this.http.post(this.url, employee);
  }

  list() {
    return this.http.get<Employee[]>(this.url);
  }

  listEmploeeById(idEmployee: string) {
    return this.http.get<Employee>(`${this.url}/${idEmployee}`);
  }

  modify(idEmployee: Employee) {
    return this.http.put(this.url, idEmployee);
  }

  delete(id: string) {
    return this.http.delete<Employee>(`${this.url}/${id}`);
  }

}
