import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoDriverComponent } from './profile-info-driver.component';

describe('ProfileInfoDriverComponent', () => {
  let component: ProfileInfoDriverComponent;
  let fixture: ComponentFixture<ProfileInfoDriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileInfoDriverComponent]
    });
    fixture = TestBed.createComponent(ProfileInfoDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
