import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActsDrawerComponent } from './acts-drawer.component';

describe('ActsDrawerComponent', () => {
  let component: ActsDrawerComponent;
  let fixture: ComponentFixture<ActsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActsDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
