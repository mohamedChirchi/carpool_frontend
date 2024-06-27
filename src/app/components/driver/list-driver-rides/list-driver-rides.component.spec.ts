import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDriverRidesComponent } from './list-driver-rides.component';

describe('ListDriverRidesComponent', () => {
  let component: ListDriverRidesComponent;
  let fixture: ComponentFixture<ListDriverRidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDriverRidesComponent]
    });
    fixture = TestBed.createComponent(ListDriverRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
