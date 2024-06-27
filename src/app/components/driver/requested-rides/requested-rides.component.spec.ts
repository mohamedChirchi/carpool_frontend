import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedRidesComponent } from './requested-rides.component';

describe('RequestedRidesComponent', () => {
  let component: RequestedRidesComponent;
  let fixture: ComponentFixture<RequestedRidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestedRidesComponent]
    });
    fixture = TestBed.createComponent(RequestedRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
