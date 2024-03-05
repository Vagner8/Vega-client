import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnsDrawerComponent } from './btns-drawer.component';

describe('BtnsDrawerComponent', () => {
  let component: BtnsDrawerComponent;
  let fixture: ComponentFixture<BtnsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnsDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
