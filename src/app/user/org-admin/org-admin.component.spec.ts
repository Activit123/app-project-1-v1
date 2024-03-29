import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminComponent } from './org-admin.component';

describe('OrgAdminComponent', () => {
  let component: OrgAdminComponent;
  let fixture: ComponentFixture<OrgAdminComponent>;

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrgAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
