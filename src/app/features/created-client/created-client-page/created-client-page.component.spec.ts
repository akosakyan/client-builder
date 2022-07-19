import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedClientPageComponent } from './created-client-page.component';

describe('CreatedClientPageComponent', () => {
  let component: CreatedClientPageComponent;
  let fixture: ComponentFixture<CreatedClientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedClientPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
