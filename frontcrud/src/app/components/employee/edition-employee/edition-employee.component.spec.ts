import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionEmployeeComponent } from './edition-employee.component';

describe('EditionEmployeeComponent', () => {
  let component: EditionEmployeeComponent;
  let fixture: ComponentFixture<EditionEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
