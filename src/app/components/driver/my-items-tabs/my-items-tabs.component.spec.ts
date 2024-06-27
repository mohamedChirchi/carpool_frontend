import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyItemsTabsComponent } from './my-items-tabs.component';

describe('MyItemsTabsComponent', () => {
  let component: MyItemsTabsComponent;
  let fixture: ComponentFixture<MyItemsTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyItemsTabsComponent]
    });
    fixture = TestBed.createComponent(MyItemsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
