import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionEntitiesComponent } from './edition-entities.component';

describe('EditionEntitiesComponent', () => {
  let component: EditionEntitiesComponent;
  let fixture: ComponentFixture<EditionEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionEntitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
