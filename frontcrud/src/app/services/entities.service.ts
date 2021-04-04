import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entities } from '../model/entities';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  changeEntities = new Subject<Entities[]>();
  changeMessage = new Subject<string>();

  private url: string = `${environment.HOST}/entities`;

  constructor(private http: HttpClient) { }

  save(entities: Entities) {
    return this.http.post(this.url, entities);
  }

  list() {
    return this.http.get<Entities[]>(this.url);
  }

  listEmploeeById(idEntities: string) {
    return this.http.get<Entities>(`${this.url}/${idEntities}`);
  }

  modify(idEntities: Entities) {
    return this.http.put(this.url, idEntities);
  }

  delete(idEntities: string) {
    return this.http.delete<Entities>(`${this.url}/${idEntities}`);
  }
}
