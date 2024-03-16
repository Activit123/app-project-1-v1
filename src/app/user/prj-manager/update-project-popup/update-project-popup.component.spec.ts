import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectPopupComponent } from './update-project-popup.component';

describe('UpdateProjectPopupComponent', () => {
  let component: UpdateProjectPopupComponent;
  let fixture: ComponentFixture<UpdateProjectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProjectPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProjectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
