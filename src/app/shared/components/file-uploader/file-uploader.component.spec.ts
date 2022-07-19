import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventImageUploaderComponent } from './event-image-uploader.component';

describe('EventImageUploaderComponent', () => {
  let component: EventImageUploaderComponent;
  let fixture: ComponentFixture<EventImageUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventImageUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventImageUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
