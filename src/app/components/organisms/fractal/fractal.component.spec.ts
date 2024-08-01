import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FractalComponent } from './fractal.component';

describe('FractalComponent', () => {
  let component: FractalComponent;
  let fixture: ComponentFixture<FractalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FractalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FractalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
