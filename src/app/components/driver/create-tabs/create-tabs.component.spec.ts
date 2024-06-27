import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTabsComponent } from './create-tabs.component';

describe('CreateTabsComponent', () => {
  let component: CreateTabsComponent;
  let fixture: ComponentFixture<CreateTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTabsComponent]
    });
    fixture = TestBed.createComponent(CreateTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
