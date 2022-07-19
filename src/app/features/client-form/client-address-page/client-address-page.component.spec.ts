import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddressPageComponent } from './client-address-page.component';

describe('ClientAddressPageComponent', () => {
  let component: ClientAddressPageComponent;
  let fixture: ComponentFixture<ClientAddressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClientAddressPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
