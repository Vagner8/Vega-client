import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerTapsComponent } from './drawer-taps.component';

describe('DrawerTapsComponent', () => {
  let component: DrawerTapsComponent;
  let fixture: ComponentFixture<DrawerTapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerTapsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrawerTapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
