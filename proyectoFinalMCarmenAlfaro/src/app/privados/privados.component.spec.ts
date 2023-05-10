import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivadosComponent } from './privados.component';

describe('PrivadosComponent', () => {
  let component: PrivadosComponent;
  let fixture: ComponentFixture<PrivadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
