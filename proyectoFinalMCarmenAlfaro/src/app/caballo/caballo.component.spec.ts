import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaballoComponent } from './caballo.component';

describe('CaballoComponent', () => {
  let component: CaballoComponent;
  let fixture: ComponentFixture<CaballoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaballoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaballoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
