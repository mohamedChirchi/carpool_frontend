import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsDriverComponent } from './account-settings-driver.component';

describe('AccountSettingsDriverComponent', () => {
  let component: AccountSettingsDriverComponent;
  let fixture: ComponentFixture<AccountSettingsDriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSettingsDriverComponent]
    });
    fixture = TestBed.createComponent(AccountSettingsDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
