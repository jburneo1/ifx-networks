import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Entities } from 'src/app/model/entities';
import { EntitiesService } from 'src/app/services/entities.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {

  validationAdmin = false;
  roles: string[] = [];

  constructor(private entitiesService: EntitiesService, public activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService) { }

  displayedColumns = ['id', 'names', 'actions'];
  dataSource: MatTableDataSource<Entities>;

  ngOnInit(): void {
    this.getEntities();
    this.getEntitiesChange();
    this.roles = this.tokenStorage.getUser().roles;
  }

  getEntities() {
    this.entitiesService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      if (this.roles.includes('ROLE_ADMIN')) {
        this.validationAdmin = true;
      }
    })
  }

  getEntitiesChange() {
    this.entitiesService.changeEntities.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }


  delete(idEmployee: string) {
    this.entitiesService.delete(idEmployee).pipe(switchMap(() => {
      return this.entitiesService.list();
    })).subscribe(data => {
      this.entitiesService.changeEntities.next(data);
      this.entitiesService.changeMessage.next('Se eliminó');
    })
  }

}
