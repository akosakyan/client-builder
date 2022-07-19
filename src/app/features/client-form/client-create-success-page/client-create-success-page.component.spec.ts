import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCreateSuccessPageComponent } from './client-create-success-page.component';

describe('ClientCreateSuccessPageComponent', () => {
  let component: ClientCreateSuccessPageComponent;
  let fixture: ComponentFixture<ClientCreateSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClientCreateSuccessPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCreateSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
