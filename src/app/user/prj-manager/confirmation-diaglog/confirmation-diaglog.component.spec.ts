import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDiaglogComponent } from './confirmation-diaglog.component';

describe('ConfirmationDiaglogComponent', () => {
  let component: ConfirmationDiaglogComponent;
  let fixture: ComponentFixture<ConfirmationDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDiaglogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
