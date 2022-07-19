import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIdentityVerificationPageComponent } from './client-identity-verification-page.component';

describe('ClientIdentityVerificationPageComponent', () => {
  let component: ClientIdentityVerificationPageComponent;
  let fixture: ComponentFixture<ClientIdentityVerificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClientIdentityVerificationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientIdentityVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
