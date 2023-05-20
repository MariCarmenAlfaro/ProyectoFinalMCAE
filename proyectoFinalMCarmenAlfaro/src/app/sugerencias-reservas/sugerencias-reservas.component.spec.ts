import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugerenciasReservasComponent } from './sugerencias-reservas.component';

describe('SugerenciasReservasComponent', () => {
  let component: SugerenciasReservasComponent;
  let fixture: ComponentFixture<SugerenciasReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugerenciasReservasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SugerenciasReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
