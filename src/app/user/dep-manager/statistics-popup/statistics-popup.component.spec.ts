import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsPopupComponent } from './statistics-popup.component';

describe('StatisticsPopupComponent', () => {
  let component: StatisticsPopupComponent;
  let fixture: ComponentFixture<StatisticsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
