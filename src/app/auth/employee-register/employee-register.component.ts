import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkillsComponent } from '../../user/skills/skills.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/authService/auth.service';
import { EmpIdService } from '../../../services/idService/emp-id.service';
import { EmployeeDetailsService } from '../../../services/detailsService/employee-details.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-register',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule],
  templateUrl: './employee-register.component.html',
  styleUrl: './employee-register.component.css'
})
export class EmployeeRegisterComponent implements OnInit, OnDestroy {
  orgDetails: any;
  message: string = '';
  orgName: string = '';
  empName: string = '';
  empEmail: string = '';
  empPassword: string = '';
  orgID:any;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private empIdService: EmpIdService,
    private employeeDetailsService: EmployeeDetailsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.orgID = params.get('orgId');
        this.authService.getOrgName(this.orgID).subscribe(
          (data: any) => {
            this.orgName = data.name;
          },
          error => {
            console.log(error);
            this.orgName = 'Error';
          }
        );
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    if (this.orgID) {
      this.authService
        .createEmployee(this.empName, this.empEmail, this.empPassword, this.orgID)
        .subscribe(
          data => {
            console.log(data);
            this.message = 'Registration successful';
            this.router.navigate(['/login']);
          },
          error => {
            console.log(error);
            this.message = 'Error on registration';
          }
        );
    }
  }
}