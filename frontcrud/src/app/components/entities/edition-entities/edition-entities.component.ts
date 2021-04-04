import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Entities } from 'src/app/model/entities';
import { EntitiesService } from 'src/app/services/entities.service';

@Component({
  selector: 'app-edition-entities',
  templateUrl: './edition-entities.component.html',
  styleUrls: ['./edition-entities.component.css']
})
export class EditionEntitiesComponent implements OnInit {

  id: string;
  entities: Entities;
  form: FormGroup;
  edition = false;

  constructor(private entitiesService: EntitiesService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.entities= new Entities();
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
      'id' : new FormControl(''),
      'name' : new FormControl(''),
    });
  }

  initForm() {
    if (this.edition) {
      this.entitiesService.listEmploeeById(this.id).subscribe(
        data => {
          let id = data.id;
          let name = data.name;
          this.form = new FormGroup({
            'id': new FormControl(id),
            'name' : new FormControl(name),
          });
        }
      );
    }
  }

  updateOrCreate() {
    this.entities.id = this.form.value['id'];
    this.entities.name = this.form.value['name'];

    //TODO: revisar la validacion, se va siempre por el if, si sirve el post
    //TODO: Cuadrarlo para que actualice cuando ocurre la accion
    if(this.edition) {
      this.entitiesService.modify(this.entities).pipe(switchMap(() => {
        return this.entitiesService.list();
      })).subscribe(data => {
        this.entitiesService.changeEntities.next(data);
        this.entitiesService.changeMessage.next('Se actualizó');
      });
    } else {
      this.entitiesService.save(this.entities).pipe(switchMap(() => {
        return this.entitiesService.list();
      })).subscribe(data => {
        this.entitiesService.changeEntities.next(data);
        this.entitiesService.changeMessage.next('Se registró');
      })
    }
    this.router.navigate(['entities']);
  }
  

  msgChange() {
    this.entitiesService.changeMessage.subscribe(
      data => {
        this.snackBar.open(data, 'Aviso', {
          duration: 2000,
        });
      }
    );
  }

}
