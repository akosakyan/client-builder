import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormStepperContainerPageComponent } from './client-form-stepper-container-page.component';

describe('ClientFormStepperContainerPageComponent', () => {
  let component: ClientFormStepperContainerPageComponent;
  let fixture: ComponentFixture<ClientFormStepperContainerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClientFormStepperContainerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientFormStepperContainerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
