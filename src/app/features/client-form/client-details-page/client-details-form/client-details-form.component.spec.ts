import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsFormComponent } from './client-details-form.component';

describe('ClientDetailsFormComponent', () => {
  let component: ClientDetailsFormComponent;
  let fixture: ComponentFixture<ClientDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClientDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
