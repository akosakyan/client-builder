import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIdentityVerificationFormComponent } from './client-identity-verification-form.component';

describe('ClientIdentityVerificationFormComponent', () => {
  let component: ClientIdentityVerificationFormComponent;
  let fixture: ComponentFixture<ClientIdentityVerificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClientIdentityVerificationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientIdentityVerificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
