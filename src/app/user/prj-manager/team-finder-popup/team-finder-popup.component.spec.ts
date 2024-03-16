import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFinderPopupComponent } from './team-finder-popup.component';

describe('TeamFinderPopupComponent', () => {
  let component: TeamFinderPopupComponent;
  let fixture: ComponentFixture<TeamFinderPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamFinderPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamFinderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
