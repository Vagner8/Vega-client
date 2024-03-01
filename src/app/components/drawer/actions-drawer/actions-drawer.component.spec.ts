import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsDrawerComponent } from './actions-drawer.component';

describe('ActionsDrawerComponent', () => {
  let component: ActionsDrawerComponent;
  let fixture: ComponentFixture<ActionsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
