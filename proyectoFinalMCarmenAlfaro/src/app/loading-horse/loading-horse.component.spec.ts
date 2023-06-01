import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingHorseComponent } from './loading-horse.component';

describe('LoadingHorseComponent', () => {
  let component: LoadingHorseComponent;
  let fixture: ComponentFixture<LoadingHorseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingHorseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingHorseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
