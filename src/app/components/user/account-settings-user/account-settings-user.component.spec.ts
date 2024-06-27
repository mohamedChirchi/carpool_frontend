import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsUserComponent } from './account-settings-user.component';

describe('AccountSettingsUserComponent', () => {
  let component: AccountSettingsUserComponent;
  let fixture: ComponentFixture<AccountSettingsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSettingsUserComponent]
    });
    fixture = TestBed.createComponent(AccountSettingsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
