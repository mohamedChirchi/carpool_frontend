import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedRidesComponent } from './applied-rides.component';

describe('AppliedRidesComponent', () => {
  let component: AppliedRidesComponent;
  let fixture: ComponentFixture<AppliedRidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppliedRidesComponent]
    });
    fixture = TestBed.createComponent(AppliedRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
