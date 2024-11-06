import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavTapsComponent } from './sidenav-taps.component';

describe('SidenavTapsComponent', () => {
  let component: SidenavTapsComponent;
  let fixture: ComponentFixture<SidenavTapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavTapsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavTapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
